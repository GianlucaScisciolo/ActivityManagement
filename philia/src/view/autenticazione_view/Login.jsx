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
  const [utenti, setUtenti] = useState(-1);
  const [datiLogin, setDatiLogin] = useState({
    username: "", 
    password: "", 
    errore_username: "", 
    errore_password: ""
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
      if(controlloLogin(datiLogin, setDatiLogin) > 0) {
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
