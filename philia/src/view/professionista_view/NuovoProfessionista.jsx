import React, { useState } from 'react';
import Header from '../component/Header';
import ProfessionistaAction from '../../action/professionista_action/ProfessionistaAction';
import { controlloNuovoProfessionista } from '../../vario/Controlli';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardItem from '../component/card_item/CardItem';
import { useSelector } from 'react-redux';
import RowItem from '../component/row_item/RowItem';
import FormItem from '../component/form_item/FormItem';
import { Items } from '../component/Items';

const NuovoProfessionista = () => {
  const formSession = useSelector((state) => state.formSession.value);

  const [professionisti, setProfessionisti] = useState([]);
  
  const [nuovoProfessionista, setNuovoProfessionista] = useState({
    nome: "",
    professione: "",
    contatto: "",
    email: "",
    note: ""
  });

  const [errori, setErrori] = useState({
    erroreNome: "",
    erroreProfessione: "",
    erroreContatto: "",
    erroreEmail: "",
    erroreContattoEEmail: "",
    erroreNote: ""
  });

  const handleInsert = async (nuovoProfessionista, setNuovoProfessionista, setProfessionisti) => {
    if (confirm("Sei sicuro di voler salvare il professionista?")) {
      if (controlloNuovoProfessionista(nuovoProfessionista, setErrori) > 0) 
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
          throw new Error('Errore durante l\'inserimento del professionista');
        }

        const result = await response.json();

        nuovoProfessionista.contatto = (nuovoProfessionista.contatto.split(' ').join('') === "") ? "Contatto non inserito." : nuovoProfessionista.contatto;
        nuovoProfessionista.email = (nuovoProfessionista.email.split(' ').join('') === "") ? "Email non inserita." : nuovoProfessionista.email;
        nuovoProfessionista.note = (nuovoProfessionista.note.split(' ').join('') === "") ? "Nota non inserita." : nuovoProfessionista.note;
        setProfessionisti(prevProfessionisti => [...prevProfessionisti, nuovoProfessionista]);
        setNuovoProfessionista({
          nome: "",
          professione: "",
          contatto: "",
          email: "",
          note: ""
        });

        alert("L'inserimento del professionista è andato a buon fine!!");
      } catch (error) {
        console.error('Errore:', error);
        alert("C'è stato un errore durante l'inserimento del professionista. Riprova più tardi.");
      }
    } else {
      alert("Salvataggio annullato.");
    }
  };

  const handleChangeInsertJustNumber = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    e.target.value = e.target.value.slice(0, 11);
  };

  const eseguiSalvataggio = (e) => {
    e.preventDefault();
    handleInsert(nuovoProfessionista, setNuovoProfessionista, setProfessionisti);
  };

  return (
    <>
      <Header />

      <div className="main-content"></div>

      <form>
        {formSession.view === "form" && (
          <FormItem tipoItem={"nuovo professionista"} item={nuovoProfessionista} setItem={setNuovoProfessionista} header="Nuovo professionista" eseguiSalvataggio={(e) => eseguiSalvataggio(e)} />
        )}
        {formSession.view === "row" && (
          <RowItem  tipoItem={"nuovo professionista"} item={nuovoProfessionista} setItem={setNuovoProfessionista} eseguiSalvataggio={(e) => eseguiSalvataggio(e)} />
        )}
        {(formSession.view === "card") && (
          <center>
            <CardItem tipoItem={"nuovo professionista"} item={nuovoProfessionista} setItem={setNuovoProfessionista} header="Nuovo professionista" eseguiSalvataggio={(e) => eseguiSalvataggio(e)} />
          </center>
        )}
      </form>

      <div className="main-content" />

      {(professionisti.length > 0) && (
        <>
          <div className="main-content"></div>
          <Items tipoItem={"professionista"} items={professionisti} setterItems={setProfessionisti} errori={errori} setErrori={setErrori}/>    
        </>
      )}
    </>
  );
};

export default NuovoProfessionista;
