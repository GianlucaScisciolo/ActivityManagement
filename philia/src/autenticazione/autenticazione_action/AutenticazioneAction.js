import { controlloLogin } from "../../vario/Controlli";
import { eseguiLogin } from "../../store/redux/AutenticazioneSessionSlice";
import { login } from "../../vario/OperazioniAutenticazione";

export class AutenticazioneAction {
  INDICI_LOGIN = [0, 1];
  INDICI_PROFILO = [0, 1, 2, 3, 4];
  
  constructor() {

  }

  getCampiLogin(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Login", 
      label: ["Username*", "Password*"],  
      type: [null, "password"],
      step: [null, null],  
      min: [null, null], 
      name: ["username", "password"], 
      id: ["username_login", "password_login"], 
      value: [item.username, item.password], 
      placeholder: ["Username*", "Password*"],
      errore: [item.errore_username, item.errore_password], 
      options: [null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  getCampiProfilo(item, handleOnChange, handleOnClick, handleOnBlur) {
    return {
      header: "Profilo", 
      label: ["Nuovo username*", "Note", "Password attuale*", "Nuova password", "Conferma nuova password"],  
      type: [null, null, "password", "password", "password"],
      step: [null, null, null, null, null],  
      min: [null, null, null, null, null], 
      name: ["nuovo_username", "note", "password_attuale", "nuova_password", "conferma_nuova_password"], 
      id: ["nuovo_username_profilo", "note_profilo", "password_attuale_profilo", "nuova_password_profilo", "conferma_nuova_password_profilo"], 
      value: [item.nuovo_username, item.note, item.password_attuale, item.nuova_password, item.conferma_nuova_password], 
      placeholder: ["Nuovo username*", "Note", "Password attuale*", "Nuova password", "Conferma nuova password"],
      errore: [item.errore_nuovo_username, item.errore_note, item.errore_password_attuale, item.errore_nuova_password, item.errore_conferma_nuova_password], 
      options: [null, null, null, null, null], 
      onChange: handleOnChange, 
      onClick: handleOnClick, 
      onBlur: handleOnBlur
    };
  };

  async handleLogin(e, autenticazioneStore, setUtente, datiLogin, setDatiLogin, aggiornamento1, setAggiornamento1, navigate, dispatch) {
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

  async handleEditProfile (e, autenticazioneSession, setUtente, autenticazioneStore, aggiornamento1, setAggiornamento1) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare il profilo?")) {
      const datiLogin = {
        username: autenticazioneSession.username,
        password: ""
      }
      await login(e, datiLogin, setUtente);
      autenticazioneStore.setUtente(-1);
      setUtente(-1);
      setAggiornamento1(!aggiornamento1);
    }
    else {
      alert("Modifica profilo annullata.");
      return;
    }
  };
}









