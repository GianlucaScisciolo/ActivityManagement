import SaloneDispatcher from "../../dispatcher/salone_dispatcher/SaloneDispatcher";
import { operazioniSaloni } from "../../vario/Operazioni";

const SaloneAction = {
  async dispatchAction(data, operazione) { 
    return new Promise((resolve, reject) => {
      try {
        SaloneDispatcher.dispatch({
          type: operazioniSaloni[operazione] || null,
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


export default SaloneAction;












