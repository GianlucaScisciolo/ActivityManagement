import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../app/app_view/component/Header";
import { handleInputChange } from '../../vario/Vario';
import autenticazioneStore from '../../store/autenticazione_store/AutenticazioneStore';
import { useSelector, useDispatch } from 'react-redux';
import { eseguiLogin } from '../../store/redux/AutenticazioneSessionSlice';
import { generateRandomString, encryptPassword, PEPPER_HEX, passwordIsCorrect } from '../../vario/Sicurezza';
import { controlloLogin } from '../../vario/Controlli';
import { AutenticazioneAction } from '../autenticazione_action/AutenticazioneAction';
import { FormLogin } from '../../riutilizzabile/form_item/FormItem';
import { CardLogin } from '../../riutilizzabile/card_item/CardItem';
import { RowLogin } from '../../riutilizzabile/row_item/RowItem';

const Login = () => {
  const autenticazioneAction = new AutenticazioneAction();
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
        campi={autenticazioneAction.getCampiLogin(datiLogin, (e) => handleInputChange(e, setDatiLogin), null, null)} 
        indici={autenticazioneAction.INDICI_LOGIN} 
        eseguiLogin={(e) => autenticazioneAction.handleLogin(e, autenticazioneStore, setUtente, datiLogin, setDatiLogin, aggiornamento1, setAggiornamento1, navigate, dispatch)} 
      />
      
      {/* <button onClick={prova}>Genera!!</button> */}
    </>
  );
};

export default Login;
