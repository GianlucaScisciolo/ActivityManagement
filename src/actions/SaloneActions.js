// Dispatcher
import { Dispatcher } from "../dispatcher/Dispatcher";

export class SaloneActions {
  dispatcher;
  constructor() {
    this.dispatcher = new Dispatcher();
  }

  azzeraListe() {
    this.dispatcher.azzeraListe();
  }

  async ricercaEntrateUsciteRicavi(e, datiRicerca) {
    e.preventDefault();
    this.dispatcher.ricercaEntrateUsciteRicavi(datiRicerca);
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

  modificaLingua(e) {
    e.preventDefault();
    this.dispatcher.modificaLingua();
  }
}









