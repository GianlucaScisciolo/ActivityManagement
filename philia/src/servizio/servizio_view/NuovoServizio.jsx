import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationBody } from "../../app/app_view/component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { controlloServizio } from "../../vario/Controlli";
import { ServizioAction } from "../servizio_action/ServizioAction.js";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem";
import { aggiornaTipoSelezione, inserimentoServizio } from "../../store/redux/ServiziSlice";

const NuovoServizio = () => {
  const servizioAction = new ServizioAction();
  const serviziSession = useSelector((state) => state.serviziSession.value);
  const dispatch = useDispatch();

  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [nuovoServizio, setNuovoServizio] = useState({
    tipo_item: "servizio", 
    tipo_selezione: 0,
    nome: "",
    prezzo: "0.50",
    note: "", 
    errore_nome: "", 
    errore_prezzo: "", 
    errore_note: ""
  })

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

  const handleInsert = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare il servizio?")) {
      if (controlloServizio(nuovoServizio, setNuovoServizio) > 0) 
        return;
      
      try {
        const response = await fetch('/INSERISCI_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoServizio),
        });
        if(response.status === 200) {
          const result = await response.json();
          nuovoServizio.id = result.id;
          dispatch(inserimentoServizio({
            nuovoServizio: nuovoServizio
          }));
          alert("L\'inserimento del servizio è andato a buon fine!!");
        }
        else if(response.status === 400) {
          alert("Errore: servizio gia\' presente.")
        }
        else {
          alert("Errore durante il salvataggio del nuovo servizio, riprova più tardi.");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante il salvataggio del nuovo servizio, riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  };
  
  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: servizioAction.getCampiNuovoServizio(nuovoServizio, (e) => handleInputChange(e, setNuovoServizio), null, null), 
            indiciNuovoItem: servizioAction.INDICI_NUOVO_SERVIZIO, 
            handleInsert: (e) => handleInsert(e), 
            tipoItem: "servizio", 
            items: serviziSession.nuoviServizi, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: servizioAction.getCampiServizioEsistente, 
            indiciItemEsistente: servizioAction.INDICI_SERVIZIO_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: null, 
            handleDelete: null
          }
        }
      />
    </>
  )
}

export default NuovoServizio;









