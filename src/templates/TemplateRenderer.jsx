import React from 'react';
import ModernProfessionalTemplate from './ModernProfessionalTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import ModernDeveloperTemplate from './ModernDeveloperTemplate';

export default function TemplateRenderer({ data, templateId, onDownloadResume }) {
  const currentTemplate = templateId || data?.templateId || 'modern-professional';

  switch (currentTemplate) {
    case 'minimalist':
      return <MinimalistTemplate data={data} onDownloadResume={onDownloadResume} />;
    case 'modern-developer':
      return <ModernDeveloperTemplate data={data} onDownloadResume={onDownloadResume} />;
    case 'modern-professional':
    default:
      return <ModernProfessionalTemplate data={data} onDownloadResume={onDownloadResume} />;
  }
}
