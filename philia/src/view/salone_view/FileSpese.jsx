import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { handleInputChange } from "../../vario/Vario";
import SaloneAction from "../../action/salone_action/SaloneAction";
import { operazioniSaloni } from "../../vario/Operazioni";
import saloneStore from "../../store/salone_store/SaloneStore";
import { aggiornamentoLista } from "../../vario/OperazioniRicerca";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { formatoDate, formatoTime } from "../../vario/Tempo";
import { generaFileSpesePDF, generaFileSpeseExcel } from "../../vario/File";
// import { FormFileLavori } from "../component/form_item/FormsLavori";
// import { CardFileLavori } from "../component/card_item/CardsLavori";
// import { RowFileLavori } from "../component/row_item/RowsLavori";
import { FormFileItems } from "../../trasportabile/form_item/FormItem";
import { 
  getCampiFile, 
  indiciFile
} from "./SpeseVario";

const FileSpese = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  
  const [datiRicerca, setDatiRicerca] = useState({
    nome: "", 
    descrizione: "", 
    totale_min: "", 
    totale_max: "", 
    primo_giorno: "",
    ultimo_giorno: "",
    note: "",
  });
  const [spese, setSpese] = useState(-1);
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState("");
  const [tipoFile, setTipoFile] = useState('');
    
  const ottieniSpese = async () => {
    saloneStore.setSpese();
    await SaloneAction.dispatchAction(datiRicerca, operazioniSaloni.VISUALIZZA_SPESE);
    setAggiornamentoCompletato(false);
  };

  const ottieniSpeseRange = async (e, tipoFile) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler ottenere il file?")) {
      setTipoFile(tipoFile);
      await ottieniSpese();
    }
    else {
      alert("Operazione annullata.");
    }
  };

  const eliminaSpeseRange = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare le spese?")) {
      SaloneAction.dispatchAction(datiRicerca, operazioniSaloni.ELIMINA_SPESE_RANGE_GIORNI);
      alert("Eliminazione effettuata.");

      setDatiRicerca(prevState => ({
        ...prevState,
        primo_giorno: "", 
        ultimo_giorno: ""
      }));
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const FormFileTag = FormFileItems; 
  
  useEffect(() => {
    if (aggiornamentoCompletato === false) {
      aggiornamentoLista("spese", setSpese);
      console.log("Aggiornamento in corso ...");
    }
  }, [aggiornamentoCompletato]);

  useEffect(() => {
    if (aggiornamentoCompletato === false && spese !== -1) {
      setAggiornamentoCompletato(true);
      console.log("Aggiornamento completato.")
      if(tipoFile === "pdf") {
        generaFileSpesePDF(spese);
      }
      else if(tipoFile === "excel") {
        generaFileSpeseExcel(spese);
      }
      setDatiRicerca(prevState => ({
        ...prevState,
        primo_giorno: "", 
        ultimo_giorno: ""
      }));
    }
  }, [spese]);
  
  return (
    <>
      <Header />

      <div className="main-content" />
      
      <FormFileTag 
        campi={getCampiFile(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciFile} 
        ottieniFileRangePDF={(e) => ottieniSpeseRange(e, "pdf")}
        ottieniFileRangeExcel={(e) => ottieniSpeseRange(e, "excel")} 
        eliminaItemsRange={(e) => eliminaSpeseRange(e)} 
      />

      {/*
        campi={getCampiRicercaLavori(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaLavori}
        eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)}
      {(formSession.view === "form") && (
        <FormFileLavori 
          item={datiRicerca} 
          setItem={setDatiRicerca} 
          ottieniLavoriRangePDF={(e) => ottieniLavoriRange(e, "pdf")}
          ottieniLavoriRangeExcel={(e) => ottieniLavoriRange(e, "excel")} 
          eliminaLavoriRange={(e) => eliminaLavoriRange(e)}
        />
      )}
      {(formSession.view === "row") && (
        <RowFileLavori 
          item={datiRicerca} 
          setItem={setDatiRicerca}
          ottieniLavoriRangePDF={(e) => ottieniLavoriRange(e, "pdf")}
          ottieniLavoriRangeExcel={(e) => ottieniLavoriRange(e, "excel")} 
          eliminaLavoriRange={(e) => eliminaLavoriRange(e)} 
        />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardFileLavori 
            item={datiRicerca} 
            setItem={setDatiRicerca} 
            ottieniLavoriRangePDF={(e) => ottieniLavoriRange(e, "pdf")}
            ottieniLavoriRangeExcel={(e) => ottieniLavoriRange(e, "excel")} 
            eliminaLavoriRange={(e) => eliminaLavoriRange(e)} 
          />
        </center>
      )}
      */}
    </>
  );
};

export default FileSpese;









