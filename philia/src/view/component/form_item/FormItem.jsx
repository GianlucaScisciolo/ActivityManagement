import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledForm, StyledListGroupItem, StyledRow, StyledCol, 
  StyledLabel, StyledHeader, grandezzaIcona, SlideContainer, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, StyledSelect, StyledOption, 
  BottoneBluNonSelezionato, BottoneBluSelezionato, BottoneRossoNonSelezionato, BottoneRossoSelezionato, 
  StyledSpanErrore
} from "./StyledFormItem";
import { 
  handleInputChange, getCampiRicerca, getCampiNuovoItem, selezionaInserimentoLavoroCliente, selezionaInserimentoLavoroProfessionista
} from '../../../vario/Vario';


const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 1000); 
};

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

const OperazioniNuovoItem = ({eseguiSalvataggio}) => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%"}}>
      <StyledRow>
        <StyledCol className='custom-col'>
          <StyledSaveNotSelected size={grandezzaIcona} onClick={eseguiSalvataggio} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

const OperazioniCercaItems = ({ setIsVisible, arrowUp, setArrowUp, eseguiRicerca }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={eseguiRicerca} />
      {arrowUp && (
        <StyledArrowTopNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected size={grandezzaIcona} onClick={() => nascondiForm(setIsVisible, setArrowUp)} />
      )}
    </StyledListGroupItem>
  );
};

function FormModificaProfilo({ item }) {
  return (
    <>
      <StyledLabel>Nome</StyledLabel>
      <StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} />
      <StyledLabel>Cognome</StyledLabel>
      <StyledTextAreaModifica rows="1" name="cognome" placeholder='Cognome*' value={item.cognome} />
      <StyledLabel>Contatto</StyledLabel>
      <StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} />
      <StyledLabel>Email</StyledLabel>
      <StyledInputModifica rows="1" type="email" name="email" placeholder='Email' value={item.email} />
      <StyledLabel>Note</StyledLabel>
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
      <br /> <br />
    </>
  );
}

function addElemento(queue, elemento) {
  queue.push(elemento);
}

function eseguiFunzione(e, setItem, nomeFunzione) {
  e.preventDefault();
  if(nomeFunzione === "selezionaInserimentoLavoroCliente") {
    selezionaInserimentoLavoroCliente(setItem);
  }
  else if(nomeFunzione === "selezionaInserimentoLavoroProfessionista") {
    selezionaInserimentoLavoroProfessionista(setItem);
  }
}

function FormNuovoCliente({ item, setItem, eseguiSalvataggio, errori, setErrori }) {
  return (
    <>
      {/* <div>{errori.nome}</div> */}
      <StyledLabel>Nome</StyledLabel>
      <StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.nome}</StyledSpanErrore>
      <StyledLabel>Cognome</StyledLabel>
      <StyledTextAreaModifica rows="1" name="cognome" placeholder='Cognome*' value={item.cognome} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.cognome}</StyledSpanErrore>
      <StyledLabel>Contatto</StyledLabel>
      <StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.contatto}</StyledSpanErrore>
      <StyledLabel>Note</StyledLabel>
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.note}</StyledSpanErrore>
      <br /> <br />
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
    </>
  );
}

function FormNuovoProfessionista({ item, setItem, eseguiSalvataggio, errori, setErrori }) {
  return (
    <>
      <StyledLabel>Nome</StyledLabel>
      <StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.nome}</StyledSpanErrore>
      <StyledLabel>Professione</StyledLabel>
      <StyledTextAreaModifica rows="1" name="professione" placeholder='Professione*' value={item.professione} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.professione}</StyledSpanErrore>
      <StyledLabel>Contatto</StyledLabel>
      <StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.contatto}</StyledSpanErrore>
      <StyledLabel>Email</StyledLabel>
      <StyledInputModifica rows="1" type="text" name="email" placeholder='Email' value={item.email} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.email}</StyledSpanErrore>
      <StyledLabel>Note</StyledLabel>
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
      <StyledSpanErrore>{errori.note}</StyledSpanErrore>
      <br /> <br />
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
    </>
  );
}

function getClientiFiltrati(e, clienti, setClientiFiltrati) {
  e.preventDefault();
  const { value } = e.target;
  console.log(clienti);
  setClientiFiltrati(clienti.filter(cliente => {
    return ((cliente.cognome + " " + cliente.nome).toUpperCase()).includes((value).toUpperCase());
  }));
}

