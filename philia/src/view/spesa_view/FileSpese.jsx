import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header.jsx";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario.js";
import { FormFileItems } from "../../riutilizzabile/form_item/FormItem.jsx";
import { CardFileItems } from "../../riutilizzabile/card_item/CardItem.jsx";
import { RowFileItems } from "../../riutilizzabile/row_item/RowItem.jsx";
import { SpesaAction } from "../../action/SpesaAction.js";
import { SpesaForms } from "../../forms/SpesaForms.js"

const FileSpese = () => {
  const spesaAction = new SpesaAction();
  const spesaForms = new SpesaForms();
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
  
  const FormFileTag = (formSession.view === "form") ? FormFileItems : (
    (formSession.view === "card") ? CardFileItems : RowFileItems
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
        ottieniFileRangePDF={(e) => spesaAction.handleSearchSpeseRangeFile(e, "pdf", setTipoFile, datiRicerca, spese, setSpese)}
        ottieniFileRangeExcel={(e) => spesaAction.handleSearchSpeseRangeFile(e, "excel", setTipoFile, datiRicerca, spese, setSpese)} 
        eliminaItemsRange={(e) => spesaAction.handleDeleteSpeseRangeFile(e, datiRicerca)} 
      />
    </>
  );
};

export default FileSpese;









