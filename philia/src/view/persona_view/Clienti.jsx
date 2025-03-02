import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import { elimina } from '../../vario/OperazioniEliminazione';
import { modifica } from '../../vario/OperazioniModifica';
import { useSelector, useDispatch } from 'react-redux';
import personaStore from '../../store/persona_store/PersonaStore';
import { operazioniPersone } from '../../vario/Operazioni';
import { FormRicercaItems } from '../../trasportabile/form_item/FormItem';
import { CardRicercaItems } from '../../trasportabile/card_item/CardItem';
import { RowRicercaItems } from '../../trasportabile/row_item/RowItem';
import { eseguiRicerca } from '../../vario/OperazioniRicerca';
import { Items } from '../component/Items';
import { OperazioniItems, selectOperationBody } from '../component/Operazioni';
import { 
  getCampiRicercaClienti, getCampiClienteEsistente, 
  indiciRicercaClienti, indiciClienteEsistente
} from './ClientiVario';
import { handleInputChange } from '../../vario/Vario';

const Clienti = () => {
  const [clienti, setClienti] = useState(-1);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  
  const [datiRicerca, setDatiRicerca] = useState({
    tipo_item: "cliente", 
    nome: "", 
    cognome: "", 
    contatto: "", 
    email: "", 
    note: ""
  });

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
  }

  const RicercaClientiTag = (formSession.view === "form") ? FormRicercaItems : (
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
        setClienti(result.items);
      }
      else {
        alert("Errore durante la ricerca dei clienti, riprova più tardi.");
      }
    }
    catch (error) {
      console.error('Errore:', error);
      alert("Errore durante la ricerca dei clienti, riprova più tardi.");
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler eliminare i clienti?")) {
      const dati = {
        tipo_item: "cliente", 
        ids: selectedIdsEliminazione
      }
      const itemsDaEliminare = clienti.filter(cliente => dati.ids.includes(cliente.id));
      const itemsRestanti = clienti.filter(cliente => !dati.ids.includes(cliente.id));
      try {
        const response = await fetch('/ELIMINA_ITEMS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dati),
        });
        if(response.status === 200) {          
          setClienti(itemsRestanti);
          setSelectedIdsEliminazione([]);
          alert("Eliminazione completata con successo.");
        }
        else {
          alert("Errore durante l\'eliminazione dei clienti, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante l\'eliminazione dei clienti, riprova più tardi.");
      }
    }
    else {
      alert("Eliminazione annullata.");
    }
  }
  
  return (
    <>
      <Header />

      <div className="main-content" />
      
      <RicercaClientiTag 
        campi={getCampiRicercaClienti(datiRicerca, (e) => handleInputChange(e, setDatiRicerca), null, null)} 
        indici={indiciRicercaClienti}
        // eseguiRicerca={(e) => eseguiRicerca(e, "clienti", setClienti, datiRicerca)}
        handleSearch={(e) => handleSearch(e)}
      />

      <br /> <br /> <br /> <br />
      
      <Items 
        tipoItem={"cliente"} 
        items={clienti} 
        setItems={setClienti}
        selectOperation={selectOperation}
        emptyIsConsidered={true} 
        campi={getCampiClienteEsistente}
        indici={indiciClienteEsistente}
        servizi={null}
      />

      <br /> <br /> <br /> <br />
      
      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "cliente", selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti)} 
        // elimina={(e) => elimina(e, "cliente", selectedIdsEliminazione, setSelectedIdsEliminazione, clienti, setClienti)}
        handleDelete={(e) => handleDelete(e)}
      />
      
      <br /> <br /> <br /> <br />
    </>
  );
}

export default Clienti;









