// Nuovo pagamento
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { FormNuovoItem } from "../../trasportabile/form_item/FormItem";
import { CardNuovoItem } from "../../trasportabile/card_item/CardItem";
import { RowNuovoItem } from "../../trasportabile/row_item/RowItem";
import { controlloUscita } from "../../vario/Controlli";
import { Items } from "../component/Items";
import { modifica } from "../../vario/OperazioniModifica";
import { elimina } from "../../vario/OperazioniEliminazione";
import { 
  getCampiNuovaUscita, getCampiUscitaEsistente, 
  indiciNuovaUscita, indiciUscitaEsistente 
} from "./UsciteVario";

const NuovaUscita = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [uscite, setUscite] = useState([]);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [nuovaUscita, setNuovaUscita] = useState({
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
    if (confirm("Sei sicuro di voler l\'uscita?")) {
      if (controlloUscita(nuovaUscita, setNuovaUscita) > 0) 
        return;
      
      try {
        const response = await fetch('/INSERISCI_USCITA', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovaUscita),
        });
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            alert(errorData.message); 
          } 
          else {
            throw new Error('Errore durante l\'inserimento dell\'uscita.');
          }
        } 
        else {
          const result = await response.json();
          // nuovaUscita.descrizione = nuovaUscita.descrizione.split(' ').join('');
          // nuovaUscita.note = nuovaUscita.note.split(' ').join('');
  
          setUscite(prevUscite => [...prevUscite, { ...nuovaUscita, id: result.id }]);
          setNuovaUscita({
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
  
          alert("L'inserimento dell\'uscita è andato a buon fine!!");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l\'inserimento dell\'uscita. Riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  };
  
  const NuovaUscitaTag = (formSession.view === "form") ? FormNuovoItem : (
    (formSession.view === "card") ? CardNuovoItem : RowNuovoItem
  )

  return (
    <>
      <Header />

      <div className="main-content" />

      <NuovaUscitaTag 
        campi={getCampiNuovaUscita(nuovaUscita, (e) => handleInputChange(e, setNuovaUscita), null, null)}  
        indici={indiciNuovaUscita} 
        eseguiSalvataggio={(e) => handleInsert(e)} 
      />

      <br /> <br /> <br /> <br />

      <Items 
        tipoItem={"uscita"} 
        items={uscite} 
        setItems={setUscite}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiUscitaEsistente}
        indici={indiciUscitaEsistente}
        servizi={null}
      />

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "uscita", selectedIdsModifica, setSelectedIdsModifica, uscite, setUscite)} 
        elimina={(e) => elimina(e, "uscita", selectedIdsEliminazione, setSelectedIdsEliminazione, uscite, setUscite)}
      />

      <br /> <br /> <br /> <br />
    </>
  )
}

export default NuovaUscita;









