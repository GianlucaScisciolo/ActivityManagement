import React, { useState } from 'react';
import { controlloCliente } from '../../vario/Controlli';
import { selectOperationBody } from '../component/Operazioni';
import { 
  getCampiNuovoCliente, getCampiClienteEsistente, 
  indiciNuovoCliente, indiciClienteEsistente 
} from './ClientiVario';
import { handleInputChange } from '../../vario/Vario';
import PaginaWeb from '../../riutilizzabile/PaginaWeb';

const NuovoCliente = () => {
  const [clienti, setClienti] = useState([]);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [nuovoCliente, setNuovoCliente] = useState({
    tipo_item: "cliente", 
    tipo_selezione: 0,
    nome: "",
    cognome: "",
    contatto: "", 
    email: "", 
    note: "", 
    errore_nome: "", 
    errore_cognome: "", 
    errore_contatto: "",
    errore_email: "", 
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
    if (confirm("Sei sicuro di voler salvare il cliente?")) {
      if (controlloCliente(nuovoCliente, setNuovoCliente) > 0) 
        return;
      
      try {
        const response = await fetch('/INSERISCI_ITEM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoCliente),
        });

        if(response.status === 200) {
          const result = await response.json();
          nuovoCliente.id = result.id;
          setClienti(prevClienti => [...prevClienti, nuovoCliente]);
          alert("L\'inserimento del cliente è andato a buon fine!!");
        }
        else if(response.status === 400) {
          alert("Errore: cliente gia\' presente.")
        }
        else {
          alert("Errore durante il salvataggio del nuovo cliente, riprova più tardi.");
        }
      }
      catch (error) {
        console.error('Errore:', error);
        alert("Errore durante il salvataggio del nuovo cliente, riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  }

  return (
    <>
      <PaginaWeb 
        componenti={
          {
            nuovo_item: {
              campi: getCampiNuovoCliente(nuovoCliente, (e) => handleInputChange(e, setNuovoCliente), null, null), 
              indici: indiciNuovoCliente, 
              handle_insert: (e) => handleInsert(e) 
            }, 
            items: {
              tipo_item: "cliente", 
              items: clienti, 
              set_items: setClienti, 
              select_operation: selectOperation, 
              campi: getCampiClienteEsistente, 
              indici: indiciClienteEsistente, 
              servizi: null
            },
            operazioni_items: {
              selected_ids_modifica: selectedIdsModifica, 
              selected_ids_eliminazione: selectedIdsEliminazione, 
              handle_edit: null, 
              handle_delete: null
            }
          }
        }
      />
    </>
  );
};

export default NuovoCliente;









