import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function MinimalistTemplate({ data }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="bg-white text-textMain max-w-4xl mx-auto p-10 sm:p-14 shadow-sm rounded-none print:shadow-none print:p-0 print:max-w-none">
      {/* Header with generous whitespace */}
      <header className="mb-12 pb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              {personal?.fullName}
            </h1>
            <p className="text-base font-normal text-slate-500 mt-1">
              {personal?.professionalTitle}
            </p>
          </div>
          {personal?.profilePhoto && (
            <img
              src={personal.profilePhoto}
              alt={personal.fullName || 'Profile'}
              className="w-20 h-20 rounded-full object-cover grayscale contrast-125 border border-slate-200 shrink-0"
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-slate-500">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.location && <span>{personal.location}</span>}
          {personal?.linkedinUrl && (
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="underline hover:text-black">LinkedIn</a>
          )}
          {personal?.githubUrl && (
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="underline hover:text-black">GitHub</a>
          )}
          {personal?.websiteUrl && (
            <a href={personal.websiteUrl} target="_blank" rel="noreferrer" className="underline hover:text-black">Website</a>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="space-y-12">
        {personal?.aboutMe && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              About
            </h2>
            <div className="md:col-span-3">
              <p className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                {personal.aboutMe}
              </p>
            </div>
          </section>
        )}

        {hasExperience && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Experience
            </h2>
            <div className="md:col-span-3 space-y-6">
              {experience.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-slate-900">
                      {item.role} <span className="text-slate-500 font-normal">at {item.company}</span>
                    </span>
                    {(item.startDate || item.endDate) && (
                      <span className="text-xs text-slate-400 font-mono">
                        {item.startDate || ''} {item.startDate && item.endDate ? '–' : ''} {item.endDate || ''}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {hasProjects && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Projects
            </h2>
            <div className="md:col-span-3 space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-slate-900">{proj.name}</span>
                    <div className="flex gap-3 text-xs text-slate-400">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-black underline">Live</a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-black underline">Code</a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && (
                    <p className="text-[11px] text-slate-400 font-mono">{proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {hasEducation && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Education
            </h2>
            <div className="md:col-span-3 space-y-4">
              {education.map((item) => (
                <div key={item.id} className="flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-medium text-slate-900">{item.institution}</span>
                    <p className="text-xs text-slate-500">
                      {item.degree} {item.specialization ? `(${item.specialization})` : ''}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-400 font-mono">
                    <p>{item.startYear || ''} {item.startYear && item.endYear ? '–' : ''} {item.endYear || ''}</p>
                    {item.grade && <p className="text-slate-600 font-sans">{item.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasSkills && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Expertise
            </h2>
            <div className="md:col-span-3 space-y-3">
              {skills?.technical && skills.technical.length > 0 && (
                <p className="text-xs text-slate-700 leading-relaxed">
                  <span className="text-slate-400 font-medium">Technical: </span>
                  {skills.technical.join(' • ')}
                </p>
              )}
              {skills?.languages && skills.languages.length > 0 && (
                <p className="text-xs text-slate-700 leading-relaxed">
                  <span className="text-slate-400 font-medium">Languages: </span>
                  {skills.languages.join(' • ')}
                </p>
              )}
            </div>
          </section>
        )}

        {hasCertifications && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Honors
            </h2>
            <div className="md:col-span-3 space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-xs">
                  <span className="font-medium text-slate-800">
                    {cert.name} <span className="text-slate-400 font-normal">({cert.organization})</span>
                  </span>
                  {cert.year && <span className="text-slate-400 font-mono">{cert.year}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
