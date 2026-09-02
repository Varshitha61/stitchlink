import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, AlertCircle, FileText, Download, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import repoDataRaw from '../fetcher/embroidery_repos.json';

interface RepoData {
  owner: string;
  name: string;
  description: string | null;
  html_url: string;
  stars: number;
  forks: number;
  open_issues: number;
  license: string | null;
  language: string | null;
  topics: string[];
  last_push: string;
  readme: string | null;
  tree: any[];
}

export const OpenSourceDesigns = () => {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // The JSON might be an array of repo objects
    if (Array.isArray(repoDataRaw)) {
      setRepos(repoDataRaw);
    } else if (repoDataRaw && typeof repoDataRaw === 'object') {
      // If it's a map or something else
      setRepos(Object.values(repoDataRaw));
    }
  }, []);

  const filteredRepos = repos.filter(repo => {
    const searchLower = searchTerm.toLowerCase();
    return (
      repo.name.toLowerCase().includes(searchLower) ||
      (repo.description && repo.description.toLowerCase().includes(searchLower)) ||
      (repo.owner && repo.owner.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Embroidery</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore community-driven, open-source machine embroidery patterns, tools, and designs fetched directly from GitHub.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search repositories, descriptions, or authors..."
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo, idx) => (
              <div 
                key={`${repo.owner}-${repo.name}-${idx}`}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-rose-500 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                        <Github className="w-4 h-4" />
                        <span className="truncate">{repo.owner}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate group-hover:text-rose-500 transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 min-h-[4rem]">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="flex items-center flex-wrap gap-3 mb-6">
                    <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-amber-500 mr-1.5" />
                      {repo.stars}
                    </div>
                    <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <GitFork className="w-4 h-4 text-blue-500 mr-1.5" />
                      {repo.forks}
                    </div>
                    {repo.license && (
                      <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        <FileText className="w-4 h-4 text-emerald-500 mr-1.5" />
                        {repo.license}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      Updated {new Date(repo.last_push).toLocaleDateString()}
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
                    >
                      View Repo
                      <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No repositories found</h3>
              <p className="text-slate-500 dark:text-slate-400">We couldn't find any open source designs matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
