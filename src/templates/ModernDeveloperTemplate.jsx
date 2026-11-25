import React from 'react';
import {
  Terminal,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  Download,
  Code2,
  FolderGit2,
  Calendar,
  GitBranch,
  Award
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function ModernDeveloperTemplate({ data, onDownloadResume }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="w-full bg-[#0B0F19] text-slate-200 font-sans antialiased selection:bg-accent selection:text-white">
      {/* Dev Command Nav Bar */}
      <nav className="sticky top-0 z-20 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-mono text-sm font-bold text-white hover:text-accent transition-colors">
            <span className="text-accent">&gt;</span>
            <span>{personal?.fullName ? personal.fullName.toLowerCase().replace(/\s+/g, '_') : 'developer'}</span>
            <span className="text-slate-500 font-normal">.dev</span>
          </a>

          <div className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
            {personal?.aboutMe && <a href="#about" className="hover:text-accent transition-colors">// about</a>}
            {hasSkills && <a href="#skills" className="hover:text-accent transition-colors">// stack</a>}
            {hasProjects && <a href="#projects" className="hover:text-accent transition-colors">// projects</a>}
            {hasExperience && <a href="#experience" className="hover:text-accent transition-colors">// experience</a>}
            {hasEducation && <a href="#education" className="hover:text-accent transition-colors">// education</a>}
            <a href="#contact" className="hover:text-accent transition-colors">// contact</a>
          </div>

          <div className="flex items-center gap-3">
            {onDownloadResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 hover:border-accent transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>resume.pdf</span>
              </button>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-accent text-white font-mono text-xs font-semibold hover:bg-blue-600 transition-colors shadow-xs"
            >
              <span>contact_me()</span>
            </a>
          </div>
        </div>
      </nav>

      {/* DEVELOPER HERO SECTION */}
      <section id="hero" className="relative overflow-hidden pt-16 pb-24 border-b border-slate-800 bg-gradient-to-b from-[#0F172A] to-[#0B0F19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Terminal status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>status: open_for_work</span>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-sm text-accent tracking-wide">
                  const engineer = &quot;{personal?.professionalTitle || 'Software Engineer'}&quot;;
                </p>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-mono leading-tight">
                  {personal?.fullName || 'Developer Name'}
                </h1>
              </div>

              {personal?.location && (
                <p className="text-sm font-mono text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>location: &quot;{personal.location}&quot;</span>
                </p>
              )}

              {/* Developer Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {hasProjects && (
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-white font-mono text-xs font-semibold hover:bg-blue-600 transition-colors shadow-md"
                  >
                    <span>git checkout projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs font-semibold hover:border-slate-500 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span>init contact</span>
                </a>
                {onDownloadResume && (
                  <button
                    type="button"
                    onClick={onDownloadResume}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 font-mono text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ats_resume.pdf</span>
                  </button>
                )}
              </div>

              {/* Developer Social Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
                {personal?.githubUrl && (
                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-accent" />
                    <span>github.com</span>
                  </a>
                )}
                {personal?.linkedinUrl && (
                  <a
                    href={personal.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                    <span>linkedin.com</span>
                  </a>
                )}
                {personal?.websiteUrl && (
                  <a
                    href={personal.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-accent" />
                    <span>website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Profile Photo with Dev terminal styling */}
            <div className="lg:col-span-4 flex justify-center">
              {personal?.profilePhoto ? (
                <div className="relative">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl ring-2 ring-accent/30">
                    <img
                      src={personal.profilePhoto}
                      alt={personal.fullName || 'Developer Profile'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-56 h-56 rounded-2xl bg-slate-900 border-2 border-slate-800 p-6 flex flex-col justify-between font-mono text-xs">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="space-y-1 text-slate-400">
                    <p className="text-accent">&gt; whoami</p>
                    <p className="text-white font-bold">{personal?.fullName || 'developer'}</p>
                    <p className="text-slate-500">{personal?.professionalTitle}</p>
                  </div>
                  <p className="text-[10px] text-emerald-400">$ ready_to_build</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME / README.MD SECTION */}
      {personal?.aboutMe && (
        <section id="about" className="py-20 border-b border-slate-800 bg-[#0B0F19]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>// README.md</span>
            </div>

            <div className="bg-[#0F172A] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-2xl font-bold font-mono text-white tracking-tight">
                About & Engineering Background
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-sans whitespace-pre-line text-justify">
                {personal.aboutMe}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TECHNICAL STACK & SKILLS SECTION */}
      {hasSkills && (
        <section id="skills" className="py-20 border-b border-slate-800 bg-[#090D16]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>// Tech Stack & Tooling</span>
              </div>
              <h2 className="text-3xl font-bold font-mono text-white tracking-tight">
                Technical Capabilities
              </h2>
            </div>

            <div className="space-y-6">
              {skills?.technical && skills.technical.length > 0 && (
                <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 space-y-4">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">
                    Core Technologies & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.technical.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs font-medium hover:border-accent hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills?.languages && skills.languages.length > 0 && (
                <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <span className="text-slate-400 uppercase tracking-wider block">
                    Natural Spoken Languages
                  </span>
                  <div className="flex flex-wrap gap-2 text-slate-300">
                    {skills.languages.map((l) => (
                      <span key={l} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS SECTION */}
      {hasProjects && (
        <section id="projects" className="py-20 border-b border-slate-800 bg-[#0B0F19]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
                <FolderGit2 className="w-4 h-4" />
                <span>// Production Builds</span>
              </div>
              <h2 className="text-3xl font-bold font-mono text-white tracking-tight">
                Featured Repositories & Systems
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#0F172A] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                        <span className="text-accent">&gt;</span>
                        <span>{proj.name}</span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-accent text-white font-semibold hover:bg-blue-600 transition-colors"
                        >
                          <span>deploy</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-accent" />
                          <span>repo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.technologies && (
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-accent/90">
                      <span className="text-slate-500">stack:</span>
                      {proj.technologies.split(',').map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {proj.description && (
                    <p className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE SECTION */}
      {hasExperience && (
        <section id="experience" className="py-20 border-b border-slate-800 bg-[#090D16]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
                <GitBranch className="w-4 h-4" />
                <span>// Commit Log & Career</span>
              </div>
              <h2 className="text-3xl font-bold font-mono text-white tracking-tight">
                Work & Internship Experience
              </h2>
            </div>

            <div className="space-y-6">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-[#0F172A] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-3 font-mono"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-sm text-accent">@ {exp.company}</p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>
                          {exp.startDate || ''} {exp.startDate && exp.endDate ? '–' : ''} {exp.endDate || ''}
                        </span>
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line pt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION SECTION */}
      {hasEducation && (
        <section id="education" className="py-20 border-b border-slate-800 bg-[#0B0F19]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>// Credentials</span>
              </div>
              <h2 className="text-3xl font-bold font-mono text-white tracking-tight">
                Education
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white">{edu.institution}</h3>
                    {edu.grade && (
                      <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-bold shrink-0">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-accent">
                    {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                  </p>
                  {(edu.startYear || edu.endYear) && (
                    <p className="text-xs text-slate-400">
                      {edu.startYear || ''} {edu.startYear && edu.endYear ? '–' : ''} {edu.endYear || ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS SECTION */}
      {hasCertifications && (
        <section id="certifications" className="py-16 border-b border-slate-800 bg-[#090D16]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>// Verified Certifications</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white">{cert.name}</h4>
                  <p className="text-slate-400">{cert.organization} {cert.year ? `• ${cert.year}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEVELOPER CONTACT SECTION */}
      <section id="contact" className="py-20 bg-[#0B0F19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 font-mono">
            <span className="text-xs text-accent uppercase tracking-wider block">
              // Connection Stream
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Initialize Connection
            </h2>
            <p className="text-sm text-slate-400 max-w-xl font-sans">
              Always eager to discuss backend architecture, full-stack systems, internship roles, and software engineering positions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {personal?.email && (
              <a
                href={`mailto:${personal.email}`}
                className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 hover:border-accent transition-colors flex items-center gap-3 text-white"
              >
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="truncate">{personal.email}</span>
              </a>
            )}
            {personal?.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 hover:border-accent transition-colors flex items-center gap-3 text-white"
              >
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>{personal.phone}</span>
              </a>
            )}
            {personal?.location && (
              <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            {personal?.githubUrl && (
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#0F172A] border border-slate-800 text-slate-200 hover:text-white hover:border-accent transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-accent" />
                <span>github.com</span>
              </a>
            )}
            {personal?.linkedinUrl && (
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#0F172A] border border-slate-800 text-slate-200 hover:text-white hover:border-accent transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                <span>linkedin.com</span>
              </a>
            )}
            {personal?.websiteUrl && (
              <a
                href={personal.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#0F172A] border border-slate-800 text-slate-200 hover:text-white hover:border-accent transition-colors"
              >
                <Globe className="w-4 h-4 text-accent" />
                <span>website</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* DEV FOOTER */}
      <footer className="border-t border-slate-800 py-8 bg-[#070A11] text-center font-mono text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {personal?.fullName || 'Developer'}. All rights reserved.</p>
          <a href="#hero" className="hover:text-accent transition-colors">
            scroll_to_top() ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
