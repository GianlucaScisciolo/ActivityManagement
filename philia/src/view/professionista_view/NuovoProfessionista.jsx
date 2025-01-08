import React, { useState } from 'react';
import Header from '../component/Header';
import ProfessionistaAction from '../../action/professionista_action/ProfessionistaAction';
import { controlloNuovoProfessionista } from '../../vario/Controlli';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardItem from '../component/card_item/CardItem';
import { useSelector } from 'react-redux';
import RowItem from '../component/row_item/RowItem';

const NuovoProfessionista = () => {
  const formSession = useSelector((state) => state.formSession.value);

  const[errori, setErrori] = useState({
    erroreNome: "",
    erroreProfessione: "",
    erroreContatto: "",
    erroreEmail: "",
    erroreContattoEEmail: "",
    erroreNote: ""
  })

  const [item, setItem] = useState({
    nome: "Ciao",
    professione: "Mondo",
    contatto: "Hello",
    email: "Hi",
    note: "World"
  })

  const handleInsert = async (data, form) => {
    if (confirm("Sei sicuro di voler salvare il professionista?")) {
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
          className={formSession.view === "form" ? 'containerForm' : ''}  
          onSubmit={(e) => {
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
          {(formSession.view === "form") && (
            <>
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
            </>
          )}
          {formSession.view === "row" && (
            <>
              <RowItem tipoItem={"nuovo professionista"} item={item}/>
            </>
          )}
          {(formSession.view === "card") && (
            <>
              <Row className='custom-row'>
                <Col className='custom-col'>
                  <CardItem tipoItem={"nuovo professionista"} item={item} header="Nuovo professionista" />
                </Col>
              </Row>
            </>
          )}
          <center>
            <button className='buttonForm' type='submit'>Salva professionista</button>
          </center>
        </form>
      </div>
    </>
  )
}

export default NuovoProfessionista;









