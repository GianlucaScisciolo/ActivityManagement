import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header.jsx";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario.js";
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem.jsx";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem.jsx";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem.jsx";
import { SpesaActions } from "../../actions/SpesaActions.js";
import { SpesaForms } from "../../forms/SpesaForms.js"

const FileSpese = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
  const formSliceReducer = useSelector((state) => state.formSliceReducer.value);
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
  
  const FormFileTag = (formSliceReducer.view === "form") ? FormFileItems : (
    (formSliceReducer.view === "card") ? CardFileItems : RowFileItems
  );

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <FormFileTag 
        campi={spesaForms.getCampiFile(
          datiRicerca, 
          (e) => handleInputChange(e, setDatiRicerca), 
          (e) => handleInputClick(e), 
          (e) => handleInputBlur(e) 
        )} 
        indici={spesaForms.INDICI_FILE} 
        ottieniFileRangePDF={(e) => spesaActions.handleSearchSpeseRangeFile(e, "pdf", setTipoFile, datiRicerca, spese, setSpese)}
        ottieniFileRangeExcel={(e) => spesaActions.handleSearchSpeseRangeFile(e, "excel", setTipoFile, datiRicerca, spese, setSpese)} 
        eliminaItemsRange={(e) => spesaActions.handleDeleteSpeseRangeFile(e, datiRicerca)} 
      />
    </>
  );
};

export default FileSpese;









