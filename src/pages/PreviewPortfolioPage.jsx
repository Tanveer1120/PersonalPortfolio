import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Edit3,
  Download,
  FileCheck2,
  Share2,
  Globe,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  ExternalLink,
  Layers,
  AlertTriangle,
  Send
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
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
      await generatePortfolioPdf('portfolio-preview-document', portfolioData.personal?.fullName || 'portfolio');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Generate unique slug like: john-doe-a82k91
  const generateSlug = () => {
    const raw = (portfolioData.personal?.fullName || 'portfolio')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const randomHex = Math.random().toString(36).substring(2, 8);
    return `${raw || 'portfolio'}-${randomHex}`;
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishMessage('');
    try {
      let slug = publishedInfo?.slug;
      let ownerToken = publishedInfo?.ownerToken;

      if (!slug || !ownerToken) {
        slug = generateSlug();
        ownerToken = 'token_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      }

      await api.publishPortfolio({
        slug,
        title: `${portfolioData.personal?.fullName || 'Candidate'}'s Portfolio`,
        data: portfolioData,
        templateId: selectedTemplate,
        ownerToken,
      });

      const newInfo = {
        slug,
        ownerToken,
        publishedAt: new Date().toISOString(),
        url: `${window.location.origin}/portfolio/${slug}`,
      };

      setPublishedInfo(newInfo);
      savePublishedInfo(newInfo);
      setPublishMessage('Portfolio is live and accessible online!');
    } catch (err) {
      console.error('Publish error:', err);
      setPublishMessage('Publish error: ' + (err.message || 'Could not connect to server'));
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!publishedInfo?.slug || !publishedInfo?.ownerToken) return;
    try {
      await api.unpublishPortfolio(publishedInfo.slug, publishedInfo.ownerToken);
      const updated = { ...publishedInfo, isUnpublished: true };
      setPublishedInfo(updated);
      savePublishedInfo(updated);
      setPublishMessage('Portfolio is now unpublished and hidden from the public.');
    } catch (err) {
      setPublishMessage('Failed to unpublish: ' + err.message);
    }
  };

  const handleDeletePublished = async () => {
    if (!publishedInfo?.slug || !publishedInfo?.ownerToken) return;
    try {
      await api.deletePortfolio(publishedInfo.slug, publishedInfo.ownerToken);
      setPublishedInfo(null);
      savePublishedInfo(null);
      setShowConfirmDelete(false);
      setPublishMessage('Published portfolio permanently deleted.');
    } catch (err) {
      setPublishMessage('Failed to delete: ' + err.message);
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
    `Check out ${portfolioData.personal?.fullName || 'my'} professional portfolio: ${publishedInfo?.url || ''}`
  );

  return (
    <div className="min-h-screen bg-slate-100/70 pb-24">
      {/* Top Action & Control Bar */}
      <section className="bg-white border-b border-borderLight sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Template Selector dropdown / pills */}
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

              <button
                type="button"
                onClick={handleDownloadPortfolioPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-2xs"
                title="Download selected template as high-res A4 PDF"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>{isGeneratingPdf ? 'Generating PDF...' : 'Portfolio PDF'}</span>
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
                onClick={handlePublish}
                disabled={isPublishing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-sm"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isPublishing ? 'Publishing...' : publishedInfo ? 'Update Online' : 'Publish Online'}</span>
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

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Published Share Box if active */}
        {publishedInfo && !publishedInfo.isUnpublished && (
          <div className="bg-white rounded-xl p-5 border-2 border-emerald-500/50 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Portfolio Is Live Online
                </span>
                <p className="text-xs text-textSecondary">
                  Anyone can view your portfolio using this permanent unique URL without needing a login.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleUnpublish}
                  className="px-3 py-1.5 rounded-lg border border-borderLight text-xs font-semibold text-textSecondary hover:bg-slate-50 transition-colors"
                >
                  Unpublish
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(true)}
                  className="px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* URL bar & Share buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <div className="flex-grow flex items-center px-3.5 py-2 rounded-lg bg-bgLight border border-borderLight text-xs font-mono text-navy-900 select-all truncate">
                {publishedInfo.url}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-borderLight bg-white text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                </button>

                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publishedInfo.url)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#004182] transition-colors"
                >
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`/portfolio/${publishedInfo.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {publishMessage && (
              <p className="text-xs text-emerald-600 font-medium">{publishMessage}</p>
            )}
          </div>
        )}

        {/* Live Document Preview Container */}
        <div className="flex justify-center">
          <div
            id="portfolio-preview-document"
            className="w-full max-w-4xl transition-all duration-300"
          >
            <TemplateRenderer data={portfolioData} templateId={selectedTemplate} />
          </div>
        </div>
      </div>

      {/* Confirm Reset / Start New Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-borderLight">
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

      {/* Confirm Delete Published Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-borderLight">
            <div className="flex items-center gap-3 text-rose-600">
              <Trash2 className="w-6 h-6" />
              <h3 className="text-base font-bold text-navy-900">Delete Published Portfolio?</h3>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">
              This will permanently delete this published portfolio and its public URL will stop working immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 rounded-lg border border-borderLight text-xs font-semibold text-textSecondary hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeletePublished}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
