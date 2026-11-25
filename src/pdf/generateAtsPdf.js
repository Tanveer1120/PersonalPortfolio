import { jsPDF } from 'jspdf';

/**
 * Generates a 100% genuine, text-based, single-column, ATS-friendly A4 Resume PDF.
 * Uses standard Helvetica font, pure selectable text, no graphics, no tables, no columns.
 */
export const generateAtsResumePdf = (data) => {
  const { personal, education, skills, projects, experience, certifications } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addSectionHeader = (title) => {
    checkPageBreak(14);
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(60, 60, 60);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + contentWidth, y);
    y += 5;
  };

  // 1. CONTACT INFORMATION
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  const name = (personal?.fullName || 'RESUME').toUpperCase();
  doc.text(name, margin, y);
  y += 6;

  if (personal?.professionalTitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(personal.professionalTitle, margin, y);
    y += 5;
  }

  // Contact line (Email | Phone | Location | Links)
  const contactParts = [];
  if (personal?.email) contactParts.push(personal.email);
  if (personal?.phone) contactParts.push(personal.phone);
  if (personal?.location) contactParts.push(personal.location);
  if (personal?.linkedinUrl) contactParts.push(personal.linkedinUrl);
  if (personal?.githubUrl) contactParts.push(personal.githubUrl);
  if (personal?.websiteUrl) contactParts.push(personal.websiteUrl);

  if (contactParts.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const contactLine = contactParts.join(' | ');
    const splitContact = doc.splitTextToSize(contactLine, contentWidth);
    doc.text(splitContact, margin, y);
    y += splitContact.length * 4.5 + 2;
  }

  // 2. PROFESSIONAL SUMMARY
  if (personal?.aboutMe && personal.aboutMe.trim()) {
    addSectionHeader('PROFESSIONAL SUMMARY');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    const splitSummary = doc.splitTextToSize(personal.aboutMe.trim(), contentWidth);
    checkPageBreak(splitSummary.length * 4.8);
    doc.text(splitSummary, margin, y);
    y += splitSummary.length * 4.8 + 2;
  }

  // 3. TECHNICAL SKILLS
  const hasTechSkills = skills?.technical && skills.technical.length > 0;
  if (hasTechSkills) {
    addSectionHeader('TECHNICAL SKILLS');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);

    const skillsText = skills.technical.join(', ');
    const splitSkills = doc.splitTextToSize(`Technical Proficiencies: ${skillsText}`, contentWidth);
    checkPageBreak(splitSkills.length * 4.8);
    doc.text(splitSkills, margin, y);
    y += splitSkills.length * 4.8 + 2;
  }

  // 4. EDUCATION
  if (education && education.length > 0) {
    addSectionHeader('EDUCATION');
    education.forEach((edu) => {
      checkPageBreak(16);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);

      // Degree & Institution
      const degreeLine = edu.degree + (edu.specialization ? ` in ${edu.specialization}` : '');
      doc.text(degreeLine, margin, y);

      // Date / Year right aligned or same line
      const dateText = [edu.startYear, edu.endYear].filter(Boolean).join(' - ');
      if (dateText) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.text(dateText, margin + contentWidth, y, { align: 'right' });
      }
      y += 4.5;

      // Institution
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      let instText = edu.institution;
      if (edu.grade) instText += ` | Grade: ${edu.grade}`;
      doc.text(instText, margin, y);
      y += 6;
    });
  }

  // 5. EXPERIENCE
  if (experience && experience.length > 0) {
    addSectionHeader('EXPERIENCE');
    experience.forEach((exp) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);

      // Role
      doc.text(exp.role, margin, y);

      // Duration
      const dateText = [exp.startDate, exp.endDate].filter(Boolean).join(' - ');
      if (dateText) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.text(dateText, margin + contentWidth, y, { align: 'right' });
      }
      y += 4.5;

      // Company
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      doc.text(exp.company, margin, y);
      y += 4.5;

      // Description
      if (exp.description && exp.description.trim()) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(40, 40, 40);
        const splitDesc = doc.splitTextToSize(exp.description.trim(), contentWidth);
        checkPageBreak(splitDesc.length * 4.4);
        doc.text(splitDesc, margin, y);
        y += splitDesc.length * 4.4;
      }
      y += 3;
    });
  }

  // 6. PROJECTS
  if (projects && projects.length > 0) {
    addSectionHeader('PROJECTS');
    projects.forEach((proj) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);

      doc.text(proj.name, margin, y);

      // Links on right
      const links = [proj.liveUrl, proj.githubUrl].filter(Boolean).join(' | ');
      if (links) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(70, 70, 70);
        doc.text(links, margin + contentWidth, y, { align: 'right' });
      }
      y += 4.5;

      if (proj.technologies) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        doc.text(`Technologies: ${proj.technologies}`, margin, y);
        y += 4.5;
      }

      if (proj.description && proj.description.trim()) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(40, 40, 40);
        const splitDesc = doc.splitTextToSize(proj.description.trim(), contentWidth);
        checkPageBreak(splitDesc.length * 4.4);
        doc.text(splitDesc, margin, y);
        y += splitDesc.length * 4.4;
      }
      y += 3;
    });
  }

  // 7. CERTIFICATIONS
  if (certifications && certifications.length > 0) {
    addSectionHeader('CERTIFICATIONS');
    certifications.forEach((cert) => {
      checkPageBreak(7);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(20, 20, 20);
      doc.text(`• ${cert.name}`, margin, y);

      const orgAndYear = [cert.organization, cert.year].filter(Boolean).join(' | ');
      if (orgAndYear) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        doc.text(orgAndYear, margin + contentWidth, y, { align: 'right' });
      }
      y += 5;
    });
  }

  // 8. LANGUAGES
  if (skills?.languages && skills.languages.length > 0) {
    addSectionHeader('LANGUAGES');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);
    const langText = skills.languages.join(', ');
    checkPageBreak(6);
    doc.text(langText, margin, y);
    y += 5;
  }

  // Save the PDF
  const filename = `${(personal?.fullName || 'applicant').toLowerCase().replace(/\s+/g, '_')}_ats_resume.pdf`;
  doc.save(filename);
};
