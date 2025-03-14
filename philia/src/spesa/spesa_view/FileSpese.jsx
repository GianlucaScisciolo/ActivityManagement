import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../app/app_view/component/Header";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { generaFileSpesePDF, generaFileSpeseExcel } from "../../vario/File";
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem";
import { SpesaAction } from "../spesa_action/SpesaAction.js";

const FileSpese = () => {
  const spesaAction = new SpesaAction();
  const formSession = useSelector((state) => state.formSession.value);
  const [spese, setSpese] = useState(-1);
  const [tipoFile, setTipoFile] = useState("");
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "spesa", 
    nome: "", 
    descrizione: "", 
    totale_min: "", 
    totale_max: "", 
    primo_giorno: "",
    ultimo_giorno: "",
    note: "",
  });
  
  const ottieniSpeseRange = async (e, tipoFile) => {
    e.preventDefault();

    if (confirm("Sei sicuro di voler ottenere il file?")) {
      setTipoFile(tipoFile);
      
      const response = await fetch('/VISUALIZZA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiRicerca),
      });

      if(response.status === 200) {
        const result = await response.json();
        setSpese(result.items);

        if(tipoFile === "pdf") {
          generaFileSpesePDF(spese);
        }
        else if(tipoFile === "excel") {
          generaFileSpeseExcel(spese);
        }
      }
      else {
        alert("Errore durante la ricerca delle spese, riprova più tardi.");
      }
    }
    else {
      alert("Operazione annullata.");
    }
  }
    
  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare le spese?")) {
      const dati = {
        tipo_item: "spesa", 
        "primo_giorno": datiRicerca.primo_giorno, 
        "ultimo_giorno": datiRicerca.ultimo_giorno 
      }
    
      const response = await fetch('/ELIMINA_ITEMS_RANGE_GIORNI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dati),
      });
      if(response.status === 200) {
        alert("Eliminazione completata con successo.");
      }
      else {
        alert("Errore durante l\'eliminazione delle spese, riprova più tardi."); 
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const FormFileTag = (formSession.view === "form") ? FormFileItems : (
    (formSession.view === "card") ? CardFileItems : RowFileItems
  );

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <FormFileTag 
        campi={spesaAction.getCampiFile(
          datiRicerca, 
          (e) => handleInputChange(e, setDatiRicerca), 
          (e) => handleInputClick(e), 
          (e) => handleInputBlur(e) 
        )} 
        indici={spesaAction.INDICI_FILE} 
        ottieniFileRangePDF={(e) => ottieniSpeseRange(e, "pdf")}
        ottieniFileRangeExcel={(e) => ottieniSpeseRange(e, "excel")} 
        eliminaItemsRange={(e) => handleDelete(e)} 
      />
    </>
  );
};

export default FileSpese;









