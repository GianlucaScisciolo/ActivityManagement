import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../component/Header";
import { login, eseguiModificaProfilo } from "../../vario/OperazioniAutenticazione";
import autenticazioneStore from "../../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "../../vario/Operazioni";
import { controlloProfilo } from "../../vario/Controlli";
import { eseguiModificaAutenticazioneSession } from "../../store/redux/AutenticazioneSessionSlice";

const Profilo = () => {
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
  const [errori, setErrori] = useState({
    "erroreNuovoUsername": "",
    "erroreNuovoRuolo": "",
    "erroreNuoveNote": "",
    "errorePasswordAttuale": "",
    "erroreNuovaPassword": "",
    "erroreConfermaNuovaPassword": "",
    "errore2Password": "",
    "erroreLogin": ""
  });
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(false);
  // const [dati, setDati] = useState({
  //   utente_trovato: "",
  //   username_attuale: "",
  //   nuovo_username: "",
  //   ruolo: "",
  //   note: "",
  //   password_attuale: "",
  //   nuova_password: "",
  //   conferma_nuova_password: ""
  // });

  const modificaProfilo = async (e) => {
    e.preventDefault();
    autenticazioneStore.setUtenti(-1);
    setUtenti(-1);
    /*
      const formData = new FormData(e.target);
      const password_db = (utenti.length === 1) ? utenti[0].password : null;
      const salt_hex_db = (utenti.length === 1) ? utenti[0].salt_hex : null;
      const dati = {
        "username_inserito": usernameInserito,
        "password_inserita": passwordInserita,
        "password_db": password_db,
        "salt_hex_db": salt_hex_db
      }
    */
    
    // setDati({
    //   // utente_trovato: (utenti.length === 1),
    //   username_attuale: formData.get("username"),
    //   nuovo_username: formData.get("nuovoUsername"),
    //   ruolo: formData.get("ruolo"),
    //   note: formData.get("note"),
    //   password_attuale: formData.get("password"),
    //   nuova_password: formData.get("nuovaPassword"),
    //   conferma_nuova_password: formData.get("confermaNuovaPassword")
    // });
    await login(e, setUtenti);
    setAggiornamentoCompletato(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'nuovoUsername':
        setNuovoUsername(value);
        break;
      case 'ruolo':
        setRuolo(value);
        setRuoloSelezionato(value);
        break;
      case 'note':
        setNote(value);
        break;
      case 'password': 
        setPassword(value);
        break;
      case 'nuovaPassword':
        setNuovaPassword(value);
        break;
      case 'confermaNuovaPassword':
        setConfermaNuovaPassword(value);
        break;
      default:
        break;
    }
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
    if (aggiornamentoCompletato) {
      console.log("Aggiornamento in corso...");
    }
  }, [aggiornamentoCompletato]);

  useEffect(() => {
    if (aggiornamentoCompletato && utenti !== -1) {
      setAggiornamentoCompletato(false);
      console.log("Aggiornamento effettuato.");
      console.log(utenti.length === 1);
      /*
      const dati = {
        "username_inserito": usernameInserito,
        "password_inserita": passwordInserita,
        "password_db": password_db,
        "salt_hex_db": salt_hex_db
      }
      */
      const password_db = (utenti.length === 1) ? utenti[0].password : null;
      const salt_hex_db = (utenti.length === 1) ? utenti[0].salt_hex : null;
      const dati = {
        "username": usernameAttuale,
        "nuovo_username": nuovoUsername,
        "nuovo_ruolo": ruolo,
        "nuove_note": note,
        "password_attuale": password,
        "nuova_password": nuovaPassword,
        "conferma_nuova_password": confermaNuovaPassword,
        "password_db": password_db,
        "salt_hex_db": salt_hex_db
      }
      console.log(
        `${dati.username}\n${dati.nuovo_username}\n${dati.nuovo_ruolo}\n${dati.nuove_note}\n${dati.password_attuale}\n${dati.nuova_password}\n${dati.conferma_nuova_password}\n${dati.password_db}\n${dati.salt_hex_db}`
      );
      if(controlloProfilo(dati, setErrori) > 0) {
        return;
      }
      
      eseguiModificaProfilo(dati);

      dispatch(eseguiModificaAutenticazioneSession({
        username: dati.nuovo_username,
        ruolo: dati.nuovo_ruolo,
        note: dati.nuove_note
      }));
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

      <div className='visible'>
        <form className='containerForm' onSubmit={(e) => modificaProfilo(e)}>
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
          
          <button className='buttonForm' type='submit'>Esegui modifica</button>
        </form>
      </div>
    </>
  );
}

export default Profilo;
