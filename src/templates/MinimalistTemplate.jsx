import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, ArrowRight, Download, Calendar } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function MinimalistTemplate({ data, onDownloadResume }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="w-full bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* Minimalist Portfolio Website Navigation */}
      <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#hero" className="font-light tracking-tight text-xl text-black hover:opacity-70 transition-opacity">
            {personal?.fullName || 'Portfolio'}
          </a>

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-500 font-medium">
            {personal?.aboutMe && <a href="#about" className="hover:text-black transition-colors">About</a>}
            {hasProjects && <a href="#projects" className="hover:text-black transition-colors">Projects</a>}
            {hasSkills && <a href="#skills" className="hover:text-black transition-colors">Skills</a>}
            {hasExperience && <a href="#experience" className="hover:text-black transition-colors">Experience</a>}
            {hasEducation && <a href="#education" className="hover:text-black transition-colors">Education</a>}
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            {onDownloadResume && (
              <button
                type="button"
                onClick={onDownloadResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-800 hover:border-black transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-slate-800 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* MINIMALIST HERO SECTION */}
      <section id="hero" className="pt-20 pb-28 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
                Portfolio / {new Date().getFullYear()}
              </span>

              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-black leading-tight">
                {personal?.fullName || 'Your Name'}
              </h1>

              <p className="text-xl sm:text-2xl font-normal text-slate-600">
                {personal?.professionalTitle || 'Software Engineer & Developer'}
              </p>

              {personal?.location && (
                <p className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personal.location}</span>
                </p>
              )}

              {/* Minimal Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {hasProjects && (
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-slate-800 transition-colors"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-black text-xs uppercase tracking-wider font-medium hover:border-black transition-colors"
                >
                  <span>Get in Touch</span>
                </a>
                {onDownloadResume && (
                  <button
                    type="button"
                    onClick={onDownloadResume}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 text-slate-700 text-xs uppercase tracking-wider font-medium hover:border-black transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ATS Resume</span>
                  </button>
                )}
              </div>

              {/* Minimal Social Links */}
              <div className="flex items-center gap-6 pt-4 text-xs text-slate-500">
                {personal?.linkedinUrl && (
                  <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-black underline underline-offset-4">
                    LinkedIn
                  </a>
                )}
                {personal?.githubUrl && (
                  <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-black underline underline-offset-4">
                    GitHub
                  </a>
                )}
                {personal?.websiteUrl && (
                  <a href={personal.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-black underline underline-offset-4">
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* Profile Photo */}
            {personal?.profilePhoto && (
              <div className="shrink-0">
                <img
                  src={personal.profilePhoto}
                  alt={personal.fullName || 'Profile'}
                  className="w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover grayscale contrast-125 border border-slate-200"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      {personal?.aboutMe && (
        <section id="about" className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold sticky top-24">
                01 / About Me
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg text-slate-700 leading-relaxed font-light whitespace-pre-line text-justify">
                {personal.aboutMe}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS SECTION */}
      {hasProjects && (
        <section id="projects" className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                02 / Selected Projects
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {projects.length} {projects.length === 1 ? 'Work' : 'Works'}
              </span>
            </div>

            <div className="space-y-16">
              {projects.map((proj, idx) => (
                <div key={proj.id} className="border-b border-slate-100 pb-16 last:border-none space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-light text-black tracking-tight">
                      <span className="text-slate-400 text-sm font-mono mr-3">0{idx + 1}</span>
                      {proj.name}
                    </h3>

                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-black underline underline-offset-4 flex items-center gap-1"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-black underline underline-offset-4 flex items-center gap-1"
                        >
                          <span>Source Code</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.technologies && (
                    <p className="text-xs text-slate-400 font-mono">
                      // {proj.technologies}
                    </p>
                  )}

                  {proj.description && (
                    <p className="text-base text-slate-600 leading-relaxed max-w-3xl font-light whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SKILLS SECTION */}
      {hasSkills && (
        <section id="skills" className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold sticky top-24">
                03 / Expertise & Skills
              </span>
            </div>

            <div className="md:col-span-8 space-y-8">
              {skills?.technical && skills.technical.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-black font-semibold">
                    Technical Knowledge
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills?.languages && skills.languages.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs uppercase tracking-wider text-black font-semibold">
                    Languages
                  </h4>
                  <p className="text-sm text-slate-600 font-light">
                    {skills.languages.join(' • ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE SECTION */}
      {hasExperience && (
        <section id="experience" className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold sticky top-24">
                04 / Experience
              </span>
            </div>

            <div className="md:col-span-8 space-y-10">
              {experience.map((item) => (
                <div key={item.id} className="space-y-2 border-b border-slate-100 pb-8 last:border-none">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-lg font-normal text-black">
                      {item.role} <span className="text-slate-400 font-light">— {item.company}</span>
                    </h3>
                    {(item.startDate || item.endDate) && (
                      <span className="text-xs font-mono text-slate-400">
                        {item.startDate || ''} {item.startDate && item.endDate ? '–' : ''} {item.endDate || ''}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line pt-1">
                      {item.description}
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
        <section id="education" className="py-24 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold sticky top-24">
                05 / Education
              </span>
            </div>

            <div className="md:col-span-8 space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline border-b border-slate-100 pb-6 last:border-none">
                  <div className="space-y-1">
                    <h3 className="text-base font-normal text-black">{edu.institution}</h3>
                    <p className="text-sm text-slate-500 font-light">
                      {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                    </p>
                  </div>
                  <div className="text-right text-xs font-mono text-slate-400 space-y-0.5">
                    <p>{edu.startYear || ''} {edu.startYear && edu.endYear ? '–' : ''} {edu.endYear || ''}</p>
                    {edu.grade && <p className="text-black font-semibold font-sans">{edu.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS SECTION */}
      {hasCertifications && (
        <section id="certifications" className="py-20 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold sticky top-24">
                06 / Accreditations
              </span>
            </div>

            <div className="md:col-span-8 space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-sm text-slate-700">
                  <span className="font-normal text-black">
                    {cert.name} <span className="text-slate-400 font-light">({cert.organization})</span>
                  </span>
                  {cert.year && <span className="text-xs font-mono text-slate-400">{cert.year}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MINIMALIST CONTACT SECTION */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
              Contact
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-black tracking-tight">
              Get in Touch
            </h2>
            <p className="text-base text-slate-600 font-light max-w-lg">
              Feel free to reach out for software engineering discussions, internships, or questions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            {personal?.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-6 py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-slate-800 transition-colors"
              >
                Send Email ({personal.email})
              </a>
            )}
            {personal?.phone && (
              <a
                href={`tel:${personal.phone}`}
                className="px-6 py-3.5 rounded-full border border-slate-200 text-black text-xs uppercase tracking-wider font-medium hover:border-black transition-colors"
              >
                Call {personal.phone}
              </a>
            )}
            {personal?.linkedinUrl && (
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-slate-500 hover:text-black underline underline-offset-4"
              >
                LinkedIn
              </a>
            )}
            {personal?.githubUrl && (
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-slate-500 hover:text-black underline underline-offset-4"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-10 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {personal?.fullName || 'Personal Portfolio'}.</p>
          <a href="#hero" className="hover:text-black uppercase tracking-widest text-[11px]">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
