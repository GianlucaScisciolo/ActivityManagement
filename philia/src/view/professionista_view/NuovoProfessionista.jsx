import React, { useState } from 'react';
import Header from '../component/Header';
import { controlloProfessionista } from '../../vario/Controlli';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useSelector } from 'react-redux';
import { FormNuovoProfessionista } from '../component/form_item/FormsProfessionisti';
import { RowNuovoProfessionista, RowProfessionistaEsistente } from '../component/row_item/RowsProfessionisti';
import { CardNuovoProfessionista, CardProfessionistaEsistente } from '../component/card_item/CardsProfessionisti';
import { modifica } from '../../vario/OperazioniModifica';
import { elimina } from '../../vario/OperazioniEliminazione';

const NuovoProfessionista = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);

  const [professionisti, setProfessionisti] = useState([]);
  const [selectedTrashCount, setSelectedTrashCount] = useState(0);
  const [selectedPencilCount, setSelectedPencilCount] = useState(0);
  const [selectedIdsEliminazione, setSelectedIdsEliminazione] = useState([]);
  const [selectedIdsModifica, setSelectedIdsModifica] = useState([]);
  
  const [nuovoProfessionista, setNuovoProfessionista] = useState({
    tipo_selezione: 0,
    nome: "",
    professione: "",
    contatto: "",
    email: "",
    note: "", 
    errore_nome: "", 
    errore_professione: "", 
    errore_contatto: "", 
    errore_email: "", 
    errore_note: ""
  });

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
    if (confirm("Sei sicuro di voler salvare il professionista?")) {
      if (controlloProfessionista(nuovoProfessionista, setNuovoProfessionista) > 0) 
        return;
  
      try {
        const response = await fetch('/INSERISCI_PROFESSIONISTA', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuovoProfessionista),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            alert(errorData.message); // Mostra l'alert con il messaggio di errore specifico
          } 
          else {
            throw new Error('Errore durante l\'inserimento del professionista');
          }
        } 
        else {
          const result = await response.json();
          const nuovoProfessionistaId = result.id; // Ottengo l'id inserito
  
          nuovoProfessionista.contatto = (nuovoProfessionista.contatto.split(' ').join('') === "") ? "Contatto non inserito." : nuovoProfessionista.contatto;
          nuovoProfessionista.email = (nuovoProfessionista.email.split(' ').join('') === "") ? "Email non inserita." : nuovoProfessionista.email;
          nuovoProfessionista.note = (nuovoProfessionista.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoProfessionista.note;
          setProfessionisti(prevProfessionisti => [...prevProfessionisti, { ...nuovoProfessionista, id: nuovoProfessionistaId }]);
          setNuovoProfessionista({
            tipo_selezione: 0,
            nome: "",
            professione: "",
            contatto: "",
            email: "",
            note: "", 
            errore_nome: "", 
            errore_professione: "", 
            errore_contatto: "", 
            errore_email: "", 
            errore_note: ""
          });
  
          alert("L'inserimento del professionista è andato a buon fine!!");
        }
      } 
      catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l'inserimento del professionista. Riprova più tardi.");
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

  // const eseguiSalvataggio = (e) => {
  //   e.preventDefault();
  //   handleInsert(nuovoProfessionista, setNuovoProfessionista, setProfessionisti);
  // };

  return (
    <>
      <Header />

      <div className="main-content"></div>

      {formSession.view === "form" && (
        <FormNuovoProfessionista item={nuovoProfessionista} setItem={setNuovoProfessionista} eseguiSalvataggio={(e) => handleInsert(e)} />
      )}
      {formSession.view === "row" && (
        <RowNuovoProfessionista item={nuovoProfessionista} setItem={setNuovoProfessionista} eseguiSalvataggio={(e) => handleInsert(e)} />
      )}
      {(formSession.view === "card") && (
        <center>
          <CardNuovoProfessionista item={nuovoProfessionista} setItem={setNuovoProfessionista} eseguiSalvataggio={(e) => handleInsert(e)} />
        </center>
      )}

      <br /> <br /> <br /> <br />

      {(professionisti.length > 0) && (
        <>
          {(itemSession.view === "card") && (
            <div className="contenitore-3">
              {professionisti.map((professionista, index) => (
                <CardProfessionistaEsistente key={index} item={professionista} items={professionisti} setItems={setProfessionisti} selectOperation={selectOperation} />
              ))}
            </div>
          )}
          {(itemSession.view === "list") && (
            <>
              {professionisti.map((professionista, index) => (
                <RowProfessionistaEsistente key={index} item={professionista} items={professionisti} setItems={setProfessionisti} selectOperation={selectOperation} />
              ))}
            </>
          )}
        </>
      )}

      <br /> <br /> <br /> <br />

      <div className='contenitore-2'>
        <Row>
          {selectedIdsModifica.length > 0 && (
            <Col>
              <button className="bottone-blu-non-selezionato"
                onClick={(e) => modifica(e, "professionista", selectedIdsModifica, setSelectedIdsModifica, professionisti, setProfessionisti)}
              >
                Modifica
              </button>
            </Col>
          )}
          {selectedIdsEliminazione.length > 0 && (
            <Col>
              <button className='bottone-rosso-non-selezionato'
                onClick={(e) => elimina(e, "professionista", selectedIdsEliminazione, setSelectedIdsEliminazione, professionisti, setProfessionisti)}
              >
                Elimina
              </button>
            </Col>
          )}
        </Row>
      </div>

      <br /> <br /> <br /> <br />
    </>
  );
};

export default NuovoProfessionista;
