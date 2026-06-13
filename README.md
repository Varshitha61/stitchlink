# StitchLink - Embroidery Repository Fetcher & Explorer

StitchLink Fetcher & Explorer is a unified toolset designed to track, catalog, and explore metadata from open-source embroidery repositories. It consists of a Node.js-based API fetcher CLI, a database synchronizer for Supabase, and a modern glassmorphic web dashboard to visually inspect repository files, README documents, and raw metadata.

---

## Features

- **Automated Metadata Fetching**: Recursively traverses directory structures (up to a custom depth) and extracts repository statistics (stars, forks, open issues, license, last push date) using the GitHub REST API.
- **Supabase Sync**: Upserts fetched repository metadata directly into a Supabase PostgreSQL table.
- **Interactive Web Dashboard**: Allows you to explore pre-fetched embroidery repositories or query any public GitHub repository dynamically from your browser.
- **GitHub Actions Automation**: Automatically runs once a week to fetch fresh metadata, commits it back to the repository, and optionally syncs it to Supabase.

---

## Repository Structure

```
├── .github/workflows/
│   └── fetch-data.yml        # GitHub Actions workflow for weekly automation
├── data/                     # Directory containing individual repository JSON files
├── fetch-embroidery-repos.js # CLI entry point for fetching preset embroidery repositories
├── github-fetcher.js         # Core module for fetching repository metadata and file trees
├── sync-to-supabase.js       # CLI entry point to upload local JSON data to Supabase
├── supabase-client.js        # Supabase client initialization helper
├── index.html                # Web Dashboard structure
├── index.css                 # Web Dashboard styles (Dark mode / Glassmorphic layout)
├── dashboard.js              # Web Dashboard logic and dynamic fetching integration
├── embroidery_repos.json     # Consolidated repository data cache
└── .gitignore                # Git exclusions (node_modules, .env, etc.)
```

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or above (Node 20+ recommended).
- **npm**: Installed with Node.js.

### Installation

1. Clone or copy the project files to your local machine.
2. Open a terminal in the project directory and install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file in the root directory using `.env.example` as a template:
   ```bash
   cp .env.example .env
   ```

---

## Local Usage

### 1. Fetch Repository Metadata
To fetch data for the predefined embroidery repositories:
```bash
npm run fetch
```
This script saves individual repository configurations under `data/` and generates the consolidated cache file `embroidery_repos.json`.

> [!TIP]
> Add a `GITHUB_TOKEN=your_token` to your environment variables (or `.env` file) to bypass rate limits (60/hour unauthenticated vs 5000/hour authenticated).

### 2. Sync to Supabase Database
To synchronize the cached metadata from `embroidery_repos.json` to your Supabase table:
```bash
# Add SUPABASE_URL and SUPABASE_KEY to your env variables first, then run:
npm run sync
```

### 3. Launch the Web Dashboard
Start a local static server to open the dashboard interface:
```bash
npm start
```
This launches a server at `http://localhost:3000` where you can view cached repositories or enter any public GitHub URL to inspect repository trees and README files dynamically.

---

## GitHub Actions Automation

The project includes a weekly automation workflow configured at `.github/workflows/fetch-data.yml`.

### Setup

To deploy the automation successfully:
1. **Repository Write Permissions**:
   - Go to your repository settings on GitHub: **Settings -> Actions -> General**.
   - Under **Workflow permissions**, choose **Read and write permissions**. This allows the Actions runner to commit changes back to the repository.
2. **Supabase Integration (Optional)**:
   - Go to **Settings -> Secrets and variables -> Actions**.
   - Click **New repository secret** and define:
     - `SUPABASE_URL`: Your Supabase project API URL.
     - `SUPABASE_KEY`: Your Supabase project anon/service-role API key.

### Execution
- **Weekly Schedule**: Runs automatically every Sunday at `00:00 UTC`.
- **Manual Trigger**: Go to the **Actions** tab of your repository, select **Weekly Embroidery Repos Fetch & Sync**, and click **Run workflow**.
