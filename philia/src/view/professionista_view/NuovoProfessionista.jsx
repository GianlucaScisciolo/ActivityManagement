import React, { useState } from 'react';
import Header from '../component/Header';
import ProfessionistaAction from '../../action/professionista_action/ProfessionistaAction';
import { controlloNuovoProfessionista } from '../../vario/Controlli';

const NuovoProfessionista = () => {
  const[errori, setErrori] = useState({
    erroreNome: "",
    erroreProfessione: "",
    erroreContatto: "",
    erroreEmail: "",
    erroreContattoEEmail: "",
    erroreNote: ""
  })

  const handleInsert = async (data, form) => {
    if (controlloNuovoProfessionista(data, setErrori) > 0) 
      return;

    try {
      const response = await fetch('/INSERISCI_PROFESSIONISTA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'inserimento del professionista');
      }

      const result = await response.json();

      // Mostra l'alert
      alert("L'inserimento del professionista e\' andato a buon fine!!");

      // Reset del form
      form.reset();
    } catch (error) {
      console.error('Errore:', error);
      // Mostra l'alert di errore
      alert("C\'e\' stato un errore durante l\'inserimento del professionista. Riprova piu\' tardi.");
    }
  };

  const handleChangeInsertJustNumber = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    e.target.value = e.target.value.slice(0, 11);
  };

  return (
    <>
      <Header />
      <div>
        <form className='containerForm' onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = {
            nome: formData.get('nome'),
            professione: formData.get('professione'),
            contatto: formData.get('contatto'),
            email: formData.get('email'),
            note: formData.get('note'),
          };
          handleInsert(data, e.target);
        }}>
          
          <label className='titoloForm'>Nuovo professionista</label>

          <label className='labelForm'>Nome</label>
          <input className='inputFormModifica' type='text' name='nome' />
          <span className='spanErrore'>{errori.erroreNome}</span>
          
          <label className='labelForm'>Professione</label>
          <input className='inputFormModifica' type='text' name='professione' />
          <span className='spanErrore'>{errori.erroreProfessione}</span>

          <label className='labelForm'>Contatto*</label>
          <input className='inputFormModifica' type='text' name='contatto' onChange={handleChangeInsertJustNumber} />
          <span className='spanErrore'>{errori.erroreContatto}</span>

          <label className='labelForm'>Email</label>
          <input className='inputFormModifica' type='text' name='email' />
          <span className='spanErrore'>{errori.erroreEmail}</span>

          <span className='spanErrore'>{errori.erroreContattoEEmail}</span>

          <label className='labelForm'>Note*</label>
          <textarea className='textAreaFormModifica' name='note'></textarea>
          <span className='spanErrore'>{errori.erroreNote}</span>

          <button className='buttonForm' type='submit'>Salva professionista</button>
        </form>
      </div>
    </>
  )
}

export default NuovoProfessionista;









