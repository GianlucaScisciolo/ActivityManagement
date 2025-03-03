import { useState, useEffect } from "react";
import Header from "../component/Header";
import { useSelector } from "react-redux";
import { handleInputChange } from "../../vario/Vario";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import LavoroDispatcher from "../../dispatcher/lavoro_dispatcher/LavoroDispatcher";
import ServizioAction from "../../action/servizio_action/ServizioAction";
import servizioStore from "../../store/servizio_store/ServizioStore";
import lavoroStore from "../../store/lavoro_store/LavoroStore";
import { operazioniServizi, operazioniLavori } from "../../vario/Operazioni";
import { eseguiRicerca } from "../../vario/OperazioniRicerca";
import { Items } from "../component/Items";
import { modifica } from "../../vario/OperazioniModifica";
import { 
  getCampiRicercaLavori, getCampiLavoroEsistente, 
  indiciRicercaLavori, indiciLavoroEsistente 
} from "./LavoriVario";

const Lavori = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [aggiornamento, setAggiornamento] = useState(0);
  const [lavori, setLavori] = useState(-1);
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
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  const RicercaLavoriTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )

  const getAllServizi = async () => {
    await ServizioAction.dispatchAction(null, operazioniServizi.OTTIENI_TUTTI_I_SERVIZI);
    const serviziFiltrati = servizioStore.getServizi();
    setServizi(serviziFiltrati);
  };
  
  // useEffect(() => {
  //   const onChange = () => setLavori(lavoroStore.getLavori());
  //   lavoroStore.addChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
  //   return () => {
  //     lavoroStore.removeChangeListener(operazioniLavori.VISUALIZZA_LAVORI, onChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   getAllServizi();
  //   const onChange = () => setServizi(servizioStore.getServizi());
  //   servizioStore.addChangeListener(operazioniServizi.OTTIENI_TUTTI_I_SERVIZI, onChange);
  //   servizioStore.removeChangeListener(operazioniServizi.OTTIENI_TUTTI_I_SERVIZI, onChange);
  //   console.log("Aggiornamento in corso...");
  //   setAggiornamento(true);
  // }, []);

  // useEffect(() => {
  //   if(aggiornamento !== 0) {
  //     if(servizi !== -1) {
  //       console.log("Aggiornamento effettuato.");
  //     }      
  //     else {
  //       console.log("Aggiornamento in corso...");
  //       setServizi(servizioStore.getServizi());
  //       setAggiornamento(!aggiornamento);
  //     }
  //   }
  // }, [aggiornamento]);

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
        setLavori(result.items);
      }
      else {
        alert("Errore durante la ricerca dei lavori, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei lavori, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i lavori?")) {
      const dati = {
        tipo_item: "lavoro", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = lavori.filter(lavoro => dati.ids.includes(lavoro.id));
      const itemsRestanti = lavori.filter(lavoro => !dati.ids.includes(lavoro.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          setLavori(itemsRestanti);
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei lavori, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei lavori, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare le spese?")) {
      alert("Operazione da aggiustare ancora.");
    }
    else {
      alert("Modifica annullata.");
    }
  }

  return (
    <>
      <Header />
      
      <div className="main-content" />

      <RicercaLavoriTag 
        campi={getCampiRicercaLavori(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaLavori}
        // eseguiRicerca={(e) => eseguiRicerca(e, "lavori", setLavori, datiRicerca)}
        handleSearch={(e) => handleSearch(e)}
      />

      <br /> <br /> <br /> <br />
      
      {(lavori && lavori !== -1) && (
        <Items 
          tipoItem={"lavoro"} 
          items={lavori} 
          setItems={setLavori}
          selectOperation={selectOperation}
          emptyIsConsidered={true} 
          campi={getCampiLavoroEsistente}
          indici={indiciLavoroEsistente}
          servizi={servizi}
        />
      )}
      
      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        // modifica={(e) => modifica(e, "lavoro", selectedIdsModifica, setSelectedIdsModifica, lavori, setLavori)} 
        // elimina={(e) => elimina(e, "lavoro", selectedIdsEliminazione, setSelectedIdsEliminazione, lavori, setLavori)}
        handleEdit={(e) => handleEdit(e)}
        handleDelete={(e) => handleDelete(e)}
      />
      
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Lavori;









