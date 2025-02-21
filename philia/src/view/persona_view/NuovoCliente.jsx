import React, { useState } from 'react';
import Header from '../component/Header';
import { controlloCliente } from '../../vario/Controlli';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FormNuovoItem } from '../../trasportabile/form_item/FormItem';
import { CardNuovoItem } from '../../trasportabile/card_item/CardItem';
import { RowNuovoItem } from '../../trasportabile/row_item/RowItem';
import { CardClienteEsistente } from '../component/card_item/CardsClienti';
import { RowClienteEsistente } from '../component/row_item/RowsClienti';
import { modifica } from '../../vario/OperazioniModifica';
import { elimina } from '../../vario/OperazioniEliminazione';
import { Items } from '../component/Items';
import { OperazioniItems, selectOperationBody } from '../component/Operazioni';
import { 
  getCampiNuovoCliente, getCampiClienteEsistente, 
  indiciNuovoCliente, indiciClienteEsistente 
} from './ClientiVario';
import { handleInputChange } from '../../vario/Vario';

const NuovoCliente = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [clienti, setClienti] = useState([]);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);

  const [nuovoCliente, setNuovoCliente] = useState({
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
        const response = await fetch('/INSERISCI_CLIENTE', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoCliente),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            alert(errorData.message); 
          } 
          else {
            throw new Error('Errore durante l\'inserimento del cliente');
          }
        } 
        else {
          const result = await response.json();
          const nuovoClienteId = result.id; // Ottengo l'id inserito
          
          nuovoCliente.contatto = (nuovoCliente.contatto.split(' ').join('') === "") ? "Contatto non inserito." : nuovoCliente.contatto;
          nuovoCliente.note = (nuovoCliente.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoCliente.note;
  
          // Aggiorna l'oggetto con l'ID ottenuto
          setClienti(prevClienti => [...prevClienti, { ...nuovoCliente, id: nuovoClienteId }]);
          setNuovoCliente({
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
          });
  
          alert("L'inserimento del cliente è andato a buon fine!!");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l'inserimento del cliente. Riprova più tardi.");
      }
    }
    else {
      alert("Salvataggio annullato.");
    }
  };
  
  const handleChangeInsertJustNumber = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    e.target.value = e.target.value.slice(0, 11);
  };

  // const eseguiSalvataggio = (e, setErrori) => {
  //   e.preventDefault();
  //   handleInsert(nuovoCliente, setNuovoCliente, setClienti, setErrori);
  // }

  const NuovoClienteTag = (formSession.view === "form") ? FormNuovoItem : (
    (formSession.view === "card") ? CardNuovoItem : RowNuovoItem
  )

  return (
    <>
      <Header />
      
      <div className="main-content" />

      <NuovoClienteTag 
        campi={getCampiNuovoCliente(nuovoCliente, (e) => handleInputChange(e, setNuovoCliente), null, null)}  
        indici={indiciNuovoCliente} 
        eseguiSalvataggio={(e) => handleInsert(e)} 
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
      />
      
      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "cliente", selectedIdsModifica, setSelectedIdsModifica, clienti, setClienti)} 
        elimina={(e) => elimina(e, "cliente", selectedIdsEliminazione, setSelectedIdsEliminazione, clienti, setClienti)}
      />

      <br /> <br /> <br /> <br />
    </>
  );
};

export default NuovoCliente;
