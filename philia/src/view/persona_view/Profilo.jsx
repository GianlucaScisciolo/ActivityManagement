import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../component/Header";
import { login, modificaProfilo } from "../../vario/OperazioniAutenticazione";
import autenticazioneStore from "../../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "../../vario/Operazioni";
import { controlloProfilo } from "../../vario/Controlli";
import { eseguiModificaAutenticazioneSession } from "../../store/redux/AutenticazioneSessionSlice";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FormModificaProfilo } from "../component/form_item/FormsProfilo";
import { CardModificaProfilo } from "../component/card_item/CardsProfilo";
import { RowModificaProfilo } from "../component/row_item/RowsProfilo";

const Profilo = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [utente, setUtente] = useState(0);
  const [salone, setSalone] = useState(0);
  const [aggiornamento1, setAggiornamento1] = useState(false);
  const [aggiornamento2, setAggiornamento2] = useState(false);
  const [usernameAttuale, setUsernameAttuale] = useState(autenticazioneSession.username);
  const [nuovoUsername, setNuovoUsername] = useState(autenticazioneSession.username);
  const [ruolo, setRuolo] = useState(autenticazioneSession.ruolo);
  const [ruoloSelezionato, setRuoloSelezionato] = useState(autenticazioneSession.ruolo);
  const [note, setNote] = useState(autenticazioneSession.note);
  const [password, setPassword] = useState('');
  const [nuovaPassword, setNuovaPassword] = useState('');
  const [confermaNuovaPassword, setConfermaNuovaPassword] = useState('');
  const dispatch = useDispatch();
  const [datiProfilo, setDatiProfilo] = useState({
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
  
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(true);
  
  const eseguiModificaProfilo = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare il profilo?")) {
      const datiLogin = {
        username: autenticazioneSession.username,
        password: ""
      }
      await login(e, datiLogin, setUtente, setSalone);
      autenticazioneStore.setUtente(-1);
      setUtente(-1);
      setAggiornamento1(!aggiornamento1);
    }
    else {
      alert("Modifica profilo annullata.");
      return;
    }
  };

  useEffect(() => {
    const handleLoginChange = () => {
      setUtente(autenticazioneStore.getUtente());
    };
    autenticazioneStore.addChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    return () => {
      autenticazioneStore.removeChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    };
  }, []);
  
  useEffect(() => {
    if(utente === -1) {
      console.log("Aggiornamento in corso...");
      setAggiornamento2(!aggiornamento2);
    }
    else if(utente.length !== 0) {
      console.log("Aggiornamento effettuato.");
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

  useEffect(() => {
    setNuovoUsername(autenticazioneSession.nuovoUsername);
    setRuolo(autenticazioneSession.ruolo);
    setRuoloSelezionato(autenticazioneSession.ruolo);
    setNote(autenticazioneSession.note);
  }, [autenticazioneSession]);
  
  return (
    <>
      <Header />

      <div className="main-content"></div>

      {(formSession.view === "form") && (
        <FormModificaProfilo  item={datiProfilo} setItem={setDatiProfilo} eseguiModificaProfilo={(e) => eseguiModificaProfilo(e)} />
      )}
      {(formSession.view === "row") && (
        <RowModificaProfilo  item={datiProfilo} setItem={setDatiProfilo} eseguiModificaProfilo={(e) => eseguiModificaProfilo(e)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardModificaProfilo  item={datiProfilo} setItem={setDatiProfilo} eseguiModificaProfilo={(e) => eseguiModificaProfilo(e)} />
        </center>
      )}

      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Profilo;
