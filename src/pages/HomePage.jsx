import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  Eye,
  FileCheck2,
  Share2,
  Download,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Code2,
  FileText
} from 'lucide-react';
import { TEMPLATES } from '../types/portfolio';

export default function HomePage() {
  const features = [
    {
      icon: Layers,
      title: 'Three Professional Templates',
      description: 'Choose from distinct, meticulously designed templates crafted specifically for tech, corporate, and creative disciplines.'
    },
    {
      icon: Sparkles,
      title: 'Easy Portfolio Creation',
      description: 'Streamlined 4-step creation wizard with intelligent category suggestions, dynamic field additions, and live validation.'
    },
    {
      icon: Eye,
      title: 'Live Portfolio Preview',
      description: 'Instant real-time document preview as you build and refine your portfolio details without losing any data.'
    },
    {
      icon: FileCheck2,
      title: 'ATS-Friendly Resume Download',
      description: 'Single-column, pure text-based PDF engineered specifically to pass Applicant Tracking Systems with 100% keyword fidelity.'
    },
    {
      icon: Share2,
      title: 'Shareable Portfolio Links',
      description: 'Get an automatic unique public URL with WhatsApp and LinkedIn one-click sharing.'
    },
    {
      icon: Download,
      title: 'Professional PDF Export',
      description: 'High-resolution, A4 multi-page document PDF export matching the exact visual styling of your chosen template.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-borderLight bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-accent text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Next-Gen Portfolio & Resume Builder
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Build Your Professional Portfolio in Minutes.
              </h1>

              <p className="text-lg text-textSecondary leading-relaxed max-w-2xl font-normal">
                Showcase your skills, education, projects, and experience with a professionally designed portfolio. Create, customize, and share your portfolio without coding.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/create"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-all shadow-md hover:shadow-lg"
                >
                  <span>Create My Portfolio</span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-borderLight bg-white text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                >
                  <span>Explore Features</span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-textSecondary font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  No Account or Credit Card Required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ATS-Compliant Document Engine
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Instant Live Public Hosting
                </span>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-xl shadow-xl border border-borderLight p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-borderLight pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-lg">
                      JD
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">John Doe</h4>
                      <p className="text-xs text-textSecondary">Full-Stack Software Engineer</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-blue-50 text-accent text-xs font-semibold">
                    Template: Modern
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-navy-800">
                    <Code2 className="w-3.5 h-3.5 text-accent" />
                    <span>Technical Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'Python'].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-textMain text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-navy-800">
                    <Briefcase className="w-3.5 h-3.5 text-accent" />
                    <span>Featured Project</span>
                  </div>
                  <div className="p-3 rounded-lg bg-bgLight border border-borderLight">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-900">Distributed Cloud Task Platform</span>
                      <span className="text-[10px] text-accent font-semibold">Live Preview</span>
                    </div>
                    <p className="text-[11px] text-textSecondary mt-1 line-clamp-2">
                      High-throughput microservices architecture processing real-time asynchronous background pipelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-borderLight text-xs">
                  <span className="text-textSecondary flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-navy-900" />
                    ATS Score: <strong className="text-emerald-600">98%</strong>
                  </span>
                  <Link to="/create" className="text-accent font-semibold hover:underline">
                    Build Yours &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent">
            Engineered For Excellence
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Comprehensive Toolkit for Students & Freshers
          </p>
          <p className="text-base text-textSecondary">
            Everything you need to create a recruiter-ready web portfolio and downloadable PDF resumes in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-borderLight shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-textSecondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="bg-white border-y border-borderLight py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-accent">
              Diverse Design Systems
            </h2>
            <h3 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Three Tailored Portfolio Templates
            </h3>
            <p className="text-sm text-textSecondary">
              Each template is crafted with distinct layouts, typography, and section styling to match your career direction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="rounded-xl border border-borderLight p-4 bg-bgLight hover:border-accent transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {tmpl.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-navy-900 mb-1.5">
                    {tmpl.name}
                  </h4>
                  <p className="text-xs text-textSecondary leading-normal">
                    {tmpl.description}
                  </p>
                </div>
                <Link
                  to="/create"
                  className="mt-4 block text-center py-2 px-3 rounded bg-white border border-borderLight text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors"
                >
                  Use Template
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 rounded-2xl p-8 sm:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to stand out to hiring managers?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                Create your complete portfolio and ATS resume in 4 simple steps. Download both PDFs immediately or share your automatically generated public website link.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-accent text-white font-semibold hover:bg-blue-600 transition-colors shadow-md"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
