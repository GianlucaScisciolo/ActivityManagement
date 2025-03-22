/************************************************** Dispatcher **************************************************/
import { dispatcher } from "../dispatcher/Dispatcher";
/************************************************** Slices Actions **************************************************/
import { stileSliceActions } from "../store/slice/StileSlice";

export class StileActions {
  constructor() {

  }

  cambioSfondo(tipoSfondo, sfondo) {
    switch(tipoSfondo) {
      case "img":
        dispatcher(stileSliceActions.cambioImmagineSfondo({
          pathImg: sfondo
        }));
        break;
      case "rgb": 
        dispatcher(stileSliceActions.cambioColoreSfondo({
          coloreRGB: sfondo
        }));
        break;
      default:
        alert("Errore, tipo sfondo non trovato.");
        break;
    }
  }

  cambioVista(tipoElemento, tipoView) {
    if(tipoElemento === "item") {
      dispatcher(stileSliceActions.cambioVistaItem({
        vistaItem: tipoView
      }));
    }
    else if(tipoElemento === "form") {
      dispatcher(stileSliceActions.cambioVistaForm({
        vistaForm: tipoView
      }));
    }
  }
}









