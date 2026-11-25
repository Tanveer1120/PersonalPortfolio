import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Edit3,
  Download,
  FileCheck2,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  Layers,
  AlertTriangle,
  Globe,
  Share2
} from 'lucide-react';
import TemplateRenderer from '../templates/TemplateRenderer';
import { TEMPLATES } from '../types/portfolio';
import { generateAtsResumePdf } from '../pdf/generateAtsPdf';
import { generatePortfolioPdf } from '../pdf/generatePortfolioPdf';
import { api } from '../services/api';
import { savePublishedInfo, loadPublishedInfo, clearSavedPortfolio } from '../services/storage';

export default function PreviewPortfolioPage({ portfolioData, setPortfolioData }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(
    portfolioData.templateId || 'modern-professional'
  );
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [publishedInfo, setPublishedInfo] = useState(() => loadPublishedInfo());
  const [isSavingOnline, setIsSavingOnline] = useState(false);
  const [syncStatus, setSyncStatus] = useState('saved');
  const [copied, setCopied] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Generate unique slug like: rahul-kumar-a82k91
  const generateSlug = () => {
    const raw = (portfolioData.personal?.fullName || 'portfolio')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const randomHex = Math.random().toString(36).substring(2, 8);
    return `${raw || 'portfolio'}-${randomHex}`;
  };

  // AUTOMATIC PERSISTENCE: Save to database and generate shareable link automatically
  useEffect(() => {
    let isCancelled = false;

    const autoSyncToDatabase = async () => {
      setIsSavingOnline(true);
      setSyncStatus('saving');

      try {
        let slug = publishedInfo?.slug;
        let ownerToken = publishedInfo?.ownerToken;

        if (!slug || !ownerToken) {
          slug = generateSlug();
          ownerToken = 'token_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
        const publicUrl = `${currentOrigin}/portfolio/${slug}`;

        await api.publishPortfolio({
          slug,
          title: `${portfolioData.personal?.fullName || 'Personal'} Portfolio`,
          data: portfolioData,
          templateId: selectedTemplate,
          ownerToken,
        });

        if (!isCancelled) {
          const updatedInfo = {
            slug,
            ownerToken,
            url: publicUrl,
            updatedAt: new Date().toISOString(),
          };
          setPublishedInfo(updatedInfo);
          savePublishedInfo(updatedInfo);
          setSyncStatus('saved');
        }
      } catch (err) {
        console.error('Automatic background sync to database failed:', err);
        if (!isCancelled) {
          setSyncStatus('fallback');
        }
      } finally {
        if (!isCancelled) {
          setIsSavingOnline(false);
        }
      }
    };

    autoSyncToDatabase();

    return () => {
      isCancelled = true;
    };
  }, [portfolioData, selectedTemplate]);

  // Sync template change to state and storage
  const handleTemplateChange = (tmplId) => {
    setSelectedTemplate(tmplId);
    setPortfolioData((prev) => ({ ...prev, templateId: tmplId }));
  };

  const handleDownloadAtsResume = () => {
    generateAtsResumePdf(portfolioData);
  };

  const handleDownloadPortfolioPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      await generatePortfolioPdf('portfolio-website-view', portfolioData.personal?.fullName || 'portfolio');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCopyLink = () => {
    if (!publishedInfo?.url) return;
    navigator.clipboard.writeText(publishedInfo.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleStartNew = () => {
    clearSavedPortfolio();
    window.location.href = '/create';
  };

  const shareText = encodeURIComponent(
    `Check out ${portfolioData.personal?.fullName || 'my'} personal portfolio website: ${publishedInfo?.url || ''}`
  );

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      {/* Top Floating Control & Sharing Toolbar */}
      <section className="bg-white border-b border-borderLight sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Template Selector dropdown / buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-accent" />
                <span>Template:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleTemplateChange(tmpl.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedTemplate === tmpl.id
                        ? 'bg-navy-900 text-white shadow-xs'
                        : 'bg-slate-100 text-textSecondary hover:bg-slate-200 hover:text-navy-900'
                    }`}
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/create')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-borderLight bg-white text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-accent" />
                <span>Edit Information</span>
              </button>

              {publishedInfo?.slug && (
                <a
                  href={`/portfolio/${publishedInfo.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-borderLight bg-white text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Globe className="w-3.5 h-3.5 text-accent" />
                  <span>Preview Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              <button
                type="button"
                onClick={handleDownloadPortfolioPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-2xs"
                title="Download selected website layout as A4 PDF"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>{isGeneratingPdf ? 'Generating...' : 'Portfolio PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAtsResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-2xs"
                title="Download single-column text-based ATS resume PDF"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>ATS Resume PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="p-2 rounded-lg border border-borderLight text-textSecondary hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Start New Portfolio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shareable Link Bar (AUTOMATICALLY GENERATED - NO PUBLISH BUTTON) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-borderLight shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Your Shareable Portfolio Website URL
              </span>
              {isSavingOnline && (
                <span className="text-[11px] text-textSecondary italic">
                  (syncing latest changes...)
                </span>
              )}
            </div>
            <span className="text-xs text-textSecondary">
              Anyone with this link can view your portfolio online without needing a login.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex-grow flex items-center px-4 py-2.5 rounded-xl bg-slate-50 border border-borderLight text-xs font-mono text-navy-900 select-all truncate">
              {publishedInfo?.url || 'Generating your unique shareable link...'}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-borderLight bg-white text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-accent" />}
                <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-2xs"
              >
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publishedInfo?.url || '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#004182] transition-colors shadow-2xs"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ACTUAL GENERATED PERSONAL PORTFOLIO WEBSITE PREVIEW */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl border border-borderLight shadow-md overflow-hidden">
          <div id="portfolio-website-view" className="w-full">
            <TemplateRenderer
              data={portfolioData}
              templateId={selectedTemplate}
              onDownloadResume={handleDownloadAtsResume}
            />
          </div>
        </div>
      </main>

      {/* Confirm Reset / Start New Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-borderLight">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-navy-900">Start New Portfolio?</h3>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">
              This will clear the current draft form inputs and start a fresh portfolio. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-lg border border-borderLight text-xs font-semibold text-textSecondary hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartNew}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm"
              >
                Clear & Start New
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
