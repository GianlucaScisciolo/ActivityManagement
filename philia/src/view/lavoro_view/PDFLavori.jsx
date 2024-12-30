import { useState, useEffect } from "react";
import Header from "../component/Header";
import LavoroAction from "../../action/lavoro_action/LavoroAction";
import { operazioniLavori } from "../../vario/Operazioni";
import lavoroStore from "../../store/lavoro_store/LavoroStore";
import { aggiornamentoLista } from "../../vario/OperazioniRicerca";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const PDFLavori = () => {
  const [lavoriClienti, setLavoriClienti] = useState([]);
  const [lavoriProfessionisti, setLavoriProfessionisti] = useState([]);
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(false);
  const [tipoFile, setTipoFile] = useState('');

    const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  }

  const generatePDF = (lavoriClienti, lavoriProfessionisti) => {
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
        formatDate(lavoro.giorno),
        formatTime(lavoro.orario_inizio),
        formatTime(lavoro.orario_fine),
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
        formatDate(lavoro.giorno),
        formatTime(lavoro.orario_inizio),
        formatTime(lavoro.orario_fine),
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

  const generateExcel = async (lavoriClienti, lavoriProfessionisti) => {
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
          giorno: formatDate(lavoro.giorno),
          orario_inizio: formatTime(lavoro.orario_inizio),
          orario_fine: formatTime(lavoro.orario_fine),
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
          giorno: formatDate(lavoro.giorno),
          orario_inizio: formatTime(lavoro.orario_inizio),
          orario_fine: formatTime(lavoro.orario_fine),
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

  const updateDatiLastSearch = () => {
    console.log("Dati aggiornati.");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Aggiornamenti per gestire i campi input possono essere aggiunti qui.
  };

  const ottieniLavori = async (primoGiorno, ultimoGiorno) => {
    lavoroStore.azzeraLavori(); // rende lavoriClienti e lavoriProfessionisti === -1
    const datiRicerca = {
      nome_cliente: "",
      cognome_cliente: "",
      nome_professionista: "",
      professione: "",
      descrizione: "",
      primo_giorno: primoGiorno,
      ultimo_giorno: ultimoGiorno,
      note: "",
    };

    await LavoroAction.dispatchAction(datiRicerca, operazioniLavori.VISUALIZZA_LAVORI_CLIENTI);
    await LavoroAction.dispatchAction(datiRicerca, operazioniLavori.VISUALIZZA_LAVORI_PROFESSIONISTI);

    setAggiornamentoCompletato(true);
  };

  useEffect(() => {
    if (aggiornamentoCompletato) {
      aggiornamentoLista("lavori", setLavoriClienti, setLavoriProfessionisti, updateDatiLastSearch);
    }
  }, [aggiornamentoCompletato]);

  useEffect(() => {
    if (aggiornamentoCompletato && (lavoriClienti !== -1 || lavoriProfessionisti !== -1)) {
      setAggiornamentoCompletato(false);
      if(tipoFile === "PDF")
        generatePDF(lavoriClienti, lavoriProfessionisti);
      else if(tipoFile === "Excel")
        generateExcel(lavoriClienti, lavoriProfessionisti);
    }
  }, [lavoriClienti, lavoriProfessionisti]);

  const ottieniLavoriPDF = async (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form'); // Trova il form più vicino
    const primoGiorno = form.querySelector('input[name="primoGiorno"]').value;
    const ultimoGiorno = form.querySelector('input[name="ultimoGiorno"]').value;
    setTipoFile("PDF");
    await ottieniLavori(primoGiorno, ultimoGiorno);
  };
  
  const ottieniLavoriExcel = async (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form'); // Trova il form più vicino
    const primoGiorno = form.querySelector('input[name="primoGiorno"]').value;
    const ultimoGiorno = form.querySelector('input[name="ultimoGiorno"]').value;
    setTipoFile("Excel");
    await ottieniLavori(primoGiorno, ultimoGiorno);
  };

  const controllo = () => {
    alert("Numero lavori clienti = " + lavoriClienti.length + "\nNumero lavori professionisti = " + lavoriProfessionisti.length);
  };

  return (
    <>
      <Header />
      <div>
        <form className='containerForm'>
          <label className='titoloForm'>Creazione PDF lavori</label>

          <label className='labelForm'>Primo giorno</label>
          <input className='inputFormModifica' type='date' name='primoGiorno' />
          <span className='spanErrore'></span>

          <label className='labelForm'>Ultimo giorno</label>
          <input className='inputFormModifica' type='date' name='ultimoGiorno' />
          <span className='spanErrore'></span>
          {/* bottoni */}
          <button className='buttonForm' onClick={(e) => ottieniLavoriPDF(e)}>Ottieni file PDF</button>
          <button className='buttonForm' onClick={(e) => ottieniLavoriExcel(e)}>Ottieni file Excel</button>
        </form>
        <button onClick={controllo}>Controllo</button>
      </div>
    </>
  );
};

export default PDFLavori;