import { EventEmitter } from "events";
import PersonaDispatcher from "../../dispatcher/persona_dispatcher/PersonaDispatcher";
import axios from "axios";
import { operazioniPersone } from "../../vario/Operazioni";

let clienti = [];

class PersonaStore extends EventEmitter {
  constructor() {
    super();
    PersonaDispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case operazioniPersone.INSERISCI_CLIENTE:
        this.runOperation(action.payload, operazioniPersone.INSERISCI_CLIENTE);
        break;
      case operazioniPersone.VISUALIZZA_CLIENTI:
        this.runOperation(action.payload, operazioniPersone.VISUALIZZA_CLIENTI);
        break;
      case operazioniPersone.OTTIENI_TUTTI_I_CLIENTI:
        this.runOperation(action.payload, operazioniPersone.OTTIENI_TUTTI_I_CLIENTI);
        break;
      case operazioniPersone.ELIMINA_CLIENTI:
        this.runOperation(action.payload, operazioniPersone.ELIMINA_CLIENTI);
        break;
      case operazioniPersone.MODIFICA_CLIENTI:
        this.modificaClienti(action.payload);
        break;
      default:
        console.warn("Operazione " + action.type + " non trovata.");
        break;
    }
  }

  runOperation(data, operazione) {
    axios.post("/" + operazione, data).then(response => {
      clienti = response.data;
      this.emitChange(operazione);
    }).catch(error => {
      console.error(  "Errore durante l\'operazione " + operazione + ": " 
                    + error.response ? error.response.data : error.message);
      alert("Operazione fallita, riprova più tardi.");
    });
  }

  modificaClienti(data) {
    for (let i = 0; i < data.length; i++) {
      const cliente = data[i];
      // alert(cliente[0] + " " + cliente[1] + " " + cliente[2] + "\n");
      axios.post('/MODIFICA_CLIENTI', cliente).then(response => {
        this.emitChange(operazioniPersone.MODIFICA_CLIENTI);
      }).catch(error => {
        console.error('Errore durante la modifica dei clienti:', error);
      });
    }
    clienti = [];
  }

  emitChange(eventType) {
    this.emit(eventType);
  }

  getClienti() {
    return clienti;
  }

  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }
}

const personaStore = new PersonaStore();
export default personaStore;









