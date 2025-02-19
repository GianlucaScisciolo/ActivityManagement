import { EventEmitter } from "events";
import ServizioDispatcher from "../../dispatcher/servizio_dispatcher/ServizioDispatcher";
import axios from "axios";
import { operazioniServizi } from "../../vario/Operazioni";

let servizi = [];

class ServizioStore extends EventEmitter {
  constructor() {
    super();
    ServizioDispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case operazioniServizi.INSERISCI_SERVIZIO:
        this.runOperation(action.payload, operazioniServizi.INSERISCI_SERVIZIO);
        break;
      case operazioniServizi.VISUALIZZA_SERVIZI:
        this.runOperation(action.payload, operazioniServizi.VISUALIZZA_SERVIZI);
        break;
      default:
        console.warn("Operazione " + action.type + " non trovata.");
        break;
    }
  }

  runOperation(data, operazione) {
    axios.post("/" + operazione, data).then(response => {
      servizi = response.data;
      this.emitChange(operazione);
    }).catch(error => {
      console.error(  "Errore durante l\'operazione " + operazione + ": " 
                    + error.response ? error.response.data : error.message);
      alert("Operazione fallita, riprova più tardi.");
    });
  }

  emitChange(eventType) {
    this.emit(eventType);
  }

  getServizi() {
    return servizi;
  }

  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }
}

const servizioStore = new ServizioStore();
export default servizioStore;









