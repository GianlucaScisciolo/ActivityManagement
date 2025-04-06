/************************************************** Store **************************************************/
import store from "../store/store.js";
/************************************************** Slices Actions **************************************************/
import { stileSliceActions } from "../store/slice/StileSlice.js";
import { saloneSliceActions } from "../store/slice/SaloneSlice.js";
import { autenticazioneSliceActions } from "../store/slice/AutenticazioneSlice.js";
import { clienteSliceActions } from "../store/slice/ClienteSlice.js";
import { lavoroSliceActions } from "../store/slice/LavoroSlice.js";
import { servizioSliceActions } from "../store/slice/ServizioSlice.js";
import { spesaSliceActions } from "../store/slice/SpesaSlice.js";

export class Dispatcher {
  cambioImmagineSfondo(pathImg) {
    store.dispatch(stileSliceActions.cambioImmagineSfondo({
      pathImg: pathImg
    }));
  }
  cambioColoreSfondo(coloreRGB) {
    store.dispatch(stileSliceActions.cambioColoreSfondo({
      coloreRGB: coloreRGB
    }));
  }
  cambioVistaItem(vistaItem) {
    store.dispatch(stileSliceActions.cambioVistaItem({
      vistaItem: vistaItem
    }));
  }
  cambioVistaForm(vistaForm) {
    store.dispatch(stileSliceActions.cambioVistaForm({
      vistaForm: vistaForm
    }))
  }

  // Salone
  modificaWidget(nomeWidget, tipoVisualizzazione) {
    store.dispatch(saloneSliceActions.modificaWidget({
      nomeWidget: nomeWidget,
      tipoVisualizzazione: tipoVisualizzazione,
    }))
  }
  widgetSelected() {
    store.dispatch(saloneSliceActions.widgetSelected());
  }
  widgetView() {
    store.dispatch(saloneSliceActions.widgetView())
  }
  azzeraListe() {
    this.aggiornaClienti(-1);
    this.aggiornaServizi(-1);
    this.aggiornaLavori(-1);
    this.aggiornaSpese(-1);
  }
  ricercaEntrateUsciteRicavi(datiRicerca) {
    // console.log("_______________");
    // console.log(datiRicerca);
    // console.log("_______________");
    // Da fare
    this.ricercaEntrateLavori(datiRicerca);
    this.ricercaUsciteSpese(datiRicerca);
  }
  
  // Autenticazione
  eseguiLogin(username, ruolo, note) {
    store.dispatch(autenticazioneSliceActions.eseguiLogin({
      username: username,
      ruolo: ruolo,
      note: note,
    }))
  }
  eseguiLogout() {
    store.dispatch(autenticazioneSliceActions.eseguiLogout())
  }
  eseguiModificaAutenticazione() {
    // Da implementare
    return "";
  }

  // Cliente
  aggiornaClienti(clienti) {
    store.dispatch(clienteSliceActions.aggiornaClienti({
      clienti: clienti, 
    }))
  }
  aggiornaTipoSelezioneCliente(id_cliente, nuova_selezione) {
    store.dispatch(clienteSliceActions.aggiornaTipoSelezione({
      id_cliente: id_cliente, 
      nuova_selezione: nuova_selezione
    }))
  }
  aggiornaCliente(id_cliente, nome_attributo, nuovo_valore) {
    store.dispatch(clienteSliceActions.aggiornaCliente({
      id_cliente: id_cliente,
      nome_attributo: nome_attributo,
      nuovo_valore: nuovo_valore,
    }))
  }
  getClientePrimaDellaModifica(id_cliente) {
    store.dispatch(clienteSliceActions.getClientePrimaDellaModifica({
      id_cliente: id_cliente,
    }))
  }
  getClienteDopoLaModifica(id_cliente) {
    store.dispatch(clienteSliceActions.getClienteDopoLaModifica({
      id_cliente: id_cliente
    }))
  }
  inserimentoCliente(nuovoCliente) {
    store.dispatch(clienteSliceActions.inserimentoCliente({
      nuovoCliente: nuovoCliente
    }))
  }

