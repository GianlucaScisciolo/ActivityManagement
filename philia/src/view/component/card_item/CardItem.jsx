import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Trash2, Pencil, Plus, Search } from 'lucide-react';
import { HookItems } from '../../../vario/HookItems';
import { useSelector, useDispatch } from 'react-redux';
import { formatoDate, formatoTime } from '../../../vario/Tempo';
import { 
  StyledCard, StyledRow, StyledCol, StyledCardHeader, grandezzaIcona,
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina,
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledListGroupItem, SlideContainer, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected 
} from './StyledCardItem';
import { 
  handleInputChange, cambiamentoBloccato, getCampiRicerca, getCampiNuovoItem
} from '../../../vario/Vario';

const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 450); 
};


const PencilTag = ({ tipoSelezione, selectOperation, item }) => {
  switch(tipoSelezione) {
    case 0:
    case 2:
      return <StyledPencilNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }}  onClick={() => selectOperation("pencil", item)} />;
    case 1:
      return <StyledPencilSelected size={grandezzaIcona} style={{ marginRight: "50%" }}  onClick={() => selectOperation("pencil", item)} />;
    default:
      return <></>;
  }
}

const TrashTag = ({ tipoSelezione, selectOperation, item }) => {
  switch(tipoSelezione) {
    case 0:
    case 1:
      return <StyledTrashNotSelected size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />;
    case 2:
      return <StyledTrashSelected size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />;
    default:
      return <></>;
  }
}

const TextAreaTag = ({ tipoSelezione, nome, valore, modificabile, setItem }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledTextAreaBlock rows="1" name={nome} value={valore} readOnly />;
    case 1:
      return (modificabile) ? <StyledTextAreaModifica rows="1" name={nome} value={valore} onChange={(e) => handleInputChange(e, setItem)} />
                            : <StyledTextAreaBlock rows="1" name={nome} value={valore} readOnly />;
    case 2:
      return <StyledTextAreaElimina rows="1" name={nome} value={valore} readOnly />;
    default:
      return <></>;
  }
}

const InputTag = ({ tipoSelezione, tipo, nome, valore, modificabile, setItem }) => {
  switch(tipoSelezione) {
    case 0:
      return <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} readOnly />;
    case 1:
      return (modificabile) ? <StyledInputModifica rows="1" type={tipo} name={nome} value={valore} onChange={(e) => handleInputChange(e, setItem)} />
                            : <StyledInputBlock rows="1" type={tipo} name={nome} value={valore} readOnly />;
    case 2:
      return <StyledInputElimina rows="1" type={tipo} name={nome} value={valore} readOnly />;
    default:
      return <></>;
  }
}

const OperazioniItemEsistente = ({ tipoSelezione, selectOperation, item }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <PencilTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
      <TrashTag tipoSelezione={tipoSelezione} selectOperation={selectOperation} item={item} />
    </StyledListGroupItem>
  )
}

const OperazioniNuovoItem = () => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "3%"}}>
      <StyledRow>
        <StyledCol>
          <StyledSaveNotSelected size={grandezzaIcona} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

const OperazioniCercaItems = ({ setIsVisible, arrowUp, setArrowUp }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} />
      {arrowUp && (
        <StyledArrowTopNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
    </StyledListGroupItem>
  );
};

function CardCliente({ item, selectOperation }) {
  const [cliente, setCliente] = useState(item);
  
  return (
    <>
      <TextAreaTag             tipoSelezione={cliente.tipo_selezione}             nome="nome_cognome" valore={cliente.nome + " " + cliente.cognome} setItem={setCliente} modificabile={false} />
      <InputTag                tipoSelezione={cliente.tipo_selezione} tipo="text" nome="contatto"     valore={cliente.contatto}                     setItem={setCliente} modificabile={true} />
      <TextAreaTag             tipoSelezione={cliente.tipo_selezione}             nome="note"         valore={cliente.note}                         setItem={setCliente} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={cliente.tipo_selezione} selectOperation={selectOperation} item={cliente} />
    </>
  );
}

function CardProfessionista({ item, selectOperation }) {
  const [professionista, setProfessionista] = useState(item);
  
  return (
    <>
      <TextAreaTag             tipoSelezione={professionista.tipo_selezione}              nome="nome"        valore={professionista.nome}        setItem={setProfessionista} modificabile={false} />
      <TextAreaTag             tipoSelezione={professionista.tipo_selezione}              nome="professione" valore={professionista.professione} setItem={setProfessionista} modificabile={false} />
      <InputTag                tipoSelezione={professionista.tipo_selezione} tipo="text"  nome="contatto"    valore={professionista.contatto}    setItem={setProfessionista} modificabile={true} />
      <InputTag                tipoSelezione={professionista.tipo_selezione} tipo="email" nome="email"       valore={professionista.email}       setItem={setProfessionista} modificabile={true} />
      <TextAreaTag             tipoSelezione={professionista.tipo_selezione}              nome="note"        valore={professionista.note}        setItem={setProfessionista} modificabile={true} />
      <OperazioniItemEsistente tipoSelezione={professionista.tipo_selezione} selectOperation={selectOperation} item={professionista} />
    </>
  );
}

