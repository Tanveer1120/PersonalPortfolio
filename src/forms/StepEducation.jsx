import React, { useState } from 'react';
import { Plus, Trash2, Edit2, GraduationCap, Check, X } from 'lucide-react';

export default function StepEducation({ data, onChange, errors }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formEntry, setFormEntry] = useState({
    institution: '',
    degree: '',
    specialization: '',
    startYear: '',
    endYear: '',
    grade: '',
  });
  const [entryError, setEntryError] = useState('');

  const resetForm = () => {
    setFormEntry({
      institution: '',
      degree: '',
      specialization: '',
      startYear: '',
      endYear: '',
      grade: '',
    });
    setEntryError('');
    setIsEditing(false);
    setCurrentEditId(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsEditing(true);
  };

  const handleStartEdit = (item) => {
    setFormEntry({ ...item });
    setCurrentEditId(item.id);
    setIsEditing(true);
    setEntryError('');
  };

  const handleSaveEntry = () => {
    if (!formEntry.institution.trim() || !formEntry.degree.trim()) {
      setEntryError('Institution name and Degree/Course are required.');
      return;
    }

    if (currentEditId) {
      // Update existing
      const updated = data.map((item) =>
        item.id === currentEditId ? { ...formEntry, id: currentEditId } : item
      );
      onChange(updated);
    } else {
      // Create new
      const newEntry = {
        ...formEntry,
        id: 'edu_' + Date.now() + Math.random().toString(36).substring(2, 6),
      };
      onChange([...data, newEntry]);
    }

    resetForm();
  };

  const handleRemove = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-borderLight pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900">Step 2: Education Details</h2>
          <p className="text-sm text-textSecondary">
            Add your degrees, diplomas, high school, or university qualifications.
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleStartAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm self-start"
          >
            <Plus className="w-4 h-4 text-accent" />
            <span>Add Education</span>
          </button>
        )}
      </div>

      {errors?.education && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {errors.education}
        </div>
      )}

      {/* Entry Form Modal / Inline Box */}
      {isEditing && (
        <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-borderLight pb-3">
            <h3 className="text-sm font-bold text-navy-900">
              {currentEditId ? 'Edit Education Entry' : 'Add New Education Entry'}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-textSecondary hover:text-navy-900 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {entryError && (
            <p className="text-xs text-rose-600 font-medium">{entryError}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Institution Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formEntry.institution}
                onChange={(e) => setFormEntry({ ...formEntry, institution: e.target.value })}
                placeholder="e.g. Stanford University or Delhi Technological University"
                className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Degree / Course <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formEntry.degree}
                onChange={(e) => setFormEntry({ ...formEntry, degree: e.target.value })}
                placeholder="e.g. Bachelor of Technology / B.Sc."
                className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Specialization / Major
              </label>
              <input
                type="text"
                value={formEntry.specialization}
                onChange={(e) => setFormEntry({ ...formEntry, specialization: e.target.value })}
                placeholder="e.g. Computer Science and Engineering"
                className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Start Year
              </label>
              <input
                type="text"
                value={formEntry.startYear}
                onChange={(e) => setFormEntry({ ...formEntry, startYear: e.target.value })}
                placeholder="e.g. 2021"
                className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                End Year (or Expected)
              </label>
              <input
                type="text"
                value={formEntry.endYear}
                onChange={(e) => setFormEntry({ ...formEntry, endYear: e.target.value })}
                placeholder="e.g. 2025"
                className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                CGPA / Percentage / Grade
              </label>
              <input
                type="text"
                value={formEntry.grade}
                onChange={(e) => setFormEntry({ ...formEntry, grade: e.target.value })}
                placeholder="e.g. 3.8 / 4.0 or 8.9 CGPA or 85%"
                className="w-full px-3 py-2 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-borderLight">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-borderLight text-xs font-semibold text-textSecondary hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveEntry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Check className="w-4 h-4 text-accent" />
              <span>{currentEditId ? 'Update Education' : 'Save Education'}</span>
            </button>
          </div>
        </div>
      )}

      {/* List of Existing Education */}
      {data.length === 0 && !isEditing ? (
        <div className="bg-white rounded-xl border border-dashed border-borderLight p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-textSecondary mx-auto">
            <GraduationCap className="w-6 h-6 text-accent" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-navy-900">No education entries added yet</h4>
            <p className="text-xs text-textSecondary">
              Click &quot;Add Education&quot; to include your academic degrees or certifications.
            </p>
          </div>
          <button
            type="button"
            onClick={handleStartAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-accent" />
            <span>Add Education</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl border border-borderLight flex items-start justify-between gap-4 shadow-sm hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-navy-900">{item.institution}</h4>
                  {item.grade && (
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-accent text-[11px] font-semibold">
                      {item.grade}
                    </span>
                  )}
                </div>
                <p className="text-xs text-textSecondary font-medium">
                  {item.degree} {item.specialization ? `in ${item.specialization}` : ''}
                </p>
                {(item.startYear || item.endYear) && (
                  <p className="text-[11px] text-textSecondary">
                    {item.startYear || ''} {item.startYear && item.endYear ? '–' : ''} {item.endYear || ''}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStartEdit(item)}
                  className="p-1.5 rounded hover:bg-slate-100 text-textSecondary hover:text-navy-900 transition-colors"
                  title="Edit entry"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 rounded hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-colors"
                  title="Remove entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
