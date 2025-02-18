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
import { Items } from '../component/Items';
import { OperazioniItems, selectOperationBody } from '../component/Operazioni';

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
    selectOperationBody(
      icon, item, selectedIdsModifica, setSelectedIdsModifica, selectedIdsEliminazione, setSelectedIdsEliminazione, 
      setSelectedPencilCount, setSelectedTrashCount
    )
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

  let NuovoProfessionistaTag = (formSession.view === "form") ? FormNuovoProfessionista : (
    (formSession.view === "card") ? CardNuovoProfessionista : RowNuovoProfessionista
  )

  const itemsComponent = (
    <Items 
      tipoItem={"professionista"} 
      items={professionisti} 
      selectOperation={selectOperation}
      emptyIsConsidered={false}
    />
  );

  return (
    <>
      <Header />

      <div className="main-content"></div>
      
      <NuovoProfessionistaTag 
        item={nuovoProfessionista} 
        setItem={setNuovoProfessionista} 
        eseguiSalvataggio={(e) => handleInsert(e)} 
      />

      <br /> <br /> <br /> <br />
      
      {itemSession.view === "card" ? (
        <div className="contenitore-3">{itemsComponent}</div>
      ) : (
        itemsComponent
      )}

      <br /> <br /> <br /> <br />

      <OperazioniItems 
        selectedIdsModifica={selectedIdsModifica} 
        selectedIdsEliminazione={selectedIdsEliminazione}
        modifica={(e) => modifica(e, "professionista", selectedIdsModifica, setSelectedIdsModifica, professionisti, setProfessionisti)} 
        elimina={(e) => elimina(e, "professionista", selectedIdsEliminazione, setSelectedIdsEliminazione, professionisti, setProfessionisti)}
      />

      <br /> <br /> <br /> <br />
    </>
  );
};

export default NuovoProfessionista;