function CardLavoro({ tipoItem, item, selectOperation }) {
  const [lavoro, setLavoro] = useState(item);

  return (
    <>
      {(tipoItem === "lavoro cliente") && (
        <TextAreaTag   tipoSelezione={lavoro.tipo_selezione}             nome="nome_cognome_cliente" valore={lavoro.nome_cliente + " " + lavoro.cognome_cliente} setItem={setLavoro} modificabile={false}   />
      )}
      {(tipoItem === "lavoro professionista") && (
        <>
          <TextAreaTag tipoSelezione={lavoro.tipo_selezione}             nome="nome_professionista"  valore={lavoro.nome_professionista}                         setItem={setLavoro} modificabile={false} />
          <TextAreaTag tipoSelezione={lavoro.tipo_selezione}             nome="professione"          valore={lavoro.professione}                                 setItem={setLavoro} modificabile={false} />
        </>
      )}
      {(tipoItem.startsWith("lavoro")) && (
        <>
          <TextAreaTag tipoSelezione={lavoro.tipo_selezione}             nome="descrizione"          valore={lavoro.descrizione}                                 setItem={setLavoro} modificabile={true} />
          <InputTag    tipoSelezione={lavoro.tipo_selezione} tipo="date" nome="giorno"               valore={formatoDate(lavoro.giorno, "AAAA-MM-GG")}           setItem={setLavoro} modificabile={true} />
          <InputTag    tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_inizio"        valore={formatoTime(lavoro.orario_inizio)}                  setItem={setLavoro} modificabile={true} />
          <InputTag    tipoSelezione={lavoro.tipo_selezione} tipo="time" nome="orario_fine"          valore={formatoTime(lavoro.orario_fine)}                    setItem={setLavoro} modificabile={true} />
          <TextAreaTag tipoSelezione={lavoro.tipo_selezione}             nome="note"                 valore={lavoro.note}                                        setItem={setLavoro} modificabile={true} />
        </>
      )}
      <OperazioniItemEsistente tipoSelezione={lavoro.tipo_selezione} selectOperation={selectOperation} item={lavoro} />
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

function CampiItem({campiItem, setItem}) {
  return (
    <>
      {campiItem.map(([label, placeholder, name, value, type], index) => (
        <React.Fragment key={index}>
          {(type === null) && (
            <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
          )}
          {(type !== null) && (
            <StyledInputModifica rows="1" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function CardNuovoItem({tipoItem, item, setItem}) {
  const campiNuovoItem = getCampiNuovoItem(tipoItem, item);
  return (
    <>
      <SlideContainer isVisible={true}>
        <CampiItem campiItem={campiNuovoItem} setItem={setItem} />
      </SlideContainer>
      <OperazioniNuovoItem  />
    </>
  );
}

function CardRicerca({tipoItem, item, setItem, isVisible, setIsVisible, arrowUp, setArrowUp}) {
  const campiRicercaItems = getCampiRicerca(tipoItem, item);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  return (
    <>
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        <CampiItem campiItem={campiRicercaItems} setItem={setItem} />
      </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp}
      />
    </>
  );
}

function CardItem({ selectOperation, tipoItem, item, setItem, header }) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  item.tipo_selezione = (item.tipo_selezione === undefined) ? 0 : item.tipo_selezione;
  header = (tipoItem === "lavoro") ? item.tipo_lavoro : header;
  return (
    <StyledCard>
      <StyledCardHeader style={{backgroundColor: "#000000"}}>{(header !== "") ? header : " "}</StyledCardHeader>
      <StyledListGroupItem variant="flush">
        {(tipoItem.startsWith("nuovo")) && (
          <CardNuovoItem tipoItem={tipoItem} item={item} setItem={setItem} />
        )}
        {(tipoItem.startsWith("cerca")) && (
          <CardRicerca tipoItem={tipoItem} item={item} setItem={setItem}
            isVisible={isVisible} setIsVisible={setIsVisible} 
            arrowUp={arrowUp} setArrowUp={setArrowUp} 
          />
        )}
        {(tipoItem === "cliente") &&(
          <CardCliente item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem === "professionista") &&(
          <CardProfessionista item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem.startsWith("lavoro")) &&(
          <CardLavoro tipoItem={tipoItem} item={item} selectOperation={selectOperation} />
        )}
        {(tipoItem.startsWith("modifica profilo")) &&(
          <CardModificaProfilo item={item} />
        )}
      </StyledListGroupItem>
    </StyledCard>
  );
}

export default CardItem;









