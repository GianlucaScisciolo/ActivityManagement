import { EventEmitter } from "events";
import LavoroDispatcher from "../../dispatcher/lavoro_dispatcher/LavoroDispatcher";
import axios from "axios";
import { operazioniLavori } from "../../vario/Operazioni";

let lavori = [];

class LavoroStore extends EventEmitter {
  constructor() {
    super();
    LavoroDispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case operazioniLavori.INSERISCI_LAVORO:
        this.runOperation(action.payload, operazioniLavori.INSERISCI_LAVORO);
        break;
      case operazioniLavori.VISUALIZZA_LAVORI: 
        this.runOperation(action.payload, operazioniLavori.VISUALIZZA_LAVORI);
        break;
      case operazioniLavori.ELIMINA_LAVORI:
        this.runOperation(action.payload, operazioniLavori.ELIMINA_LAVORI);
        break;
      case operazioniLavori.ELIMINA_LAVORI_RANGE_GIORNI:
        this.runOperation(action.payload, operazioniLavori.ELIMINA_LAVORI_RANGE_GIORNI);
        break;
      case operazioniLavori.MODIFICA_LAVORI:
        this.modificaLavori(action.payload);
        break;
      default:
        console.warn("Operazione " + action.type + " non trovata.");
        break;
    }
  }

  async runOperation(data, operazione) {
    try {
      const response = await axios.post("/" + operazione, data);
      if (operazione === operazioniLavori.VISUALIZZA_LAVORI)
        lavori = response.data;
      this.emitChange(operazione);
    } catch (error) {
      console.error("Errore durante l'operazione " + operazione + ": " + (error.response ? error.response.data : error.message));
    }
  }

  async modificaLavori(data) {
    for (let i = 0; i < data.length; i++) {
      const lavoro = data[i];
      try {
        const response = await axios.post('/MODIFICA_LAVORI', lavoro);
        this.emitChange(operazioniLavori.MODIFICA_LAVORI);
      } catch (error) {
        console.error('Errore durante la modifica dei lavori: ', error);
      }
    }
  }

  emitChange(eventType) {
    this.emit(eventType);
  }

  azzeraLavori() {
    lavori = -1;
  }

  getLavori() {
    return lavori;
  }

  addChangeListener(event, callback) {
    this.on(event, callback);
  }
  
  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }
}

const lavoroStore = new LavoroStore();
export default lavoroStore;

///////////////////////////////////////////////////////////











