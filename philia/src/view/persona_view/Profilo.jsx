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
import FormItem from "../component/form_item/FormItem";
import RowItem from "../component/row_item/RowItem";
import CardItem from "../component/card_item/CardItem";

const Profilo = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [utenti, setUtenti] = useState(-1);
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
    conferma_nuova_password: ""
  })
  const [errori, setErrori] = useState({
    nuovo_username: "", 
    note: "", 
    password_attuale: "", 
    nuova_password: "", 
    conferma_nuova_password: ""
  });
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(true);
  
  const eseguiModificaProfilo = async (e) => {
    e.preventDefault();
    autenticazioneStore.setUtenti(-1);
    setUtenti(-1);
    const datiLogin = {
      username: autenticazioneSession.username,
      password: ""
    }
    await login(e, datiLogin, setUtenti);
    setAggiornamentoCompletato(false);

    // if(nuovoUsername === undefined) {
    //   setNuovoUsername(usernameAttuale);
    // }
    // autenticazioneStore.setUtenti(-1);
    // setUtenti(-1);
    // await login(e, setUtenti);
    // setAggiornamentoCompletato(true);
  };

  useEffect(() => {
    const handleLoginChange = () => {
      setUtenti(autenticazioneStore.getUtenti());
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
      // console.log(utenti.length === 1);
      datiProfilo["num_utenti"] = utenti.length;
      if(utenti.length > 0) {
        datiProfilo["password_db"] = utenti[0].password;
        datiProfilo["salt_hex_db"] = utenti[0].salt_hex;
      }
      // alert(datiProfilo.nuovo_username);
      // alert(datiProfilo.note);
      // alert(datiProfilo.password_attuale);
      // alert(datiProfilo.nuova_password);
      // alert(datiProfilo.conferma_nuova_password);
      if(controlloProfilo(datiProfilo, setErrori) > 0) {
        return;
      }
      
      
      
      
      // const password_db = (utenti.length === 1) ? utenti[0].password : null;
      // const salt_hex_db = (utenti.length === 1) ? utenti[0].salt_hex : null;
      // const dati = {
      //   "username": usernameAttuale,
      //   "nuovo_username": nuovoUsername,
      //   "nuovo_ruolo": ruolo,
      //   "nuove_note": note,
      //   "password_attuale": password,
      //   "nuova_password": nuovaPassword,
      //   "conferma_nuova_password": confermaNuovaPassword,
      //   "password_db": password_db,
      //   "salt_hex_db": salt_hex_db
      // }
      // console.log(
      //   `${dati.username}\n${dati.nuovo_username}\n${dati.nuovo_ruolo}\n${dati.nuove_note}\n${dati.password_attuale}\n${dati.nuova_password}\n${dati.conferma_nuova_password}\n${dati.password_db}\n${dati.salt_hex_db}`
      // );
      // if (confirm("Sei sicuro di voler modificare il profilo?")) {
      //   if(controlloProfilo(dati, setErrori) > 0) {
      //     return;
      //   }
        
      //   eseguiModificaProfilo(dati);

      //   dispatch(eseguiModificaAutenticazioneSession({
      //     username: dati.nuovo_username,
      //     ruolo: dati.nuovo_ruolo,
      //     note: dati.nuove_note
      //   }));
      // } 
      // else {
      //   alert("Modifica annullata.");
      // }
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
        <FormItem errori={errori} setErrori={setErrori} tipoItem={"modifica profilo"} item={datiProfilo} setItem={setDatiProfilo} header="Profilo" eseguiModificaProfilo={(e) => eseguiModificaProfilo(e)} />
      )}
      {(formSession.view === "row") && (
        <RowItem errori={errori} setErrori={setErrori} tipoItem={"modifica profilo"} item={datiProfilo} setItem={setDatiProfilo} eseguiModificaProfilo={(e) => eseguiModificaProfilo(e)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardItem errori={errori} setErrori={setErrori} tipoItem={"modifica profilo"} item={datiProfilo} setItem={setDatiProfilo} header="Profilo" eseguiModificaProfilo={(e) => eseguiModificaProfilo(e)} />
        </center>
      )}

      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br />

      {/* <div className='visible'>
        <form 
          className={formSession.view === "form" ? 'containerForm' : ''} 
          onSubmit={(e) => modificaProfilo(e)}
        >
          {(formSession.view === "form") && (
            <>
              <label className='titoloForm'>Profilo</label>
            
              <label className='labelForm'>Username</label>
              <input className='inputFormModifica' type='text' name='nuovoUsername' value={nuovoUsername} onChange={handleInputChange} />
              <span className='spanErrore'>{errori.erroreNuovoUsername}</span>

              <label className='labelForm'>Note</label>
              <textarea className='textAreaFormModifica' name='note' value={note} onChange={handleInputChange} />
              <span className='spanErrore'>{errori.erroreNuoveNote}</span>

              <label className='labelForm'>Password attuale</label>
              <input className='inputFormModifica' type='password' name='password' value={password} onChange={handleInputChange} />
              <span className='spanErrore'>{errori.errorePasswordAttuale}</span>

              <label className='labelForm'>Nuova password</label>
              <input className='inputFormModifica' type='password' name='nuovaPassword' value={nuovaPassword} onChange={handleInputChange} />
              <span className='spanErrore'>{errori.erroreNuovaPassword}</span>
              
              <label className='labelForm'>Conferma nuova password</label>
              <input className='inputFormModifica' type='password' name='confermaNuovaPassword' value={confermaNuovaPassword} onChange={handleInputChange} />
              <span className='spanErrore'>{errori.erroreConfermaNuovaPassword}</span>

              <span className='spanErrore'>{errori.errore2Password}</span>

              <input type="hidden" name="username" value={usernameAttuale} />

              <span className='spanErrore'>{errori.erroreLogin}</span>
            </>
          )}

          {(formSession.view === "card") && (
            <>
              <Row className='custom-row'>
                <Col className='custom-col'>
                  <CardItem tipoItem={"modifica profilo"} item={null} header="Profilo" />
                </Col>
              </Row>
            </>
          )}
          <button className='buttonForm' type='submit'>Esegui modifica</button>
        </form>
      </div> */}
    </>
  );
}

export default Profilo;
