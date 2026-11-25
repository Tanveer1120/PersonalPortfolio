import React from 'react';
import ModernProfessionalTemplate from './ModernProfessionalTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import CorporateTemplate from './CorporateTemplate';
import ModernDeveloperTemplate from './ModernDeveloperTemplate';
import CreativeProfessionalTemplate from './CreativeProfessionalTemplate';

export default function TemplateRenderer({ data, templateId }) {
  const currentTemplate = templateId || data?.templateId || 'modern-professional';

  switch (currentTemplate) {
    case 'minimalist':
      return <MinimalistTemplate data={data} />;
    case 'corporate':
      return <CorporateTemplate data={data} />;
    case 'modern-developer':
      return <ModernDeveloperTemplate data={data} />;
    case 'creative-professional':
      return <CreativeProfessionalTemplate data={data} />;
    case 'modern-professional':
    default:
      return <ModernProfessionalTemplate data={data} />;
  }
}
