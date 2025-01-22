import React, { useState } from 'react';
import Header from '../component/Header';
import PersonaAction from '../../action/persona_action/PersonaAction';
import { controlloCliente } from '../../vario/Controlli';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from '../component/card_item/CardItem';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import RowItem from '../component/row_item/RowItem';
import FormItem from '../component/form_item/FormItem';
import { Items } from '../component/Items';
import { CardNuovoCliente, CardClienteEsistente } from '../component/card_item/CardsClienti';
import { FormNuovoCliente } from '../component/form_item/FormsClienti';
import { RowNuovoCliente, RowClienteEsistente } from '../component/row_item/RowsClienti';

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
    note: ""
  })

  const [errori, setErrori] = useState({
    nome: "",
    cognome: "",
    contatto: "",
    note: ""
  })

  const selectOperation = (icon, item) => {
    if(icon === "trash") {
      if(selectedIdsEliminazione.includes(item.id)) {
        item.tipo_selezione = 0;
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        item.tipo_selezione = 2;
        setSelectedIdsEliminazione(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        item.tipo_selezione = 0;
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        item.tipo_selezione = 1;
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIdsEliminazione(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
  }
  
  const handleInsert = async (e) => {
    e.preventDefault();
    if (confirm("Sei sicuro di voler salvare il cliente?")) {
      if (controlloCliente(nuovoCliente, setErrori) > 0) 
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
            alert(errorData.message); // Mostra l'alert con il messaggio di errore specifico
          } 
          else {
            throw new Error('Errore durante l\'inserimento del cliente');
          }
        } 
        else {
          const result = await response.json();
          
          nuovoCliente.contatto = (nuovoCliente.contatto.split(' ').join('') === "") ? "Contatto non inserito." : nuovoCliente.contatto;
          nuovoCliente.note = (nuovoCliente.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoCliente.note;
          setClienti(prevClienti => [...prevClienti, nuovoCliente]);
          setNuovoCliente({
            tipo_selezione: 0,
            nome: "",
            cognome: "",
            contatto: "",
            note: ""
          });
  
          alert("L'inserimento del cliente e\' andato a buon fine!!");
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

  return (
    <>
      <Header />
      
      <div className="main-content" />

      {formSession.view === "form" && (
        <FormNuovoCliente item={nuovoCliente} setItem={setNuovoCliente} eseguiSalvataggio={(e) => handleInsert(e)} />
      )}
      {formSession.view === "row" && (
        <RowNuovoCliente item={nuovoCliente} setItem={setNuovoCliente} eseguiSalvataggio={(e) => handleInsert(e)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardNuovoCliente item={nuovoCliente} setItem={setNuovoCliente} eseguiSalvataggio={(e) => handleInsert(e)} />
        </center>
      )}

      <br /> <br /> <br /> <br />

      {(clienti.length > 0) && (
        <>
          {(itemSession.view === "card") && (
            <div className="contenitore-3">
              {clienti.map((cliente, index) => (
                <CardClienteEsistente key={index} item={cliente} items={clienti} setItems={setClienti} selectOperation={selectOperation} />
              ))}
            </div>
          )}
          {(itemSession.view === "list") && (
            <>
              {clienti.map((cliente, index) => (
                <RowClienteEsistente key={index} item={cliente} items={clienti} setItems={setClienti} selectOperation={selectOperation} />
              ))}
            </>
          )}
        </>
      )}

      <br /> <br /> <br /> <br />
    </>
  );
};

export default NuovoCliente;
