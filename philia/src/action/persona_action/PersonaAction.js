import PersonaDispatcher from "../../dispatcher/persona_dispatcher/PersonaDispatcher.js"
import { operazioniPersone } from "../../vario/Operazioni.js";

const PersonaAction = {
  dispatchAction(data, operazione) { 
    // alert(
    //     data.nomeLastSearch + "\n" 
    //   + data.cognomeLastSearch + "\n"
    //   + data.contattoLastSearch + "\n"
    //   + data.noteLastSearch + "\n"
    //   + operazione
    // );
    try {
      PersonaDispatcher.dispatch({
        type: operazioniPersone[operazione] || null,
        payload: data,
      })
    }
    catch(error) {
      console.error("Impossibile inviare l\'azione " + operazione + ": " + error);
    }
  },
};

export default PersonaAction;









