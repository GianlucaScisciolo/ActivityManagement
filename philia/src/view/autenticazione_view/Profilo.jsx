import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../component/Header";
import { handleInputChange } from "../../vario/Vario";
import { login, modificaProfilo } from "../../vario/OperazioniAutenticazione";
import autenticazioneStore from "../../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "../../vario/Operazioni";
import { controlloProfilo } from "../../vario/Controlli";
import { eseguiModificaAutenticazioneSession } from "../../store/redux/AutenticazioneSessionSlice";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FormProfilo } from "../../trasportabile/form_item/FormItem";
import { CardProfilo } from "../../trasportabile/card_item/CardItem";
import { RowProfilo } from "../../trasportabile/row_item/RowItem";
import { 
  getCampiProfilo, indiciProfilo 
} from "./AutenticazioneVario"

const Profilo = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const dispatch = useDispatch();
  const [utente, setUtente] = useState(0);
  const [aggiornamento1, setAggiornamento1] = useState(false);
  const [aggiornamento2, setAggiornamento2] = useState(false);
  const [datiProfilo, setDatiProfilo] = useState({
    username_attuale: useState(autenticazioneSession.username), 
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
  })
  const eseguiModificaProfilo = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare il profilo?")) {
      const datiLogin = {
        username: autenticazioneSession.username,
        password: ""
      }
      await login(e, datiLogin, setUtente);
      autenticazioneStore.setUtente(-1);
      setUtente(-1);
      setAggiornamento1(!aggiornamento1);
    }
    else {
      alert("Modifica profilo annullata.");
      return;
    }
  };
  const ProfiloTag = (formSession.view === "form") ? FormProfilo : (
    (formSession.view === "card") ? CardProfilo : RowProfilo
  );
  
  useEffect(() => {
    const handleLoginChange = () => {
      setUtente(autenticazioneStore.getUtente());
    };
    autenticazioneStore.addChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    return () => {
      autenticazioneStore.removeChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    };
  }, []);
  /**/
  
  useEffect(() => {
    if(utente !== 0 && utente === -1) {
      console.log("Aggiornamento in corso...");
      setAggiornamento2(!aggiornamento2);
    }
    else if(utente !== 0 && utente.length !== 0) {
      console.log("Aggiornamento effettuato.");
      // console.log("Utente trovato: |||| " + 
      //   utente.username + " | " + utente.ruolo + " | " + utente.note + " | " + 
      //   utente.password + " | " + utente.salt_hex +
      // " ||||");
      datiProfilo["num_utenti"] = utente.length;
      if(utente) {
        datiProfilo["password_db"] = utente.password;
        datiProfilo["salt_hex_db"] = utente.salt_hex;
      }
      if(controlloProfilo(datiProfilo, setDatiProfilo) > 0) {
        return;
      }
      datiProfilo["username"] = autenticazioneSession.username;
      modificaProfilo(datiProfilo);
      dispatch(eseguiModificaAutenticazioneSession({
        username: datiProfilo.nuovo_username,
        note: datiProfilo.note 
      }));

     alert("Modifica profilo eseguita con successo.");
    }
  }, [aggiornamento1]);
  
  useEffect(() => {
    if(utente !== 0) {
      setUtente(autenticazioneStore.getUtente());
      setAggiornamento1(!aggiornamento1);
    }
  }, [aggiornamento2]);
  
/*
  useEffect(() => {
    setNuovoUsername(autenticazioneSession.nuovoUsername);
    setRuolo(autenticazioneSession.ruolo);
    setRuoloSelezionato(autenticazioneSession.ruolo);
    setNote(autenticazioneSession.note);
  }, [autenticazioneSession]);
*/

  return (
    <>
      <Header />

      <div className="main-content"></div>

      <ProfiloTag  
        campi={getCampiProfilo(datiProfilo, (e) => handleInputChange(e, setDatiProfilo), null, null)} 
        indici={indiciProfilo} 
        eseguiModificaProfilo={(e) => eseguiModificaProfilo(e)} 
      />
      
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Profilo;









