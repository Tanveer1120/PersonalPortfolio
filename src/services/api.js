const API_BASE = '/api';

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getPortfolio(slug) {
    const res = await fetch(`${API_BASE}/portfolios/${slug}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to load portfolio (${res.status})`);
    }
    return res.json();
  },

  async publishPortfolio({ slug, title, data, templateId, ownerToken }) {
    const res = await fetch(`${API_BASE}/portfolios/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, title, data, templateId, ownerToken }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to publish portfolio');
    }
    return res.json();
  },

  async unpublishPortfolio(slug, ownerToken) {
    const res = await fetch(`${API_BASE}/portfolios/${slug}/unpublish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ownerToken }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to unpublish');
    }
    return res.json();
  },

  async deletePortfolio(slug, ownerToken) {
    const res = await fetch(`${API_BASE}/portfolios/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ownerToken }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete');
    }
    return res.json();
  },
};
