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

  /*
    async ricercaClienti(e, datiRicerca) {
    e.preventDefault();
        
    const response = await fetch('/VISUALIZZA_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datiRicerca),
    });

    if(response.status === 200) {
      const result = await response.json();
      this.dispatcher.aggiornaClienti(result.items);
    }
    else {
      alert("Errore durante la ricerca dei clienti, riprova più tardi.");
    }
  }
  */
  async ricercaEntrateUsciteRicavi(e, datiRicerca) {
    e.preventDefault();
    // console.log(datiRicerca.primo_anno);
    // if(datiRicerca) {
      this.dispatcher.ricercaEntrateUsciteRicavi(datiRicerca);
    // }
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









