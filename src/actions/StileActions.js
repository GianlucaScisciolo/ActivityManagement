import { dispatcher } from "../dispatcher/Dispatcher";
import { stileSliceActions } from "../store/redux/StileSlice";
// import immagineSfondo1 from "../"//"../../img/immagine_sfondo1.jpg";
// import immagineSfondo2 from '../../img/immagine_sfondo2.png';
import immagineSfondo1 from "../view/img/immagine_sfondo1.jpg";
import immagineSfondo2 from "../view/img/immagine_sfondo2.png";

export class StileActions {
  constructor() {

  }

  cambioSfondo(nomeSfondo) {
    switch(nomeSfondo) {
      case "immagine_1":
        dispatcher(stileSliceActions.cambioImmagineSfondo({
          pathImg: immagineSfondo1
        }));
        break;
      case "immagine_2":
        dispatcher(stileSliceActions.cambioImmagineSfondo({
          pathImg: immagineSfondo2
        }));
        break;
      case "sfondo_scuro":
        dispatcher(stileSliceActions.cambioColoreSfondo({
          coloreRGB: "#111111"
        }));
        break;
      case "sfondo_chiaro":
        dispatcher(stileSliceActions.cambioColoreSfondo({
          coloreRGB: "#8F8F8F"
        }));
        break;
      default:
        alert("Errore, nome sfondo non trovato.");
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









