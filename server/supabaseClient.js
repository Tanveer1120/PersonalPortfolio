import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project'));

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

// Persistent local storage file fallback for environments where Supabase keys are not set yet
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolios.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2));
}

const readLocalData = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
};

const writeLocalData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write local database file:', err);
  }
};

export const db = {
  async getBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('slug', cleanSlug)
        .eq('is_published', true)
        .single();
      if (error) {
        if (error.code === 'PGRST116') return null;
        console.error('Supabase query error:', error);
      }
      return data;
    }

    // Persistent JSON Store
    const all = readLocalData();
    const item = all[cleanSlug] || all[slug];
    if (item && item.is_published !== false) {
      return item;
    }
    return null;
  },

  async upsert(record) {
    const cleanSlug = (record.slug || '').toLowerCase().trim();
    const cleanRecord = {
      ...record,
      slug: cleanSlug,
      template_id: record.template_id || record.data?.templateId || 'modern-professional',
      is_published: record.is_published ?? true,
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('portfolios')
        .upsert(
          {
            slug: cleanRecord.slug,
            title: cleanRecord.title,
            data: cleanRecord.data,
            template_id: cleanRecord.template_id,
            owner_token: cleanRecord.owner_token,
            is_published: cleanRecord.is_published ?? true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'slug' }
        )
        .select()
        .single();

      if (error) {
        console.error('Supabase upsert error:', error);
        throw error;
      }
      return data;
    }

    // Persistent JSON Store
    const all = readLocalData();
    const existing = all[cleanSlug] || {};
    const updated = {
      ...existing,
      ...cleanRecord,
      created_at: existing.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_published: cleanRecord.is_published ?? true,
    };
    all[cleanSlug] = updated;
    writeLocalData(all);
    return updated;
  },

  async unpublish(slug, ownerToken) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('portfolios')
        .update({ is_published: false, updated_at: new Date().toISOString() })
        .eq('slug', slug)
        .eq('owner_token', ownerToken)
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const all = readLocalData();
    if (all[slug] && all[slug].owner_token === ownerToken) {
      all[slug].is_published = false;
      all[slug].updated_at = new Date().toISOString();
      writeLocalData(all);
      return all[slug];
    }
    throw new Error('Portfolio not found or unauthorized token');
  },

  async delete(slug, ownerToken) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('slug', slug)
        .eq('owner_token', ownerToken);
      if (error) throw error;
      return true;
    }

    const all = readLocalData();
    if (all[slug] && all[slug].owner_token === ownerToken) {
      delete all[slug];
      writeLocalData(all);
      return true;
    }
    throw new Error('Portfolio not found or unauthorized token');
  }
};
