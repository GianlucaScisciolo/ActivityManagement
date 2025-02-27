// Nuovo pagamento
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { FormNuovoItem } from "../../trasportabile/form_item/FormItem";
import { CardNuovoItem } from "../../trasportabile/card_item/CardItem";
import { RowNuovoItem } from "../../trasportabile/row_item/RowItem";
import { controlloSpesa } from "../../vario/Controlli";
import { Items } from "../component/Items";
import { modifica } from "../../vario/OperazioniModifica";
import { elimina } from "../../vario/OperazioniEliminazione";
import { 
  getCampiNuovaSpesa, getCampiSpesaEsistente, 
  indiciNuovaSpesa, indiciSpesaEsistente 
} from "./SpeseVario";

const NuovaSpesa = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [spese, setSpese] = useState([]);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [nuovaSpesa, setNuovaSpesa] = useState({
    tipo_selezione: 1,
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
        const response = await fetch('/INSERISCI_SPESA', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovaSpesa),
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            alert(errorData.message); 
          } 
          else {
            throw new Error('Errore durante l\'inserimento della spesa.');
          }
        } 
        else {
          const result = await response.json();
          
          setSpese(prevSpese => [...prevSpese, { ...nuovaSpesa, id: result.id }]);
          setNuovaSpesa({
            tipo_selezione: 1,
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
          });
  
          alert("L'inserimento della spesa è andato a buon fine!!");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l\'inserimento della spesa. Riprova più tardi.");
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
      <Header />

      <div className="main-content" />

      <NuovaSpesaTag 
        campi={getCampiNuovaSpesa(nuovaSpesa, (e) => handleInputChange(e, setNuovaSpesa), null, null)}  
        indici={indiciNuovaSpesa} 
        eseguiSalvataggio={(e) => handleInsert(e)} 
      />

      <br /> <br /> <br /> <br />

      <Items 
        tipoItem={"spesa"} 
        items={spese} 
        setItems={setSpese}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiSpesaEsistente}
        indici={indiciSpesaEsistente}
        servizi={null}
      />

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "spesa", selectedIdsModifica, setSelectedIdsModifica, spese, setSpese)} 
        elimina={(e) => elimina(e, "spesa", selectedIdsEliminazione, setSelectedIdsEliminazione, spese, setSpese)}
      />

      <br /> <br /> <br /> <br />
    </>
  )
}

export default NuovaSpesa;









