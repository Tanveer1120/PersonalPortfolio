import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Shield, FileCheck, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white border-t border-navy-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-accent">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Personal Portfolio Website
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Build, customize, and share professional portfolios and ATS-friendly resumes in minutes. Designed specifically for students, freshers, and professionals.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Templates & Outputs
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Modern Professional</li>
              <li>Minimalist</li>
              <li>Modern Developer</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Key Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-accent" />
                <span>ATS-Friendly Resume</span>
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-accent" />
                <span>Shareable Public Links</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>A4 Portfolio PDF Export</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Personal Portfolio Website. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/create" className="hover:text-white transition-colors">Create Portfolio</Link>
            <Link to="/preview" className="hover:text-white transition-colors">Preview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
