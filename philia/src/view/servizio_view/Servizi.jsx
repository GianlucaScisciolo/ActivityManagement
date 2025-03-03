import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import { OperazioniItems, selectOperationBody } from "../component/Operazioni";
import { modifica } from "../../vario/OperazioniModifica";
import { handleInputChange } from "../../vario/Vario";
import { eseguiRicerca } from "../../vario/OperazioniRicerca";
import { FormRicercaItems } from "../../riutilizzabile/form_item/FormItem";
import { CardRicercaItems } from "../../riutilizzabile/card_item/CardItem";
import { RowRicercaItems } from "../../riutilizzabile/row_item/RowItem";
import servizioStore from "../../store/servizio_store/ServizioStore";
import { operazioniServizi } from "../../vario/Operazioni";
import { Items } from "../component/Items";
import { 
  getCampiRicercaServizi, getCampiServizioEsistente, 
  indiciRicercaServizi, indiciServizioEsistente
} from "./ServiziVario";

const Servizi = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [servizi, setServizi] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "servizio", 
    nome: "", 
    prezzo_min: "",
    prezzo_max: "",  
    note: ""
  });
  
  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  const RicercaServiziTag = (formSession.view === "form") ? FormRicercaItems : (
    (formSession.view === "card") ? CardRicercaItems : RowRicercaItems
  )

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
        setServizi(result.items);
      }
      else {
        alert("Errore durante la ricerca dei servizi, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei clienti, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i servizi?")) {
      const dati = {
        tipo_item: "servizio", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = servizi.filter(servizio => dati.ids.includes(servizio.id));
      const itemsRestanti = servizi.filter(servizio => !dati.ids.includes(servizio.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          setServizi(itemsRestanti);
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei servizi, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei servizi, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler modificare i servizi?")) {
      let serviziDaNonModificare = servizi.filter(servizio => !selectedIdsModifica.includes(servizio.id));
      let serviziDaModificare = servizi.filter(servizio => selectedIdsModifica.includes(servizio.id)); 
      // let copiaServiziDaModificare = [...serviziDaModificare];
      
      let esitiModifica = [];
      for(let i = 0; i < serviziDaModificare.length; i++) {
        const dati = {
          tipo_item: "servizio", 
          item: serviziDaModificare[i] 
        }
        const response = await fetch('/MODIFICA_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {           
          esitiModifica.push([serviziDaModificare[i], "Modifica avvenuta con successo."]);
        }
        else if(response.status === 400) {
          esitiModifica.push([serviziDaModificare[i], "Errore durante la modifica: servizio x gia\' presente."]);
          // copiaServiziDaModificare[i] = serviziDaModificare[i];
        }
        else {
          esitiModifica.push([serviziDaModificare[i], "Errore durante la modifica del servizio x."]);
          // copiaServiziDaModificare[i] = serviziDaModificare[i];
        }
      }

      let serviziAggiornati = [];
      for (let i = 0; i < servizi.length; i++) {
        let servizioAggiornato = { ...servizi[i] };
        if(servizioAggiornato.tipo_selezione === 1) {
          servizioAggiornato.tipo_selezione = 0;
        }
        serviziAggiornati.push(servizioAggiornato);
      }
      setServizi(serviziAggiornati);

      setSelectedIdsModifica([]);

      // alert("Risultati modifica:\n")
      alert("Modifica effettuata.");
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  return (
    <>
      <Header />

      <div className="main-content" />

      <RicercaServiziTag 
        campi={getCampiRicercaServizi(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaServizi}
        // eseguiRicerca={(e) => eseguiRicerca(e, "servizi", setServizi, datiRicerca)}
        handleSearch={(e) => handleSearch(e)}
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
        // modifica={(e) => modifica(e, "servizio", selectedIdsModifica, setSelectedIdsModifica, servizi, setServizi)} 
        // elimina={(e) => elimina(e, "servizio", selectedIdsEliminazione, setSelectedIdsEliminazione, servizi, setServizi)}
        handleEdit={(e) => handleEdit(e)}
        handleDelete={(e) => handleDelete(e)}
      />

      <br /> <br /> <br /> <br />
    </>
  );
}

export default Servizi;