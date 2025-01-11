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
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, 
  BottoneBluNonSelezionato, BottoneBluSelezionato, BottoneRossoNonSelezionato, BottoneRossoSelezionato
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

const OperazioniNuovoItem = () => {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%"}}>
      <StyledRow>
        <StyledCol className='custom-col'>
          <StyledSaveNotSelected size={grandezzaIcona} />
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

function CampiItem({ campiItem, setItem }) {
  let queue = [];
  return (
    <>
      {campiItem.map(([label, placeholder, name, value, type, onClickFunction], index) => (
        <React.Fragment key={index}>
          {/* {type = (type === null) ? "" : type} */}
          {/* <button>{name + ": " + type}</button> */}
          <br />
          {type.startsWith("bottone") && (
            addElemento(queue, [label, placeholder, name, value, type, onClickFunction])
          )}
          {!type.startsWith("bottone") && (
            <>
              {queue.length !== 0 && (
                <Row>
                  {queue.map(([label2, placeholder2, name2, value2, type2, onClickFunction2], index2) => (
                    <Col key={index2}>
                      
                      {(type2 === "bottoneBluNonSelezionato") && (
                        <BottoneBluNonSelezionato onClick={(e) => eseguiFunzione(e, setItem, onClickFunction2)}>{label2}</BottoneBluNonSelezionato>
                      )}
                      {(type2 === "bottoneBluSelezionato") && (
                        <BottoneBluSelezionato onClick={(e) => eseguiFunzione(e, setItem, onClickFunction2)}>{label2}</BottoneBluSelezionato>
                      )}
                      {(type2 === "bottoneRossoNonSelezionato") && (
                        <BottoneRossoNonSelezionato onClick={(e) => eseguiFunzione(e, setItem, onClickFunction2)}>{label2}</BottoneRossoNonSelezionato>
                      )}
                      {(type2 === "bottoneRossoSelezionato") && (
                        <BottoneRossoSelezionato onClick={(e) => eseguiFunzione(e, setItem, onClickFunction2)}>{label2}</BottoneRossoSelezionato>
                      )}
                    </Col>
                  ))}
                </Row>
              )}
              {queue = []}
              {type === "br" && (
                <br />
              )}
              {type === "" && (
                <>
                  <StyledLabel htmlFor={name}>{label}</StyledLabel>
                  <StyledTextAreaModifica
                    rows="1"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={(e) => handleInputChange(e, setItem)}
                  />
                </>
              )}
                {type !== null && type !== "br" && type !== "button" && (
                <>
                  <StyledLabel htmlFor={name}>{label}</StyledLabel>
                  <StyledInputModifica
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                      onChange={(e) => handleInputChange(e, setItem)}
                  />
                </>
              )}
            </>
          )}
        </React.Fragment>
      ))}
      <br /> <br />
    </>
  );
}

function FormNuovoItem({tipoItem, item, setItem}) {
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

function FormRicercaItems({tipoItem, item, setItem, eseguiRicerca, isVisible, setIsVisible, arrowUp, setArrowUp}) {
  const campiRicercaItems = getCampiRicerca(tipoItem, item);
  return (
    <>
      <SlideContainer isVisible={isVisible}>
        <CampiItem campiItem={campiRicercaItems} setItem={setItem} />
      </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

function FormItem({tipoItem, item, setItem, header, selectOperation, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  
  return (
    <StyledForm>
      <StyledHeader style={{backgroundColor: "#000000"}}>{(header !== "") ? header : " "}</StyledHeader>         
      <StyledListGroupItem variant="flush">
        {(tipoItem.startsWith("nuovo")) && (
          <FormNuovoItem tipoItem={tipoItem} item={item} setItem={setItem} />
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
