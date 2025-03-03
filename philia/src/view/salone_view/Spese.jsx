import { useState } from "react";
import { useSelector } from "react-redux";
import { selectOperationBody } from "../component/Operazioni";
import { handleInputChange } from "../../vario/Vario";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import { 
  getCampiRicercaSpese, getCampiSpesaEsistente, 
  indiciRicercaSpese, indiciSpesaEsistente
} from "./SpeseVario";
import { useDispatch } from "react-redux";
import PaginaWeb from "../../riutilizzabile/PaginaWeb";

const Spese = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const speseSession = useSelector((state) => state.speseSession.value);
  const dispatch = useDispatch();
  
  const [spese, setSpese] = useState(0);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "spesa", 
    nome: "", 
    descrizione: "", 
    totale_min: "",
    totale_max: "",  
    primo_giorno: "", 
    ultimo_giorno: "", 
    note: ""
  });
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  const RicercaSpeseTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )

  const [aggiornamento, setAggiornamento] = useState(false);

  // useEffect(() => {
  //   const onChange = () => {
  //     dispatch(aggiornaSpese({
  //       spese: response.data.spese,
  //     }));
  //   };
  //   saloneStore.addChangeListener(operazioniSaloni.VISUALIZZA_SPESE, onChange);
  //   return () => {
  //     saloneStore.removeChangeListener(operazioniSaloni.VISUALIZZA_SPESE, onChange);
  //   };

  // }, []);
  // useEffect(() => {
  //   console.log("|"+speseSession.spese+"|");
  //   if(speseSession.spese !== 0 && speseSession.spese !== "0") {
  //     console.log("<"+speseSession.spese+">");
  //     if(speseSession.spese === -1) {
  //       dispatch(aggiornaSpese({
  //         spese: saloneStore.getSpese(),
  //       }));
  //       setAggiornamento(!aggiornamento);
  //     }
  //   }
  //   // console.log(speseSession.spese);
  // });

  // console.log(speseSession.spese);

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
        setSpese(result.items);
      }
      else {
        alert("Errore durante la ricerca delle spese, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca delle spese, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare le spese?")) {
      const dati = {
        tipo_item: "spesa", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = spese.filter(spesa => dati.ids.includes(spesa.id));
      const itemsRestanti = spese.filter(spesa => !dati.ids.includes(spesa.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          setSpese(itemsRestanti);
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione delle spese, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione delle spese, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare le spese?")) {
      let speseDaNonModificare = spese.filter(spesa => !selectedIdsModifica.includes(spesa.id));
      let speseDaModificare = spese.filter(spesa => selectedIdsModifica.includes(spesa.id)); 
      // let copiaSpeseDaModificare = [...speseDaModificare];
      
      let esitiModifica = [];
      for(let i = 0; i < speseDaModificare.length; i++) {
        const dati = {
          tipo_item: "spesa", 
          item: speseDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitiModifica.push([speseDaModificare[i], "Modifica avvenuta con successo."]);
        }
        else if(response.status === 400) {
          esitiModifica.push([speseDaModificare[i], "Errore durante la modifica: spesa x gia\' presente."]);
          // copiaSpeseDaModificare[i] = speseDaModificare[i];
        }
        else {
          esitiModifica.push([speseDaModificare[i], "Errore durante la modifica della spesa x."]);
          // copiaSpeseDaModificare[i] = speseDaModificare[i];
        }
      }

      let speseAggiornate = [];
      for (let i = 0; i < spese.length; i++) {
        let spesaAggiornata = { ...spese[i] };
        if(spesaAggiornata.tipo_selezione === 1) {
          spesaAggiornata.tipo_selezione = 0;
        }
        speseAggiornate.push(spesaAggiornata);
      }
      setSpese(speseAggiornate);

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert("Modifica effettuata.");
    }
    else {
      alert("Salvataggio annullato.");
    }
  };

  return (
    <>
      <PaginaWeb 
        componenti={
          {
            ricerca_items: {
              campi: getCampiRicercaSpese(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null), 
              indici: indiciRicercaSpese, 
              handle_search: (e) => handleSearch(e)
            }, 
            items: {
              tipo_item: "spesa", 
              items: spese, 
              set_items: setSpese, 
              select_operation: selectOperation, 
              campi: getCampiSpesaEsistente, 
              indici: indiciSpesaEsistente, 
              servizi: null
            },
            operazioni_items: {
              selected_ids_modifica: selectedIdsModifica, 
              selected_ids_eliminazione: selectedIdsEliminazione, 
              handle_edit: (e) => handleEdit(e), 
              handle_delete: (e) => handleDelete(e)
            }
          }
        }
      />
    </>
  );
}

export default Spese;









