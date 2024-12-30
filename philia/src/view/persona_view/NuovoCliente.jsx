import React, { useState } from 'react';
import Header from '../component/Header';
import PersonaAction from '../../action/persona_action/PersonaAction';
import { controlloNuovoCliente } from '../../vario/Controlli';

const NuovoCliente = () => {
  const [errori, setErrori] = useState({
    erroreNome: "",
    erroreCognome: "",
    erroreContatto: "",
    erroreNote: ""
  })


  const handleInsert = async (data, form) => {
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
    } catch (error) {
      console.error('Errore:', error);
  
      // Mostra l'alert di errore
      alert("C\'e\' stato un errore durante l\'inserimento del cliente. Riprova piu\' tardi.");
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
        <form className='containerForm' onSubmit={(e) => {
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

          <label className='titoloForm'>Nuovo cliente</label>

          <label className='labelForm'>Nome*</label>
          <input className='inputFormModifica' type='text' name='nome' />
          <span className='spanErrore'>{errori.erroreNome}</span>
          
          <label className='labelForm'>Cognome*</label>
          <input className='inputFormModifica' type='text' name='cognome' />
          <span className='spanErrore'>{errori.erroreCognome}</span>

          <label className='labelForm'>Contatto*</label>
          <input className='inputFormModifica' type='text' name='contatto' onChange={handleChangeInsertJustNumber} />
          <span className='spanErrore'>{errori.erroreContatto}</span>

          <label className='labelForm'>Note</label>
          <textarea className='textAreaFormModifica' name='note'></textarea>
          <span className='spanErrore'>{errori.erroreNote}</span>

          <button className='buttonForm' type='submit'>Salva cliente</button>
        </form>
      </div>
    </>
  );
};

export default NuovoCliente;
