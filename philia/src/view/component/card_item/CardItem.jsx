import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Trash2, Pencil, Plus, Search } from 'lucide-react';
import { HookItems } from '../../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import { formatoDate, formatoTime } from '../../../vario/Tempo';
import { 
  StyledCard, StyledCardHeader, grandezzaIcona,
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina,
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledListGroupItem, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected
} from './StyledCardItem';

const PencilTag = ({ tipoSelezione, selectOperation }) => {
  switch(tipoSelezione) {
    case 0:
    case 2:
      return <StyledPencilNotSelected size={grandezzaIcona} onClick={() => selectOperation("pencil")} />;
    case 1:
      return <StyledPencilSelected size={grandezzaIcona} onClick={() => selectOperation("pencil")} />;
    default:
      return <></>;
  }
}

const TrashTag = ({ tipoSelezione, selectOperation }) => {
  switch(tipoSelezione) {
    case 0:
    case 1:
      return <StyledTrashNotSelected size={grandezzaIcona} onClick={() => selectOperation("trash")} />;
    case 2:
      return <StyledTrashSelected size={grandezzaIcona} onClick={() => selectOperation("trash")} />;
    default:
      return <></>;
  }
}

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledTextAreaBlock rows="1" name={nome} value={valore} />;
    case 1:
      return (modificabile) ? <StyledTextAreaModifica rows="1" name={nome} value={valore} />
                            : <StyledTextAreaBlock rows="1" name={nome} value={valore} />;
    case 2:
      return <StyledTextAreaElimina rows="1" name={nome} value={valore} />;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} />;
    case 1:
      return (modificabile) ? <StyledInputModifica rows="1" type={tipo} name={nome} value={valore} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} />;
    case 2:
      return <StyledInputElimina rows="1" type={tipo} name={nome} value={valore} />;
    default:
      return <></>;
  }
}

const OperazioniItemEsistente = ({ tipoSelezione, selectOperation }) => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000"}}>
      <Row>
        <Col className='custom-col'>
          <PencilTag 
            tipoSelezione={tipoSelezione}
            selectOperation={selectOperation}  
          />
        </Col>
        <Col className='custom-col'>
          <TrashTag 
            tipoSelezione={tipoSelezione}
            selectOperation={selectOperation} 
          />
        </Col>
      </Row>
    </StyledListGroupItem>
  )
}

const OperazioniNuovoItem = () => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000"}}>
      <Row>
        <Col className='custom-col'>
          <StyledSaveNotSelected size={grandezzaIcona} />
        </Col>
      </Row>
    </StyledListGroupItem>
  )
}

const OperazioniCercaItems = () => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000"}}>
      <Row>
        <Col className='custom-col'>
          <StyledSearchNotSelected size={grandezzaIcona} />
        </Col>
      </Row>
    </StyledListGroupItem>
  )
}

function CardCliente({ item, selectOperation }) {
  return (
    <>
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome" valore={item.nome + " " + item.cognome} modificabile={false} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
    </>
  );
}

function CardNuovoCliente({ item }) {
  return (
    // aggiungere placeholder
    <>
      <StyledTextAreaModifica rows="1" placeholder='Nome*' name="nome" value={item.nome} />
      <StyledTextAreaModifica rows="1" placeholder='Cognome*' name="cognome" value={item.cognome} />
      <StyledInputModifica rows="1" type="text" placeholder='Contatto*' name="contatto" value={item.contatto} />
      <StyledTextAreaModifica rows="1" placeholder='Note' name="note" value={item.note} />
      <OperazioniNuovoItem  />
    </>
  );
}

function CardCercaClienti({ item }) {
  return (
    <>
      <StyledTextAreaModifica rows="1" placeholder='Nome*' name="nome" value={item.nome} />
      <StyledTextAreaModifica rows="1" placeholder='Cognome*' name="cognome" value={item.cognome} />
      <StyledInputModifica rows="1" type="text" placeholder='Contatto*' name="contatto" value={item.contatto} />
      <StyledTextAreaModifica rows="1" placeholder='Note' name="note" value={item.note} />
      <OperazioniCercaItems />
    </>
  );
}

function CardProfessionista({ item, selectOperation }) {
  return (
    <>
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome" valore={item.nome} modificabile={false} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="text" nome="contatto" valore={item.contatto} modificabile={true} />
      <InputTag tipoSelezione={item.tipo_selezione} tipo="email" nome="email" valore={item.email} modificabile={true} />
      <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
    </>
  );
}

function CardNuovoProfessionista({ item }) {
  return (
    <>
      <StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} />
      <StyledTextAreaModifica rows="1" name="professione" placeholder='Professione*' value={item.professione} />
      <StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} />
      <StyledInputModifica rows="1" type="text" name="email" placeholder='Email' value={item.email} />
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
      <OperazioniNuovoItem />
    </>
  );
}

