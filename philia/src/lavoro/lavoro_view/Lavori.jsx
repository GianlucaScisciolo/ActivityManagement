import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { selectOperationBody } from "../../app/app_view/component/Operazioni";
import { LavoroAction } from "../lavoro_action/LavoroAction.js";
import PaginaWebRicercaItems from "../../riutilizzabile/PaginaWebRicercaItems";
import { aggiornaLavori, aggiornaTipoSelezione, getLavoroPrimaDellaModifica, getLavoroDopoLaModifica } from "../../store/redux/LavoriSlice";

const Lavori = () => {
  const lavoroAction = new LavoroAction();
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
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem, dispatch, "lavoro" 
    )
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
            campiRicercaItems: lavoroAction.getCampiRicercaLavori(
              datiRicerca, 
              (e) => handleInputChange(e, setDatiRicerca), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e)  
            ), 
            indiciRicercaItems: lavoroAction.INDICI_RICERCA_LAVORI, 
            handleSearch: (e) => lavoroAction.handleSearch(e, datiRicerca, dispatch), 
            tipoItem: "lavoro", 
            items: lavoriSession.lavori, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: lavoroAction.getCampiLavoroEsistente, 
            indiciItemEsistente: lavoroAction.INDICI_LAVORO_ESISTENTE, 
            servizi: servizi, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: (e) => lavoroAction.handleEdit(e, lavoriSession, selectedIdsModifica, setSelectedIdsModifica, dispatch), 
            handleDelete: (e) => lavoroAction.handleDelete(e, selectedIdsEliminazione, setSelectedIdsEliminazione, lavoriSession, dispatch)
          }
        }
      />
    </>
  );
}

export default Lavori;









