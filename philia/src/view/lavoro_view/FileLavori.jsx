import { useState, useEffect } from "react";
import Header from "../component/Header";
import LavoroAction from "../../action/lavoro_action/LavoroAction";
import { operazioniLavori } from "../../vario/Operazioni";
import lavoroStore from "../../store/lavoro_store/LavoroStore";
import { aggiornamentoLista } from "../../vario/OperazioniRicerca";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatoDate, formatoTime } from "../../vario/Tempo";
import { generaFileLavoriPDF, generaFileLavoriExcel } from "../../vario/File";

const FileLavori = () => {
  const [lavoriClienti, setLavoriClienti] = useState(-1);
  const [lavoriProfessionisti, setLavoriProfessionisti] = useState(-1);
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState("");
  const [tipoFile, setTipoFile] = useState('');
  const [eliminaLavori, setEliminaLavori] = useState(false);
  const [primoGiorno, setPrimoGiorno] = useState("");
  const [ultimoGiorno, setUltimoGiorno] = useState("");
  
  const updateDatiLastSearch = () => {
    console.log("Dati aggiornati.");
  };

  const ottieniLavori = async () => {
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

    setAggiornamentoCompletato(false);
  };

  useEffect(() => {
    if (!aggiornamentoCompletato) {
      aggiornamentoLista("lavori", setLavoriClienti, setLavoriProfessionisti, updateDatiLastSearch);
      console.log("Aggiornamento in corso ...");
    }
  }, [!aggiornamentoCompletato]);

  useEffect(() => {
    if (!aggiornamentoCompletato && (lavoriClienti !== -1 && lavoriProfessionisti !== -1)) {
      setAggiornamentoCompletato(true);
      console.log("Aggiornamento completato.")
      if(tipoFile === "pdf")
        generaFileLavoriPDF(lavoriClienti, lavoriProfessionisti);
      else if(tipoFile === "excel")
        generaFileLavoriExcel(lavoriClienti, lavoriProfessionisti);
      if(eliminaLavori === true) {
        const dati = {
          "primo_giorno": primoGiorno,
          "ultimo_giorno": ultimoGiorno
        }
        LavoroAction.dispatchAction(dati, operazioniLavori.ELIMINA_LAVORI_RANGE_GIORNI);
      }
    }
  }, [lavoriClienti, lavoriProfessionisti]);

  const ottieniLavoriRange = async (e, tipoFile, eliminaLavori) => {
    e.preventDefault();
    setEliminaLavori(false);
    if (confirm("Sei sicuro di voler ottenere il file?")) {
      const form = e.currentTarget.closest('form'); // Trova il form più vicino
      setPrimoGiorno(formatoDate(form.querySelector('input[name="primoGiorno"]').value, "AAAA-MM-GG"));
      setUltimoGiorno(formatoDate(form.querySelector('input[name="ultimoGiorno"]').value, "AAAA-MM-GG"));
      setTipoFile(tipoFile);
      setEliminaLavori(eliminaLavori);
      await ottieniLavori();
    }
    else {
      alert("Operazione annullata.");
    }
  };

  const controllo = () => {
    alert("Numero lavori clienti = " + lavoriClienti.length + "\nNumero lavori professionisti = " + lavoriProfessionisti.length);
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <form className='containerForm'>
          <label className='titoloForm'>Creazione file lavori</label>

          <label className='labelForm'>Primo giorno</label>
          <input className='inputFormModifica' type='date' name='primoGiorno' />
          <span className='spanErrore'></span>

          <label className='labelForm'>Ultimo giorno</label>
          <input className='inputFormModifica' type='date' name='ultimoGiorno' />
          <span className='spanErrore'></span>
          {/* bottoni */}
          <Row className='custom-row'>
            <Col>
              <button className='buttonForm' onClick={(e) => ottieniLavoriRange(e, "pdf", false)}>Ottieni file PDF</button>
            </Col>
            <Col>
              <button className='buttonForm' onClick={(e) => ottieniLavoriRange(e, "excel", false)}>Ottieni file Excel</button>
            </Col>
          </Row>
          <Row className='custom-row'>
            <Col>
              <button className='buttonForm' onClick={(e) => ottieniLavoriRange(e, "pdf", true)}>Ottieni file PDF ed elimina i lavori</button>
            </Col>
            <Col>
              <button className='buttonForm' onClick={(e) => ottieniLavoriRange(e, "excel", true)}>Ottieni file Excel ed elimina i lavori</button>
            </Col>
          </Row>
        </form>
        {/* <button onClick={controllo}>Controllo</button> */}
      </div>
    </>
  );
};

export default FileLavori;









{/* <Row className='custom-row'>
      <Col style={{marginLeft:'45%', marginRight:'45%'}} className='custom-col-black'>
        <div className='icon-container' onClick={() => handleClickChangeViewElements({viewElements, setViewElements})}>
          {
            viewElements === "list" 
              ? <WalletCards className='icon-view-style' id='walletCards' size={40} />
              : <List className='icon-view-style' id='walletCards' size={40} />
          }
        </div>
      </Col>
    </Row> */}