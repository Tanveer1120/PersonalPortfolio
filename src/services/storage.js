import { INITIAL_PORTFOLIO_DATA } from '../types/portfolio';

const STORAGE_KEY = 'personal_portfolio_website_data';
const PUBLISHED_KEY = 'personal_portfolio_published_info';

export const loadSavedPortfolio = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PORTFOLIO_DATA,
      ...parsed,
      personal: { ...INITIAL_PORTFOLIO_DATA.personal, ...(parsed.personal || {}) },
      skills: { ...INITIAL_PORTFOLIO_DATA.skills, ...(parsed.skills || {}) },
      education: Array.isArray(parsed.education) ? parsed.education : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
      templateId: parsed.templateId || 'modern-professional',
    };
  } catch (err) {
    console.error('Error reading localStorage portfolio data:', err);
    return INITIAL_PORTFOLIO_DATA;
  }
};

export const savePortfolio = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};

export const clearSavedPortfolio = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PUBLISHED_KEY);
  } catch (err) {
    console.error('Error clearing localStorage:', err);
  }
};

export const savePublishedInfo = (info) => {
  try {
    localStorage.setItem(PUBLISHED_KEY, JSON.stringify(info));
  } catch (err) {
    console.error('Error saving published info:', err);
  }
};

export const loadPublishedInfo = () => {
  try {
    const raw = localStorage.getItem(PUBLISHED_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};
