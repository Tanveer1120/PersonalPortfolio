import { saveLocalPortfolioRecord, getLocalPortfolioRecord } from './storage';

const API_BASE = '/api';

export const api = {
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (err) {
      return { status: 'fallback', message: 'Local mode active' };
    }
  },

  async getPortfolio(slug) {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();

    // 1. Attempt to fetch from Backend API (Supabase / server persistent storage)
    try {
      const res = await fetch(`${API_BASE}/portfolios/${cleanSlug}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.data) {
          saveLocalPortfolioRecord(data);
          return data;
        }
      } else if (res.status === 404) {
        // Fallback check before concluding 404
        const local = getLocalPortfolioRecord(cleanSlug);
        if (local) return local;
        return null;
      }
    } catch (err) {
      console.warn('Backend API unreachable, checking persistent local registry:', err.message);
    }

    // 2. Fallback to client-side storage registry
    const local = getLocalPortfolioRecord(cleanSlug);
    if (local && local.data) {
      return local;
    }

    return null;
  },

  async publishPortfolio({ slug, title, data, templateId, ownerToken }) {
    if (!slug || !data) return { success: false, error: 'Missing portfolio data' };
    const cleanSlug = slug.toLowerCase().trim();

    const record = {
      slug: cleanSlug,
      title: title || `${data.personal?.fullName || 'Personal'} Portfolio`,
      data,
      template_id: templateId || data.templateId || 'modern-professional',
      owner_token: ownerToken,
      is_published: true,
      updated_at: new Date().toISOString(),
    };

    // Save in local registry immediately so the link works without delay
    saveLocalPortfolioRecord(record);

    // Attempt to persist to database/backend
    try {
      const res = await fetch(`${API_BASE}/portfolios/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: cleanSlug, title, data, templateId, ownerToken }),
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (err) {
      console.warn('Backend sync deferred, saved to persistent local storage:', err.message);
    }

    return {
      success: true,
      message: 'Portfolio link created and saved!',
      portfolio: record,
    };
  },

  async unpublishPortfolio(slug, ownerToken) {
    if (!slug) return;
    try {
      await fetch(`${API_BASE}/portfolios/${slug}/unpublish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerToken }),
      });
    } catch (err) {
      console.warn('Unpublish API warning:', err);
    }
  },

  async deletePortfolio(slug, ownerToken) {
    if (!slug) return;
    try {
      await fetch(`${API_BASE}/portfolios/${slug}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerToken }),
      });
    } catch (err) {
      console.warn('Delete API warning:', err);
    }
  },
};
