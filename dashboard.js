/**
 * StitchLink Dashboard JS
 * Manages tab views, sidebar selections, markdown rendering, tree construction,
 * and client-side fetching for any GitHub repo.
 */

// State
let repositories = [];
let selectedRepoIndex = 0;

// DOM Elements
const repoListEl = document.getElementById('repo-list');
const selectedOwnerEl = document.getElementById('selected-owner');
const selectedNameEl = document.getElementById('selected-name');
const selectedLanguageEl = document.getElementById('selected-language');
const selectedDescriptionEl = document.getElementById('selected-description');
const selectedGithubLink = document.getElementById('selected-github-link');
const selectedHomepageLink = document.getElementById('selected-homepage-link');

const metricStarsEl = document.getElementById('metric-stars');
const metricForksEl = document.getElementById('metric-forks');
const metricIssuesEl = document.getElementById('metric-issues');
const metricLicenseEl = document.getElementById('metric-license');

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const readmeContainer = document.getElementById('readme-container');
const fileCountEl = document.getElementById('file-count');
const treeContainer = document.getElementById('tree-container');
const jsonContainer = document.getElementById('json-container');
const syncTimestampEl = document.getElementById('sync-timestamp');

const copyJsonBtn = document.getElementById('copy-json-btn');
const customRepoForm = document.getElementById('custom-repo-form');
const customRepoInput = document.getElementById('custom-repo-input');
const githubTokenInput = document.getElementById('github-token-input');
const fetchBtn = document.getElementById('fetch-btn');
const fetchErrorEl = document.getElementById('fetch-error');

// Init
document.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  setupCopyBtn();
  setupCustomFetcher();
  await loadRepositoryData();
});

// Setup Tab View Transitions
function setupTabs() {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Deactivate all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Activate target
      btn.classList.add('active');
      const targetContentEl = document.getElementById(targetTab);
      if (targetContentEl) {
        targetContentEl.classList.add('active');
      }
    });
  });
}