function getProfessionistiFiltrati(e, professionisti, setProfessionistiFiltrati) {
  e.preventDefault();
  const { value } = e.target;
  console.log(professionisti);
  setProfessionistiFiltrati(professionisti.filter(professionista => {
    return ((professionista.nome).toUpperCase()).includes((value).toUpperCase());
  }));
}

function FormNuovoLavoro({ clienti, professionisti, item, setItem, eseguiSalvataggio, errori, setErrori }) {
  const [clientiFiltrati, setClientiFiltrati] = useState([]);
  const [professionistiFiltrati, setProfessionistiFiltrati] = useState([]);
  useEffect(() => {
    setClientiFiltrati(clienti);
    setProfessionistiFiltrati(professionisti);
  })

  item.id_cliente = (!item.id_cliente) ? 0 : item.id_cliente;
  item.id_professionista = (!item.id_professionista) ? 0 : item.id_professionista;

  return (
    <>
      <br /> <br />
      <Row>
        <Col>
          {(item.lavoro_cliente_selezionato) && (
            <BottoneBluSelezionato onClick={(e) => eseguiFunzione(e, setItem, "selezionaInserimentoLavoroCliente")}>Lavoro cliente</BottoneBluSelezionato>
          )}
          {(!item.lavoro_cliente_selezionato) && (
            <BottoneBluNonSelezionato onClick={(e) => eseguiFunzione(e, setItem, "selezionaInserimentoLavoroCliente")}>Lavoro cliente</BottoneBluNonSelezionato>
          )}
        </Col>
        <Col>
          {(item.lavoro_professionista_selezionato) && (
            <BottoneBluSelezionato onClick={(e) => eseguiFunzione(e, setItem, "selezionaInserimentoLavoroProfessionista")}>Lavoro professionista</BottoneBluSelezionato>
          )}
          {(!item.lavoro_professionista_selezionato) && (
            <BottoneBluNonSelezionato onClick={(e) => eseguiFunzione(e, setItem, "selezionaInserimentoLavoroProfessionista")}>Lavoro professionista</BottoneBluNonSelezionato>
          )}
        </Col>
      </Row>
      {(item.lavoro_cliente_selezionato) && (
        <>
          
          <StyledLabel>Cliente</StyledLabel>
          {/* <div>|{item.id_cliente}|</div> */}
          <StyledTextAreaModifica rows="1" name="cliente" placeholder='Cliente' onChange={(e) => getClientiFiltrati(e, clienti, setClientiFiltrati)} />
          <StyledSelect value={item.id_cliente} name="id_cliente" onChange={(e) => handleInputChange(e, setItem)}>
            <StyledOption key={0} value="">Seleziona un cliente*</StyledOption>
              {clientiFiltrati.map((clienteFiltrato, index) => (
                <StyledOption key={index + 1} value={clienteFiltrato.id}>
                  {clienteFiltrato.nome + " " + clienteFiltrato.cognome + " - " + clienteFiltrato.contatto}
                </StyledOption>
              ))}
          </StyledSelect>
          <br />
          <StyledSpanErrore>{errori.cliente_e_professionista}</StyledSpanErrore>
        </>
      )}
      {(item.lavoro_professionista_selezionato) && (
        <>
          <StyledLabel>Professionista</StyledLabel>
          <div>{item.id_professionista}</div>
          <StyledTextAreaModifica rows="1" name="professionista" placeholder='Professionista' onChange={(e) => getProfessionistiFiltrati(e, professionisti, setProfessionistiFiltrati)} />
          <StyledSelect value={item.id_professionista} name="id_professionista" onChange={(e) => handleInputChange(e, setItem)}>
            <StyledOption key={0} value="">Seleziona un professionista*</StyledOption>
            {professionistiFiltrati.map((professionistaFiltrato, index) => (
              <StyledOption key={index} value={professionistaFiltrato.id}>{professionistaFiltrato.nome + " - " + professionistaFiltrato.professione + " - " + professionistaFiltrato.contatto + " - " + professionistaFiltrato.email}</StyledOption>  
            ))}
          </StyledSelect>
          <br />
          <StyledSpanErrore>{errori.cliente_e_professionista}</StyledSpanErrore>
        </>
      )}
      {(item.lavoro_cliente_selezionato || item.lavoro_professionista_selezionato) && (
        <>
          <StyledLabel>Descrizione</StyledLabel>
          <StyledTextAreaModifica rows="1" name="descrizione" placeholder='Descrizione*' value={item.descrizione} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledSpanErrore>{errori.descrizione}</StyledSpanErrore>
          <StyledLabel>Giorno</StyledLabel>
          <StyledInputModifica rows="1" type="date" name="giorno" placeholder='Giorno*' value={item.giorno} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledSpanErrore>{errori.giorno}</StyledSpanErrore>
          <StyledLabel>Orario inizio</StyledLabel>
          <StyledInputModifica rows="1" type="time" name="orario_inizio" placeholder='Orario inizio' value={item.orario_inizio} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledSpanErrore>{errori.orario_inizio}</StyledSpanErrore>
          <StyledLabel>orario fine</StyledLabel>
          <StyledInputModifica rows="1" type="time" name="orario_fine" placeholder='Orario fine' value={item.orario_fine} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledSpanErrore>{errori.orario_fine}</StyledSpanErrore>
          <StyledLabel>Note</StyledLabel>
          <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} onChange={(e) => handleInputChange(e, setItem)} />
          <StyledSpanErrore>{errori.note}</StyledSpanErrore>
        </>
      )}
      <br /> <br />
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
    </>
  );
}

