import React, { useState, useEffect, useRef } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { 
  StyledForm, StyledListGroupItem, StyledRow, StyledCol, 
  StyledLabel, StyledHeader, grandezzaIcona, 
  SlideContainer, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected
} from "./StyledFormItem";
import { 
  handleInputChange, getCampiRicerca, getCampiNuovoItem
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
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%"}}>
      <StyledRow>
        <StyledCol className='custom-col'>
          <StyledSaveNotSelected size={grandezzaIcona} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

const OperazioniCercaItems = ({ setIsVisible, arrowUp, setArrowUp }) => {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
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

function CampiItem({campiItem, setItem}) {
  return (
    <>
      {campiItem.map(([label, placeholder, name, value, type], index) => (
        <React.Fragment key={index}>
          <StyledLabel htmlFor={name}>{label}</StyledLabel>
          {(type === null) && (
            <StyledTextAreaModifica rows="1" placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
          )}
          {(type !== null) && (
            <StyledInputModifica rows="1" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => handleInputChange(e, setItem)} />
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

function FormRicercaItems({tipoItem, item, setItem, isVisible, setIsVisible, arrowUp, setArrowUp}) {
  const campiRicercaItems = getCampiRicerca(tipoItem, item);
  return (
    <>
      <SlideContainer isVisible={isVisible}>
        <CampiItem campiItem={campiRicercaItems} setItem={setItem} />
      </SlideContainer>
      <OperazioniCercaItems setIsVisible={setIsVisible} arrowUp={arrowUp} setArrowUp={setArrowUp}
      />
    </>
  );
}

function FormItem({tipoItem, item, setItem, header, selectOperation}) {
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
          <FormRicercaItems tipoItem={tipoItem} item={item} setItem={setItem} 
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
