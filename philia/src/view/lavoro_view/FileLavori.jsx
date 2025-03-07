import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { handleInputChange } from "../../vario/Vario";
import { generaFileLavoriPDF, generaFileLavoriExcel } from "../../vario/File";
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem";
import {
  getCampiFile, 
  indiciFile 
} from "./lavoriVario";

const FileLavori = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const [lavori, setLavori] = useState(-1);
  const [tipoFile, setTipoFile] = useState("");
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "lavoro", 
    nome_cliente: "", 
    cognome_cliente: "", 
    primo_giorno: "",
    ultimo_giorno: "",
    descrizione: "",   
    note: ""
  });
  
  const ottieniLavoriRange = async (e, tipoFile) => {
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
        setLavori(result.items);

        if(tipoFile === "pdf") {
          generaFileLavoriPDF(lavori);
        }
        else if(tipoFile === "excel") {
          generaFileLavoriExcel(lavori);
        }
      }
      else {
        alert("Errore durante la ricerca dei lavori, riprova più tardi.");
      }
    }
    else {
      alert("Operazione annullata.");
    }
  }
    
  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i lavori?")) {
      const dati = {
        tipo_item: "lavoro", 
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
        alert("Errore durante l\'eliminazione dei lavori, riprova più tardi."); 
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
        campi={getCampiFile(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciFile} 
        ottieniFileRangePDF={(e) => ottieniLavoriRange(e, "pdf")}
        ottieniFileRangeExcel={(e) => ottieniLavoriRange(e, "excel")} 
        eliminaItemsRange={(e) => handleDelete(e)} 
      />
    </>
  );
};

export default FileLavori;









