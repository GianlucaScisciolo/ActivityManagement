// React e Redux
import { useSelector } from 'react-redux';
// Store
import store from '../store/store';
// Reducers
import { stileSliceActions } from '../store/reducers/StileReducer';

export class StileActions {
  attivitaState = useSelector((state) => state.attivita.value);
  lingua = this.attivitaState.lingua;

  constructor() {
    
  }

  cambioSfondo(tipoSfondo, sfondo) {
    switch(tipoSfondo) {
      case "img":
        store.dispatch(stileSliceActions.cambioImmagineSfondo({
          pathImg: sfondo
        }));
        break;
      case "rgb": 
        store.dispatch(stileSliceActions.cambioColoreSfondo({
          coloreRGB: sfondo
        }));
        break;
      default:
        alert(this.lingua === "italiano" ? "Errore, tipo sfondo non valido." : "Error, invalid background type.");
        break;
    }
  }

  cambioVista(tipoElemento, tipoView) {
    if(tipoElemento === "item") {
      store.dispatch(stileSliceActions.cambioVistaItem({
        vistaItem: tipoView
      }));
    }
    else if(tipoElemento === "form") {
      store.dispatch(stileSliceActions.cambioVistaForm({
        vistaForm: tipoView
      }))
    }
    else {
      alert(this.lingua === "italiano" ? "Errore, tipo elemento non valido." : "Error, invalid element type.");
    }
  }
}









