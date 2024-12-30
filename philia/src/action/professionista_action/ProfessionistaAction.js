import ProfessionistaDispatcher from "../../dispatcher/professionista_dispatcher/ProfessionistaDispatcher";
import { operazioniProfessionisti } from "../../vario/Operazioni";

const operazioni = operazioniProfessionisti;

const ProfessionistaAction = {
  dispatchAction(data, operazione) { 
    try {
      ProfessionistaDispatcher.dispatch({
        type: operazioni[operazione] || null,
        payload: data,
      })
    }
    catch(error) {
      console.error("Impossibile inviare l\'azione " + operazione + ": " + error);
    }
  },
}

export default ProfessionistaAction;









