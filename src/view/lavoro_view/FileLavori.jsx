import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem";
import { LavoroActions } from "../../actions/LavoroActions";
import { LavoroForms } from "../../forms/LavoroForms";

const FileLavori = () => {
  const lavoroActions = new LavoroActions();
  const lavoroForms = new LavoroForms();
  const formSliceReducer = useSelector((state) => state.formSliceReducer.value);
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

  const FormFileTag = (formSliceReducer.view === "form") ? FormFileItems : (
    (formSliceReducer.view === "card") ? CardFileItems : RowFileItems
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
        ottieniFileRangePDF={(e) => lavoroActions.handleSearchLavoriRangeFile(e, "pdf", setTipoFile, datiRicerca, lavori, setLavori)}
        ottieniFileRangeExcel={(e) => lavoroActions.handleSearchLavoriRangeFile(e, "excel", setTipoFile, datiRicerca, lavori, setLavori)} 
        eliminaItemsRange={(e) => lavoroActions.handleDeleteLavoriRangeFile(e, datiRicerca)} 
      />
    </>
  );
};

export default FileLavori;