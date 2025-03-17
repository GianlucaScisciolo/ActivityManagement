import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem";
import { LavoroAction } from "../../action/LavoroAction";
import { LavoroForms } from "../../forms/LavoroForms";

const FileLavori = () => {
  const lavoroAction = new LavoroAction();
  const lavoroForms = new LavoroForms();
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

  const FormFileTag = (formSession.view === "form") ? FormFileItems : (
    (formSession.view === "card") ? CardFileItems : RowFileItems
  );
  
  return (
    <>
      <Header />

      <div className="main-content" />
      
      <FormFileTag 
        campi={lavoroForms.getCampiFile(
          datiRicerca, 
          (e) => handleInputChange(e, setDatiRicerca), 
          (e) => handleInputClick(e), 
          (e) => handleInputBlur(e) 
        )} 
        indici={lavoroForms.INDICI_FILE} 
        ottieniFileRangePDF={(e) => lavoroAction.handleSearchLavoriRangeFile(e, "pdf", setTipoFile, datiRicerca, lavori, setLavori)}
        ottieniFileRangeExcel={(e) => lavoroAction.handleSearchLavoriRangeFile(e, "excel", setTipoFile, datiRicerca, lavori, setLavori)} 
        eliminaItemsRange={(e) => lavoroAction.handleDeleteLavoriRangeFile(e, datiRicerca)} 
      />
    </>
  );
};

export default FileLavori;