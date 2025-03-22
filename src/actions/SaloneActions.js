/************************************************** Dispatcher **************************************************/
import { dispatcher } from "../dispatcher/Dispatcher";
/************************************************** Slices Actions **************************************************/
import { saloneSliceActions } from "../store/slice/SaloneSlice";

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









