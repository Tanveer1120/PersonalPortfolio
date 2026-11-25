import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  // Hide nav on standalone public portfolio page for pure portfolio presentation
  const isPublicPage = location.pathname.startsWith('/portfolio/');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-borderLight shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center text-white font-bold group-hover:bg-navy-800 transition-colors shadow-sm">
            <Briefcase className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className="text-base font-bold text-navy-900 tracking-tight block leading-tight">
              Personal Portfolio
            </span>
            <span className="text-xs text-textSecondary font-medium block -mt-0.5">
              Website
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-accent' : 'text-textSecondary hover:text-navy-900'
            }`}
          >
            Home
          </Link>
          <a
            href="/#features"
            className="text-sm font-medium text-textSecondary hover:text-navy-900 transition-colors"
          >
            Features
          </a>
          {location.pathname !== '/create' && (
            <Link
              to="/preview"
              className="hidden sm:inline-block text-sm font-medium text-textSecondary hover:text-navy-900 transition-colors"
            >
              My Portfolio
            </Link>
          )}
          <Link
            to="/create"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-all shadow-sm hover:shadow"
          >
            <span>Create Portfolio</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
