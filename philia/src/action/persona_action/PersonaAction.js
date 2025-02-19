import PersonaDispatcher from "../../dispatcher/persona_dispatcher/PersonaDispatcher.js"
import { operazioniPersone } from "../../vario/Operazioni.js";

const PersonaAction = {
  async dispatchAction(data, operazione) { // Aggiungi async
    return new Promise((resolve, reject) => { // Aggiungi Promise
      try {
        PersonaDispatcher.dispatch({
          type: operazioniPersone[operazione] || null,
          payload: data,
        });
        resolve(); // Risolve il Promise se tutto va bene
      } 
      catch(error) {
        console.error("Impossibile inviare l'azione " + operazione + ": " + error);
        reject(error); // Rigetta il Promise in caso di errore
      }
    });
  },
};

export default PersonaAction;










