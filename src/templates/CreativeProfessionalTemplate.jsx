import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function CreativeProfessionalTemplate({ data }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="bg-white text-textMain max-w-4xl mx-auto p-8 sm:p-12 shadow-sm rounded-none border-l-4 border-l-accent border-r border-t border-b border-borderLight print:shadow-none print:border-none print:max-w-none">
      {/* Asymmetric Header Layout */}
      <header className="mb-10 pb-8 border-b border-borderLight">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-accent">
              Professional Portfolio
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
              {personal?.fullName}
            </h1>
            <p className="text-lg font-medium text-textSecondary">
              {personal?.professionalTitle}
            </p>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            {personal?.profilePhoto && (
              <img
                src={personal.profilePhoto}
                alt={personal.fullName || 'Profile'}
                className="w-28 h-28 rounded-2xl object-cover shadow-lg border-2 border-white ring-2 ring-accent/30"
              />
            )}
          </div>
        </div>

        {/* Contact Badges */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 pt-4 border-t border-borderLight text-xs font-medium text-textSecondary">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>• {personal.phone}</span>}
          {personal?.location && <span>• {personal.location}</span>}
          {personal?.linkedinUrl && (
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              LinkedIn
            </a>
          )}
          {personal?.githubUrl && (
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              GitHub
            </a>
          )}
          {personal?.websiteUrl && (
            <a href={personal.websiteUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              Website
            </a>
          )}
        </div>
      </header>

      {/* Asymmetric 2-Column Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Narrative, Experience, Projects */}
        <div className="md:col-span-8 space-y-8">
          {personal?.aboutMe && (
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                About & Vision
              </h2>
              <p className="text-sm text-textMain leading-relaxed whitespace-pre-line text-justify">
                {personal.aboutMe}
              </p>
            </section>
          )}

          {hasExperience && (
            <section className="space-y-5">
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Experience & Roles
              </h2>
              <div className="space-y-5">
                {experience.map((item) => (
                  <div key={item.id} className="relative pl-4 border-l-2 border-slate-200 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-navy-900">{item.role}</h3>
                      {(item.startDate || item.endDate) && (
                        <span className="text-xs font-semibold text-textSecondary">
                          {item.startDate || ''} {item.startDate && item.endDate ? '–' : ''} {item.endDate || ''}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-accent">{item.company}</p>
                    {item.description && (
                      <p className="text-xs text-textMain leading-relaxed whitespace-pre-line pt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasProjects && (
            <section className="space-y-5">
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Selected Works
              </h2>
              <div className="space-y-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="relative pl-4 border-l-2 border-slate-200 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-navy-900">{proj.name}</h3>
                      <div className="flex items-center gap-3 text-xs font-semibold text-accent">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                            <span>Code</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.technologies && (
                      <p className="text-xs font-medium text-slate-500">
                        {proj.technologies}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-xs text-textMain leading-relaxed whitespace-pre-line">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Rail: Skills, Education, Certifications */}
        <div className="md:col-span-4 space-y-8 bg-slate-50/70 p-5 rounded-xl border border-borderLight print:bg-transparent print:border-none print:p-0">
          {hasSkills && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Skills & Toolkit
              </h2>
              {skills?.technical && skills.technical.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {skills.technical.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded bg-white border border-borderLight text-xs font-semibold text-navy-900 shadow-2xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {skills?.languages && skills.languages.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-textSecondary uppercase tracking-wider block mb-1">
                    Languages
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {skills.languages.map((l) => (
                      <span key={l} className="text-xs text-textMain font-medium">
                        {l} •
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {hasEducation && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <h3 className="text-xs font-bold text-navy-900">{item.institution}</h3>
                    <p className="text-xs text-textSecondary">
                      {item.degree} {item.specialization ? `in ${item.specialization}` : ''}
                    </p>
                    {(item.startYear || item.endYear) && (
                      <p className="text-[11px] text-slate-400">
                        {item.startYear || ''} {item.startYear && item.endYear ? '–' : ''} {item.endYear || ''}
                      </p>
                    )}
                    {item.grade && (
                      <p className="text-[11px] font-semibold text-accent">{item.grade}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasCertifications && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="space-y-0.5 text-xs">
                    <h3 className="font-bold text-navy-900">{cert.name}</h3>
                    <p className="text-[11px] text-textSecondary">
                      {cert.organization} {cert.year ? `(${cert.year})` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