  // Lavoro
  aggiornaLavori(lavori) {
    store.dispatch(lavoroSliceActions.aggiornaLavori({
      lavori: lavori,
    }))
  }
  aggiornaTipoSelezioneLavoro(id_lavoro, nuova_selezione) {
    store.dispatch(lavoroSliceActions.aggiornaTipoSelezione({
      id_lavoro: id_lavoro, 
      nuova_selezione: nuova_selezione
    }))
  }
  aggiornaLavoro(id_lavoro, nome_attributo, nuovo_valore) {
    store.dispatch(lavoroSliceActions.aggiornaLavoro({
      id_lavoro: id_lavoro, 
      nome_attributo: nome_attributo, 
      nuovo_valore: nuovo_valore
    }))
  }
  getLavoroPrimaDellaModifica(id_lavoro) {
    store.dispatch(lavoroSliceActions.getLavoroPrimaDellaModifica({
      id_lavoro: id_lavoro,
    }))
  }
  getLavoroDopoLaModifica(id_lavoro) {
    store.dispatch(lavoroSliceActions.getLavoroDopoLaModifica({
      id_lavoro: id_lavoro
    }))
  }
  inserimentoLavoro(nuovoLavoro) {
    store.dispatch(lavoroSliceActions.inserimentoLavoro({
      nuovoLavoro: nuovoLavoro 
    }))
  }
  aggiornaEntrateLavori(entrateLavori) {
    store.dispatch(lavoroSliceActions.aggiornaEntrateLavori({
      entrateLavori: entrateLavori
    }));
  }

  // Servizio
  aggiornaServizi(servizi) {
    store.dispatch(servizioSliceActions.aggiornaServizi({
      servizi: servizi, 
    }))
  }
  aggiornaTipoSelezioneServizio(id_servizio, nuova_selezione) {
    store.dispatch(servizioSliceActions.aggiornaTipoSelezione({
      id_servizio: id_servizio, 
      nuova_selezione: nuova_selezione
    }))
  }
  aggiornaServizio(id_servizio, nome_attributo, nuovo_valore) {
    store.dispatch(servizioSliceActions.aggiornaServizio({
      id_servizio: id_servizio,
      nome_attributo: nome_attributo,
      nuovo_valore: nuovo_valore
    }))
  }
  getServizioPrimaDellaModifica(id_servizio) {
    store.dispatch(servizioSliceActions.getServizioPrimaDellaModifica({
      id_servizio: id_servizio
    }))
  }
  getServizioDopoLaModifica(id_servizio) {
    store.dispatch(servizioSliceActions.getServizioDopoLaModifica({
      id_servizio: id_servizio
    }))
  }
  inserimentoServizio(nuovoServizio) {
    store.dispatch(servizioSliceActions.inserimentoServizio({
      nuovoServizio: nuovoServizio
    }))
  }
  
  // Spesa
  aggiornaSpese(spese, nuoveSpese) {
    store.dispatch(spesaSliceActions.aggiornaSpese({
      spese: spese,
    }))
  }
  aggiornaTipoSelezioneSpesa(id_spesa, nuova_selezione) {
    store.dispatch(spesaSliceActions.aggiornaTipoSelezione({
      id_spesa: id_spesa, 
      nuova_selezione: nuova_selezione
    }))
  }
  aggiornaSpesa(id_spesa, nome_attributo, nuovo_valore) {
    store.dispatch(spesaSliceActions.aggiornaSpesa({
      id_spesa: id_spesa,
      nome_attributo: nome_attributo,
      nuovo_valore: nuovo_valore,
    }))
  }
  getSpesaPrimaDellaModifica(id_spesa) {
    store.dispatch(spesaSliceActions.getSpesaPrimaDellaModifica({
      id_spesa: id_spesa,
    }))
  }
  getSpesaDopoLaModifica(id_spesa) {
    store.dispatch(spesaSliceActions.getSpesaDopoLaModifica({
      id_spesa: id_spesa
    }))
  }
  inserimentoSpesa(nuovaSpesa) {
    store.dispatch(spesaSliceActions.inserimentoSpesa({
      nuovaSpesa: nuovaSpesa 
    }))
  }
  aggiornaUsciteSpese(usciteSpese) {
    store.dispatch(spesaSliceActions.aggiornaUsciteSpese({
      usciteSpese: usciteSpese
    }));
  }
};









