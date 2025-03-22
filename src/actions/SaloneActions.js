/*
import { controlloCliente } from "../utils/Controlli";
import { clienteSliceActions } from "../store/redux/ClienteSlice";
*/
import { saloneSliceActions } from "../store/redux/SaloneSlice";
import { dispatcher } from "../dispatcher/Dispatcher";

export class SaloneActions {
  constructor() {

  }

  scegliWidgets(e, setPlusCliccato, plusCliccato) {
    e.preventDefault();
    setPlusCliccato(!plusCliccato);
    if(plusCliccato === true) {
      dispatcher(saloneSliceActions.widgetView());
    }
    else if(plusCliccato === false) {
      dispatcher(saloneSliceActions.widgetSelected());
    }
  }

  modificaWidget(nomeWidget, tipoVisualizzazione) {
    dispatcher(saloneSliceActions.modificaWidget({
      nomeWidget: nomeWidget,
      tipoVisualizzazione: tipoVisualizzazione,
    }));
  }
}









