import ServizioDispatcher from "../../dispatcher/servizio_dispatcher/ServizioDispatcher.js"
import { operazioniServizi } from "../../vario/Operazioni.js";

const ServizioAction = {
  async dispatchAction(data, operazione) {
    return new Promise((resolve, reject) => {
      try {
        ServizioDispatcher.dispatch({
          type: operazioniServizi[operazione] || null,
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

export default ServizioAction;









