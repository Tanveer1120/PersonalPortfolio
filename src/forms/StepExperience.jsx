import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Briefcase, Award, Check, X, CheckCircle2 } from 'lucide-react';
import { TEMPLATES } from '../types/portfolio';

export default function StepExperience({ data, onChange }) {
  // Experience form state
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [currentExpId, setCurrentExpId] = useState(null);
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [expError, setExpError] = useState('');

  // Certification form state
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [currentCertId, setCurrentCertId] = useState(null);
  const [certForm, setCertForm] = useState({
    name: '',
    organization: '',
    year: '',
  });
  const [certError, setCertError] = useState('');

  // Experience handlers
  const resetExpForm = () => {
    setExpForm({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setExpError('');
    setIsEditingExp(false);
    setCurrentExpId(null);
  };

  const handleStartAddExp = () => {
    resetExpForm();
    setIsEditingExp(true);
  };

  const handleStartEditExp = (item) => {
    setExpForm({ ...item });
    setCurrentExpId(item.id);
    setIsEditingExp(true);
    setExpError('');
  };

  const handleSaveExp = () => {
    if (!expForm.company.trim() || !expForm.role.trim()) {
      setExpError('Company name and Position/Role are required.');
      return;
    }

    if (currentExpId) {
      const updated = (data.experience || []).map((e) =>
        e.id === currentExpId ? { ...expForm, id: currentExpId } : e
      );
      onChange({ ...data, experience: updated });
    } else {
      const newEntry = {
        ...expForm,
        id: 'exp_' + Date.now() + Math.random().toString(36).substring(2, 6),
      };
      onChange({ ...data, experience: [...(data.experience || []), newEntry] });
    }
    resetExpForm();
  };

  const handleRemoveExp = (id) => {
    onChange({
      ...data,
      experience: (data.experience || []).filter((e) => e.id !== id),
    });
  };

  // Certification handlers
  const resetCertForm = () => {
    setCertForm({
      name: '',
      organization: '',
      year: '',
    });
    setCertError('');
    setIsEditingCert(false);
    setCurrentCertId(null);
  };

  const handleStartAddCert = () => {
    resetCertForm();
    setIsEditingCert(true);
  };

  const handleStartEditCert = (item) => {
    setCertForm({ ...item });
    setCurrentCertId(item.id);
    setIsEditingCert(true);
    setCertError('');
  };

  const handleSaveCert = () => {
    if (!certForm.name.trim() || !certForm.organization.trim()) {
      setCertError('Certification name and Issuing Organization are required.');
      return;
    }

    if (currentCertId) {
      const updated = (data.certifications || []).map((c) =>
        c.id === currentCertId ? { ...certForm, id: currentCertId } : c
      );
      onChange({ ...data, certifications: updated });
    } else {
      const newEntry = {
        ...certForm,
        id: 'cert_' + Date.now() + Math.random().toString(36).substring(2, 6),
      };
      onChange({
        ...data,
        certifications: [...(data.certifications || []), newEntry],
      });
    }
    resetCertForm();
  };

  const handleRemoveCert = (id) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).filter((c) => c.id !== id),
    });
  };

  const handleTemplateSelect = (templateId) => {
    onChange({
      ...data,
      templateId,
    });
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-borderLight pb-4">
        <h2 className="text-xl font-bold text-navy-900">
          Step 4: Experience & Final Details
        </h2>
        <p className="text-sm text-textSecondary">
          Add internships, full-time/part-time roles, verified certifications, and select your preferred portfolio template.
        </p>
      </div>

      {/* SECTION 1: WORK & INTERNSHIP EXPERIENCE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-navy-900">
            <Briefcase className="w-5 h-5 text-accent" />
            <h3 className="text-base font-bold">Internship & Work Experience</h3>
          </div>
          {!isEditingExp && (
            <button
              type="button"
              onClick={handleStartAddExp}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>Add Experience</span>
            </button>
          )}
        </div>

        {/* Experience Editor Form */}
        {isEditingExp && (
          <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-borderLight pb-3">
              <h4 className="text-sm font-bold text-navy-900">
                {currentExpId ? 'Edit Work Experience' : 'Add Work / Internship Experience'}
              </h4>
              <button
                type="button"
                onClick={resetExpForm}
                className="text-textSecondary hover:text-navy-900 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {expError && (
              <p className="text-xs text-rose-600 font-medium">{expError}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Company / Organization Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  placeholder="e.g. Google or TechCorp Labs"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Position / Role <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  placeholder="e.g. Software Engineering Intern"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  value={expForm.startDate}
                  onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                  placeholder="e.g. May 2023 or Jan 2024"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  value={expForm.endDate}
                  onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                  placeholder="e.g. Aug 2023 or Present"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Role Description & Achievements
                </label>
                <textarea
                  rows={3}
                  value={expForm.description}
                  onChange={(e) =>
                    setExpForm({ ...expForm, description: e.target.value })
                  }
                  placeholder="Briefly describe key responsibilities, features developed, technologies used, and measurable results achieved..."
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-borderLight">
              <button
                type="button"
                onClick={resetExpForm}
                className="px-4 py-2 rounded-lg border border-borderLight text-xs font-semibold text-textSecondary hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveExp}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
              >
                <Check className="w-4 h-4 text-accent" />
                <span>{currentExpId ? 'Update Experience' : 'Save Experience'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Existing Experience List */}
        {(!data.experience || data.experience.length === 0) && !isEditingExp ? (
          <div className="bg-white rounded-xl border border-dashed border-borderLight p-6 text-center space-y-2">
            <p className="text-xs text-textSecondary">
              No internship or work experience added yet. (Optional for freshers)
            </p>
            <button
              type="button"
              onClick={handleStartAddExp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-borderLight text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-accent" />
              <span>Add Experience</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(data.experience || []).map((exp) => (
              <div
                key={exp.id}
                className="bg-white p-4 rounded-xl border border-borderLight flex items-start justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-navy-900">{exp.role}</h4>
                    <span className="text-xs text-accent font-semibold">@ {exp.company}</span>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-[11px] text-textSecondary">
                      {exp.startDate || ''} {exp.startDate && exp.endDate ? '–' : ''} {exp.endDate || ''}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-xs text-textSecondary leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEditExp(exp)}
                    className="p-1.5 rounded hover:bg-slate-100 text-textSecondary hover:text-navy-900 transition-colors"
                    title="Edit experience"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveExp(exp.id)}
                    className="p-1.5 rounded hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-colors"
                    title="Remove experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: CERTIFICATIONS */}
      <div className="space-y-4 pt-4 border-t border-borderLight">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-navy-900">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="text-base font-bold">Certifications & Licenses</h3>
          </div>
          {!isEditingCert && (
            <button
              type="button"
              onClick={handleStartAddCert}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>Add Certification</span>
            </button>
          )}
        </div>

        {/* Certification Editor Form */}
        {isEditingCert && (
          <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-borderLight pb-3">
              <h4 className="text-sm font-bold text-navy-900">
                {currentCertId ? 'Edit Certification' : 'Add New Certification'}
              </h4>
              <button
                type="button"
                onClick={resetCertForm}
                className="text-textSecondary hover:text-navy-900 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {certError && (
              <p className="text-xs text-rose-600 font-medium">{certError}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Certification Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect or Meta Front-End Developer"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Issuing Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={certForm.organization}
                  onChange={(e) => setCertForm({ ...certForm, organization: e.target.value })}
                  placeholder="e.g. Amazon Web Services, Coursera, Google"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Year Issued
                </label>
                <input
                  type="text"
                  value={certForm.year}
                  onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                  placeholder="e.g. 2024"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-borderLight">
              <button
                type="button"
                onClick={resetCertForm}
                className="px-4 py-2 rounded-lg border border-borderLight text-xs font-semibold text-textSecondary hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCert}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
              >
                <Check className="w-4 h-4 text-accent" />
                <span>{currentCertId ? 'Update Certification' : 'Save Certification'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Existing Certifications List */}
        {(!data.certifications || data.certifications.length === 0) && !isEditingCert ? (
          <div className="bg-white rounded-xl border border-dashed border-borderLight p-6 text-center space-y-2">
            <p className="text-xs text-textSecondary">
              No certifications added yet. (Optional)
            </p>
            <button
              type="button"
              onClick={handleStartAddCert}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-borderLight text-xs font-semibold text-navy-900 hover:bg-slate-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-accent" />
              <span>Add Certification</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(data.certifications || []).map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-3.5 rounded-xl border border-borderLight flex items-start justify-between gap-3 shadow-sm"
              >
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-navy-900 truncate">{cert.name}</h4>
                  <p className="text-[11px] text-textSecondary">
                    {cert.organization} {cert.year ? `• ${cert.year}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEditCert(cert)}
                    className="p-1 rounded hover:bg-slate-100 text-textSecondary hover:text-navy-900"
                    title="Edit certification"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveCert(cert.id)}
                    className="p-1 rounded hover:bg-rose-50 text-rose-500 hover:text-rose-700"
                    title="Remove certification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: SELECT INITIAL TEMPLATE */}
      <div className="space-y-3 pt-6 border-t border-borderLight">
        <div>
          <h3 className="text-base font-bold text-navy-900">
            Select Your Portfolio Template
          </h3>
          <p className="text-xs text-textSecondary">
            You can always change templates instantly later in the live preview.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TEMPLATES.map((tmpl) => {
            const isSelected = data.templateId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleTemplateSelect(tmpl.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-accent bg-blue-50/50 ring-2 ring-accent/20'
                    : 'border-borderLight bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                      {tmpl.badge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-accent fill-blue-100" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-navy-900 leading-tight">
                    {tmpl.name}
                  </h4>
                  <p className="text-[11px] text-textSecondary mt-1 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
