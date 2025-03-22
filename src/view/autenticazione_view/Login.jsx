// React e Redux
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// View
import Header from "../components/Header";
import { OperazioniForms } from '../forms/OperazioniForms';
import { AutenticazioneForms } from "../../view/forms/AutenticazioneForms";
// Actions
import { AutenticazioneActions } from "../../actions/AutenticazioneActions";
// Riutilizzabile
import { FormLogin } from "../../riutilizzabile/form_item/FormItem";
import { CardLogin } from '../../riutilizzabile/card_item/CardItem';
import { RowLogin } from '../../riutilizzabile/row_item/RowItem';

const Login = () => {
  const autenticazioneActions = new AutenticazioneActions();
  const autenticazioneForms = new AutenticazioneForms();
  const operazioniForms = new OperazioniForms();
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
  const stileState = useSelector((state) => state.stileSliceReducer.value);

  const LoginTag = (stileState.vistaForm === "form") ? FormLogin : (
    (stileState.vistaForm === "card") ? CardLogin : RowLogin
  )

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <LoginTag 
        campi={autenticazioneForms.getCampiLogin(datiLogin, (e) => operazioniForms.handleInputChange(e, setDatiLogin), null, null)} 
        indici={autenticazioneForms.INDICI_LOGIN} 
        eseguiLogin={(e) => autenticazioneActions.login(e, datiLogin, setDatiLogin, navigate)} 
      />
    </>
  );
};

export default Login;
