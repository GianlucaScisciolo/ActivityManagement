import { useState, useEffect } from "react";
import Header from "../component/Header";
import LavoroAction from "../../action/lavoro_action/LavoroAction";
import { operazioniLavori } from "../../vario/Operazioni";
import lavoroStore from "../../store/lavoro_store/LavoroStore";
import { aggiornamentoLista } from "../../vario/OperazioniRicerca";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PDFLavori = () => {
  const [lavoriClienti, setLavoriClienti] = useState([]);
  const [lavoriProfessionisti, setLavoriProfessionisti] = useState([]);
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(false);
  const [tipoFile, setTipoFile] = useState('');

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
  
  

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  }

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
    const primoGiorno = e.target.primoGiorno.value;
    const ultimoGiorno = e.target.ultimoGiorno.value;
    setTipoFile("PDF");
    await ottieniLavori(primoGiorno, ultimoGiorno);
  };

  const ottieniLavoriExcel = async (e) => {
    e.preventDefault();
    const primoGiorno = e.target.primoGiorno.value;
    const ultimoGiorno = e.target.ultimoGiorno.value;
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

          <button className='buttonForm' onClick={(e) => ottieniLavoriPDF(e)}>Ottieni file PDF</button>
          <button className='buttonForm' onClick={(e) => ottieniLavoriExcel(e)}>Ottieni file Excel</button>
        </form>
        <button onClick={controllo}>Controllo</button>
      </div>
    </>
  );
};

export default PDFLavori;
