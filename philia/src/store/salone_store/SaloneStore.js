import { EventEmitter } from "events";
import SaloneDispatcher from "../../dispatcher/salone_dispatcher/SaloneDispatcher";
import axios from "axios";
import { operazioniSaloni } from "../../vario/Operazioni";

let entrateLavori = [];
let usciteSpese = [];

class SaloneStore extends EventEmitter {
  constructor() {
    super();
    SaloneDispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case operazioniSaloni.INSERISCI_USCITA:
        this.runOperation(action.payload, operazioniSaloni.INSERISCI_USCITA);
        break;
      case operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI:
        this.runOperation(action.payload, operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI);
        break;
      case operazioniSaloni.VISUALIZZA_USCITE_SPESE:
        this.runOperation(action.payload, operazioniSaloni.VISUALIZZA_USCITE_SPESE);
        break;
      default:
        console.warn("Operazione " + action.type + " non trovata.");
        break;
    }
  }

  async runOperation(data, operazione) {
    try {
      const response = await axios.post("/" + operazione, data);
      if (operazione === operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI)
        entrateLavori = response.data.entrateLavori;
      if (operazione === operazioniSaloni.VISUALIZZA_USCITE_SPESE)
        usciteSpese = response.data.usciteSpese;
      this.emitChange(operazione);
    } 
    catch (error) {
      console.error("Errore durante l'operazione " + operazione + ": " + (error.response ? error.response.data : error.message));
    }
  }
  
  emitChange(eventType) {
    this.emit(eventType);
  }

  getEntrateLavori() {
    return entrateLavori;
  }
  
  getUsciteSpese() {
    return usciteSpese;
  }

  setEntrateLavori(entrateLavori) {
    this.entrateLavori = entrateLavori;
  }

  setUsciteSpese(usciteSpese) {
    this.usciteSpese = usciteSpese;
  }
  
  addChangeListener(event, callback) {
    this.on(event, callback);
  }
  
  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }
}

const saloneStore = new SaloneStore();
export default saloneStore;

///////////////////////////////////////////////////////////











