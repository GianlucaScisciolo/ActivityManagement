import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { OperazioniForms } from "../../view/forms/OperazioniForms";
import { AutenticazioneActions } from "../../actions/AutenticazioneActions"
import { AutenticazioneForms } from "../../view/forms/AutenticazioneForms";
import { FormProfilo } from "../../riutilizzabile/form_item/FormItem";
import { CardProfilo } from "../../riutilizzabile/card_item/CardItem";
import { RowProfilo } from "../../riutilizzabile/row_item/RowItem";

const Profilo = () => {
  const autenticazioneActions = new AutenticazioneActions();
  const autenticazioneForms = new AutenticazioneForms();
  const operazioniForms = new OperazioniForms();
  const formSliceReducer = useSelector((state) => state.formSliceReducer.value);
  const autenticazioneSliceReducer = useSelector((state) => state.autenticazioneSliceReducer.value);
  const [datiProfilo, setDatiProfilo] = useState({
    username_attuale: autenticazioneSliceReducer.username, 
    nuovo_username: autenticazioneSliceReducer.username, 
    note: (autenticazioneSliceReducer.note) ? autenticazioneSliceReducer.note : "", 
    password_attuale: "",
    nuova_password: "", 
    conferma_nuova_password: "", 
    errore_nuovo_username: "", 
    errore_note: "", 
    errore_password_attuale: "", 
    errore_nuova_password: "", 
    errore_conferma_nuova_password: "",   
  });
  
  const ProfiloTag = (formSliceReducer.view === "form") ? FormProfilo : (
    (formSliceReducer.view === "card") ? CardProfilo : RowProfilo
  );

  return (
    <>
      <Header />

      <div className="main-content"></div>

      <ProfiloTag  
        campi={autenticazioneForms.getCampiProfilo(datiProfilo, (e) => operazioniForms.handleInputChange(e, setDatiProfilo), null, null)} 
        indici={autenticazioneForms.INDICI_PROFILO} 
        eseguiModificaProfilo={(e) => autenticazioneActions.modificaProfilo(e, autenticazioneSliceReducer, datiProfilo, setDatiProfilo)} 
      />
    </>
  )
}

export default Profilo;