import { useState } from "react";
import { useSelector } from "react-redux";
import { selectOperationBody } from "../component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { FormNuovoItem } from "../../riutilizzabile/form_item/FormItem";
import { CardNuovoItem } from "../../riutilizzabile/card_item/CardItem";
import { RowNuovoItem } from "../../riutilizzabile/row_item/RowItem";
import { controlloSpesa } from "../../vario/Controlli";
import { 
  getCampiNuovaSpesa, getCampiSpesaEsistente, 
  indiciNuovaSpesa, indiciSpesaEsistente 
} from "./SpeseVario";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";
import PaginaWebNewItem from "../../riutilizzabile/PaginaWebNewItem";

const NuovaSpesa = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [spese, setSpese] = useState([]);
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

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
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
          setSpese(prevSpese => [...prevSpese, nuovaSpesa]);
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
  
  const NuovaSpesaTag = (formSession.view === "form") ? FormNuovoItem : (
    (formSession.view === "card") ? CardNuovoItem : RowNuovoItem
  )

  return (
    <>
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: getCampiNuovaSpesa(nuovaSpesa, (e) => handleInputChange(e, setNuovaSpesa), null, null), 
            indiciNuovoItem: indiciNuovaSpesa, 
            handleInsert: (e) => handleInsert(e), 
            tipoItem: "spesa", 
            items: spese, 
            setItems: setSpese, 
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









