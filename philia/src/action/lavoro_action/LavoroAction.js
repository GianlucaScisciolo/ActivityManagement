import LavoroDispatcher from "../../dispatcher/lavoro_dispatcher/LavoroDispatcher";
import { operazioniLavori } from "../../vario/Operazioni";

const LavoroAction = {
  async dispatchAction(data, operazione) { 
    return new Promise((resolve, reject) => {
      try {
        LavoroDispatcher.dispatch({
          type: operazioniLavori[operazione] || null,
          payload: data,
        });
        resolve();
      } 
      catch(error) {
        console.error("Impossibile inviare l'azione " + operazione + ": " + error);
        reject(error); // Rigetta il Promise in caso di errore
      }
    });
  },
}


export default LavoroAction;












