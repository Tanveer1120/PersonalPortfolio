import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a high-resolution, multi-page A4 Professional Portfolio PDF
 * capturing the exact template design styling without cropping or distorting.
 */
export const generatePortfolioPdf = async (elementId, candidateName = 'Portfolio') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Target element for PDF generation not found:', elementId);
    return;
  }

  try {
    // Render element at high scale for pristine vector-like crispness
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Calculate height of canvas in mm proportional to A4 width
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, '', 'FAST');
    heightLeft -= pdfHeight;

    // Add additional pages if content spans beyond 1 A4 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, '', 'FAST');
      heightLeft -= pdfHeight;
    }

    const filename = `${candidateName.toLowerCase().replace(/\s+/g, '_')}_professional_portfolio.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('Failed to generate portfolio PDF via canvas:', error);
    // Fallback: trigger clean print dialog which has A4 print styles configured
    window.print();
  }
};
