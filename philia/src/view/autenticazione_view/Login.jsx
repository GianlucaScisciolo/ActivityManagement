import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import autenticazioneStore from '../../store/autenticazione_store/AutenticazioneStore';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../vario/OperazioniAutenticazione';
import { operazioniAutenticazione } from '../../vario/Operazioni';
import { eseguiLogin } from '../../store/redux/AutenticazioneSessionSlice';

const Login = () => {
  const [utenti, setUtenti] = useState([]);
  const [erroreUsername, setErroreUsername] = useState("");
  const [errorePassword, setErrorePassword] = useState("");
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

  useEffect(() => {
    if (utenti.length > 0) {
      dispatch(eseguiLogin({
        username: utenti[0].username,
        ruolo: utenti[0].ruolo,
        note: utenti[0].note,
      }));
      navigate('/');
    }
  }, [utenti, navigate, dispatch]);
  

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!erroreUsername && !errorePassword) {
      login(e, setUtenti);
    }
  };

  const prova = () => {
    alert(utenti.length);
  }

  return (
    <>
      <Header />
      <div>
        <form className='containerForm' onSubmit={handleLogin}>
          <label className='titoloForm'>Login</label>

          <label className='labelForm'>Username</label>
          <input className='inputFormModifica' type='text' name='username' />
          <span className='spanErrore'>{erroreUsername}</span>
          
          <label className='labelForm'>Password</label>
          <input className='inputFormModifica' type='password' name='password' />
          <span className='spanErrore'>{errorePassword}</span>

          <button className='buttonForm' type='submit'>Esegui login</button>
        </form>
        <button onClick={prova}>Prova</button>
      </div>
    </>
  );
};

export default Login;
