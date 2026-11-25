import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  ArrowRight,
  Download,
  Calendar,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Send,
  User
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function ModernProfessionalTemplate({ data, onDownloadResume }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="w-full bg-white text-textMain font-sans antialiased selection:bg-accent selection:text-white">
      {/* Portfolio Personal Website Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-borderLight shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="font-extrabold text-lg text-navy-900 tracking-tight hover:text-accent transition-colors">
            {personal?.fullName || 'Portfolio'}
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-textSecondary">
            {personal?.aboutMe && <a href="#about" className="hover:text-navy-900 transition-colors">About</a>}
            {hasSkills && <a href="#skills" className="hover:text-navy-900 transition-colors">Skills</a>}
            {hasProjects && <a href="#projects" className="hover:text-navy-900 transition-colors">Projects</a>}
            {hasExperience && <a href="#experience" className="hover:text-navy-900 transition-colors">Experience</a>}
            {hasEducation && <a href="#education" className="hover:text-navy-900 transition-colors">Education</a>}
            <a href="#contact" className="hover:text-navy-900 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            {onDownloadResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-borderLight text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Resume</span>
              </button>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-all shadow-xs"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-borderLight bg-gradient-to-b from-slate-50/80 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-accent text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Available for Opportunities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-tight">
                {personal?.fullName || 'Your Name'}
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-accent">
                {personal?.professionalTitle || 'Professional Title'}
              </p>

              {personal?.location && (
                <p className="text-sm text-textSecondary flex items-center justify-center lg:justify-start gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-navy-900 shrink-0" />
                  <span>{personal.location}</span>
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                {hasProjects && (
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-all shadow-sm"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </a>
                )}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-borderLight bg-white text-navy-900 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span>Contact Me</span>
                </a>
                {onDownloadResume && (
                  <button
                    type="button"
                    onClick={onDownloadResume}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download ATS Resume</span>
                  </button>
                )}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                {personal?.linkedinUrl && (
                  <a
                    href={personal.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-textSecondary hover:text-navy-900 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personal?.githubUrl && (
                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-textSecondary hover:text-navy-900 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-navy-900" />
                    <span>GitHub</span>
                  </a>
                )}
                {personal?.websiteUrl && (
                  <a
                    href={personal.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-textSecondary hover:text-navy-900 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-accent" />
                    <span>Personal Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Profile Photo */}
            <div className="lg:col-span-4 flex justify-center">
              {personal?.profilePhoto ? (
                <div className="relative">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-4 ring-navy-900/10">
                    <img
                      src={personal.profilePhoto}
                      alt={personal.fullName || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl bg-gradient-to-tr from-navy-900 to-navy-800 text-white flex flex-col items-center justify-center shadow-xl p-6 text-center">
                  <User className="w-16 h-16 text-accent mb-2" />
                  <span className="font-extrabold text-2xl tracking-tight">
                    {personal?.fullName ? personal.fullName.split(' ').map(n => n[0]).join('') : 'PK'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      {personal?.aboutMe && (
        <section id="about" className="py-20 border-b border-borderLight bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Overview
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                About Me
              </h2>
            </div>

            <div className="prose max-w-none text-base text-textMain leading-relaxed whitespace-pre-line text-justify">
              <p>{personal.aboutMe}</p>
            </div>
          </div>
        </section>
      )}

      {/* TECHNICAL SKILLS & LANGUAGES SECTION */}
      {hasSkills && (
        <section id="skills" className="py-20 border-b border-borderLight bg-slate-50/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Proficiencies
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                Skills & Technologies
              </h2>
              <p className="text-sm text-textSecondary">
                Core technologies, programming languages, databases, and toolkits I work with.
              </p>
            </div>

            <div className="space-y-6">
              {skills?.technical && skills.technical.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-borderLight shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-navy-900 font-bold text-base">
                    <Code2 className="w-5 h-5 text-accent" />
                    <span>Technical Proficiencies</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.technical.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-navy-900 text-sm font-semibold border border-slate-200 hover:border-accent hover:bg-blue-50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills?.languages && skills.languages.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-borderLight shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-navy-900 font-bold text-base">
                    <Globe className="w-5 h-5 text-accent" />
                    <span>Languages Spoken</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 rounded-md bg-white border border-borderLight text-xs font-medium text-textSecondary"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PROJECTS SECTION */}
      {hasProjects && (
        <section id="projects" className="py-20 border-b border-borderLight bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                Featured Projects
              </h2>
              <p className="text-sm text-textSecondary">
                Software solutions, web applications, and technical systems I have built.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-borderLight p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-borderLight pb-4">
                    <h3 className="text-xl font-bold text-navy-900">{proj.name}</h3>
                    <div className="flex items-center gap-3 shrink-0">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-2xs"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-accent" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-borderLight bg-white text-navy-900 text-xs font-semibold hover:bg-slate-50 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-navy-900" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.technologies && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-bold text-slate-500 mr-1">Stack:</span>
                      {proj.technologies.split(',').map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded bg-blue-50 text-accent text-xs font-semibold"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {proj.description && (
                    <p className="text-sm text-textMain leading-relaxed whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WORK & INTERNSHIP EXPERIENCE SECTION */}
      {hasExperience && (
        <section id="experience" className="py-20 border-b border-borderLight bg-slate-50/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Career History
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                Work & Internship Experience
              </h2>
            </div>

            <div className="space-y-6">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white rounded-2xl border border-borderLight p-6 sm:p-8 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">{exp.role}</h3>
                      <p className="text-sm font-semibold text-accent">@ {exp.company}</p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs font-semibold text-textSecondary flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {exp.startDate || ''} {exp.startDate && exp.endDate ? '–' : ''} {exp.endDate || ''}
                        </span>
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-sm text-textMain leading-relaxed whitespace-pre-line pt-1">
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
        <section id="education" className="py-20 border-b border-borderLight bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Academics
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                Education
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-slate-50/70 p-6 rounded-2xl border border-borderLight shadow-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-navy-900">{edu.institution}</h3>
                    {edu.grade && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-accent text-xs font-bold shrink-0">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-accent">
                    {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                  </p>
                  {(edu.startYear || edu.endYear) && (
                    <p className="text-xs text-textSecondary font-medium">
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
        <section id="certifications" className="py-16 border-b border-borderLight bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Accreditations
              </span>
              <h2 className="text-2xl font-extrabold text-navy-900 tracking-tight">
                Certifications & Licenses
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 rounded-xl bg-white border border-borderLight shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-navy-900 font-bold text-sm">
                    <Award className="w-4 h-4 text-accent shrink-0" />
                    <span className="truncate">{cert.name}</span>
                  </div>
                  <p className="text-xs text-textSecondary">
                    {cert.organization} {cert.year ? `• ${cert.year}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                Get in Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Let&apos;s Connect & Collaborate
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                I am open to software development internships, full-time engineering roles, and innovative technical collaborations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {personal?.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="p-4 rounded-xl bg-navy-800/80 border border-navy-700 hover:border-accent transition-colors flex items-center gap-3 text-sm font-semibold text-white"
                >
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span className="truncate">{personal.email}</span>
                </a>
              )}
              {personal?.phone && (
                <a
                  href={`tel:${personal.phone}`}
                  className="p-4 rounded-xl bg-navy-800/80 border border-navy-700 hover:border-accent transition-colors flex items-center gap-3 text-sm font-semibold text-white"
                >
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span>{personal.phone}</span>
                </a>
              )}
              {personal?.location && (
                <div className="p-4 rounded-xl bg-navy-800/80 border border-navy-700 flex items-center gap-3 text-sm font-semibold text-white">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>{personal.location}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-navy-800">
              {personal?.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-accent" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {personal?.githubUrl && (
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-accent" />
                  <span>GitHub Repositories</span>
                </a>
              )}
              {personal?.websiteUrl && (
                <a
                  href={personal.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Portfolio Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO WEBSITE FOOTER */}
      <footer className="border-t border-borderLight py-8 bg-slate-50 text-center text-xs text-textSecondary">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {personal?.fullName || 'Personal Portfolio'}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-navy-900 transition-colors">Back to Top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
