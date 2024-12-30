import { EventEmitter } from "events";
import ProfessionistaDispatcher from "../../dispatcher/professionista_dispatcher/ProfessionistaDispatcher";
import axios from "axios";
import { operazioniProfessionisti } from "../../vario/Operazioni";

let professionisti = [];

class ProfessionistaStore extends EventEmitter {
  constructor() {
    super();
    ProfessionistaDispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case operazioniProfessionisti.INSERISCI_PROFESSIONISTA:
        this.runOperation(action.payload, operazioniProfessionisti.INSERISCI_PROFESSIONISTA);
        break;
      case operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI:
        this.runOperation(action.payload, operazioniProfessionisti.VISUALIZZA_PROFESSIONISTI);
        break;
      case operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI:
        this.runOperation(action.payload, operazioniProfessionisti.OTTIENI_TUTTI_I_PROFESSIONISTI);
        break;
      case operazioniProfessionisti.ELIMINA_PROFESSIONISTI:
        this.runOperation(action.payload, operazioniProfessionisti.ELIMINA_PROFESSIONISTI);
        break;
      case operazioniProfessionisti.MODIFICA_PROFESSIONISTI:
        this.modificaProfessionisti(action.payload);
        break;
      default:
        console.warn("Operazione " + action.type + " non trovata.");
        break;
    }
  }

  runOperation(data, operazione) {
    axios.post("/" + operazione, data).then(response => {
      professionisti = response.data;
      this.emitChange(operazione);
    }).catch(error => {
      console.error(  "Errore durante l\'operazione " + operazione + ": " 
                    + error.response ? error.response.data : error.message);
    });
  }

  modificaProfessionisti(data) {
    for (let i = 0; i < data.length; i++) {
      const professionista = data[i];
      //alert(professionista[0] + " " + professionista[1] + " " + professionista[2] + " " + professionista[3] + "\n");
      axios.post('/MODIFICA_PROFESSIONISTI', professionista).then(response => {
        professionisti = response.data;
        this.emitChange(operazioniProfessionisti.MODIFICA_PROFESSIONISTI);
      }).catch(error => {
        console.error('Errore durante la modifica dei professionisti: ', error);
      });
    }
  }

  emitChange(eventType) {
    this.emit(eventType);
  }

  getProfessionisti() {
    return professionisti;
  }

  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }
}

const professionistaStore = new ProfessionistaStore();
export default professionistaStore;









