import ProfessionistaDispatcher from "../../dispatcher/professionista_dispatcher/ProfessionistaDispatcher";
import { operazioniProfessionisti } from "../../vario/Operazioni";

const ProfessionistaAction = {
  async dispatchAction(data, operazione) { 
    return new Promise((resolve, reject) => {
      try {
        ProfessionistaDispatcher.dispatch({
          type: operazioniProfessionisti[operazione] || null,
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

export default ProfessionistaAction;









