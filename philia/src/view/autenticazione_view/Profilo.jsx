import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const formSession = useSelector((state) => state.formSession.value);
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [datiProfilo, setDatiProfilo] = useState({
    username_attuale: autenticazioneSession.username, 
    nuovo_username: autenticazioneSession.username, 
    note: (autenticazioneSession.note) ? autenticazioneSession.note : "", 
    password_attuale: "",
    nuova_password: "", 
    conferma_nuova_password: "", 
    errore_nuovo_username: "", 
    errore_note: "", 
    errore_password_attuale: "", 
    errore_nuova_password: "", 
    errore_conferma_nuova_password: "",   
  });
  const dispatch = useDispatch();
  
  const ProfiloTag = (formSession.view === "form") ? FormProfilo : (
    (formSession.view === "card") ? CardProfilo : RowProfilo
  );

  return (
    <>
      <Header />

      <div className="main-content"></div>

      <ProfiloTag  
        campi={autenticazioneForms.getCampiProfilo(datiProfilo, (e) => handleInputChange(e, setDatiProfilo), null, null)} 
        indici={autenticazioneForms.INDICI_PROFILO} 
        // eseguiModificaProfilo={(e) => autenticazioneAction.handleEditProfile(e, autenticazioneSession, setUtente, autenticazioneStore, aggiornamento1, setAggiornamento1)} 
        eseguiModificaProfilo={(e) => autenticazioneAction.handleEditProfile(e, autenticazioneSession, datiProfilo, setDatiProfilo, dispatch)} 
      />
    </>
  )
}

export default Profilo;