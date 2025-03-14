import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOperationBody } from "../../app/app_view/component/Operazioni";
import { handleInputChange, handleInputClick, handleInputBlur } from "../../vario/Vario";
import { FormNuovoItem } from "../../riutilizzabile/form_item/FormItem";
import { CardNuovoItem } from "../../riutilizzabile/card_item/CardItem";
import { RowNuovoItem } from "../../riutilizzabile/row_item/RowItem";
import { controlloSpesa } from "../../vario/Controlli";
import { getCampiNuovaSpesa, getCampiSpesaEsistente, indiciNuovaSpesa, indiciSpesaEsistente } from "../spesa_action/SpeseVario";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem";
import { aggiornaTipoSelezione, inserimentoSpesa } from "../../store/redux/SpeseSlice";

const NuovaSpesa = () => {
  const speseSession = useSelector((state) => state.speseSession.value);
  const dispatch = useDispatch();
  
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [nuovaSpesa, setNuovaSpesa] = useState({
    tipo_item: "spesa", 
    tipo_selezione: 0,
    nome: "",
    giorno: "",
    descrizione: "",
    totale: 0,
    note: "", 
    errore_nome: "",
    errore_giorno: "",
    errore_descrizione: "",
    errore_totale: "",
    errore_note: "",
  })

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_spesa: id, 
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
    if (confirm("Sei sicuro di voler salvare la spesa?")) {
      if (controlloSpesa(nuovaSpesa, setNuovaSpesa) > 0) 
        return;
      
      try {
        const response = await fetch('/INSERISCI_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovaSpesa),
        });

        if(response.status === 200) {
          const result = await response.json();
          nuovaSpesa.id = result.id;
          dispatch(inserimentoSpesa({
            nuovaSpesa: nuovaSpesa 
          }));
          alert("L\'inserimento della spesa è andato a buon fine!!");
        }
        else if(response.status === 400) {
          alert("Errore: spesa gia\' presente.")
        }
        else {
          alert("Errore durante il salvataggio della nuova spesa, riprova più tardi.");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante il salvataggio della nuova spesa, riprova più tardi.");
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
            campiNuovoItem: getCampiNuovaSpesa(
              nuovaSpesa, 
              (e) => handleInputChange(e, setNuovaSpesa), 
              (e) => handleInputClick(e), 
              (e) => handleInputBlur(e) 
            ), 
            indiciNuovoItem: indiciNuovaSpesa, 
            handleInsert: (e) => handleInsert(e), 
            tipoItem: "spesa", 
            items: speseSession.nuoveSpese, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: getCampiSpesaEsistente, 
            indiciItemEsistente: indiciSpesaEsistente, 
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

export default NuovaSpesa;









