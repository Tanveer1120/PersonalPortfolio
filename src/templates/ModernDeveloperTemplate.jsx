import React from 'react';
import { Terminal, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function ModernDeveloperTemplate({ data }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="bg-slate-900 text-slate-100 max-w-4xl mx-auto shadow-xl rounded-none border border-slate-800 print:shadow-none print:border-none print:max-w-none print:bg-white print:text-black">
      {/* Dev Terminal Bar */}
      <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-slate-300 ml-2">developer@portfolio:~</span>
        </div>
        <span className="font-mono text-accent">git:(main)</span>
      </div>

      <div className="p-8 sm:p-12 space-y-10">
        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold block">
                &gt; const engineer = &#123;
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                {personal?.fullName}
              </h1>
              <p className="text-base text-slate-300 font-mono">
                {personal?.professionalTitle}
              </p>
              <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold block">
                &#125;;
              </span>
            </div>

            {personal?.profilePhoto && (
              <img
                src={personal.profilePhoto}
                alt={personal.fullName || 'Profile'}
                className="w-24 h-24 rounded-lg object-cover border-2 border-accent shadow-md shrink-0"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs font-mono text-slate-300">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>• {personal.phone}</span>}
            {personal?.location && <span>• {personal.location}</span>}
            {personal?.githubUrl && (
              <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                [GitHub]
              </a>
            )}
            {personal?.linkedinUrl && (
              <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                [LinkedIn]
              </a>
            )}
            {personal?.websiteUrl && (
              <a href={personal.websiteUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                [Website]
              </a>
            )}
          </div>
        </header>

        {/* Technical Stack Pills Highlight */}
        {hasSkills && skills?.technical && skills.technical.length > 0 && (
          <section className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-3 print:bg-slate-50 print:border-slate-200">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>// Stack & Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-slate-200 border border-slate-700 print:bg-white print:text-black print:border-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
            {skills?.languages && skills.languages.length > 0 && (
              <div className="pt-2 text-xs font-mono text-slate-400">
                <span className="text-slate-300">Natural Languages: </span>
                {skills.languages.join(', ')}
              </div>
            )}
          </section>
        )}

        {/* Bio */}
        {personal?.aboutMe && (
          <section className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              // README.md
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line print:text-slate-800">
              {personal.aboutMe}
            </p>
          </section>
        )}

        {/* Featured Projects (Prominent in Developer template) */}
        {hasProjects && (
          <section className="space-y-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              // Repositories & Implementations
            </h2>
            <div className="space-y-5">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-950/70 p-5 rounded-lg border border-slate-800 space-y-2.5 print:bg-white print:border-slate-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold text-white font-mono print:text-black">
                      {proj.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-mono font-semibold text-accent">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                          <span>deploy</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                          <span>repo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && (
                    <p className="text-xs font-mono text-accent/90">
                      stack: [{proj.technologies}]
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line print:text-slate-800">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {hasExperience && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              // Work History
            </h2>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono print:text-black">{item.role}</h3>
                      <p className="text-xs font-mono text-accent">@ {item.company}</p>
                    </div>
                    {(item.startDate || item.endDate) && (
                      <span className="text-xs font-mono text-slate-400">
                        {item.startDate || ''} {item.startDate && item.endDate ? '–' : ''} {item.endDate || ''}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line print:text-slate-800">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasEducation && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              // Education
            </h2>
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <h3 className="font-bold text-white font-mono print:text-black">{item.institution}</h3>
                    <p className="text-slate-400 font-mono">
                      {item.degree} {item.specialization ? `(${item.specialization})` : ''}
                    </p>
                  </div>
                  <div className="sm:text-right text-slate-400 font-mono">
                    <p>{item.startYear || ''} {item.startYear && item.endYear ? '–' : ''} {item.endYear || ''}</p>
                    {item.grade && <p className="text-accent">{item.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <section className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              // Verified Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-xs font-mono text-slate-300 print:text-slate-800">
                  <span>{cert.name} — <span className="text-slate-500">{cert.organization}</span></span>
                  {cert.year && <span className="text-accent">{cert.year}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