function CardCercaProfessionisti({ item }) {
  return (
    <>
      <StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} />
      <StyledTextAreaModifica rows="1" name="professione" placeholder='Professione*' value={item.professione} />
      <StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} />
      <StyledInputModifica rows="1" type="text" name="email" placeholder='Email' value={item.email} />
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
      <OperazioniCercaItems />
    </>
  );
}

function CardLavoro({ tipoItem, item, selectOperation }) {
  return (
    <>
      {(tipoItem === "lavoro cliente") && (
        <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_cognome_cliente" valore={item.nome_cliente + " " + item.cognome_cliente} modificabile={false} />
      )}
      {(tipoItem === "lavoro professionista") && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="nome_professionista" valore={item.nome_professionista} modificabile={false} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="professione" valore={item.professione} modificabile={false} />
        </>
      )}
      {(tipoItem.startsWith("lavoro")) && (
        <>
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="descrizione" valore={item.descrizione} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="date" nome="giorno" valore={formatoDate(item.giorno, "AAAA-MM-GG")} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_inizio" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <InputTag tipoSelezione={item.tipo_selezione} tipo="time" nome="orario_fine" valore={formatoTime(item.orario_inizio)} modificabile={true} />
          <TextAreaTag tipoSelezione={item.tipo_selezione} nome="note" valore={item.note} modificabile={true} />
        </>
      )}
      <OperazioniItemEsistente tipoSelezione={item.tipo_selezione} selectOperation={selectOperation} />
    </>
  );
}

function CardNuovoLavoro({ item }) {

  return (
    <>
      <StyledTextAreaModifica rows="1" name="cliente" placeholder='cliente' value="Mario Rossi" />
      <StyledTextAreaModifica rows="1" name="professionista" placeholder='professionista' value="Alessandro Volta SRL" />
      <StyledTextAreaModifica rows="1" name="professione" placeholder='professione' value="Elettricisti" />
      {/* <StyledTextAreaModifica rows="1" name="id_cliente" placeholder='Cliente'/> */}
      {/* <StyledTextArea rows="1" name="id_professionista" placeholder='Professionista'/> */}
      <StyledTextAreaModifica rows="1" name="descrizione" placeholder='Descrizione*' value={item.descrizione} />
      <StyledTextAreaModifica rows="1" name="giorno" placeholder='Giorno*' value={formatoDate(item.giorno, "AAAA-MM-GG")} />
      <StyledTextAreaModifica rows="1" name="orario_inizio" placeholder='Orario inizio*' value={formatoTime(item.orario_inizio)} />
      <StyledTextAreaModifica rows="1" name="orario_fine" placeholder='Orario fine*' value={formatoTime(item.orario_fine)} />
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
      <OperazioniNuovoItem />
    </>
  );
}

function CardCercaLavori({ item }) {
  return (
    <>
      <StyledTextAreaModifica rows="1" name="nome_cliente" placeholder='Nome cliente' value={item.nomeCliente} />
      <StyledTextAreaModifica rows="1" name="cognome_cliente" placeholder='Cognome cliente' value={item.cognomeCliente} />
      <StyledTextAreaModifica rows="1" name="nome_professionista" placeholder='Nome professionista' value={item.nomeProfessionista} />
      <StyledTextAreaModifica rows="1" name="descrizione" placeholder='Descrizione' value={item.descrizione} />
      <StyledInputModifica rows="1" type="date" name="primo_giorno" placeholder='Primo giorno' value={item.primoGiorno} />
      <StyledInputModifica rows="1" type="date" name="ultimo_giorno" placeholder='Ultimo giorno' value={item.ultimoGiorno} />
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
      <OperazioniCercaItems />
    </>
  );
}

function CardModificaProfilo({ item }) {
  return (
    <>
      <StyledTextArea rows="1" name="username" placeholder='Username*'/>
      <StyledTextArea rows="1" name="note" placeholder='Note'/>
      <StyledTextArea rows="1" name="password_attuale" placeholder='Password attuale*'/>
      <StyledTextArea rows="1" name="nuova_password" placeholder='Nuova password'/>
      <StyledTextArea rows="1" name="conferma_nuova_password" placeholder='Conferma nuova password'/>
    </>
  );
}

function CardItem({ selectOperation, tipoItem, item, header }) {
  return (
    <StyledCard>
      {(header !== "") && (
        <StyledCardHeader>{header}</StyledCardHeader>
      )}
       <ListGroup variant="flush">
        {(tipoItem === "cliente") &&(
          <CardCliente item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem === "nuovo cliente") &&(
          <CardNuovoCliente item={item} />
        )}
        {(tipoItem === "cerca clienti") &&(
          <CardCercaClienti item={item} />
        )}
        {(tipoItem === "professionista") &&(
          <CardProfessionista item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem === "nuovo professionista") &&(
          <CardNuovoProfessionista item={item} />
        )}
        {(tipoItem === "cerca professionisti") &&(
          <CardCercaProfessionisti item={item} />
        )}
        {(tipoItem.startsWith("lavoro")) &&(
          <CardLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
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









