import { useSelector } from 'react-redux';
/************************************************** Dispatcher **************************************************/
import { Dispatcher } from "../dispatcher/Dispatcher";

export class StileActions {
  dispatcher;
  saloneState = useSelector((state) => state.saloneSliceReducer.value);
  lingua = this.saloneState.lingua;

  constructor() {
    this.dispatcher = new Dispatcher();
  }

  cambioSfondo(tipoSfondo, sfondo) {
    switch(tipoSfondo) {
      case "img":
        this.dispatcher.cambioImmagineSfondo(sfondo);
        break;
      case "rgb": 
        this.dispatcher.cambioColoreSfondo(sfondo);
        break;
      default:
        alert(this.lingua === "italiano" ? "Errore, tipo sfondo non valido." : "Error, invalid background type.");
        break;
    }
  }

  cambioVista(tipoElemento, tipoView) {
    if(tipoElemento === "item") {
      this.dispatcher.cambioVistaItem(tipoView);
    }
    else if(tipoElemento === "form") {
      this.dispatcher.cambioVistaForm(tipoView);
    }
    else {
      alert(this.lingua === "italiano" ? "Errore, tipo elemento non valido." : "Error, invalid element type.");
    }
  }
}









