// Store
import store from "../store/store";
// Reducers
import { attivitaSliceActions } from "../store/reducers/AttivitaReducer";

export class AttivitaActions {
  
  constructor() {

  }

  async ricercaEntrateUsciteRicavi(e, datiRicerca) {
    e.preventDefault();
  }

  scegliWidgets(e, setPlusCliccato, plusCliccato) {
    e.preventDefault();
    setPlusCliccato(!plusCliccato);
    if(plusCliccato === true) {
      store.dispatch(attivitaSliceActions.widgetView())
    }
    else if(plusCliccato === false) {
      store.dispatch(attivitaSliceActions.widgetSelected());
    }
  }

  modificaWidget(nomeWidget, tipoVisualizzazione) {
    store.dispatch(attivitaSliceActions.modificaWidget({
      nomeWidget: nomeWidget,
      tipoVisualizzazione: tipoVisualizzazione,
    }))
  }

  modificaLingua(e) {
    e.preventDefault();
    store.dispatch(attivitaSliceActions.modificaLingua())
  }
}









