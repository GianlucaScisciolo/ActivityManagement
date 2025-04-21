// React e Redux
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// Utils
import { formatoDate } from './Tempo';

export const generaFileLavoriPDF = async (lavori) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  let y = 750;
  page.drawText('Lavori', { x: 50, y, size: 18, font: timesRomanFont });
  y -= 30;

  if (lavori.length > 0) {
    lavori.forEach((lavoro) => {
      const text = `${lavoro.cliente} | ${lavoro.giorno} | ${lavoro.descrizione} | ${lavoro.totale} € | ${lavoro.note}`;
      page.drawText(text, { x: 50, y, size: 12, font: timesRomanFont });
      y -= 20;
    });
  } else {
    page.drawText('Nessun lavoro trovato.', { x: 50, y, size: 12, font: timesRomanFont });
  }

  const pdfBytes = await pdfDoc.save();
  
  // Creiamo un blob e forziamo il download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'lavori.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generaFileSpesePDF = async (spese) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  let y = 750;
  page.drawText('Spese', { x: 50, y, size: 18, font: timesRomanFont });
  y -= 30;

  if (spese.length > 0) {
    spese.forEach((spesa) => {
      const text = `${spesa.nome} | ${spesa.giorno} | ${spesa.descrizione} | ${spesa.totale} € | ${spesa.note}`;
      page.drawText(text, { x: 50, y, size: 12, font: timesRomanFont });
      y -= 20;
    });
  } else {
    page.drawText('Nessuna spesa trovata.', { x: 50, y, size: 12, font: timesRomanFont });
  }
  
  const pdfBytes = await pdfDoc.save();
  
  // Creiamo un blob e forziamo il download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'spese.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generaFileLavoriExcel = async (lavori) => {
  const workbook = new ExcelJS.Workbook();
  const lavoriSheet = workbook.addWorksheet('Lavori');

  // Aggiungo i dati al foglio lavoriSheet
  if (lavori.length > 0) {
    lavoriSheet.columns = [
      { header: 'Cliente', key: 'cliente', width: 20 },  
      { header: 'Giorno', key: 'giorno', width: 20 }, 
      { header: 'Descrizione', key: 'descrizione', width: 30 }, 
      { header: 'Totale', key: 'totale', width: 10 }, 
      { header: 'Note', key: 'note', width: 30 }
    ];
    lavori.forEach(lavoro => {
      lavoriSheet.addRow({
        cliente: lavoro.cliente, 
        giorno: lavoro.giorno, 
        descrizione: lavoro.descrizione.substring(0, lavoro.descrizione.length-2),
        totale: lavoro.totale + " €",
        note: lavoro.note
      });
    });
  } 
  else {
    lavoriSheet.addRow(['Nessun lavoro trovato.']);
  }

  // Genero il file Excel come blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Salvo il file usando FileSaver.js
  saveAs(blob, 'lavori.xlsx');
  console.log('File Excel generato con successo.');
};

export const generaFileSpeseExcel = async (spese) => {
  const workbook = new ExcelJS.Workbook();
  const speseSheet = workbook.addWorksheet('Spese');

  // Aggiungo i dati al foglio speseSheet
  if (spese.length > 0) {
    speseSheet.columns = [
      { header: 'Nome', key: 'nome', width: 20 },  
      { header: 'Giorno', key: 'giorno', width: 20 }, 
      { header: 'Descrizione', key: 'descrizione', width: 30 }, 
      { header: 'Totale', key: 'totale', width: 10 }, 
      { header: 'Note', key: 'note', width: 30 }
    ];
    spese.forEach(spesa => {
      speseSheet.addRow({
        nome: spesa.nome, 
        giorno: formatoDate(spesa.giorno, "GG-MM-AAAA"), 
        descrizione: spesa.descrizione, 
        totale: spesa.totale + " €", 
        note: spesa.note 
      });
    });
  } 
  else {
    speseSheet.addRow(['Nessuna spesa trovata.']);
  }

  // Genero il file Excel come blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Salvo il file usando FileSaver.js
  saveAs(blob, 'spese.xlsx');
  console.log('File Excel generato con successo.');
};









