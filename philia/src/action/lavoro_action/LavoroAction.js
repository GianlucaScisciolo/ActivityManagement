import LavoroDispatcher from "../../dispatcher/lavoro_dispatcher/LavoroDispatcher";
import { operazioniLavori } from "../../vario/Operazioni";

const LavoroAction = {
  async dispatchAction(data, operazione) {
    try {
      await LavoroDispatcher.dispatch({
        type: operazioniLavori[operazione] || null,
        payload: data,
      });
    } catch (error) {
      console.error("Impossibile inviare l'azione " + operazione + ": " + error);
    }
  },
}


export default LavoroAction;












