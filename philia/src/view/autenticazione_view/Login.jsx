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
import { FormLogin } from '../component/form_item/FormsLogin';
import { CardLogin } from '../component/card_item/CardsLogin';
import { RowLogin } from '../component/row_item/RowsLogin';

const Login = () => {
  const [utente, setUtente] = useState(0);
  const [salone, setSalone] = useState(0);
  const [aggiornamento1, setAggiornamento1] = useState(false);
  const [aggiornamento2, setAggiornamento2] = useState(false);
  const [datiLogin, setDatiLogin] = useState({
    username: "", 
    password: "", 
    errore_username: "", 
    errore_password: ""
  });
  const [, setErroreUsername] = useState("");
  const [, setErrorePassword] = useState("");
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(0);
  const [usernameInserito, setUsernameInserito] = useState("");
  const [passwordInserita, setPasswordInserita] = useState("");
  const navigate = useNavigate();
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const formSession = useSelector((state) => state.formSession.value);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   const handleLoginChange = () => {
  //     setUtente(autenticazioneStore.getUtente());
  //   };

  //   autenticazioneStore.addChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
  //   return () => {
  //     autenticazioneStore.removeChangeListener(operazioniAutenticazione.LOGIN, handleLoginChange);
  //   };
  // }, []);

  /*
  useEffect(() => {
    if (!aggiornamentoCompletato) {
      console.log("Aggiornamento in corso...");
      console.log("| " + aggiornamentoCompletato + " | " + utente + " |");
    }
  }, [!aggiornamentoCompletato]);

  useEffect(() => {
    console.log("secondo useEffect");
    if (!aggiornamentoCompletato && utente !== -1) {
      console.log("\t"+1);
      setAggiornamentoCompletato(true);
      console.log("Aggiornamento effettuato.");

      // alert(utente.length === 1);
      datiLogin["num_utenti"] = (utente && utente !== -1) ? 1 : 0;
      if(utente && utente !== -1) {
        console.log("|||| " + utente);
        datiLogin["password_db"] = utente.password;
        datiLogin["salt_hex_db"] = utente.salt_hex;
      }
      if(controlloLogin(datiLogin, setDatiLogin) > 0) {
        return;
      }
      
      dispatch(eseguiLogin({
        username: utente.username,
        ruolo: utente.ruolo,
        note: utente.note
      }));

      navigate("/");
    }
  }, [utente || salone]);
  */

  const handleLogin = async (e) => {
    e.preventDefault();
    autenticazioneStore.setUtente(-1);
    autenticazioneStore.setSalone(-1);
    await login(e, datiLogin, setUtente, setSalone);
    setUtente(-1);
    setSalone(-1);
    setAggiornamento1(!aggiornamento1);
  };

  useEffect(() => {
    if(utente === -1 || salone === -1) {
      console.log("Aggiornamento in corso...");
      setAggiornamento2(!aggiornamento2);
    }
    else{
      console.log("Aggiornamento effettuato.");
      // if(utente && salone) {
        // console.log(utente.password);
        // console.log(utente.salt_hex);
        datiLogin["num_utenti"] = (utente && utente !== -1) ? 1 : 0;
        if(datiLogin["num_utenti"] === 1) {
          datiLogin["password_db"] = utente.password;
          datiLogin["salt_hex_db"] = utente.salt_hex;
        }
        if(controlloLogin(datiLogin, setDatiLogin) > 0) {
          return;
        }
        dispatch(eseguiLogin({
          username: utente.username,
          ruolo: utente.ruolo,
          note: utente.note, 
          num_lavori_clienti: salone.num_lavori_clienti, 
          num_lavori_professionisti: salone.num_lavori_professionisti, 
          num_lavori_giorno: salone.num_lavori_giorno
        }));
        navigate("/");
      // }
      // else {
        // console.log("Utente non trovato.");
        // console.log(utente);
        // console.log(salone);
      // }
    }
  }, [aggiornamento1]);

  useEffect(() => {
    setUtente(autenticazioneStore.getUtente());
    setSalone(autenticazioneStore.getSalone());
    setAggiornamento1(!aggiornamento1);
  }, [aggiornamento2]);
  

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (!aggiornamentoCompletato) {
//         console.log("Aggiornamento in corso...");
//         setUtente(autenticazioneStore.getUtente());
//         setSalone(autenticazioneStore.getSalone());
//       }
//     }, 10); 
  
//     return () => clearInterval(intervalId); // Pulizia dell'intervallo quando il componente si smonta
//   }, [aggiornamentoCompletato]);
  
//   useEffect(() => {
//     // console.log("Stato utente e salone aggiornati:", utente, salone);
//     if (utente !== -1 && salone !== -1) {
//       setAggiornamentoCompletato(true);
//       console.log("Aggiornamento completato.");

//       datiLogin["num_utenti"] = (utente && utente !== -1) ? 1 : 0;
//       if(datiLogin["num_utenti"] === 1) {
//         // console.log("|||| " + utente);
//         // console.log("|||| " + utente.password);
//         // console.log("|||| " + utente.salt_hex);
//         console.log("Tutte le chiavi dell'oggetto utente:");
// Object.keys(JSON.stringify(utente)).forEach(key => {
//   console.log(key);
// });

//         console.log("|||| proprietà utente: ", Object.keys(utente));
        
//         datiLogin["password_db"] = utente.password;
//         datiLogin["salt_hex_db"] = utente.salt_hex;
//         console.log(datiLogin["password_db"]);
//         console.log(datiLogin["salt_hex_db"]);
//       }
//       if(controlloLogin(datiLogin, setDatiLogin) > 0) {
//         return;
//       }
      
//       dispatch(eseguiLogin({
//         username: utente.username,
//         ruolo: utente.ruolo,
//         note: utente.note
//       }));

//       navigate("/");
//     }
//   }, [utente, salone]);
  
  

  // useEffect(() => {
  //   setUtente(autenticazioneStore.getUtente());
  //   setSalone(autenticazioneStore.getSalone());
  //   console.log(utente);
  //   console.log(salone);
  //   if(utente !== -1 && salone !== -1) {
  //     setAggiornamentoCompletato(true);
  //     console.log("Aggiornamento completato.");
  //   }
  // }, [utente || salone])

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
      <div className="main-content" />
      {(formSession.view === "form") && (
        <FormLogin item={datiLogin} setItem={setDatiLogin} eseguiLogin={(e) => handleLogin(e)} />
      )}
      {(formSession.view === "row") && (
        <RowLogin item={datiLogin} setItem={setDatiLogin} eseguiLogin={(e) => handleLogin(e)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardLogin item={datiLogin} setItem={setDatiLogin} eseguiLogin={(e) => handleLogin(e)} />
        </center>
      )}

      {/* <button onClick={prova}>Genera!!</button> */}
    </>
  );
};

export default Login;
