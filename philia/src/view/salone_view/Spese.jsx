import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { modifica } from "../../vario/OperazioniModifica";
import { handleInputChange } from "../../vario/Vario";
import { eseguiRicerca } from "../../vario/OperazioniRicerca";
import { FormRicercaItems } from "../../trasportabile/form_item/FormItem";
import { CardRicercaItems } from "../../trasportabile/card_item/CardItem";
import { RowRicercaItems } from "../../trasportabile/row_item/RowItem";
import saloneStore from "../../store/salone_store/SaloneStore";
import { operazioniSaloni } from "../../vario/Operazioni";
import { Items } from "../component/Items";
import { 
  getCampiRicercaSpese, getCampiSpesaEsistente, 
  indiciRicercaSpese, indiciSpesaEsistente
} from "./SpeseVario";
import { useDispatch } from "react-redux";
import { aggiornaSpese } from "../../store/redux/SpeseSlice";
/*

// 



*/

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
      <Header />

      <div className="main-content" />

      {/* <button>{speseSess</button> */}

      <RicercaSpeseTag 
        campi={getCampiRicercaSpese(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaSpese}
        // eseguiRicerca={(e) => eseguiRicerca(e, "spese", null, datiRicerca, dispatch)}
        handleSearch={(e) => handleSearch(e)}
      />
  {/* (e, tipoLista, setLista, datiRicerca, dispatch) */}
      <br /> <br /> <br /> <br />
      
      {/* <button>{speseSession.spese.length}</button> */}

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
        // modifica={(e) => modifica(e, "spesa", selectedIdsModifica, setSelectedIdsModifica, spese, setSpese)} 
        // elimina={(e) => elimina(e, "spesa", selectedIdsEliminazione, setSelectedIdsEliminazione, spese, setSpese)}
        handleEdit={(e) => handleEdit(e)} 
        handleDelete={(e) => handleDelete(e)}
      /> 
      
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Spese;