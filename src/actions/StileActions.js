/************************************************** Dispatcher **************************************************/
import { Dispatcher } from "../dispatcher/Dispatcher";

export class StileActions {
  dispatcher;
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
        alert("Errore, tipo sfondo non valido.");
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
      alert("Errore, tipo elemento non valido.");
    }
  }
}









