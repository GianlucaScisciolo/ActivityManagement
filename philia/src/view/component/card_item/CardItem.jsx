import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { StyledCard, StyledCardHeader, StyledTextArea, StyledInput } from './StyledCardItem';

function CardCliente({ item }) {
  return (
    <>
      <StyledTextArea rows="1" value={item.nome + " " + item.cognome}/>
      <StyledInput rows="1" type="text" value={item.contatto}/>
      <StyledTextArea rows="1" value={item.note}/>
    </>
  );
}

function CardNuovoCliente({ item }) {
  return (
    <>
      <StyledTextArea rows="1" placeholder='Nome*'/>
      <StyledTextArea rows="1" placeholder='Cognome*'/>
      <StyledInput rows="1" type="text" placeholder='Contatto*'/>
      <StyledTextArea rows="1" placeholder='Note'/>
    </>
  );
}

function CardCercaClienti({ item }) {
  return (
    <>
      <StyledTextArea rows="1" placeholder='Nome'/>
      <StyledTextArea rows="1" placeholder='Cognome'/>
      <StyledInput rows="1" type="text" placeholder='Contatto'/>
      <StyledTextArea rows="1" placeholder='Note'/>
    </>
  );
}

function CardProfessionista({ item }) {
  return (
    <>
      <StyledTextArea rows="1" value={item.nome}/>
      <StyledTextArea rows="1" value={item.professione}/>
      <StyledInput rows="1" type="text" value={item.contatto}/>
      <StyledInput rows="1" type="text" value={item.email}/>
      <StyledTextArea rows="1" value={item.note}/>
    </>
  );
}

function CardNuovoProfessionista({ item }) {
  return (
    <>
      <StyledTextArea rows="1" placeholder='Nome*'/>
      <StyledTextArea rows="1" placeholder='Professione*'/>
      <StyledInput rows="1" type="text" placeholder='Contatto'/>
      <StyledInput rows="1" type="text" placeholder='Email'/>
      <StyledTextArea rows="1" placeholder='Note'/>
    </>
  );
}

function CardCercaProfessionisti({ item }) {
  return (
    <>
      <StyledTextArea rows="1" placeholder='Nome'/>
      <StyledTextArea rows="1" placeholder='Professione'/>
      <StyledInput rows="1" type="text" placeholder='Contatto'/>
      <StyledInput rows="1" type="text" placeholder='Email'/>
      <StyledTextArea rows="1" placeholder='Note'/>
    </>
  );
}

function CardLavoro({ tipoItem, item }) {
  return (
    <>
      {(tipoItem === "lavoro cliente") && (
        <StyledTextArea rows="1" value={item.nome_cliente + " " + item.cognome_cliente}/>
      )}
      {(tipoItem === "lavoro professionista") && (
        <>
          <StyledTextArea rows="1" value={item.nome_professionista}/>
          <StyledTextArea rows="1" value={item.professione}/>
        </>
      )}
      {(tipoItem.startsWith("lavoro")) && (
        <>
          <StyledTextArea rows="1" value={item.descrizione}/>
          <StyledTextArea rows="1" value={item.giorno}/>
          <StyledTextArea rows="1" value={item.orario_inizio}/>
          <StyledTextArea rows="1" value={item.orario_fine}/>
          <StyledTextArea rows="1" value={item.note}/>
        </>
      )}
    </>
  );
}

function CardNuovoLavoro({ item }) {
  return (
    <>
      <StyledTextArea rows="1" placeholder='Cliente'/>
      <StyledTextArea rows="1" placeholder='Professionista'/>
      <StyledTextArea rows="1" placeholder='Descrizione*'/>
      <StyledTextArea rows="1" placeholder='Giorno*'/>
      <StyledTextArea rows="1" placeholder='Orario inizio*'/>
      <StyledTextArea rows="1" placeholder='Orario fine*'/>
      <StyledTextArea rows="1" placeholder='Note'/>
    </>
  );
}

function CardCercaLavori({ item }) {
  return (
    <>
      <StyledTextArea rows="1" placeholder='Nome cliente'/>
      <StyledTextArea rows="1" placeholder='Cognome cliente'/>
      <StyledTextArea rows="1" placeholder='Nome professionista'/>
      <StyledTextArea rows="1" placeholder='Professione'/>
      <StyledTextArea rows="1" placeholder='Descrizione'/>
      <StyledTextArea rows="1" placeholder='Primo giorno'/>
      <StyledTextArea rows="1" placeholder='Ultimo giorno'/>
      <StyledTextArea rows="1" placeholder='Note'/>
    </>
  );
}

function CardModificaProfilo({ item }) {
  return (
    <>
      <StyledTextArea rows="1" placeholder='Username*'/>
      <StyledTextArea rows="1" placeholder='Note'/>
      <StyledTextArea rows="1" placeholder='Password attuale*'/>
      <StyledTextArea rows="1" placeholder='Nuova password'/>
      <StyledTextArea rows="1" placeholder='Conferma nuova password'/>
    </>
  );
}

function CardItem({ tipoItem, item, header }) {
  return (
    <StyledCard>
      {(header !== "") && (
        <StyledCardHeader>{header}</StyledCardHeader>
      )}
      <ListGroup variant="flush">
        {(tipoItem === "cliente") &&(
          <CardCliente item={item} />
        )}
        {(tipoItem === "nuovo cliente") &&(
          <CardNuovoCliente item={item} />
        )}
        {(tipoItem === "cerca clienti") &&(
          <CardCercaClienti item={item} />
        )}
        {(tipoItem === "professionista") &&(
          <CardProfessionista item={item} />
        )}
        {(tipoItem === "nuovo professionista") &&(
          <CardNuovoProfessionista item={item} />
        )}
        {(tipoItem === "cerca professionisti") &&(
          <CardCercaProfessionisti item={item} />
        )}
        {(tipoItem.startsWith("lavoro")) &&(
          <CardLavoro tipoItem={tipoItem} item={item} />
        )}
        {(tipoItem.startsWith("nuovo lavoro")) &&(
          <CardNuovoLavoro item={item} />
        )}
        {(tipoItem.startsWith("cerca lavori")) &&(
          <CardCercaLavori item={item} />
        )}
        {(tipoItem.startsWith("modifica profilo")) &&(
          <CardModificaProfilo item={item} />
        )}
      </ListGroup>
    </StyledCard>
  );
}

export default CardItem;









