import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { login, modificaProfilo } from "../../vario/OperazioniAutenticazione";
import autenticazioneStore from "../../store/autenticazione_store/AutenticazioneStore";
import { operazioniAutenticazione } from "../../vario/Operazioni";

const Profilo = () => {
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const [utenti, setUtenti] = useState([]);
  const [usernameAttuale, setUsernameAttuale] = useState(autenticazioneSession.username);
  const [nuovoUsername, setNuovoUsername] = useState(autenticazioneSession.username);
  const [ruolo, setRuolo] = useState(autenticazioneSession.ruolo);
  const [ruoloSelezionato, setRuoloSelezionato] = useState(autenticazioneSession.ruolo);
  const [note, setNote] = useState(autenticazioneSession.note);
  const [errori, setErrori] = useState({
    erroreUsername: "",
    erroreRuolo: "",
    errorePasswordAttuale: "",
    erroreNuovaPassword: "",
    erroreConfermaNuovaPassword: "",
    erroreNote: ""
  });

  // const modificaProfilo = async (e) => {
  //   e.preventDefault();
  //   await login(e, setUtenti);
  //   alert(utenti.length);
  // }
  
  
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
        <form className='containerForm' onSubmit={(e) => modificaProfilo(e, setUtenti)}>
          <label className='titoloForm'>Profilo</label>
        
          <label className='labelForm'>Username</label>
          <input className='inputFormModifica' type='text' name='nuovoUsername' value={nuovoUsername} onChange={handleInputChange} />
          <span className='spanErrore'></span>

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
          <span className='spanErrore'></span>

          <label className='labelForm'>Note</label>
          <textarea className='textAreaFormModifica' name='note' value={note} onChange={handleInputChange} />
          <span className='spanErrore'></span>

          <label className='labelForm'>Password attuale</label>
          <input className='inputFormModifica' type='password' name='passwordAttuale' />
          <span className='spanErrore'></span>

          <label className='labelForm'>Nuova password</label>
          <input className='inputFormModifica' type='password' name='nuovaPassword' />
          <span className='spanErrore'></span>
          
          <label className='labelForm'>Conferma nuova password</label>
          <input className='inputFormModifica' type='password' name='confermaNuovaPassword' />
          <span className='spanErrore'></span>

          <input type="hidden" name="usernameAttuale" value={usernameAttuale} />
          
          <button className='buttonForm' type='submit'>Esegui modifica</button>
        </form>
      </div>
    </>
  );
}

export default Profilo;
