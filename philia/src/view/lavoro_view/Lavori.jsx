import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleInputChange } from "../../vario/Vario";
import { selectOperationBody } from "../component/Operazioni";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import ServizioAction from "../../action/servizio_action/ServizioAction";
import servizioStore from "../../store/servizio_store/ServizioStore";
import { operazioniServizi } from "../../vario/Operazioni";
import { 
  getCampiRicercaLavori, getCampiLavoroEsistente, 
  indiciRicercaLavori, indiciLavoroEsistente 
} from "./LavoriVario";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaLavori, aggiornaTipoSelezione } from "../../store/redux/LavoriSlice";

const Lavori = () => {
  const lavoriSession = useSelector((state) => state.lavoriSession.value);
  const dispatch = useDispatch();
  const [servizi, setServizi] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "lavoro", 
    nome_cliente: "", 
    cognome_cliente: "", 
    primo_giorno: "",
    ultimo_giorno: "",
    descrizione: "",   
    note: ""
  });

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_lavoro: id, 
      nuova_selezione: nuova_selezione
    }));
  }

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem 
    )
  }

  // const getAllServizi = async () => {
  //   await ServizioAction.dispatchAction(null, operazioniServizi.OTTIENI_TUTTI_I_SERVIZI);
  //   const serviziFiltrati = servizioStore.getServizi();
  //   setServizi(serviziFiltrati);
  // };
  
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
        dispatch(aggiornaLavori({
          lavori: result.items,
        }));
      }
      else {
        alert("Errore durante la ricerca dei lavori, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei lavori, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i lavori?")) {
      const dati = {
        tipo_item: "lavoro", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = lavoriSession.lavori.filter(lavoro => dati.ids.includes(lavoro.id));
      const itemsRestanti = lavoriSession.lavori.filter(lavoro => !dati.ids.includes(lavoro.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          dispatch(aggiornaLavori({
            lavori: itemsRestanti,
          }));
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei lavori, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei lavori, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare le spese?")) {
      alert("Operazione da aggiustare ancora.");
    }
    else {
      alert("Modifica annullata.");
    }
  }

  return (
    <>
      <PaginaWebRicercaItems 
        componenti={
          {
            campiRicercaItems: getCampiRicercaLavori(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null), 
            indiciRicercaItems: indiciRicercaLavori, 
            handleSearch: (e) => handleSearch(e), 
            tipoItem: "lavoro", 
            items: lavoriSession.lavori, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: getCampiLavoroEsistente, 
            indiciItemEsistente: indiciLavoroEsistente, 
            servizi: servizi, 
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

export default Lavori;









