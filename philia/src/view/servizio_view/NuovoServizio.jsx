import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { FormNuovoItem } from "../../trasportabile/form_item/FormItem";
import { CardNuovoItem } from "../../trasportabile/card_item/CardItem";
import { RowNuovoItem } from "../../trasportabile/row_item/RowItem";
import { controlloServizio } from "../../vario/Controlli";
import { Items } from "../component/Items";
import { modifica } from "../../vario/OperazioniModifica";
import { elimina } from "../../vario/OperazioniEliminazione";
import { 
  getCampiNuovoServizio, getCampiServizioEsistente, 
  indiciNuovoServizio, indiciServizioEsistente 
} from "./ServiziVario";

const NuovoServizio = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [servizi, setServizi] = useState([]);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [nuovoServizio, setNuovoServizio] = useState({
    tipo_item: "servizio", 
    tipo_selezione: 1,
    nome: "",
    prezzo: "0.50",
    note: "", 
    errore_nome: "", 
    errore_prezzo: "", 
    errore_note: ""
  })

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
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
          setServizi(prevServizi => [...prevServizi, nuovoServizio]);
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
  
  const NuovoServizioTag = (formSession.view === "form") ? FormNuovoItem : (
    (formSession.view === "card") ? CardNuovoItem : RowNuovoItem
  )

  return (
    <>
      <Header />

      <div className="main-content" />

      <NuovoServizioTag 
        campi={getCampiNuovoServizio(nuovoServizio, (e) => handleInputChange(e, setNuovoServizio), null, null)}  
        indici={indiciNuovoServizio} 
        eseguiSalvataggio={(e) => handleInsert(e)} 
      />

      <br /> <br /> <br /> <br />

      <Items 
        tipoItem={"servizio"} 
        items={servizi} 
        setItems={setServizi}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiServizioEsistente}
        indici={indiciServizioEsistente}
        servizi={null}
      />

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "servizio", selectedIdsModifica, setSelectedIdsModifica, servizi, setServizi)} 
        elimina={(e) => elimina(e, "servizio", selectedIdsEliminazione, setSelectedIdsEliminazione, servizi, setServizi)}
      />

      <br /> <br /> <br /> <br />
    </>
  )
}

export default NuovoServizio;









