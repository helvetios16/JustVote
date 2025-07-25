import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { VotingEvent } from '@/shared/interfaces/votingEvent.interface';
import type { ParticipantResult } from '@/shared/interfaces/participantResult.interface';
import type { Option } from '@/shared/interfaces/option.interface';

/**
 * Genera un archivo PDF con el reporte de votación y lo descarga automáticamente
 */
export async function generateVotingReportPDF(
  votingEvent: VotingEvent,
  options: Option[],
  participants: ParticipantResult[],
  outputFileName: string = 'voting-report.pdf'
) {
  try {
    // Crear nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // Tamaño A4
    
    // Obtener fuentes
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    const { width, height } = page.getSize();
    let yPosition = height - 50;
    
    // Título del documento
    page.drawText('REPORTE DE VOTACIÓN', {
      x: 50,
      y: yPosition,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0.8)
    });
    
    yPosition -= 40;
    
    // Información del evento
    page.drawText('INFORMACIÓN DEL EVENTO', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 25;
    
    page.drawText(`Título: ${votingEvent.title}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font
    });
    
    yPosition -= 20;
    
    page.drawText(`Descripción: ${votingEvent.description}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: font,
      maxWidth: 500
    });
    
    yPosition -= 20;
    
    page.drawText(`Creado por: ${votingEvent.userName}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font
    });
    
    yPosition -= 20;
    
    page.drawText(`Estado: ${votingEvent.status}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font
    });
    
    yPosition -= 20;
    
    page.drawText(`Período: ${new Date(votingEvent.startTime).toLocaleDateString()} - ${new Date(votingEvent.endTime).toLocaleDateString()}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font
    });
    
    yPosition -= 40;
    
    // Opciones de votación
    page.drawText('OPCIONES DE VOTACIÓN', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 25;
    
    options.forEach((option, index) => {
      page.drawText(`${index + 1}. ${option.label}`, {
        x: 70,
        y: yPosition,
        size: 12,
        font: font
      });
      yPosition -= 20;
    });
    
    yPosition -= 20;
    
    // Participantes
    page.drawText('PARTICIPANTES', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 25;
    
    page.drawText('Total de participantes que han votado:', {
      x: 50,
      y: yPosition,
      size: 12,
      font: boldFont
    });
    
    yPosition -= 20;
    
    participants.forEach((participant, index) => {
      page.drawText(`• ${participant.name} (${participant.status})`, {
        x: 70,
        y: yPosition,
        size: 11,
        font: font
      });
      yPosition -= 18;
    });
    
    yPosition -= 30;
    
    // Resumen
    page.drawText('RESUMEN', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 25;
    
    page.drawText(`Total de opciones: ${options.length}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font
    });
    
    yPosition -= 20;
    
    page.drawText(`Total de participantes: ${participants.length}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font
    });
    
    yPosition -= 20;
    
    page.drawText(`Fecha de generación: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font
    });
    
    // Generar el PDF
    const pdfBytes = await pdfDoc.save();
    
    // Crear un blob con los datos del PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = outputFileName;
    
    // Simular clic en el enlace para descargar
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log(`✅ PDF generado y descargado exitosamente: ${outputFileName}`);
    console.log('\nDatos utilizados:');
    console.log('- Evento:', votingEvent.title);
    console.log('- Opciones:', options.length);
    console.log('- Participantes:', participants.length);
    
    return pdfBytes;
    
  } catch (error) {
    console.error('❌ Error generando el PDF:', error);
    throw error;
  }
}