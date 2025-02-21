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
        const response = await fetch('/INSERISCI_SERVIZIO', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoServizio),
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            alert(errorData.message); 
          } 
          else {
            throw new Error('Errore durante l\'inserimento del servizio.');
          }
        } 
        else {
          const result = await response.json();
          // console.log("ID NUOVO SERVIZIO: " + result.id);
          nuovoServizio.note = (nuovoServizio.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoServizio.note;
  
          setServizi(prevServizi => [...prevServizi, { ...nuovoServizio, id: result.id }]);
          setNuovoServizio({
            tipo_selezione: 0,
            nome: "",
            prezzo: "0.50",
            note: "", 
            errore_nome: "", 
            errore_prezzo: "", 
            errore_note: ""
          });
  
          alert("L'inserimento del servizio è andato a buon fine!!");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l'inserimento del servizio. Riprova più tardi.");
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









