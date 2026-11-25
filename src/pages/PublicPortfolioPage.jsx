import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import TemplateRenderer from '../templates/TemplateRenderer';
import { Download, FileCheck2, ArrowLeft, AlertCircle, Copy, Check } from 'lucide-react';
import { generateAtsResumePdf } from '../pdf/generateAtsPdf';
import { generatePortfolioPdf } from '../pdf/generatePortfolioPdf';

export default function PublicPortfolioPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [portfolioRecord, setPortfolioRecord] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await api.getPortfolio(slug);
        if (!result) {
          setError('This portfolio does not exist or has been removed.');
        } else {
          setPortfolioRecord(result);
        }
      } catch (err) {
        console.error('Error fetching public portfolio:', err);
        setError('Unable to load portfolio. Please check the link or try again.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPortfolio();
    }
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-navy-900 border-t-accent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-textSecondary font-medium">Loading portfolio website...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioRecord) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-borderLight p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Portfolio Not Found</h2>
          <p className="text-sm text-textSecondary leading-relaxed">{error}</p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { data, template_id } = portfolioRecord;

  const handleDownloadAtsResume = () => {
    generateAtsResumePdf(data);
  };

  return (
    <div className="min-h-screen bg-slate-100/50 pb-16">
      {/* Top Floating Utility Bar for Visitors/Recruiters */}
      <div className="bg-white/95 backdrop-blur-md border-b border-borderLight py-2.5 px-4 sm:px-8 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-navy-900">
              {data.personal?.fullName}&apos;s Official Portfolio Website
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-borderLight bg-white text-xs font-semibold text-textSecondary hover:text-navy-900 hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={() => generatePortfolioPdf('public-portfolio-website', data.personal?.fullName)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-accent" />
              <span>Portfolio PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadAtsResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-2xs"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>ATS Resume</span>
            </button>

            <Link
              to="/create"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-borderLight bg-blue-50 text-accent text-xs font-semibold hover:bg-blue-100 transition-colors"
            >
              <span>Build Yours</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Full Personal Portfolio Website */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-3xl border border-borderLight shadow-md overflow-hidden">
          <div id="public-portfolio-website" className="w-full">
            <TemplateRenderer
              data={data}
              templateId={template_id}
              onDownloadResume={handleDownloadAtsResume}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
