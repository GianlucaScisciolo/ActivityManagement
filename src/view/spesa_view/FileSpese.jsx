// React e Redux
import React, { useState } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header.jsx";
import { OperazioniForms } from "../forms/OperazioniForms.js";
import { SpesaForms } from "../forms/SpesaForms.js"
// Actions
import { SpesaActions } from "../../actions/SpesaActions.js";
// Riutilizzabile
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem.jsx";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem.jsx";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem.jsx";

const FileSpese = () => {
  const spesaActions = new SpesaActions();
  const spesaForms = new SpesaForms();
  const operazioniForms = new OperazioniForms();
  const stileState = useSelector((state) => state.stileSliceReducer.value);
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
  
  const FormFileTag = (stileState.vistaForm === "form") ? FormFileItems : (
    (stileState.vistaForm === "card") ? CardFileItems : RowFileItems
  );

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <FormFileTag 
        campi={spesaForms.getCampiFile(
          datiRicerca, 
          (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
          (e) => operazioniForms.handleInputClick(e), 
          (e) => operazioniForms.handleInputBlur(e) 
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









