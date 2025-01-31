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
  const [utenti, setUtenti] = useState(-1);
  const [salone, setSalone] = useState(-1);
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
    note: autenticazioneSession.note, 
    password_attuale: "",
    nuova_password: "", 
    conferma_nuova_password: "", 
    num_lavori_clienti: autenticazioneSession.num_lavori_clienti, 
    num_lavori_professionisti: autenticazioneSession.num_lavori_professionisti, 
    num_lavori_giorno: autenticazioneSession.num_lavori_giorno,
    errore_nuovo_username: "", 
    errore_note: "", 
    errore_password_attuale: "", 
    errore_nuova_password: "", 
    errore_conferma_nuova_password: "", 
    errore_num_lavori_clienti: "", 
    errore_num_lavori_professionisti: "", 
    errore_num_lavori_giorno: "", 
  })
  
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(true);
  
  const eseguiModificaProfilo = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare il profilo?")) {
      autenticazioneStore.setUtenti(-1);
      setUtenti(-1);
      const datiLogin = {
        username: autenticazioneSession.username,
        password: ""
      }
      await login(e, datiLogin, setUtenti);
      setAggiornamentoCompletato(false);
    }
    else {
      alert("Modifica profilo annullata.");
      return;
    }
  };

  useEffect(() => {
    const handleLoginChange = () => {
      setUtenti(autenticazioneStore.getUtenti());
      setSalone(autenticazioneStore.getSalone());
    };

    autenticazioneStore.addChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    return () => {
      autenticazioneStore.removeChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    };
  }, []);

  useEffect(() => {
    if (!aggiornamentoCompletato) {
      console.log("Aggiornamento in corso...");
    }
  }, [!aggiornamentoCompletato]);

  useEffect(() => {
    if (!aggiornamentoCompletato && utenti !== -1) {
      setAggiornamentoCompletato(true);
      console.log("Aggiornamento effettuato.");
      datiProfilo["num_utenti"] = utenti.length;

      if(utenti.length > 0) {
        datiProfilo["password_db"] = utenti[0].password;
        datiProfilo["salt_hex_db"] = utenti[0].salt_hex;
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
  }, [utenti]);
  
  
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
