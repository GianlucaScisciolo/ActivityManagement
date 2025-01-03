import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import autenticazioneStore from '../../store/autenticazione_store/AutenticazioneStore';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../vario/OperazioniAutenticazione';
import { operazioniAutenticazione } from '../../vario/Operazioni';
import { eseguiLogin } from '../../store/redux/AutenticazioneSessionSlice';
import { generateRandomString, encryptPassword, PEPPER_HEX, passwordIsCorrect } from '../../vario/Sicurezza';
import { controlloLogin } from '../../vario/Controlli';

const Login = () => {
  const [utenti, setUtenti] = useState(-1);
  const [errori, setErrori] = useState({
    "erroreUsername": "",
    "errorePassword": "",
    "erroreLogin": ""
  });
  const [, setErroreUsername] = useState("");
  const [, setErrorePassword] = useState("");
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(false);
  const [usernameInserito, setUsernameInserito] = useState("");
  const [passwordInserita, setPasswordInserita] = useState("");
  const navigate = useNavigate();
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLoginChange = () => {
      setUtenti(autenticazioneStore.getUtenti());
    };

    autenticazioneStore.addChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    return () => {
      autenticazioneStore.removeChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
    };
  }, []);

  // useEffect(() => {
  //   if (utenti.length > 0) {
  //     dispatch(eseguiLogin({
  //       username: utenti[0].username,
  //       ruolo: utenti[0].ruolo,
  //       note: utenti[0].note,
  //     }));
  //     navigate('/');
  //   }
  // }, [utenti, navigate, dispatch]);

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
      
      // if(controlloProfilo(dati, (utenti.length === 1), setErrori) > 0) {
      //   return;
      // }
      // eseguiModificaProfilo(dati);
      
      if (utenti.length === 1) {
      console.log("username: " + utenti[0].username);
      console.log("salt_hex DB: " + utenti[0].salt_hex);
      console.log("password: " + utenti[0].password);
      }
      else {
        console.log("Utente non trovato.");
      }
      const password_db = (utenti.length === 1) ? utenti[0].password : null;
      const salt_hex_db = (utenti.length === 1) ? utenti[0].salt_hex : null;
      const dati = {
        "username_inserito": usernameInserito,
        "password_inserita": passwordInserita,
        "password_db": password_db,
        "salt_hex_db": salt_hex_db
      }

      if(controlloLogin(dati, setErrori) > 0) {
        return;
      }

      setUsernameInserito("");
      setPasswordInserita("");
      
      dispatch(eseguiLogin({
        username: utenti[0].username,
        ruolo: utenti[0].ruolo,
        note: utenti[0].note
      }));

      navigate("/");
    }
  }, [utenti]);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    autenticazioneStore.setUtenti(-1);
    setUtenti(-1);

    // const username = e.target.username.value;
    setUsernameInserito(e.target.username.value);
    // const password = e.target.password.value;
    setPasswordInserita(e.target.password.value);

    await login(e, setUtenti);
    setAggiornamentoCompletato(true);
  };

  const prova = () => {
    const salt_hex = generateRandomString(32);
    const password = "PassWord10!!";
    const password_cifrata = encryptPassword(password, salt_hex, PEPPER_HEX);
    console.log("salt_hex: " + salt_hex);
    console.log("password: " + password);
    console.log("passxord_cifrata: " + password_cifrata);
  }

  return (
    <>
      <Header />
      <div>
        <form className='containerForm' onSubmit={handleLogin}>
          <label className='titoloForm'>Login</label>

          <label className='labelForm'>Username</label>
          <input className='inputFormModifica' type='text' name='username' />
          <span className='spanErrore'>{errori.erroreUsername}</span>
          
          <label className='labelForm'>Password</label>
          <input className='inputFormModifica' type='password' name='password' />
          <span className='spanErrore'>{errori.errorePassword}</span>

          <span className='spanErrore'>{errori.erroreLogin}</span>

          <button className='buttonForm' type='submit'>Esegui login</button>
        </form>
        <button onClick={prova}>Prova</button>
      </div>
    </>
  );
};

export default Login;
