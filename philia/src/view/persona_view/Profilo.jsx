import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { login, eseguiModificaProfilo } from "../../vario/OperazioniAutenticazione";
import autenticazioneStore from "../../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "../../vario/Operazioni";
import { controlloProfilo } from "../../vario/Controlli";

const Profilo = () => {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [utenti, setUtenti] = useState(-1);
  const [usernameAttuale, setUsernameAttuale] = useState(autenticazioneSession.username);
  const [nuovoUsername, setNuovoUsername] = useState(autenticazioneSession.username);
  const [ruolo, setRuolo] = useState(autenticazioneSession.ruolo);
  const [ruoloSelezionato, setRuoloSelezionato] = useState(autenticazioneSession.ruolo);
  const [note, setNote] = useState(autenticazioneSession.note);
  const [errori, setErrori] = useState({
    "erroreUsername": "",
    "erroreRuolo": "",
    "erroreNote": "",
    "errore2Password": "",
    "erroreNuovaPassword": "",
    "erroreConfermaNuovaPassword": "",
    "erroreLogin": ""
  });
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(false);
  const [dati, setDati] = useState({
    utente_trovato: "",
    username_attuale: "",
    nuovo_username: "",
    ruolo: "",
    note: "",
    password_attuale: "",
    nuova_password: "",
    conferma_nuova_password: ""
  });

  // const controlloLogin = async (e) => {
  //   await login(e, setUtenti);
  //   // setAggiornamentoCompletato(true);
  // };

  // useEffect(() => {
  //   if (utenti !== -1) {
  //     console.log("Aggiornamento in corso...");
  //   } else {
  //     console.log("Aggiornamento effettuato.");
  //     console.log(
  //       `${dati.utente_trovato}\n${dati.username_attuale}\n${dati.nuovo_username}\n${dati.ruolo}\n${dati.note}\n${dati.password_attuale}\n${dati.nuova_password}\n${dati.conferma_nuova_password}`
  //     );
  //   }
  // }, [utenti]);

  const modificaProfilo = async (e) => {
    e.preventDefault();
    autenticazioneStore.setUtenti(-1);
    setUtenti(-1);
    const formData = new FormData(e.target);
    setDati({
      // utente_trovato: (utenti.length === 1),
      username_attuale: formData.get("username"),
      nuovo_username: formData.get("nuovoUsername"),
      ruolo: formData.get("ruolo"),
      note: formData.get("note"),
      password_attuale: formData.get("password"),
      nuova_password: formData.get("nuovaPassword"),
      conferma_nuova_password: formData.get("confermaNuovaPassword")
    });
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

      alert(utenti.length === 1);
      console.log(
        `${dati.username_attuale}\n${dati.nuovo_username}\n${dati.ruolo}\n${dati.note}\n${dati.password_attuale}\n${dati.nuova_password}\n${dati.conferma_nuova_password}`
      );
      if(controlloProfilo(dati, (utenti.length === 1), setErrori) > 0) {
        return;
      }
      eseguiModificaProfilo(dati);
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
          <span className='spanErrore'>{errori.erroreUsername}</span>

          <label className='labelForm'>Ruolo</label>
          <select
            className='inputFormModifica'
            name='ruolo'
            value={ruoloSelezionato}
            onChange={(e) => {
              setRuoloSelezionato(e.target.value);
              setRuolo(e.target.value);
            }}
          >
            <option value=''>Seleziona un ruolo</option>
            <option value='Amministratore'>Amministratore</option>
            <option value='Dipendente'>Dipendente</option>
          </select>
          <span className='spanErrore'>{errori.erroreRuolo}</span>
          
          <label className='labelForm'>Note</label>
          <textarea className='textAreaFormModifica' name='note' value={note} onChange={handleInputChange} />
          <span className='spanErrore'>{errori.erroreNote}</span>

          <label className='labelForm'>Password attuale</label>
          <input className='inputFormModifica' type='password' name='password' />
          <span className='spanErrore'></span>

          <label className='labelForm'>Nuova password</label>
          <input className='inputFormModifica' type='password' name='nuovaPassword' />
          <span className='spanErrore'>{errori.erroreNuovaPassword}</span>
          
          <label className='labelForm'>Conferma nuova password</label>
          <input className='inputFormModifica' type='password' name='confermaNuovaPassword' />
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
