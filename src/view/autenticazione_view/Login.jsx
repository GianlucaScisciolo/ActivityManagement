import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";




import { OperazioniForms } from '../../view/forms/OperazioniForms';
import { useSelector } from 'react-redux';
import { AutenticazioneActions } from "../../actions/AutenticazioneActions";
import { AutenticazioneForms } from "../../view/forms/AutenticazioneForms";
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
  const formSliceReducer = useSelector((state) => state.formSliceReducer.value);

  const LoginTag = (formSliceReducer.view === "form") ? FormLogin : (
    (formSliceReducer.view === "card") ? CardLogin : RowLogin
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
