import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { handleInputChange } from "../../vario/Vario";
import { AutenticazioneAction } from "../../action/AutenticazioneAction"
import { AutenticazioneForms } from "../../forms/AutenticazioneForms";
import { FormProfilo } from "../../riutilizzabile/form_item/FormItem";
import { CardProfilo } from "../../riutilizzabile/card_item/CardItem";
import { RowProfilo } from "../../riutilizzabile/row_item/RowItem";

const Profilo = () => {
  const autenticazioneAction = new AutenticazioneAction();
  const autenticazioneForms = new AutenticazioneForms();
  const formReducer = useSelector((state) => state.formReducer.value);
  const autenticazioneReducer = useSelector((state) => state.autenticazioneReducer.value);
  const [datiProfilo, setDatiProfilo] = useState({
    username_attuale: autenticazioneReducer.username, 
    nuovo_username: autenticazioneReducer.username, 
    note: (autenticazioneReducer.note) ? autenticazioneReducer.note : "", 
    password_attuale: "",
    nuova_password: "", 
    conferma_nuova_password: "", 
    errore_nuovo_username: "", 
    errore_note: "", 
    errore_password_attuale: "", 
    errore_nuova_password: "", 
    errore_conferma_nuova_password: "",   
  });
  
  const ProfiloTag = (formReducer.view === "form") ? FormProfilo : (
    (formReducer.view === "card") ? CardProfilo : RowProfilo
  );

  return (
    <>
      <Header />

      <div className="main-content"></div>

      <ProfiloTag  
        campi={autenticazioneForms.getCampiProfilo(datiProfilo, (e) => handleInputChange(e, setDatiProfilo), null, null)} 
        indici={autenticazioneForms.INDICI_PROFILO} 
        eseguiModificaProfilo={(e) => autenticazioneAction.modificaProfilo(e, autenticazioneReducer, datiProfilo, setDatiProfilo)} 
      />
    </>
  )
}

export default Profilo;