import React, { useState } from 'react';
import Header from '../component/Header';
import PersonaAction from '../../action/persona_action/PersonaAction';
import { controlloNuovoCliente } from '../../vario/Controlli';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from '../component/card_item/CardItem';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import RowItem from '../component/row_item/RowItem';
import FormItem from '../component/form_item/FormItem';
import { Items } from '../component/Items';

const NuovoCliente = () => {
  const formSession = useSelector((state) => state.formSession.value);

  const [clienti, setClienti] = useState([]);

  const [nuovoCliente, setNuovoCliente] = useState({
    nome: "",
    cognome: "",
    contatto: "",
    note: ""
  })

  const [errori, setErrori] = useState({
    erroreNome: "",
    erroreCognome: "",
    erroreContatto: "",
    erroreNote: ""
  })
  
  const handleInsert = async (nuovoCliente, setNuovoCliente, setClienti) => {
    if (confirm("Sei sicuro di voler salvare il cliente?")) {
      if (controlloNuovoCliente(nuovoCliente, setErrori) > 0) 
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
          throw new Error('Errore durante l\'inserimento del cliente');
        }
    
        const result = await response.json();

        nuovoCliente.note = (nuovoCliente.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoCliente.note;
        setClienti(prevClienti => [...prevClienti, nuovoCliente]);
          // Resetta il nuovo cliente dopo l'aggiunta
          setNuovoCliente({
            nome: "",
            cognome: "",
            contatto: "",
            note: ""
          });

        alert("L'inserimento del cliente è andato a buon fine!!");
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

  const eseguiSalvataggio = (e) => {
    e.preventDefault();
    handleInsert(nuovoCliente, setNuovoCliente, setClienti);
  }

  return (
    <>
      <Header />
      
      <div className="main-content" />

      <form>
        {formSession.view === "form" && (
          <FormItem   tipoItem={"nuovo cliente"} item={nuovoCliente} setItem={setNuovoCliente} header="Nuovo cliente" eseguiSalvataggio={(e) => eseguiSalvataggio(e)} />
        )}
        {formSession.view === "row" && (
          <RowItem    tipoItem={"nuovo cliente"} item={nuovoCliente} setItem={setNuovoCliente} eseguiSalvataggio={(e) => eseguiSalvataggio(e)} />
        )}
        {(formSession.view === "card") && (
          <center>
            <CardItem tipoItem={"nuovo cliente"} item={nuovoCliente} setItem={setNuovoCliente} header="Nuovo cliente" eseguiSalvataggio={(e) => eseguiSalvataggio(e)} />
          </center>
        )}
      </form>

      <div className="main-content" />

      {(clienti.length > 0) && (
        <>
          <div className="main-content"></div>
          <Items tipoItem={"cliente"} items={clienti} setterItems={setClienti} errori={errori} setErrori={setErrori}/>    
        </>
      )}
    </>
  );
};

export default NuovoCliente;
