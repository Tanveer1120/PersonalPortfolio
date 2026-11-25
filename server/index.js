import app from './app.js';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { isSupabaseConfigured } from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

// Serve static frontend build in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database engine: ${isSupabaseConfigured ? 'Supabase PostgreSQL' : 'Persistent Storage (Active)'}`);
});
