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

const NuovoCliente = () => {
  const formSession = useSelector((state) => state.formSession.value);

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

  const handleInsert = async (data, form) => {
    if (confirm("Sei sicuro di voler salvare il cliente?")) {
      if (controlloNuovoCliente(data, setErrori) > 0) 
        return;
      
      try {
        const response = await fetch('/INSERISCI_CLIENTE', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error('Errore durante l\'inserimento del cliente');
        }
    
        const result = await response.json();
    
        // Mostra l'alert di successo
        alert("L'inserimento del cliente e\' andato a buon fine!!");
    
        // Reset del form
        form.reset();
      } 
      catch (error) {
        console.error('Errore:', error);
    
        // Mostra l'alert di errore
        alert("C\'e\' stato un errore durante l\'inserimento del cliente. Riprova piu\' tardi.");
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

  return (
    <>
      <Header />
      
      <div className="main-content"></div>

      <div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              nome: formData.get('nome'),
              cognome: formData.get('cognome'),
              contatto: formData.get('contatto'),
              note: formData.get('note'),
          };
          handleInsert(data, e.target);
        }}>
          {formSession.view === "form" && (
            <>
              <FormItem tipoItem={"nuovo cliente"} item={nuovoCliente} setItem={setNuovoCliente} header="Nuovo cliente" />
            </>
          )}
          {formSession.view === "row" && (
            <>
              <RowItem tipoItem={"nuovo cliente"} item={nuovoCliente} setItem={setNuovoCliente} />
            </>
          )}
          {(formSession.view === "card") && (
            <>
              <CardItem tipoItem={"nuovo cliente"} item={nuovoCliente} setItem={setNuovoCliente} header="Nuovo cliente" />
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default NuovoCliente;











