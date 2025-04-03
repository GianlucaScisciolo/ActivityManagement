/************************************************** Dispatcher **************************************************/
import { Dispatcher } from "../dispatcher/Dispatcher";

export class SaloneActions {
  dispatcher;
  constructor() {
    this.dispatcher = new Dispatcher();
  }

  azzeraListe() {
    this.dispatcher.azzeraListe();
  }

  scegliWidgets(e, setPlusCliccato, plusCliccato) {
    e.preventDefault();
    setPlusCliccato(!plusCliccato);
    if(plusCliccato === true) {
      this.dispatcher.widgetView();
    }
    else if(plusCliccato === false) {
      this.dispatcher.widgetSelected();
    }
  }

  modificaWidget(nomeWidget, tipoVisualizzazione) {
    this.dispatcher.modificaWidget(nomeWidget, tipoVisualizzazione);
  }
}









