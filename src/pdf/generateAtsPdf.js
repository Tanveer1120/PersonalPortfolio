import { jsPDF } from 'jspdf';

/**
 * Generates an ATS-compliant, single-column, pure text-based A4 Resume PDF.
 * Uses standard Helvetica font with 100% selectable and searchable text.
 * Dynamically distributes vertical pacing so student/fresher resumes make effective,
 * balanced use of A4 page space without awkward blank areas at the bottom.
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
  const marginX = 18;
  const marginY = 18;
  const contentWidth = pageWidth - marginX * 2;
  const usableHeight = pageHeight - marginY * 2; // 261 mm

  // Count active sections
  let sectionCount = 0;
  if (personal?.aboutMe?.trim()) sectionCount++;
  if (skills?.technical?.length > 0) sectionCount++;
  if (education?.length > 0) sectionCount++;
  if (projects?.length > 0) sectionCount++;
  if (experience?.length > 0) sectionCount++;
  if (certifications?.length > 0) sectionCount++;
  if (skills?.languages?.length > 0) sectionCount++;

  // Calculate base required height with compact spacing
  let baseHeight = 25; // Header area (Name, title, contacts)
  if (personal?.aboutMe?.trim()) {
    const lines = doc.splitTextToSize(personal.aboutMe.trim(), contentWidth).length;
    baseHeight += 8 + lines * 4.2;
  }
  if (skills?.technical?.length > 0) {
    const str = `Technical Proficiencies: ${skills.technical.join(', ')}`;
    const lines = doc.splitTextToSize(str, contentWidth).length;
    baseHeight += 8 + lines * 4.2;
  }
  if (education?.length > 0) {
    baseHeight += 8 + education.length * 9;
  }
  if (projects?.length > 0) {
    projects.forEach((p) => {
      const descLines = p.description ? doc.splitTextToSize(p.description.trim(), contentWidth).length : 0;
      baseHeight += 9 + (p.technologies ? 4 : 0) + descLines * 4.2;
    });
    baseHeight += 8;
  }
  if (experience?.length > 0) {
    experience.forEach((e) => {
      const descLines = e.description ? doc.splitTextToSize(e.description.trim(), contentWidth).length : 0;
      baseHeight += 9 + descLines * 4.2;
    });
    baseHeight += 8;
  }
  if (certifications?.length > 0) {
    baseHeight += 8 + certifications.length * 5;
  }
  if (skills?.languages?.length > 0) {
    baseHeight += 8 + 5;
  }

  // Balanced vertical distribution for student/fresher resumes
  let sectionGap = 6;
  let itemGap = 3.5;
  let bodyLineHeight = 4.3;

  if (baseHeight < usableHeight * 0.85 && sectionCount > 0) {
    const slack = (usableHeight * 0.88) - baseHeight;
    const extraPerSection = Math.min(slack / (sectionCount + 1), 6);
    sectionGap += extraPerSection * 0.65;
    itemGap += extraPerSection * 0.35;
    bodyLineHeight = Math.min(4.8, bodyLineHeight + (extraPerSection * 0.08));
  }

  let y = marginY;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - marginY) {
      doc.addPage();
      y = marginY;
    }
  };

  const addSectionHeader = (title) => {
    checkPageBreak(12);
    y += sectionGap;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), marginX, y);
    y += 1.8;
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.4);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += itemGap + 1.2;
  };

  // 1. FULL NAME
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(15, 23, 42);
  const name = (personal?.fullName || 'RESUME').toUpperCase();
  doc.text(name, marginX, y);
  y += 6.0;

  // 2. PROFESSIONAL TITLE
  if (personal?.professionalTitle) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(51, 65, 85);
    doc.text(personal.professionalTitle, marginX, y);
    y += 5.2;
  }

  // 3. CONTACT INFORMATION
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
    doc.setTextColor(71, 85, 105);
    const contactLine = contactParts.join('  |  ');
    const splitContact = doc.splitTextToSize(contactLine, contentWidth);
    doc.text(splitContact, marginX, y);
    y += splitContact.length * bodyLineHeight + 1.5;
  }

  // 4. PROFESSIONAL SUMMARY
  if (personal?.aboutMe && personal.aboutMe.trim()) {
    addSectionHeader('PROFESSIONAL SUMMARY');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    const splitSummary = doc.splitTextToSize(personal.aboutMe.trim(), contentWidth);
    checkPageBreak(splitSummary.length * bodyLineHeight);
    doc.text(splitSummary, marginX, y);
    y += splitSummary.length * bodyLineHeight;
  }

  // 5. TECHNICAL SKILLS
  if (skills?.technical && skills.technical.length > 0) {
    addSectionHeader('TECHNICAL SKILLS');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    const splitSkills = doc.splitTextToSize(`Technical Proficiencies: ${skills.technical.join(', ')}`, contentWidth);
    checkPageBreak(splitSkills.length * bodyLineHeight);
    doc.text(splitSkills, marginX, y);
    y += splitSkills.length * bodyLineHeight;
  }

  // 6. EDUCATION
  if (education && education.length > 0) {
    addSectionHeader('EDUCATION');
    education.forEach((edu, idx) => {
      checkPageBreak(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      const degText = edu.degree + (edu.specialization ? ` in ${edu.specialization}` : '');
      doc.text(degText, marginX, y);

      const dateText = [edu.startYear, edu.endYear].filter(Boolean).join(' - ');
      if (dateText) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(71, 85, 105);
        doc.text(dateText, marginX + contentWidth, y, { align: 'right' });
      }
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      let instText = edu.institution;
      if (edu.grade) instText += ` | Grade: ${edu.grade}`;
      doc.text(instText, marginX, y);
      y += bodyLineHeight;

      if (idx < education.length - 1) {
        y += itemGap;
      }
    });
  }

  // 7. PROJECTS
  if (projects && projects.length > 0) {
    addSectionHeader('PROJECTS');
    projects.forEach((proj, idx) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.name, marginX, y);

      const links = [proj.liveUrl, proj.githubUrl].filter(Boolean).join(' | ');
      if (links) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text(links, marginX + contentWidth, y, { align: 'right' });
      }
      y += 4.5;

      if (proj.technologies) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(`Technologies: ${proj.technologies}`, marginX, y);
        y += 4.2;
      }

      if (proj.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(30, 41, 59);
        const splitDesc = doc.splitTextToSize(proj.description.trim(), contentWidth);
        checkPageBreak(splitDesc.length * bodyLineHeight);
        doc.text(splitDesc, marginX, y);
        y += splitDesc.length * bodyLineHeight;
      }

      if (idx < projects.length - 1) {
        y += itemGap;
      }
    });
  }

  // 8. EXPERIENCE
  if (experience && experience.length > 0) {
    addSectionHeader('EXPERIENCE');
    experience.forEach((exp, idx) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(exp.role, marginX, y);

      const dateText = [exp.startDate, exp.endDate].filter(Boolean).join(' - ');
      if (dateText) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(71, 85, 105);
        doc.text(dateText, marginX + contentWidth, y, { align: 'right' });
      }
      y += 4.5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      doc.text(exp.company, marginX, y);
      y += 4.2;

      if (exp.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(30, 41, 59);
        const splitDesc = doc.splitTextToSize(exp.description.trim(), contentWidth);
        checkPageBreak(splitDesc.length * bodyLineHeight);
        doc.text(splitDesc, marginX, y);
        y += splitDesc.length * bodyLineHeight;
      }

      if (idx < experience.length - 1) {
        y += itemGap;
      }
    });
  }

  // 9. CERTIFICATIONS
  if (certifications && certifications.length > 0) {
    addSectionHeader('CERTIFICATIONS');
    certifications.forEach((cert, idx) => {
      checkPageBreak(7);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`• ${cert.name}`, marginX, y);

      const orgAndYear = [cert.organization, cert.year].filter(Boolean).join(' | ');
      if (orgAndYear) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(orgAndYear, marginX + contentWidth, y, { align: 'right' });
      }
      y += 4.8;
      if (idx < certifications.length - 1) y += 1.5;
    });
  }

  // 10. LANGUAGES
  if (skills?.languages && skills.languages.length > 0) {
    addSectionHeader('LANGUAGES');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(skills.languages.join(', '), marginX, y);
    y += bodyLineHeight;
  }

  // Save the PDF
  const filename = `${(personal?.fullName || 'applicant').toLowerCase().replace(/\s+/g, '_')}_ats_resume.pdf`;
  doc.save(filename);
};
