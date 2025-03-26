// React e Redux
import React, { useState } from "react";
import { useSelector } from "react-redux";
// View
import Header from "../components/Header";
import { OperazioniForms } from "../forms/OperazioniForms";
import { LavoroForms } from "..forms/LavoroForms";
// Actions
import { LavoroActions } from "../../actions/LavoroActions";
// Riutilizzabile
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem";

const FileLavori = () => {
  const lavoroActions = new LavoroActions();
  const lavoroForms = new LavoroForms();
  const operazioniForms = new OperazioniForms();
  const stileState = useSelector((state) => state.stileSliceReducer.value);
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

  const FormFileTag = (stileState.vistaForm === "form") ? FormFileItems : (
    (stileState.vistaform === "card") ? CardFileItems : RowFileItems
  );
  
  return (
    <>
      <Header />

      <div className="main-content" />
      
      <FormFileTag 
        campi={lavoroForms.getCampiFile(
          datiRicerca, 
          (e) => operazioniForms.handleInputChange(e, setDatiRicerca), 
          (e) => operazioniForms.handleInputClick(e), 
          (e) => operazioniForms.handleInputBlur(e) 
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