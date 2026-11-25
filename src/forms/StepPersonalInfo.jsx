import React, { useState, useRef } from 'react';
import { Camera, Trash2, AlertCircle, RefreshCw } from 'lucide-react';

export default function StepPersonalInfo({ data, onChange, errors }) {
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) return;

    // Validate format
    const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validFormats.includes(file.type)) {
      setFileError('Invalid format. Please upload JPG, PNG, or WEBP.');
      return;
    }

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileError('File size exceeds 2MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...data,
        profilePhoto: event.target?.result || '',
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange({
      ...data,
      profilePhoto: '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-borderLight pb-4">
        <h2 className="text-xl font-bold text-navy-900">Step 1: Personal Information</h2>
        <p className="text-sm text-textSecondary">
          Provide your basic contact details and a short professional summary. This information will appear prominently on your portfolio and resume.
        </p>
      </div>

      {/* Profile Photo Upload */}
      <div className="bg-white p-5 rounded-xl border border-borderLight space-y-4">
        <label className="block text-sm font-semibold text-navy-900">
          Profile Photo
        </label>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {data.profilePhoto ? (
              <img
                src={data.profilePhoto}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-navy-900 shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">No Photo</span>
              </div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              id="photo-upload-input"
            />
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <label
                htmlFor="photo-upload-input"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-borderLight bg-white text-xs font-semibold text-navy-900 hover:bg-slate-50 cursor-pointer shadow-sm transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-accent" />
                <span>{data.profilePhoto ? 'Change Photo' : 'Upload Photo'}</span>
              </label>

              {data.profilePhoto && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
            <p className="text-[11px] text-textSecondary">
              JPG, PNG, or WEBP up to 2MB. Square aspect ratio recommended.
            </p>
            {fileError && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {fileError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={data.fullName || ''}
            onChange={handleInputChange}
            placeholder="e.g. Alex Johnson"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
              errors?.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-borderLight'
            }`}
          />
          {errors?.fullName && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            Professional Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="professionalTitle"
            value={data.professionalTitle || ''}
            onChange={handleInputChange}
            placeholder="e.g. Full-Stack Developer / Computer Science Graduate"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
              errors?.professionalTitle ? 'border-rose-400 bg-rose-50/20' : 'border-borderLight'
            }`}
          />
          {errors?.professionalTitle && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.professionalTitle}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleInputChange}
            placeholder="e.g. alex.johnson@example.com"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
              errors?.email ? 'border-rose-400 bg-rose-50/20' : 'border-borderLight'
            }`}
          />
          {errors?.email && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone || ''}
            onChange={handleInputChange}
            placeholder="e.g. +1 (555) 234-5678"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
              errors?.phone ? 'border-rose-400 bg-rose-50/20' : 'border-borderLight'
            }`}
          />
          {errors?.phone && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            Location <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={data.location || ''}
            onChange={handleInputChange}
            placeholder="e.g. San Francisco, CA or London, UK"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
              errors?.location ? 'border-rose-400 bg-rose-50/20' : 'border-borderLight'
            }`}
          />
          {errors?.location && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.location}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            About Me (Professional Summary) <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="aboutMe"
            rows={4}
            value={data.aboutMe || ''}
            onChange={handleInputChange}
            placeholder="Write a concise overview of your background, technical interests, problem-solving skills, and career focus..."
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors ${
              errors?.aboutMe ? 'border-rose-400 bg-rose-50/20' : 'border-borderLight'
            }`}
          />
          <div className="flex justify-between items-center text-[11px] text-textSecondary mt-1">
            <span>{errors?.aboutMe ? <span className="text-rose-600 font-medium">{errors.aboutMe}</span> : 'Keep it 2–4 sentences for the cleanest visual layout.'}</span>
            <span>{data.aboutMe?.length || 0} characters</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            name="linkedinUrl"
            value={data.linkedinUrl || ''}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3.5 py-2.5 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            GitHub Profile URL
          </label>
          <input
            type="url"
            name="githubUrl"
            value={data.githubUrl || ''}
            onChange={handleInputChange}
            placeholder="https://github.com/username"
            className="w-full px-3.5 py-2.5 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-navy-900 mb-1.5">
            Personal Website URL <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="url"
            name="websiteUrl"
            value={data.websiteUrl || ''}
            onChange={handleInputChange}
            placeholder="https://myportfolio.dev"
            className="w-full px-3.5 py-2.5 rounded-lg border border-borderLight text-sm text-textMain bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
