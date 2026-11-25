import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Code2, Globe2, FolderKanban, Check, X } from 'lucide-react';
import { SKILL_CATEGORIES, COMMON_LANGUAGES } from '../types/portfolio';

export default function StepSkillsProjects({ data, onChange, errors }) {
  // Skill & Language inputs
  const [customSkill, setCustomSkill] = useState('');
  const [customLanguage, setCustomLanguage] = useState('');

  // Project modal / edit state
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
  });
  const [projectError, setProjectError] = useState('');

  // Technical skills handlers
  const addTechnicalSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    const current = data.skills?.technical || [];
    if (!current.includes(trimmed)) {
      onChange({
        ...data,
        skills: {
          ...data.skills,
          technical: [...current, trimmed],
        },
      });
    }
    setCustomSkill('');
  };

  const removeTechnicalSkill = (skillToRemove) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        technical: (data.skills?.technical || []).filter((s) => s !== skillToRemove),
      },
    });
  };

  // Language handlers
  const addLanguage = (lang) => {
    const trimmed = lang.trim();
    if (!trimmed) return;
    const current = data.skills?.languages || [];
    if (!current.includes(trimmed)) {
      onChange({
        ...data,
        skills: {
          ...data.skills,
          languages: [...current, trimmed],
        },
      });
    }
    setCustomLanguage('');
  };

  const removeLanguage = (langToRemove) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        languages: (data.skills?.languages || []).filter((l) => l !== langToRemove),
      },
    });
  };

  // Project handlers
  const resetProjectForm = () => {
    setProjectForm({
      name: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
    });
    setProjectError('');
    setIsEditingProject(false);
    setCurrentProjectId(null);
  };

  const handleStartAddProject = () => {
    resetProjectForm();
    setIsEditingProject(true);
  };

  const handleStartEditProject = (item) => {
    setProjectForm({ ...item });
    setCurrentProjectId(item.id);
    setIsEditingProject(true);
    setProjectError('');
  };

  const handleSaveProject = () => {
    if (!projectForm.name.trim() || !projectForm.description.trim()) {
      setProjectError('Project name and description are required.');
      return;
    }

    if (currentProjectId) {
      const updated = (data.projects || []).map((p) =>
        p.id === currentProjectId ? { ...projectForm, id: currentProjectId } : p
      );
      onChange({
        ...data,
        projects: updated,
      });
    } else {
      const newProj = {
        ...projectForm,
        id: 'proj_' + Date.now() + Math.random().toString(36).substring(2, 6),
      };
      onChange({
        ...data,
        projects: [...(data.projects || []), newProj],
      });
    }
    resetProjectForm();
  };

  const handleRemoveProject = (id) => {
    onChange({
      ...data,
      projects: (data.projects || []).filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-borderLight pb-4">
        <h2 className="text-xl font-bold text-navy-900">Step 3: Skills & Projects</h2>
        <p className="text-sm text-textSecondary">
          Showcase your core technical proficiencies, spoken languages, and key completed projects.
        </p>
      </div>

      {/* SECTION 1: TECHNICAL SKILLS */}
      <div className="bg-white p-5 rounded-xl border border-borderLight space-y-4">
        <div className="flex items-center gap-2 text-navy-900">
          <Code2 className="w-5 h-5 text-accent" />
          <h3 className="text-base font-bold">Technical Skills</h3>
        </div>

        {/* Selected Skills Tags */}
        <div className="min-h-[44px] p-3 rounded-lg bg-bgLight border border-borderLight">
          {(!data.skills?.technical || data.skills.technical.length === 0) ? (
            <span className="text-xs text-textSecondary italic">
              No technical skills selected yet. Click from suggestions below or type a custom skill.
            </span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-borderLight text-xs font-semibold text-navy-900 shadow-sm"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnicalSkill(skill)}
                    className="text-textSecondary hover:text-rose-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Custom Skill Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTechnicalSkill(customSkill);
              }
            }}
            placeholder="Type custom skill (e.g. GraphQL, Tailwind CSS)..."
            className="flex-grow px-3.5 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
          <button
            type="button"
            onClick={() => addTechnicalSkill(customSkill)}
            className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm shrink-0"
          >
            Add Skill
          </button>
        </div>

        {/* Categorized Suggestions */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-textSecondary uppercase tracking-wider block">
            Suggested Skills By Category (Click to add):
          </span>
          <div className="space-y-2">
            {Object.entries(SKILL_CATEGORIES).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <span className="text-[11px] font-semibold text-navy-900">{category}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => {
                    const isSelected = data.skills?.technical?.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          isSelected ? removeTechnicalSkill(item) : addTechnicalSkill(item)
                        }
                        className={`text-xs px-2.5 py-0.5 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-navy-900 text-white border-navy-900 font-semibold'
                            : 'bg-white text-textSecondary border-borderLight hover:border-accent hover:text-navy-900'
                        }`}
                      >
                        {isSelected ? `✓ ${item}` : `+ ${item}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: LANGUAGES */}
      <div className="bg-white p-5 rounded-xl border border-borderLight space-y-4">
        <div className="flex items-center gap-2 text-navy-900">
          <Globe2 className="w-5 h-5 text-accent" />
          <h3 className="text-base font-bold">Languages Spoken</h3>
        </div>

        {/* Selected Languages */}
        <div className="min-h-[44px] p-3 rounded-lg bg-bgLight border border-borderLight">
          {(!data.skills?.languages || data.skills.languages.length === 0) ? (
            <span className="text-xs text-textSecondary italic">
              No languages added. Select below or enter custom.
            </span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.skills.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-borderLight text-xs font-semibold text-navy-900 shadow-sm"
                >
                  <span>{lang}</span>
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    className="text-textSecondary hover:text-rose-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={customLanguage}
            onChange={(e) => setCustomLanguage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addLanguage(customLanguage);
              }
            }}
            placeholder="Type language (e.g. English, French, Japanese)..."
            className="flex-grow px-3.5 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
          <button
            type="button"
            onClick={() => addLanguage(customLanguage)}
            className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm shrink-0"
          >
            Add Language
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {COMMON_LANGUAGES.map((lang) => {
            const isSelected = data.skills?.languages?.includes(lang);
            return (
              <button
                key={lang}
                type="button"
                onClick={() => (isSelected ? removeLanguage(lang) : addLanguage(lang))}
                className={`text-xs px-2.5 py-0.5 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-navy-900 text-white border-navy-900 font-semibold'
                    : 'bg-white text-textSecondary border-borderLight hover:border-accent hover:text-navy-900'
                }`}
              >
                {isSelected ? `✓ ${lang}` : `+ ${lang}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: PROJECTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-navy-900">
            <FolderKanban className="w-5 h-5 text-accent" />
            <h3 className="text-base font-bold">Featured Projects</h3>
          </div>
          {!isEditingProject && (
            <button
              type="button"
              onClick={handleStartAddProject}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>Add Project</span>
            </button>
          )}
        </div>

        {/* Project Form Editor */}
        {isEditingProject && (
          <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-borderLight pb-3">
              <h4 className="text-sm font-bold text-navy-900">
                {currentProjectId ? 'Edit Project' : 'Add New Project'}
              </h4>
              <button
                type="button"
                onClick={resetProjectForm}
                className="text-textSecondary hover:text-navy-900 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {projectError && (
              <p className="text-xs text-rose-600 font-medium">{projectError}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Project Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  placeholder="e.g. Distributed Task Queue & Orchestrator"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Project Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, description: e.target.value })
                  }
                  placeholder="Describe the problem, your solution, architectural decisions, and key outcomes..."
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Technologies Used (Comma-separated)
                </label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, technologies: e.target.value })
                  }
                  placeholder="e.g. React, Node.js, Express, PostgreSQL, Redis, Docker"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Live Project URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={projectForm.liveUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  placeholder="https://mycoolapp.com"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  GitHub Repository URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={projectForm.githubUrl}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, githubUrl: e.target.value })
                  }
                  placeholder="https://github.com/username/project"
                  className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-borderLight">
              <button
                type="button"
                onClick={resetProjectForm}
                className="px-4 py-2 rounded-lg border border-borderLight text-xs font-semibold text-textSecondary hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProject}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
              >
                <Check className="w-4 h-4 text-accent" />
                <span>{currentProjectId ? 'Update Project' : 'Save Project'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Existing Projects List */}
        {(!data.projects || data.projects.length === 0) && !isEditingProject ? (
          <div className="bg-white rounded-xl border border-dashed border-borderLight p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-textSecondary mx-auto">
              <FolderKanban className="w-6 h-6 text-accent" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-navy-900">No projects added yet</h4>
              <p className="text-xs text-textSecondary">
                Include software applications, hackathon entries, or academic coursework projects.
              </p>
            </div>
            <button
              type="button"
              onClick={handleStartAddProject}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>Add Project</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(data.projects || []).map((proj) => (
              <div
                key={proj.id}
                className="bg-white p-4 rounded-xl border border-borderLight flex items-start justify-between gap-4 shadow-sm hover:border-slate-300 transition-colors"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-navy-900 truncate">{proj.name}</h4>
                    {proj.technologies && (
                      <span className="text-[11px] text-textSecondary bg-slate-100 px-2 py-0.5 rounded">
                        {proj.technologies}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-textSecondary line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-accent pt-0.5">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        Live Demo
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        GitHub Code
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEditProject(proj)}
                    className="p-1.5 rounded hover:bg-slate-100 text-textSecondary hover:text-navy-900 transition-colors"
                    title="Edit project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(proj.id)}
                    className="p-1.5 rounded hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-colors"
                    title="Remove project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
