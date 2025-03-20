import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../component/Header";
import { handleInputChange } from "../../vario/Vario";
import { useSelector } from 'react-redux';
import { generateRandomString, encryptPassword, PEPPER_HEX } from '../../vario/Sicurezza';
import { AutenticazioneActions } from "../../actions/AutenticazioneActions";
import { AutenticazioneForms } from "../../forms/AutenticazioneForms";
import { FormLogin } from "../../riutilizzabile/form_item/FormItem";
import { CardLogin } from '../../riutilizzabile/card_item/CardItem';
import { RowLogin } from '../../riutilizzabile/row_item/RowItem';

const Login = () => {
  const autenticazioneActions = new AutenticazioneActions();
  const autenticazioneForms = new AutenticazioneForms();
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
  // const dispatch = useDispatch();
  
  const prova = () => {
    const salt_hex = generateRandomString(32);
    const password = "PassWord10!!";
    const password_cifrata = encryptPassword(password, salt_hex, PEPPER_HEX);
    console.log("salt_hex: " + salt_hex);
    console.log("password: " + password);
    console.log("passxord_cifrata: " + password_cifrata);
  }

  const LoginTag = (formSliceReducer.view === "form") ? FormLogin : (
    (formSliceReducer.view === "card") ? CardLogin : RowLogin
  )

  return (
    <>
      <Header />

      <div className="main-content" />
      
      <LoginTag 
        campi={autenticazioneForms.getCampiLogin(datiLogin, (e) => handleInputChange(e, setDatiLogin), null, null)} 
        indici={autenticazioneForms.INDICI_LOGIN} 
        eseguiLogin={(e) => autenticazioneActions.login(e, datiLogin, setDatiLogin, navigate)} 
      />
      
      {/* <button onClick={prova}>Genera!!</button> */}
    </>
  );
};

export default Login;
