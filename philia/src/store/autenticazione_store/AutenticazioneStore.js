import { EventEmitter } from "events";
import AutenticazioneDispatcher from "../../dispatcher/autenticazione_dispatcher/AutenticazioneDispatcher";
import axios from "axios";
import { operazioniAutenticazione } from "../../vario/Operazioni";

let utente = null;

class AutenticazioneStore extends EventEmitter {
  constructor() {
    super();
    AutenticazioneDispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case operazioniAutenticazione.LOGIN:
        this.login(action.payload);
        break;
      case operazioniAutenticazione.MODIFICA_PROFILO:
        this.modificaProfilo(action.payload);
        break;
      case operazioniAutenticazione.LOGOUT:
        this.logout();
        break;
      default:
        console.warn("Operazione " + action.type + " non trovata.");
        break;
    }
  }
  
  login(data) {
    axios.post("/LOGIN", data).then(response => {
      const utente = (response.data.utente);
      this.emitChange(operazioniAutenticazione.LOGIN);
      this.setUtente(utente);
    }).catch(error => {
      console.error("Errore durante l'operazione " + operazioniAutenticazione.LOGIN + ": " + 
                    (error.response ? error.response.data : error.message));
    });
  }

  modificaProfilo(data) {
    axios.post("/MODIFICA_PROFILO", data)
      .then(response => {
        utente = response.data;
        this.emitChange(operazioniAutenticazione.MODIFICA_PROFILO);
      })
      .catch(error => {
        console.error("Errore durante l'operazione " + operazioniAutenticazione.MODIFICA_PROFILO + ": " + 
                      (error.response ? error.response.data : error.message));
        throw new Error(error.response ? error.response.data : "Modifica profilo fallita.");
      });
  }
  
  logout() {
    console.log("Logout");
  }

  emitChange(eventType) {
    this.emit(eventType);
  }

  getUtente() {
    return utente;
  }
  
  setUtente(newUtente) {
    utente = newUtente;
  }
  
  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }
}

const autenticazioneStore = new AutenticazioneStore();
export default autenticazioneStore;









