// React e Redux
import { PDFDocument, StandardFonts } from 'pdf-lib';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// Utils
import { formatoDate } from './Tempo';
import { rgb } from 'pdf-lib';

const getDescrizione = (lavoro) => {
  let descrizione = "";
  for(let collegamento of lavoro.collegamenti) {
    descrizione += collegamento["nome_servizio"] + ": " + collegamento["prezzo_servizio"] + " € x " + collegamento["quantita"] + ", ";
  }
  return descrizione.substring(0, descrizione.length-2) + ".";
};

export const generaFileLavoriPDF = async (lavori) => {

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  let y = 750;
  const startX = 50;

  // Funzione per avvolgere il testo
  const wrapText = (text, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let line = '';

    words.forEach((word) => {
      const potentialLine = line.length === 0 ? word : line + ' ' + word;
      if (potentialLine.length <= maxWidth) {
        line = potentialLine;
      } else {
        lines.push(line);
        line = word;
      }
    });
    if (line) {
      lines.push(line);
    }
    return lines;
  };

  // Colore per intestazioni
  const headerColor = rgb(0.8, 0.8, 1); // Celeste

  // Disegna sfondo per intestazioni
  page.drawRectangle({
    x: startX,
    y: y - 20,
    width: 500,
    height: 20,
    color: headerColor,
  });

  // Intestazione della tabella
  const headers = ['Cliente', 'Giorno', 'Descrizione', 'Totale (€)', 'Note'];
  headers.forEach((header, index) => {
    page.drawText(header, {
      x: startX + index * 100,
      y: y - 15,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0), // Testo nero
    });
  });
  y -= 40;

  // Colori alternati per le righe
  const rowColor1 = rgb(1, 1, 1); // Bianco
  const rowColor2 = rgb(0.9, 0.9, 0.9); // Grigio chiaro

  // Contenuto della tabella
  if (lavori.length > 0) {
    lavori.forEach((lavoro, rowIndex) => {
      const rowColor = rowIndex % 2 === 0 ? rowColor1 : rowColor2;

      // Disegna sfondo della riga
      page.drawRectangle({
        x: startX,
        y: y - 20,
        width: 500,
        height: 20,
        color: rowColor,
      });

      // Testo della riga con avvolgimento
      const values = [
        lavoro.cliente,
        lavoro.giorno,
        getDescrizione(lavoro),
        lavoro.totale + " €",
        lavoro.note,
      ];
      values.forEach((value, index) => {
        const lines = wrapText(String(value), 15); // Limite di caratteri per colonna
        lines.forEach((line, lineIndex) => {
          page.drawText(line, {
            x: startX + index * 100,
            y: y - 15 - (lineIndex * 12), // Spazio tra righe avvolte
            size: 12,
            font: timesRomanFont,
            color: rgb(0, 0, 0), // Testo nero
          });
        });
      });
      y -= 20 + (wrapText(values.join(''), 15).length * 12); // Adatta altezza
    });
  } else {
    page.drawText('Nessun lavoro trovato.', { x: startX, y, size: 12, font: timesRomanFont });
  }

  const pdfBytes = await pdfDoc.save();

  // Creazione del blob e download del file
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
  const startX = 50;

  // Funzione per avvolgere il testo
  const wrapText = (text, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let line = '';

    words.forEach((word) => {
      const potentialLine = line.length === 0 ? word : line + ' ' + word;
      if (potentialLine.length <= maxWidth) {
        line = potentialLine;
      } else {
        lines.push(line);
        line = word;
      }
    });
    if (line) {
      lines.push(line);
    }
    return lines;
  };

  // Colore per intestazioni
  const headerColor = rgb(0.8, 0.8, 1); // Celeste

  // Disegna sfondo per intestazioni
  page.drawRectangle({
    x: startX,
    y: y - 20,
    width: 500,
    height: 20,
    color: headerColor,
  });

  // Intestazione della tabella
  const headers = ['Nome', 'Giorno', 'Descrizione', 'Totale (€)', 'Note'];
  headers.forEach((header, index) => {
    page.drawText(header, {
      x: startX + index * 100,
      y: y - 15,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0), // Testo nero
    });
  });
  y -= 40;

  // Colori alternati per le righe
  const rowColor1 = rgb(1, 1, 1); // Bianco
  const rowColor2 = rgb(0.9, 0.9, 0.9); // Grigio chiaro

  // Contenuto della tabella
  if (spese.length > 0) {
    spese.forEach((spesa, rowIndex) => {
      const rowColor = rowIndex % 2 === 0 ? rowColor1 : rowColor2;

      // Disegna sfondo della riga
      page.drawRectangle({
        x: startX,
        y: y - 20,
        width: 500,
        height: 20,
        color: rowColor,
      });

      // Testo della riga con avvolgimento
      const values = [
        spesa.nome,
        spesa.giorno,
        spesa.descrizione,
        spesa.totale,
        spesa.note,
      ];
      values.forEach((value, index) => {
        const lines = wrapText(String(value), 15); // Limite di caratteri per colonna
        lines.forEach((line, lineIndex) => {
          page.drawText(line, {
            x: startX + index * 100,
            y: y - 15 - (lineIndex * 12), // Spazio tra righe avvolte
            size: 12,
            font: timesRomanFont,
            color: rgb(0, 0, 0), // Testo nero
          });
        });
      });
      y -= 20 + (wrapText(values.join(''), 15).length * 12); // Adatta altezza
    });
  } else {
    page.drawText('Nessuna spesa trovata.', { x: startX, y, size: 12, font: timesRomanFont });
  }

  const pdfBytes = await pdfDoc.save();

  // Creazione del blob e download del file
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
        descrizione: getDescrizione(lavoro),
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









