import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function ModernProfessionalTemplate({ data }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="bg-white text-textMain max-w-4xl mx-auto p-8 sm:p-12 shadow-sm rounded-none border border-slate-200 print:border-none print:shadow-none print:p-0 print:max-w-none">
      {/* Header Profile Section */}
      <header className="border-b-2 border-navy-900 pb-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {personal?.profilePhoto && (
            <img
              src={personal.profilePhoto}
              alt={personal.fullName || 'Profile'}
              className="w-28 h-28 rounded-full object-cover border-2 border-navy-900 shadow-sm shrink-0"
            />
          )}
          <div className="flex-grow text-center sm:text-left space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              {personal?.fullName}
            </h1>
            <p className="text-lg font-semibold text-accent">
              {personal?.professionalTitle}
            </p>
            
            {/* Contact links / info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 pt-2 text-xs text-textSecondary font-medium">
              {personal?.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-navy-900" />
                  <a href={`mailto:${personal.email}`} className="hover:text-navy-900">{personal.email}</a>
                </span>
              )}
              {personal?.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-navy-900" />
                  <span>{personal.phone}</span>
                </span>
              )}
              {personal?.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-navy-900" />
                  <span>{personal.location}</span>
                </span>
              )}
              {personal?.linkedinUrl && (
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-navy-900" />
                  <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-navy-900">LinkedIn</a>
                </span>
              )}
              {personal?.githubUrl && (
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-navy-900" />
                  <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-navy-900">GitHub</a>
                </span>
              )}
              {personal?.websiteUrl && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-navy-900" />
                  <a href={personal.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-navy-900">Portfolio Website</a>
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Document Body */}
      <div className="space-y-8">
        {/* About Me / Summary */}
        {personal?.aboutMe && (
          <section className="space-y-3">
            <h2 className="text-base font-bold text-navy-900 uppercase tracking-wider border-b border-borderLight pb-1.5">
              Professional Summary
            </h2>
            <p className="text-sm text-textMain leading-relaxed whitespace-pre-line text-justify">
              {personal.aboutMe}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {hasExperience && (
          <section className="space-y-5">
            <h2 className="text-base font-bold text-navy-900 uppercase tracking-wider border-b border-borderLight pb-1.5">
              Work & Internship Experience
            </h2>
            <div className="space-y-5">
              {experience.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-base font-bold text-navy-900">{item.role}</h3>
                      <span className="text-sm font-semibold text-accent">@ {item.company}</span>
                    </div>
                    {(item.startDate || item.endDate) && (
                      <span className="text-xs font-medium text-textSecondary">
                        {item.startDate || ''} {item.startDate && item.endDate ? '–' : ''} {item.endDate || ''}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-textMain leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {hasProjects && (
          <section className="space-y-5">
            <h2 className="text-base font-bold text-navy-900 uppercase tracking-wider border-b border-borderLight pb-1.5">
              Key Projects
            </h2>
            <div className="space-y-5">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold text-navy-900">{proj.name}</h3>
                    <div className="flex items-center gap-3 text-xs font-semibold text-accent">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          <span>Repository</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && (
                    <p className="text-xs font-medium text-slate-500">
                      Technologies: <span className="text-textMain font-semibold">{proj.technologies}</span>
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-sm text-textMain leading-relaxed whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {hasEducation && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-navy-900 uppercase tracking-wider border-b border-borderLight pb-1.5">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold text-navy-900">{item.institution}</h3>
                    <p className="text-xs text-textSecondary font-medium">
                      {item.degree} {item.specialization ? `in ${item.specialization}` : ''}
                    </p>
                  </div>
                  <div className="sm:text-right text-xs text-textSecondary font-medium">
                    {(item.startYear || item.endYear) && (
                      <p>{item.startYear || ''} {item.startYear && item.endYear ? '–' : ''} {item.endYear || ''}</p>
                    )}
                    {item.grade && <p className="font-semibold text-navy-900">Grade: {item.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages */}
        {hasSkills && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-navy-900 uppercase tracking-wider border-b border-borderLight pb-1.5">
              Skills & Proficiencies
            </h2>
            <div className="space-y-3">
              {skills?.technical && skills.technical.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-bold text-navy-900 w-full sm:w-auto">Technical Skills:</span>
                  {skills.technical.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded bg-slate-100 text-xs font-medium text-navy-900"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {skills?.languages && skills.languages.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center pt-1">
                  <span className="text-xs font-bold text-navy-900 w-full sm:w-auto">Languages:</span>
                  {skills.languages.map((l) => (
                    <span
                      key={l}
                      className="px-2.5 py-1 rounded border border-borderLight text-xs font-medium text-textSecondary"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <section className="space-y-3">
            <h2 className="text-base font-bold text-navy-900 uppercase tracking-wider border-b border-borderLight pb-1.5">
              Certifications
            </h2>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-sm flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="font-bold text-navy-900">
                    {cert.name} <span className="font-normal text-textSecondary">— {cert.organization}</span>
                  </span>
                  {cert.year && (
                    <span className="text-xs text-textSecondary font-medium">{cert.year}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
