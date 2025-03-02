import { EventEmitter } from "events";
import SaloneDispatcher from "../../dispatcher/salone_dispatcher/SaloneDispatcher";
import axios from "axios";
import { operazioniSaloni } from "../../vario/Operazioni";

let entrateLavori = [];
let usciteSpese = [];
let spese = -1;

class SaloneStore extends EventEmitter {
  constructor() {
    super();
    SaloneDispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case operazioniSaloni.INSERISCI_SPESA:
        this.runOperation(action.payload, operazioniSaloni.INSERISCI_SPESA);
        break;
      case operazioniSaloni.VISUALIZZA_SPESE:
        this.runOperation(action.payload, operazioniSaloni.VISUALIZZA_SPESE);
        break;
      case operazioniSaloni.ELIMINA_SPESE:
        this.runOperation(action.payload, operazioniSaloni.ELIMINA_SPESE);
        break;
      case operazioniSaloni.ELIMINA_SPESE_RANGE_GIORNI:
        this.runOperation(action.payload, operazioniSaloni.ELIMINA_SPESE_RANGE_GIORNI);
        break;
      case operazioniSaloni.MODIFICA_SPESE:
        this.modificaSpese(action.payload);
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
      if (operazione === operazioniSaloni.VISUALIZZA_SPESE) {
        spese = response.data.spese;
      }
      else if (operazione === operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI)
        entrateLavori = response.data.entrateLavori;
      else if (operazione === operazioniSaloni.VISUALIZZA_USCITE_SPESE)
        usciteSpese = response.data.usciteSpese;
      this.emitChange(operazione);
    } 
    catch (error) {
      console.error("Errore durante l'operazione " + operazione + ": " + (error.response ? error.response.data : error.message));
    }
  }

  modificaSpese(data) {
    for (let i = 0; i < data.length; i++) {
      const spesa = data[i];
      axios.post('/MODIFICA_SPESE', spesa).then(response => {
        this.emitChange(operazioniSaloni.MODIFICA_SPESE);
      }).catch(error => {
        console.error('Errore durante la modifica delle spese: ', error);
      });
    }
    spese = [];
  }
  
  emitChange(eventType) {
    this.emit(eventType);
  }

  getSpese() {
    return spese;
  }

  getEntrateLavori() {
    return entrateLavori;
  }
  
  getUsciteSpese() {
    return usciteSpese;
  }

  setSpese(spese) {
    this.spese = spese;
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











