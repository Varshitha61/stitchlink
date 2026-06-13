import fs from 'fs';
import path from 'path';
import { supabase, assertSupabaseConfig } from './supabase-client.js';

async function syncToSupabase() {
  console.log('===================================================');
  console.log('StitchLink - Sync Repository Data to Supabase');
  console.log('===================================================');

  try {
    // Assert credentials are defined in environment variables
    assertSupabaseConfig();
  } catch (err) {
    console.error(`[Config Error] ${err.message}`);
    process.exit(1);
  }

  const dataPath = path.join(process.cwd(), 'embroidery_repos.json');
  
  if (!fs.existsSync(dataPath)) {
    console.error('[Error] File "embroidery_repos.json" not found.');
    console.error('        Please run the fetcher script first to generate the data:');
    console.error('        npm run fetch');
    process.exit(1);
  }

  let repos = [];
  try {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    repos = JSON.parse(rawData);
  } catch (err) {
    console.error('[Error] Failed to read or parse "embroidery_repos.json":', err.message);
    process.exit(1);
  }

  console.log(`Loaded ${repos.length} repository records from local file. Syncing to database...\n`);

  for (const repo of repos) {
    const owner = repo.metadata.owner;
    const name = repo.metadata.name;
    console.log(`Syncing ${owner}/${name}...`);

    // Prepare table payload matching schema
    const payload = {
      owner: owner,
      name: name,
      source_url: repo.sourceUrl,
      fetched_at: repo.fetchedAt,
      metadata: repo.metadata,
      readme: repo.readme,
      structure: repo.structure
    };

    // Perform database upsert (insert or update on conflict of unique columns [owner, name])
    const { error } = await supabase
      .from('repositories')
      .upsert(payload, { onConflict: 'owner,name' });

    if (error) {
      console.error(`[Failed] Error upserting ${owner}/${name}:`, error.message);
    } else {
      console.log(`[Success] Synced ${owner}/${name} to Supabase table.`);
    }
    console.log('---------------------------------------------------');
  }

  console.log('\nSupabase synchronization complete.');
}

syncToSupabase().catch(err => {
  console.error('Fatal synchronization error:', err);
  process.exit(1);
});
