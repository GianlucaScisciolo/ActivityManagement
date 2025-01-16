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
import FormItem from '../component/form_item/FormItem';
import CardItem from '../component/card_item/CardItem';
import RowItem from '../component/row_item/RowItem';

const Login = () => {
  const [utenti, setUtenti] = useState(-1);
  const [datiLogin, setDatiLogin] = useState({
    username: "", 
    password: ""
  });
  const [errori, setErrori] = useState({
    username: "Errore username",
    password: "Errore password"
  });
  const [, setErroreUsername] = useState("");
  const [, setErrorePassword] = useState("");
  const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState(false);
  const [usernameInserito, setUsernameInserito] = useState("");
  const [passwordInserita, setPasswordInserita] = useState("");
  const navigate = useNavigate();
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  const formSession = useSelector((state) => state.formSession.value);
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

  useEffect(() => {
    if (aggiornamentoCompletato) {
      console.log("Aggiornamento in corso...");
    }
  }, [aggiornamentoCompletato]);

  useEffect(() => {
    if (aggiornamentoCompletato && utenti !== -1) {
      setAggiornamentoCompletato(false);
      console.log("Aggiornamento effettuato.");

      // alert(utenti.length === 1);
      datiLogin["num_utenti"] = utenti.length;
      if(utenti.length > 0) {
        datiLogin["password_db"] = utenti[0].password;
        datiLogin["salt_hex_db"] = utenti[0].salt_hex;
      }
      if(controlloLogin(datiLogin, setErrori) > 0) {
        return;
      }
      
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
    // alert("Login");
    autenticazioneStore.setUtenti(-1);
    setUtenti(-1);

    // // const username = e.target.username.value;
    // setUsernameInserito(e.target.username.value);
    // // const password = e.target.password.value;
    // setPasswordInserita(e.target.password.value);
    await login(e, datiLogin, setUtenti);
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
      <div className="main-content" />
      {(formSession.view === "form") && (
        <FormItem errori={errori} setErrori={setErrori} tipoItem={"login"} item={datiLogin} setItem={setDatiLogin} eseguiLogin={(e) => handleLogin(e)} header="Login" />
      )}
      {(formSession.view === "row") && (
        <RowItem errori={errori} setErrori={setErrori} tipoItem={"login"} item={datiLogin} setItem={setDatiLogin} eseguiLogin={(e) => handleLogin(e)} header="Login" />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardItem errori={errori} setErrori={setErrori} tipoItem={"login"} item={datiLogin} setItem={setDatiLogin} eseguiLogin={(e) => handleLogin(e)} header="Login" />
        </center>
      )}
    </>
  );
};

export default Login;
