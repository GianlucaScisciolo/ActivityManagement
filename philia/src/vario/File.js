import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { formatoDate, formatoTime } from './Tempo';

export const generaFileLavoriPDF = (lavori) => {
  const doc = new jsPDF();

  // Aggiungo il titolo
  doc.setFontSize(18);
  doc.text('Lavori', 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);

  // Aggiungo la tabella dei lavori
  if (lavori.length > 0) {
    const lavoriColumns = ["Cliente", "Giorno", "Descrizione", "Note"];
    const lavoriRows = lavori.map(lavoro => [
      lavoro.cliente, 
      lavoro.giorno, 
      lavoro.descrizione, 
      lavoro.note 
    ]);
    autoTable(doc, {
      head: [lavoriColumns],
      body: lavoriRows,
      startY: 26,
    });
  } 
  else {
    doc.text('Nessun lavoro trovato.', 14, 30);
  }

  // Salvo il PDF
  doc.save('lavori.pdf');
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
      { header: 'Note', key: 'note', width: 30 }
    ];
    lavori.forEach(lavoro => {
      lavoriSheet.addRow({
        cliente: lavoro.cliente, 
        giorno: lavoro.giorno, 
        descrizione: lavoro.descrizione,
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