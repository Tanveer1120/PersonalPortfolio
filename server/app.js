import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db, isSupabaseConfigured } from './supabaseClient.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health / Status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: isSupabaseConfigured ? 'Supabase PostgreSQL' : 'Persistent Storage (Ready for Supabase credentials)',
  });
});

// GET published portfolio by slug
app.get('/api/portfolios/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const portfolio = await db.getBySlug(slug);

    if (!portfolio) {
      return res.status(404).json({ error: 'Published portfolio not found.' });
    }

    const { owner_token, ...safeData } = portfolio;
    res.json(safeData);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Internal server error fetching portfolio.' });
  }
});

// POST publish or update portfolio
app.post('/api/portfolios/publish', async (req, res) => {
  try {
    const { slug, title, data, templateId, ownerToken } = req.body;

    if (!slug || !data || !ownerToken) {
      return res.status(400).json({ error: 'Missing required portfolio fields.' });
    }

    const record = await db.upsert({
      slug: slug.toLowerCase().trim(),
      title: title || 'Personal Portfolio',
      data,
      template_id: templateId || data.templateId || 'modern-professional',
      owner_token: ownerToken,
      is_published: true,
    });

    res.json({
      success: true,
      message: 'Portfolio published successfully!',
      portfolio: record,
    });
  } catch (error) {
    console.error('Error publishing portfolio:', error);
    res.status(500).json({ error: 'Failed to publish portfolio.' });
  }
});

// POST unpublish portfolio
app.post('/api/portfolios/:slug/unpublish', async (req, res) => {
  try {
    const { slug } = req.params;
    const { ownerToken } = req.body;

    if (!ownerToken) {
      return res.status(401).json({ error: 'Owner authorization token is required.' });
    }

    await db.unpublish(slug, ownerToken);
    res.json({ success: true, message: 'Portfolio unpublished successfully.' });
  } catch (error) {
    console.error('Error unpublishing portfolio:', error);
    res.status(403).json({ error: 'Failed to unpublish. Invalid token or record not found.' });
  }
});

// DELETE portfolio
app.delete('/api/portfolios/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { ownerToken } = req.body;

    if (!ownerToken) {
      return res.status(401).json({ error: 'Owner authorization token is required.' });
    }

    await db.delete(slug, ownerToken);
    res.json({ success: true, message: 'Portfolio deleted successfully.' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(403).json({ error: 'Failed to delete portfolio. Invalid token or record not found.' });
  }
});

export default app;
