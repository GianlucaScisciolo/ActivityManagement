import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { formatoDate, formatoTime } from './Tempo';

export const generaFileLavoriPDF = (lavoriClienti, lavoriProfessionisti) => {
  const doc = new jsPDF();

  // Aggiungi titolo
  doc.setFontSize(18);
  doc.text('Lavori clienti', 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);

  // Aggiungi tabella lavori clienti
  if (lavoriClienti.length > 0) {
    const clientiColumns = ["Nome", "Cognome", "Descrizione", "Giorno", "Orario inizio", "Orario fine", "Note"];
    const clientiRows = lavoriClienti.map(lavoro => [
      lavoro.nome_cliente,
      lavoro.cognome_cliente,
      lavoro.descrizione,
      formatoDate(lavoro.giorno, "GG-MM-AAAA"),
      formatoTime(lavoro.orario_inizio),
      formatoTime(lavoro.orario_fine),
      lavoro.note
    ]);
    autoTable(doc, {
      head: [clientiColumns],
      body: clientiRows,
      startY: 26,
    });
  } else {
    doc.text('Nessun lavoro cliente trovato.', 14, 30);
  }

  // Aggiungi titolo lavori professionisti
  let finalY = doc.lastAutoTable.finalY || 40;
  doc.setFontSize(18);
  doc.text('Lavori professionisti', 14, finalY + 20);

  // Aggiungi tabella lavori professionisti
  if (lavoriProfessionisti.length > 0) {
    const professionistiColumns = ["Nome", "Professione", "Descrizione", "Giorno", "Orario inizio", "Orario fine", "Note"];
    const professionistiRows = lavoriProfessionisti.map(lavoro => [
      lavoro.nome_professionista,
      lavoro.professione,
      lavoro.descrizione,
      formatoDate(lavoro.giorno, "GG-MM-AAAA"),
      formatoTime(lavoro.orario_inizio),
      formatoTime(lavoro.orario_fine),
      lavoro.note
    ]);
    autoTable(doc, {
      head: [professionistiColumns],
      body: professionistiRows,
      startY: finalY + 26,
    });
  } else {
    doc.text('Nessun lavoro professionista trovato.', 14, finalY + 30);
  }

  // Salva il PDF
  doc.save('lavori.pdf');
};

export const generaFileLavoriExcel = async (lavoriClienti, lavoriProfessionisti) => {
  const workbook = new ExcelJS.Workbook();
  const clientiSheet = workbook.addWorksheet('Lavori clienti');
  const professionistiSheet = workbook.addWorksheet('Lavori professionisti');

  // Aggiungi dati a clientiSheet
  if (lavoriClienti.length > 0) {
    clientiSheet.columns = [
      { header: 'Nome', key: 'nome', width: 20 },
      { header: 'Cognome', key: 'cognome', width: 20 },
      { header: 'Descrizione', key: 'descrizione', width: 30 },
      { header: 'Giorno', key: 'giorno', width: 15 },
      { header: 'Orario inizio', key: 'orario_inizio', width: 15 },
      { header: 'Orario fine', key: 'orario_fine', width: 15 },
      { header: 'Note', key: 'note', width: 30 }
    ];
    lavoriClienti.forEach(lavoro => {
      clientiSheet.addRow({
        nome: lavoro.nome_cliente,
        cognome: lavoro.cognome_cliente,
        descrizione: lavoro.descrizione,
        giorno: formatoDate(lavoro.giorno, "GG-MM-AAAA"),
        orario_inizio: formatoTime(lavoro.orario_inizio),
        orario_fine: formatoTime(lavoro.orario_fine),
        note: lavoro.note
      });
    });
  } else {
    clientiSheet.addRow(['Nessun lavoro cliente trovato.']);
  }

  // Aggiungi dati a professionistiSheet
  if (lavoriProfessionisti.length > 0) {
    professionistiSheet.columns = [
      { header: 'Nome', key: 'nome', width: 20 },
      { header: 'Professione', key: 'professione', width: 20 },
      { header: 'Descrizione', key: 'descrizione', width: 30 },
      { header: 'Giorno', key: 'giorno', width: 15 },
      { header: 'Orario inizio', key: 'orario_inizio', width: 15 },
      { header: 'Orario fine', key: 'orario_fine', width: 15 },
      { header: 'Note', key: 'note', width: 30 }
    ];
    lavoriProfessionisti.forEach(lavoro => {
      professionistiSheet.addRow({
        nome: lavoro.nome_professionista,
        professione: lavoro.professione,
        descrizione: lavoro.descrizione,
        giorno: formatoDate(lavoro.giorno, "GG-MM-AAAA"),
        orario_inizio: formatoTime(lavoro.orario_inizio, "GG-MM-AAAA"),
        orario_fine: formatoTime(lavoro.orario_fine, "GG-MM-AAAA"),
        note: lavoro.note
      });
    });
  } else {
    professionistiSheet.addRow(['Nessun lavoro professionista trovato.']);
  }

  // Genera il file Excel come blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Salva il file usando FileSaver.js
  saveAs(blob, 'lavori.xlsx');
  console.log('File Excel generato con successo.');
};