// Format byte size to human readable strings
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Copy JSON output to Clipboard
function setupCopyBtn() {
  copyJsonBtn.addEventListener('click', () => {
    const jsonText = jsonContainer.textContent;
    navigator.clipboard.writeText(jsonText)
      .then(() => {
        const originalText = copyJsonBtn.textContent;
        copyJsonBtn.textContent = 'Copied!';
        copyJsonBtn.classList.add('btn-success');
        setTimeout(() => {
          copyJsonBtn.textContent = originalText;
          copyJsonBtn.classList.remove('btn-success');
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  });
}

// Load consolidated JSON on start
async function loadRepositoryData() {
  try {
    const res = await fetch('./embroidery_repos.json');
    if (!res.ok) {
      throw new Error(`Failed to load embroidery_repos.json: ${res.statusText}`);
    }
    
    repositories = await res.json();
    renderSidebar();
    
    if (repositories.length > 0) {
      selectRepository(0);
    }
  } catch (error) {
    console.error(error);
    repoListEl.innerHTML = `
      <div class="fetch-error">
        Failed to load offline data. Try running the fetch script first: <br>
        <code>node fetch-embroidery-repos.js</code>
      </div>
    `;
  }
}

// Render the Sidebar List
function renderSidebar() {
  repoListEl.innerHTML = '';
  
  repositories.forEach((repo, index) => {
    const item = document.createElement('div');
    item.className = `repo-item ${index === selectedRepoIndex ? 'active' : ''}`;
    
    const formattedStars = repo.metadata.stars >= 1000 
      ? (repo.metadata.stars / 1000).toFixed(1) + 'k' 
      : repo.metadata.stars;
      
    item.innerHTML = `
      <div class="repo-item-header">
        <div>
          <div class="repo-item-title text-truncate">${repo.metadata.name}</div>
          <div class="repo-item-owner">${repo.metadata.owner}</div>
        </div>
        <span class="repo-item-stars">
          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          ${formattedStars}
        </span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
        <span class="repo-item-lang">${repo.metadata.language}</span>
      </div>
    `;
    
    item.addEventListener('click', () => {
      selectRepository(index);
    });
    
    repoListEl.appendChild(item);
  });
}

// Select and Render Repository Details
function selectRepository(index) {
  selectedRepoIndex = index;
  
  // Highlight active sidebar item
  const items = repoListEl.querySelectorAll('.repo-item');
  items.forEach((item, idx) => {
    if (idx === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  const repo = repositories[index];
  if (!repo) return;
  
  // Render Metadata Info
  selectedOwnerEl.textContent = repo.metadata.owner;
  selectedNameEl.textContent = repo.metadata.name;
  selectedLanguageEl.textContent = repo.metadata.language;
  selectedDescriptionEl.textContent = repo.metadata.description || 'No description provided.';
  
  // Links
  selectedGithubLink.href = repo.sourceUrl;
  if (repo.metadata.homepage) {
    selectedHomepageLink.href = repo.metadata.homepage.startsWith('http') ? repo.metadata.homepage : `https://${repo.metadata.homepage}`;
    selectedHomepageLink.classList.remove('hidden');
  } else {
    selectedHomepageLink.classList.add('hidden');
  }
  
  // Metric values
  metricStarsEl.textContent = repo.metadata.stars.toLocaleString();
  metricForksEl.textContent = repo.metadata.forks.toLocaleString();
  metricIssuesEl.textContent = repo.metadata.openIssues.toLocaleString();
  
  const licenseName = repo.metadata.license ? (repo.metadata.license.spdxId || repo.metadata.license.name) : 'None';
  metricLicenseEl.textContent = licenseName;
  metricLicenseEl.title = repo.metadata.license ? repo.metadata.license.name : 'None';
  
  // Sync timestamp
  syncTimestampEl.textContent = new Date(repo.fetchedAt).toLocaleString();
  
  // Render README.md
  if (repo.readme && repo.readme.content) {
    readmeContainer.innerHTML = renderMarkdown(repo.readme.content);
    // Highlight syntax in code blocks
    if (typeof Prism !== 'undefined') {
      Prism.highlightAllUnder(readmeContainer);
    }
  } else {
    readmeContainer.innerHTML = `<p class="muted">No README available for this repository.</p>`;
  }
  
  // Render File Explorer
  renderFileExplorer(repo.structure);
  
  // Render Structured JSON
  jsonContainer.textContent = JSON.stringify(repo, null, 2);
}

// Build & Render Tree Structure
function renderFileExplorer(structure) {
  if (!structure || structure.length === 0) {
    fileCountEl.textContent = '0 items loaded';
    treeContainer.innerHTML = '<p class="muted">No directory structure available.</p>';
    return;
  }
  
  fileCountEl.textContent = `${structure.length} items loaded`;
  
  // Build tree nodes
  const root = { name: 'root', type: 'dir', children: {} };
  
  for (const item of structure) {
    const parts = item.path.split('/');
    let current = root;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          path: parts.slice(0, i + 1).join('/'),
          type: isLast ? item.type : 'dir',
          url: isLast ? item.url : null,
          size: isLast ? item.size : 0,
          children: {}
        };
      }
      current = current.children[part];
    }
  }
  
  // Render recursively
  treeContainer.innerHTML = renderTreeNode(root, 0);
}

// Recursive Tree Node Renderer
function renderTreeNode(node, depth = 0) {
  if (node.name === 'root') {
    const keys = Object.keys(node.children).sort((a, b) => {
      const childA = node.children[a];
      const childB = node.children[b];
      // Directories first
      if (childA.type !== childB.type) {
        return childA.type === 'dir' ? -1 : 1;
      }
      return a.localeCompare(b);
    });
    return keys.map(k => renderTreeNode(node.children[k], depth)).join('');
  }
  
  const isDir = node.type === 'dir';
  const indent = depth * 20;
  const icon = isDir 
    ? `<svg class="tree-icon folder" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`
    : `<svg class="tree-icon file" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
    
  const sizeStr = !isDir && node.size ? `<span class="tree-size">${formatBytes(node.size)}</span>` : '';
  const href = node.url ? `href="${node.url}" target="_blank"` : 'href="#" onclick="event.preventDefault()"';
  
  let html = `
    <a ${href} class="tree-row" style="padding-left: ${indent + 12}px">
      ${icon}
      <span class="tree-name">${node.name}</span>
      ${sizeStr}
    </a>
  `;
  
  const childKeys = Object.keys(node.children).sort((a, b) => {
    const childA = node.children[a];
    const childB = node.children[b];
    if (childA.type !== childB.type) {
      return childA.type === 'dir' ? -1 : 1;
    }
    return a.localeCompare(b);
  });
  
  if (childKeys.length > 0) {
    html += childKeys.map(k => renderTreeNode(node.children[k], depth + 1)).join('');
  }
  
  return html;
}

// Markdown Renderer (utilizing marked.js CDN)
function renderMarkdown(md) {
  if (!md) return '<p class="muted">No README content available.</p>';
  try {
    return marked.parse(md);
  } catch (err) {
    console.error('Failed to parse Markdown with marked:', err);
    // Escape basic HTML tags to prevent custom execution
    return `<pre style="white-space: pre-wrap;">${md.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
  }
}

// Client-side Custom Repository Fetcher UI Interactivity
function setupCustomFetcher() {
  customRepoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inputVal = customRepoInput.value.trim();
    const token = githubTokenInput.value.trim();
    
    if (!inputVal) return;
    
    // Set UI loading state
    fetchBtn.disabled = true;
    const originalBtnHTML = fetchBtn.innerHTML;
    fetchBtn.innerHTML = `<div class="spinner"></div> Fetching...`;
    fetchErrorEl.classList.add('hidden');
    
    try {
      // Parse URL/shorthand
      const { owner, repo } = parseGitHubPath(inputVal);
      
      // Perform direct requests to GitHub REST APIs
      const repoData = await clientSideFetchRepo(owner, repo, token);
      
      // Add to repositories array and render
      repositories.push(repoData);
      renderSidebar();
      
      // Select the newly fetched repository (last index)
      selectRepository(repositories.length - 1);
      
      // Clear input fields
      customRepoInput.value = '';
      githubTokenInput.value = '';
    } catch (err) {
      console.error(err);
      fetchErrorEl.textContent = err.message;
      fetchErrorEl.classList.remove('hidden');
    } finally {
      fetchBtn.disabled = false;
      fetchBtn.innerHTML = originalBtnHTML;
    }
  });
}

// Path parsing helper (Client-side version)
function parseGitHubPath(input) {
  let cleaned = input.trim().replace(/\/+$/, '');
  cleaned = cleaned.replace(/^git@github\.com:/, '');
  cleaned = cleaned.replace(/^git:\/\/github\.com\//, '');
  cleaned = cleaned.replace(/^https?:\/\/(www\.)?github\.com\//, '');

  const parts = cleaned.split('/');
  if (parts.length < 2) {
    throw new Error('Invalid shorthand/URL. Use "owner/repo" or a GitHub link.');
  }
  return { owner: parts[0], repo: parts[1] };
}

// Browser base64 decoding to UTF8 helper
function decodeBase64(str) {
  try {
    return decodeURIComponent(escape(window.atob(str.replace(/\s/g, ''))));
  } catch (e) {
    return window.atob(str);
  }
}

// Live client-side fetcher utilizing the browser's Fetch API
async function clientSideFetchRepo(owner, repo, token = '') {
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Helper API Fetcher
  const apiCall = async (url) => {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
        throw new Error('Rate limit exceeded. Provide a personal access token.');
      }
      throw new Error(`GitHub API returned status ${res.status}: ${res.statusText}`);
    }
    return res.json();
  };
  
  // 1. Fetch Metadata
  const meta = await apiCall(`https://api.github.com/repos/${owner}/${repo}`);
  const defaultBranch = meta.default_branch || 'main';
  
  // 2. Fetch README (Graceful fallback)
  let readme = null;
  try {
    const readmeData = await apiCall(`https://api.github.com/repos/${owner}/${repo}/readme`);
    readme = {
      name: readmeData.name,
      downloadUrl: readmeData.download_url,
      content: decodeBase64(readmeData.content),
      htmlUrl: readmeData.html_url
    };
  } catch (e) {
    console.warn('Could not load README client-side:', e.message);
  }
  
  // 3. Fetch Tree structure (Graceful fallback)
  let fileStructure = [];
  try {
    const treeData = await apiCall(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`);
    if (treeData.tree && Array.isArray(treeData.tree)) {
      const excludePaths = ['.git', '.github', 'node_modules', 'vendor', 'dist', 'build'];
      const maxDepth = 3;
      
      fileStructure = treeData.tree
        .filter(item => {
          const parts = item.path.split('/');
          const shouldExclude = parts.some(part => excludePaths.includes(part));
          if (shouldExclude) return false;
          if (parts.length > maxDepth) return false;
          return true;
        })
        .map(item => ({
          path: item.path,
          type: item.type === 'tree' ? 'dir' : 'file',
          size: item.size || 0,
          url: `https://github.com/${owner}/${repo}/blob/${defaultBranch}/${item.path}`
        }));
    }
  } catch (e) {
    console.warn('Could not load tree structure client-side:', e.message);
  }
  
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
    readme,
    structure: fileStructure
  };
}
