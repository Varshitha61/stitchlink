/**
 * GitHub Repository Fetcher Module
 * Exposes functions to fetch metadata, README, and directory structure from any public GitHub repository.
 */

/**
 * Parses a GitHub URL or "owner/repo" string into an owner and repository name.
 * @param {string} url - The GitHub URL or shorthand string.
 * @returns {{owner: string, repo: string}} Parsed owner and repository name.
 * @throws {Error} If the URL is invalid.
 */
export function parseGitHubUrl(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('Repository URL must be a non-empty string.');
  }

  // Remove trailing slashes and spaces
  let cleaned = url.trim().replace(/\/+$/, '');

  // Handle ssh/git protocols if any
  cleaned = cleaned.replace(/^git@github\.com:/, '');
  cleaned = cleaned.replace(/^git:\/\/github\.com\//, '');
  cleaned = cleaned.replace(/^https?:\/\/(www\.)?github\.com\//, '');

  const parts = cleaned.split('/');
  if (parts.length < 2) {
    throw new Error(`Invalid GitHub repository path: "${url}". Expected format "owner/repo" or "https://github.com/owner/repo"`);
  }

  return {
    owner: parts[0],
    repo: parts[1]
  };
}

/**
 * Helper to make authenticated/unauthenticated fetch requests to GitHub API
 * @param {string} endpoint - The API endpoint (e.g., '/repos/owner/repo')
 * @param {string} [token] - Optional GitHub personal access token
 * @returns {Promise<Response>} The response object
 */
async function githubApiFetch(endpoint, token = null) {
  const url = endpoint.startsWith('http') ? endpoint : `https://api.github.com${endpoint}`;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'stitchlink-fetcher-app'
  };

  // Prioritize passed token, fallback to environment variable
  const activeToken = token || process.env.GITHUB_TOKEN;
  if (activeToken) {
    headers['Authorization'] = `Bearer ${activeToken}`;
  }

  const response = await fetch(url, { headers });
  
  if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
    const resetTime = new Date(Number(response.headers.get('x-ratelimit-reset')) * 1000).toLocaleTimeString();
    throw new Error(`GitHub API rate limit exceeded. Limit resets at ${resetTime}. Provide a GITHUB_TOKEN to increase limits.`);
  }

  return response;
}

/**
 * Fetches directory structure using Git Trees API or Contents API.
 * Returns a flat array of file metadata, filtered by max depth and excluding junk directories.
 * @param {string} owner 
 * @param {string} repo 
 * @param {string} defaultBranch 
 * @param {object} options
 * @returns {Promise<Array>} List of items in the tree
 */
async function fetchDirectoryStructure(owner, repo, defaultBranch, options = {}) {
  const { maxDepth = 3, excludePaths = ['.git', '.github', 'node_modules', 'vendor', 'dist', 'build'] } = options;
  
  try {
    // We use the Git Trees API with recursive=1 to fetch the entire structure in one API call
    const res = await githubApiFetch(`/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`);
    
    if (!res.ok) {
      // Fallback: if trees API fails (e.g., empty repository), try Contents API
      if (res.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch tree structure: ${res.statusText}`);
    }
    
    const data = await res.json();
    if (!data.tree || !Array.isArray(data.tree)) {
      return [];
    }

    // Filter and format the tree items
    const filteredTree = data.tree
      .filter(item => {
        const parts = item.path.split('/');
        
        // Exclude directories/files that match our exclusion list
        const shouldExclude = parts.some(part => excludePaths.includes(part));
        if (shouldExclude) return false;
        
        // Filter by maximum depth
        if (parts.length > maxDepth) return false;
        
        return true;
      })
      .map(item => ({
        path: item.path,
        type: item.type === 'tree' ? 'dir' : 'file',
        size: item.size || 0,
        url: `https://github.com/${owner}/${repo}/blob/${defaultBranch}/${item.path}`
      }));

    return filteredTree;
  } catch (error) {
    console.warn(`[Warning] Failed to retrieve directory structure for ${owner}/${repo}:`, error.message);
    return [];
  }
}

/**
 * Main function to fetch all required repository data.
 * @param {string} repoUrl - The URL of the repository or shorthand "owner/repo"
 * @param {object} [options] - Optional settings
 * @param {string} [options.token] - GitHub access token
 * @param {number} [options.maxDepth=3] - Maximum directory depth to retrieve
 * @param {string[]} [options.excludePaths] - Folders/files to exclude from tree listing
 * @returns {Promise<object>} Consolidated structured JSON data
 */
export async function fetchRepoData(repoUrl, options = {}) {
  const { owner, repo } = parseGitHubUrl(repoUrl);
  console.log(`Fetching repository data for: ${owner}/${repo}...`);

  // 1. Fetch Repository Metadata
  const metadataRes = await githubApiFetch(`/repos/${owner}/${repo}`, options.token);
  if (!metadataRes.ok) {
    throw new Error(`Failed to fetch repository metadata for ${owner}/${repo}. Status: ${metadataRes.status} ${metadataRes.statusText}`);
  }
  const meta = await metadataRes.json();

  const defaultBranch = meta.default_branch || 'main';

  // 2. Fetch README Content (handled gracefully if missing)
  let readme = null;
  try {
    const readmeRes = await githubApiFetch(`/repos/${owner}/${repo}/readme`, options.token);
    if (readmeRes.ok) {
      const readmeData = await readmeRes.json();
      let content = '';
      if (readmeData.content) {
        // Decode base64 content
        content = Buffer.from(readmeData.content, 'base64').toString('utf-8');
      }
      readme = {
        name: readmeData.name,
        downloadUrl: readmeData.download_url,
        content: content,
        htmlUrl: readmeData.html_url
      };
    } else if (readmeRes.status !== 404) {
      console.warn(`[Warning] README request returned status: ${readmeRes.status}`);
    }
  } catch (err) {
    console.warn(`[Warning] Failed to fetch or decode README:`, err.message);
  }

  // 3. Fetch Directory Structure (handled gracefully if fails)
  const fileStructure = await fetchDirectoryStructure(owner, repo, defaultBranch, {
    token: options.token,
    maxDepth: options.maxDepth,
    excludePaths: options.excludePaths
  });

  // 4. Assemble and output consolidated structured JSON
  return {
    fetchedAt: new Date().toISOString(),
    sourceUrl: `https://github.com/${owner}/${repo}`,
    metadata: {
      name: meta.name,
      owner: meta.owner?.login || owner,
      description: meta.description || '',
      stars: meta.stargazers_count || 0,
      language: meta.language || 'Unknown',
      lastUpdated: meta.pushed_at || meta.updated_at,
      license: meta.license ? {
        name: meta.license.name,
        spdxId: meta.license.spdx_id,
        url: meta.license.url
      } : null,
      defaultBranch: defaultBranch,
      forks: meta.forks_count || 0,
      openIssues: meta.open_issues_count || 0,
      homepage: meta.homepage || ''
    },
    readme: readme,
    structure: fileStructure
  };
}
