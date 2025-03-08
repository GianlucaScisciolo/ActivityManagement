import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { selectOperationBody } from "../component/Operazioni";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import ServizioAction from "../../action/servizio_action/ServizioAction";
import servizioStore from "../../store/servizio_store/ServizioStore";
import { operazioniServizi } from "../../vario/Operazioni";
import { getCampiRicercaLavori, getCampiLavoroEsistente, indiciRicercaLavori, indiciLavoroEsistente } from "./lavoriVario";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaLavori, aggiornaTipoSelezione, aggiornaLavoro } from "../../store/redux/LavoriSlice";

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

    if (confirm("Sei sicuro di voler modificare i lavori?")) {
      let lavoriDaNonModificare = lavoriSession.lavori.filter(lavoro => !selectedIdsModifica.includes(lavoro.id));
      let lavoriDaModificare = lavoriSession.lavori.filter(lavoro => selectedIdsModifica.includes(lavoro.id));
      let esitiModifica = [];
      for(let i = 0; i < lavoriDaModificare.length; i++) {
        const dati = {
          tipo_item: "lavoro", 
          item: lavoriDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitiModifica.push([lavoriDaModificare[i], "Modifica avvenuta con successo."]);
        }
        else if(response.status === 400) {
          esitiModifica.push([lavoriDaModificare[i], "Errore durante la modifica: lavoro x gia\' presente."]);
          // copiaLavoriDaModificare[i] = lavoriDaModificare[i];
        }
        else {
          esitiModifica.push([lavoriDaModificare[i], "Errore durante la modifica del lavoro x."]);
          // copiaLavoriDaModificare[i] = lavoriDaModificare[i];
        }
      }

      let lavoriAggiornati = [];
      for (let i = 0; i < lavoriSession.lavori.length; i++) {
        let lavoroAggiornato = { ...lavoriSession.lavori[i] };
        if(lavoroAggiornato.tipo_selezione === 1) {
          lavoroAggiornato.tipo_selezione = 0;
        }
        lavoriAggiornati.push(lavoroAggiornato);
      }
      dispatch(aggiornaLavori({
        lavori: lavoriAggiornati, 
      }));

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert("Modifica effettuata.");
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  const getAllServizi = async () => {
    try {
      const response = await fetch('/OTTIENI_TUTTI_GLI_ITEMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tipo_item: "servizio"}),
      });

      if(response.status === 200) {
        const result = await response.json();
        setServizi(result.items);
      }
      else {
        alert("Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante l\'ottenimento dei clienti per l\'inserimento di un nuovo lavoro, riprova più tardi.");
    }
  };

  useEffect(() => {
    getAllServizi();
  }, []);

  return (
    <>
      <PaginaWebRicercaItems 
        componenti={
          {
            campiRicercaItems: getCampiRicercaLavori(
              datiRicerca, 
              (e) => handleInputChange(e, setDatiRicerca), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e)  
            ), 
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









