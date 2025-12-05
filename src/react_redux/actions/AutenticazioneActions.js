// React e Redux
import { useSelector } from 'react-redux';
// Dispatcher
import { Dispatcher } from "../dispatcher/Dispatcher";
// Utils
import { controlloLogin, controlloProfilo } from "../../utils/Controlli";

export class AutenticazioneActions {
  dispatcher
  saloneState = useSelector((state) => state.salone.value);
  lingua = this.saloneState.lingua;

  constructor() {
    this.dispatcher = new Dispatcher();
  }

  async login(e, datiLogin, setDatiLogin, navigate) {
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

      if (controlloLogin(datiLogin, setDatiLogin, this.lingua) > 0) {
        return;
      }

      this.dispatcher.eseguiLogin(result.utente.username, result.utente.ruolo, result.utente.note);
      navigate("/");
    } else {
      alert(this.lingua === "italiano" ? "Errore durante il login, riprova più tardi." : "Error while logging in, please try again later.");
    }
  }

  logout = () => {
    this.dispatcher.eseguiLogout();
  }

  async modificaProfilo(e, autenticazioneSession, datiProfilo, setDatiProfilo) {
    e.preventDefault();
    if (confirm(this.lingua === "italiano" ? "Sei sicuro di voler modificare il profilo?" : "Are you sure you want to edit your profile?")) {
      const datiLogin = {
        username: autenticazioneSession.username,
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
        if (controlloProfilo(datiProfilo, setDatiProfilo, this.lingua) > 0) {
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
          this.dispatcher.eseguiLogin(datiProfilo.nuovo_username, autenticazioneSession.ruolo, datiProfilo.note)
          alert(this.lingua === "italiano" ? "Il profilo è stato modificato con successo." : "The profile was successfully modified.");
        } 
        else {
          alert(this.lingua === "italiano" ? "Errore durante la modifica del profilo, riprova più tardi." : "Error while editing profile, please try again later.");
        }
      } 
      else {
        alert(this.lingua === "italiano" ? "Errore durante la modifica del profilo, riprova più tardi.": "Error while editing profile, please try again later.");
      }
    }
    else {
      alert(this.lingua === "italiano" ? "Modifica annullata." : "Modification cancelled.");
    }
  }
}









