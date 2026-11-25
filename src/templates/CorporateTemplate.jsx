import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function CorporateTemplate({ data }) {
  const { personal, education, skills, projects, experience, certifications } = data;

  const hasSkills = (skills?.technical && skills.technical.length > 0) || (skills?.languages && skills.languages.length > 0);
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <div className="bg-white text-slate-800 max-w-4xl mx-auto shadow-md rounded-none border border-slate-300 print:shadow-none print:border-none print:max-w-none">
      {/* Formal Executive Navy Header Banner */}
      <header className="bg-navy-900 text-white p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-white">
              {personal?.fullName}
            </h1>
            <p className="text-sm font-semibold tracking-wider text-accent uppercase">
              {personal?.professionalTitle}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
              {personal?.email && <span>{personal.email}</span>}
              {personal?.phone && <span>• {personal.phone}</span>}
              {personal?.location && <span>• {personal.location}</span>}
            </div>
          </div>

          {personal?.profilePhoto && (
            <img
              src={personal.profilePhoto}
              alt={personal.fullName || 'Profile'}
              className="w-24 h-24 rounded-lg object-cover border-2 border-white shadow-md shrink-0"
            />
          )}
        </div>

        {/* Corporate Link Strip */}
        <div className="mt-6 pt-4 border-t border-navy-800 flex flex-wrap items-center justify-center sm:justify-start gap-5 text-xs text-slate-300">
          {personal?.linkedinUrl && (
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white underline">
              LinkedIn
            </a>
          )}
          {personal?.githubUrl && (
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white underline">
              GitHub
            </a>
          )}
          {personal?.websiteUrl && (
            <a href={personal.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-white underline">
              Corporate Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Main Content Body */}
      <div className="p-8 sm:p-10 space-y-8">
        {/* Executive Summary */}
        {personal?.aboutMe && (
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b-2 border-navy-900 pb-1">
              Executive Profile
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line pt-1">
              {personal.aboutMe}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {hasExperience && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b-2 border-navy-900 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {experience.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-navy-900">{item.role}</h3>
                      <p className="text-xs font-semibold text-slate-600">{item.company}</p>
                    </div>
                    {(item.startDate || item.endDate) && (
                      <span className="text-xs font-semibold text-slate-500">
                        {item.startDate || ''} {item.startDate && item.endDate ? '–' : ''} {item.endDate || ''}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selected Enterprise Projects */}
        {hasProjects && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b-2 border-navy-900 pb-1">
              Key Projects & Systems
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="text-sm font-bold text-navy-900">{proj.name}</h3>
                    <div className="flex items-center gap-3 text-xs font-semibold text-accent">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">
                          Deployment Link
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && (
                    <p className="text-xs font-medium text-slate-600">
                      Core Stack: <span className="text-slate-800">{proj.technologies}</span>
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Qualifications */}
        {hasEducation && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b-2 border-navy-900 pb-1">
              Education & Academic Credentials
            </h2>
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-navy-900">{item.institution}</h3>
                    <p className="text-xs text-slate-600">
                      {item.degree} {item.specialization ? `in ${item.specialization}` : ''}
                    </p>
                  </div>
                  <div className="sm:text-right text-xs text-slate-600 font-medium">
                    <p>{item.startYear || ''} {item.startYear && item.endYear ? '–' : ''} {item.endYear || ''}</p>
                    {item.grade && <p className="font-semibold text-slate-800">{item.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Competencies */}
        {hasSkills && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b-2 border-navy-900 pb-1">
              Core Competencies
            </h2>
            <div className="space-y-2">
              {skills?.technical && skills.technical.length > 0 && (
                <div className="text-xs text-slate-700">
                  <strong className="text-navy-900">Technical Expertise: </strong>
                  {skills.technical.join(', ')}
                </div>
              )}
              {skills?.languages && skills.languages.length > 0 && (
                <div className="text-xs text-slate-700">
                  <strong className="text-navy-900">Business Languages: </strong>
                  {skills.languages.join(', ')}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-widest border-b-2 border-navy-900 pb-1">
              Certifications & Accreditations
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-xs text-slate-700">
                  <span>
                    <strong className="text-navy-900">{cert.name}</strong> — {cert.organization}
                  </span>
                  {cert.year && <span className="font-semibold text-slate-500">{cert.year}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
