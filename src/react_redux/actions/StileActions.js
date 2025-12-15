// React e Redux
import { useDispatch } from 'react-redux';
// Reducers
import { stileSliceActions } from '../store/reducers/StileReducer';

export class StileActions {
  dispatch = useDispatch();

  constructor() {
    
  }

  cambioSfondo(tipoSfondo, sfondo, lingua) {
    switch(tipoSfondo) {
      case "img":
        this.dispatch(stileSliceActions.cambioImmagineSfondo({
          pathImg: sfondo
        }));
        break;
      case "rgb": 
        this.dispatch(stileSliceActions.cambioColoreSfondo({
          coloreRGB: sfondo
        }));
        break;
      default:
        alert(lingua === "italiano" ? "Errore, tipo sfondo non valido." : "Error, invalid background type.");
        break;
    }
  }

  cambioVista(tipoElemento, tipoView, lingua) {
    if(tipoElemento === "item") {
      this.dispatch(stileSliceActions.cambioVistaItem({
        vistaItem: tipoView
      }));
    }
    else if(tipoElemento === "form") {
      this.dispatch(stileSliceActions.cambioVistaForm({
        vistaForm: tipoView
      }))
    }
    else {
      alert(lingua === "italiano" ? "Errore, tipo elemento non valido." : "Error, invalid element type.");
    }
  }
}









