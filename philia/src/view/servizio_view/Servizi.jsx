import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationBody } from "../component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import { 
  getCampiRicercaServizi, getCampiServizioEsistente, 
  indiciRicercaServizi, indiciServizioEsistente
} from "./ServiziVario";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaServizi, aggiornaTipoSelezione } from "../../store/redux/ServiziSlice";

const Servizi = () => {
  const serviziSession = useSelector((state) => state.serviziSession.value);
  const dispatch = useDispatch();

  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "servizio", 
    nome: "", 
    prezzo_min: "",
    prezzo_max: "",  
    note: ""
  });

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_servizio: id, 
      nuova_selezione: nuova_selezione
    }));
  }
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem 
    )
  }
  
  const handleSearch = async (e) => {
    e.preventDefault();
        
    try {
      const response = await fetch('/VISUALIZZA_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datiRicerca),
      });

      if(response.status === 200) {
        const result = await response.json();
        dispatch(aggiornaServizi({
          servizi: result.items, 
        }));
      }
      else {
        alert("Errore durante la ricerca dei servizi, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei clienti, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i servizi?")) {
      const dati = {
        tipo_item: "servizio", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = serviziSession.servizi.filter(servizio => dati.ids.includes(servizio.id));
      const itemsRestanti = serviziSession.servizi.filter(servizio => !dati.ids.includes(servizio.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          dispatch(aggiornaServizi({
            servizi: itemsRestanti, 
          }))
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei servizi, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei servizi, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare i servizi?")) {
      let serviziDaNonModificare = serviziSession.servizi.filter(servizio => !selectedIdsModifica.includes(servizio.id));
      let serviziDaModificare = serviziSession.servizi.filter(servizio => selectedIdsModifica.includes(servizio.id)); 
      // let copiaServiziDaModificare = [...serviziDaModificare];
      
      let esitiModifica = [];
      for(let i = 0; i < serviziDaModificare.length; i++) {
        const dati = {
          tipo_item: "servizio", 
          item: serviziDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitiModifica.push([serviziDaModificare[i], "Modifica avvenuta con successo."]);
        }
        else if(response.status === 400) {
          esitiModifica.push([serviziDaModificare[i], "Errore durante la modifica: servizio x gia\' presente."]);
          // copiaServiziDaModificare[i] = serviziDaModificare[i];
        }
        else {
          esitiModifica.push([serviziDaModificare[i], "Errore durante la modifica del servizio x."]);
          // copiaServiziDaModificare[i] = serviziDaModificare[i];
        }
      }

      let serviziAggiornati = [];
      for (let i = 0; i < servizi.length; i++) {
        let servizioAggiornato = { ...servizi[i] };
        if(servizioAggiornato.tipo_selezione === 1) {
          servizioAggiornato.tipo_selezione = 0;
        }
        serviziAggiornati.push(servizioAggiornato);
      }
      setServizi(serviziAggiornati);

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert("Modifica effettuata.");
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  return (
    <>
      <PaginaWebRicercaItems 
        componenti={ 
          {
            campiRicercaItems: getCampiRicercaServizi(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null),
            indiciRicercaItems: indiciRicercaServizi, 
            handleSearch: (e) => handleSearch(e), 
            tipoItem: "servizio", 
            items: serviziSession.servizi, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: getCampiServizioEsistente, 
            indiciItemEsistente: indiciServizioEsistente, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => handleEdit(e), 
            handleDelete: (e) => handleDelete(e)
          }
        }
      />
    </>
  );
}

export default Servizi;