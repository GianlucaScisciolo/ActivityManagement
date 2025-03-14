import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { controlloCliente } from '../../vario/Controlli';
import { selectOperationBody } from '../../app/app_view/component/Operazioni';
import { ClienteAction } from "../cliente_action/ClienteAction.js";
import { handleInputChange } from '../../vario/Vario';
import PaginaWeb from '../../riutilizzabile/PaginaWeb';
import PaginaWebNewItem from '../../riutilizzabile/PaginaWebNewItem';
import { aggiornaTipoSelezione, inserimentoCliente } from '../../store/redux/ClientiSlice';

const NuovoCliente = () => {
  const clienteAction = new ClienteAction();
  const clientiSession = useSelector((state) => state.clientiSession.value);
  const dispatch = useDispatch();

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

  const aggiornaTipoSelezioneItem = (id, nuova_selezione) => {
    dispatch(aggiornaTipoSelezione({
      id_cliente: id, 
      nuova_selezione: nuova_selezione
    }));
  }

  const selectOperation = (icon, item) => {
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount, aggiornaTipoSelezioneItem 
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
          dispatch(inserimentoCliente({
            nuovoCliente: nuovoCliente
          }));
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
      <PaginaWebNewItem 
        componenti={
          {
            campiNuovoItem: clienteAction.getCampiNuovoCliente(nuovoCliente, (e) => handleInputChange(e, setNuovoCliente), null, null), 
            indiciNuovoItem: clienteAction.INDICI_NUOVO_CLIENTE, 
            handleInsert: (e) => handleInsert(e), 
            tipoItem: "cliente", 
            items: clientiSession.nuoviClienti, 
            setItems: null, 
            selectOperation: selectOperation, 
            campiItemEsistente: clienteAction.getCampiClienteEsistente, 
            indiciItemEsistente: clienteAction.INDICI_CLIENTE_ESISTENTE, 
            servizi: null, 
            selectedIdsModifica: selectedIdsModifica, 
            selectedIdsEliminazione: selectedIdsEliminazione, 
            handleEdit: null, 
            handleDelete: null
          }
        }
      />
    </>
  );
};

export default NuovoCliente;









