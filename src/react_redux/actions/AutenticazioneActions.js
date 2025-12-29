// React e Redux
import { useDispatch } from 'react-redux';
// Reducers
import { autenticazioneSliceActions } from '../store/reducers/AutenticazioneReducer';
// Utils
import { controlloLogin, controlloProfilo } from "../../utils/Controlli";

export class AutenticazioneActions {
  dispatch = useDispatch();
  
  constructor() {
    
  }

  async login(e, datiLogin, setDatiLogin, navigate, lingua) {
    e.preventDefault();
    const response = await fetch('/LOGIN', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datiLogin),
    });

    if (response.status === 200) {
      const result = await response.json();
      datiLogin["num_utenti"] = result.utente ? 1 : 0;

      if (datiLogin["num_utenti"] === 1) {
        datiLogin["password_db"] = result.utente.password;
        datiLogin["salt_hex_db"] = result.utente.salt_hex;
      }

      if (controlloLogin(datiLogin, setDatiLogin, lingua) > 0) {
        return;
      }

      this.dispatch(autenticazioneSliceActions.login({
        username: datiLogin.username,
        ruolo: datiLogin.ruolo,
        note: datiLogin.note,
      }));

      navigate("/");
    } else {
      alert(lingua === "italiano" ? "Errore durante il login, riprova più tardi." : "Error while logging in, please try again later.");
    }
  }

  logout(e, navigate) {
    e.preventDefault();
    this.dispatch(autenticazioneSliceActions.logout());
    navigate("/");
  }

  async modificaProfilo(e, username, ruolo, datiProfilo, setDatiProfilo, lingua) {
    e.preventDefault();
    if (confirm(lingua === "italiano" ? "Sei sicuro di voler modificare il profilo?" : "Are you sure you want to edit your profile?")) {
      const datiLogin = {
        username: username,
        password: ""
      };
      const loginResponse = await fetch('/LOGIN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiLogin),
      });
      if (loginResponse.status === 200) {
        const result = await loginResponse.json();
        datiProfilo["num_utenti"] = result.utente ? 1 : 0;
        if (datiProfilo["num_utenti"] === 1) {
          datiProfilo["password_db"] = result.utente.password;
          datiProfilo["salt_hex_db"] = result.utente.salt_hex;
        }
        if (controlloProfilo(datiProfilo, setDatiProfilo, lingua) > 0) {
          return;
        }
        const profileResponse = await fetch('/MODIFICA_PROFILO', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datiProfilo),
        });
        if (profileResponse.status === 200) {
          this.dispatch(autenticazioneSliceActions.login({
            username: datiProfilo.nuovo_username,
            ruolo: ruolo,
            note: datiProfilo.note,
          }));
          alert(lingua === "italiano" ? "Il profilo è stato modificato con successo." : "The profile was successfully modified.");
        } 
        else {
          alert(lingua === "italiano" ? "Errore durante la modifica del profilo, riprova più tardi." : "Error while editing profile, please try again later.");
        }
      } 
      else {
        alert(lingua === "italiano" ? "Errore durante la modifica del profilo, riprova più tardi.": "Error while editing profile, please try again later.");
      }
    }
    else {
      alert(lingua === "italiano" ? "Modifica annullata." : "Modification cancelled.");
    }
  }
}









