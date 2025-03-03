import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import { handleInputChange } from '../../vario/Vario';
import AutenticazioneAction from '../../action/autenticazione_action/AutenticazioneAction';
import autenticazioneStore from '../../store/autenticazione_store/AutenticazioneStore';
import { useSelector, useDispatch } from 'react-redux';
import { operazioniAutenticazione } from '../../vario/Operazioni';
import { eseguiLogin } from '../../store/redux/AutenticazioneSessionSlice';
import { generateRandomString, encryptPassword, PEPPER_HEX, passwordIsCorrect } from '../../vario/Sicurezza';
import { controlloLogin } from '../../vario/Controlli';
import { getCampiLogin, indiciLogin } from './AutenticazioneVario';
import { FormLogin } from '../../riutilizzabile/form_item/FormItem';
import { CardLogin } from '../../riutilizzabile/card_item/CardItem';
import { RowLogin } from '../../riutilizzabile/row_item/RowItem';

const Login = () => {
  const [utente, setUtente] = useState(0);
  const [aggiornamento1, setAggiornamento1] = useState(false);
  const [aggiornamento2, setAggiornamento2] = useState(false);
  const [datiLogin, setDatiLogin] = useState({
    username: "", 
    password: "", 
    errore_username: "", 
    errore_password: ""
  });
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(0);
  const navigate = useNavigate();
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const formSession = useSelector((state) => state.formSession.value);
  const dispatch = useDispatch();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    autenticazioneStore.setUtente(-1);
    setUtente(-1);
    try {
      const response = await fetch('/LOGIN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiLogin),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          alert(errorData.message); 
        } 
        else {
          throw new Error('Errore durante il login.');
        }
      }
      else {
        const result = await response.json();
        datiLogin["num_utenti"] = (result.utente) ? 1 : 0;
        if(datiLogin["num_utenti"] === 1) {
          datiLogin["password_db"] = result.utente.password;
          datiLogin["salt_hex_db"] = result.utente.salt_hex;
        }
        if(controlloLogin(datiLogin, setDatiLogin) > 0) {
          return;
        }
        dispatch(eseguiLogin({
          username: result.utente.username,
          ruolo: result.utente.ruolo,
          note: result.utente.note, 
        }));
        navigate("/");
      }
    } 
    catch (error) {
      console.error('Errore:', error);
      alert("C'è stato un errore durante il login. Riprova più tardi.");
    }
    
    setAggiornamento1(!aggiornamento1);
  };

  const prova = () => {
    const salt_hex = generateRandomString(32);
    const password = "PassWord10!!";
    const password_cifrata = encryptPassword(password, salt_hex, PEPPER_HEX);
    console.log("salt_hex: " + salt_hex);
    console.log("password: " + password);
    console.log("passxord_cifrata: " + password_cifrata);
  }

  const LoginTag = (formSession.view === "form") ? FormLogin : (
    (formSession.view === "card") ? CardLogin : RowLogin
  )

  return (
    <>
      <Header />

      <div className="main-content" />

      <LoginTag 
        campi={getCampiLogin(datiLogin, (e) => handleInputChange(e, setDatiLogin), null, null)} 
        indici={indiciLogin} 
        eseguiLogin={(e) => handleLogin(e)} 
      />
      
      {/* <button onClick={prova}>Genera!!</button> */}
    </>
  );
};

export default Login;
