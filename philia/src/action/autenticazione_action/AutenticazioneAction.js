import AutenticazioneDispatcher from "../../dispatcher/autenticazione_dispatcher/AutenticazioneDispatcher.js";
import { operazioniAutenticazione } from "../../vario/Operazioni.js";

// const AutenticazioneAction = {
//   dispatchAction(data, operazione) { 
//     return new Promise((resolve, reject) => {
//       try {
//         AutenticazioneDispatcher.dispatch({
//           type: operazioniAutenticazione[operazione] || null,
//           payload: data,
//         });
//         resolve();
//       } catch(error) {
//         console.error("Impossibile inviare l'azione " + operazione + ": " + error);
//         reject(error);
//       }
//     });
//   },
// };
const AutenticazioneAction = {
  dispatchAction(data, operazione) { 
    return new Promise((resolve, reject) => {
      try {
        AutenticazioneDispatcher.dispatch({
          type: operazioniAutenticazione[operazione] || null,
          payload: data,
        });
        resolve();
      } catch(error) {
        console.error("Impossibile inviare l'azione " + operazione + ": " + error);
        // reject(error);
      }
    });
  },
};

export default AutenticazioneAction;