function CampiItem({ campiItem, setItem }) {
  let queue = [];
  return (
    <>
      {campiItem.map(([label, placeholder, name, value, type], index) => (
        <React.Fragment key={index}>
          {(type === "" || type === null) && (
            <>
              <StyledLabel htmlFor={name}>{label}</StyledLabel>
              <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
            </>
          )}
          {(type !== "" && type !== null) && (
            <>
              <StyledLabel htmlFor={name}>{label}</StyledLabel>
              <StyledInputModifica type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
            </>
          )}
          <br /> <br />
        </React.Fragment>
      ))}
    </>
  );
}

function FormNuovoItem({tipoItem, item, setItem, eseguiSalvataggio}) {
  const campiNuovoItem = getCampiNuovoItem(tipoItem, item);
  return (
    <>
      <SlideContainer isVisible={true}>
        <CampiItem campiItem={campiNuovoItem} setItem={setItem} />
      </SlideContainer>
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
    </>
  );
}

function FormRicercaItems({tipoItem, item, setItem, eseguiRicerca, isVisible, setIsVisible, arrowUp, setArrowUp}) {
  const campiRicercaItems = getCampiRicerca(tipoItem, item);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  return (
    <>
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        <CampiItem campiItem={campiRicercaItems} setItem={setItem} />
      </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca} />
    </>
  );
}

function FormItem({clienti, professionisti, tipoItem, item, setItem, header, selectOperation, eseguiRicerca, eseguiSalvataggio, errori, setErrori}) {
  const [isVisible, setIsVisible] = useState("true");
  const [arrowUp, setArrowUp] = useState(true);
  
  return (
    <StyledForm>
      <StyledHeader style={{backgroundColor: "#000000"}}>{(header !== "") ? header : " "}</StyledHeader>  
      <StyledListGroupItem variant="flush">
        {(tipoItem === "nuovo cliente") && (
          <FormNuovoCliente item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} errori={errori} setErrori={setErrori} />
        )}
        {(tipoItem === "nuovo professionista") && (
          <FormNuovoProfessionista item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} errori={errori} setErrori={setErrori} />
        )}
        {(tipoItem === "nuovo lavoro") && (
          <FormNuovoLavoro clienti={clienti} professionisti={professionisti} item={item} setItem={setItem} eseguiSalvataggio={eseguiSalvataggio} errori={errori} setErrori={setErrori} />
        )}
        {(tipoItem.startsWith("cerca")) && (
          <FormRicercaItems tipoItem={tipoItem} item={item} setItem={setItem} eseguiRicerca={eseguiRicerca} 
            isVisible={isVisible} setIsVisible={setIsVisible} 
            arrowUp={arrowUp} setArrowUp={setArrowUp} 
          />
        )}
        {(tipoItem.startsWith("modifica profilo")) &&(
          <FormModificaProfilo item={item} />
        )}
      </StyledListGroupItem>
    </StyledForm>
  );
}

export default FormItem;
