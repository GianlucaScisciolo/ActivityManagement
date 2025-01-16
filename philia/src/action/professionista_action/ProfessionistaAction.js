import ProfessionistaDispatcher from "../../dispatcher/professionista_dispatcher/ProfessionistaDispatcher";
import { operazioniProfessionisti } from "../../vario/Operazioni";


// const ProfessionistaAction = {
//   dispatchAction(data, operazione) { 
//     try {
//       ProfessionistaDispatcher.dispatch({
//         type: operazioni[operazione] || null,
//         payload: data,
//       })
//     }
//     catch(error) {
//       console.error("Impossibile inviare l\'azione " + operazione + ": " + error);
//     }
//   },
// }

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









