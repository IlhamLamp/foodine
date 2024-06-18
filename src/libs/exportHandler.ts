import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generateInvoicePdf = async (invoiceElementId: string, fileName: string) => {
    try {
        const invoiceElement = document.getElementById(invoiceElementId);
        if (!invoiceElement) {
        throw new Error(`Element with ID "${invoiceElementId}" not found.`);
        }

        const canvas = await html2canvas(invoiceElement, {logging: true, useCORS: true});
        const imgWidth = 200;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, 'FAST');
        pdf.save(fileName);
    } catch (error) {
        console.error('Error generating invoice PDF:', error);
    }
};
