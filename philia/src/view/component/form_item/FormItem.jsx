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

const SlideContainerComponent = React.forwardRef((props, ref) => (
  <SlideContainer ref={ref} {...props}>
    {props.children}
  </SlideContainer>
));

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
    <StyledListGroupItem 
      style={{border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%"}}
    >
      <StyledRow>
        <StyledCol className='custom-col'>
          <StyledSaveNotSelected size={grandezzaIcona} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

const OperazioniCercaItems = ({ isVisible, setIsVisible, arrowUp, setArrowUp }) => {
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

function FormNuovoCliente({item}) {
  return (
    <>
      <StyledLabel>Nome</StyledLabel>
      <StyledTextAreaModifica rows="1" placeholder='Nome*' name="nome" value={item.nome} />
      <StyledLabel>Cognome</StyledLabel>
      <StyledTextAreaModifica rows="1" placeholder='Cognome*' name="cognome" value={item.cognome} />
      <StyledLabel>Contatto</StyledLabel>
      <StyledInputModifica rows="1" type="text" placeholder='Contatto*' name="contatto" value={item.contatto} />
      <StyledLabel>Note</StyledLabel>
      <StyledTextAreaModifica rows="1" placeholder='Note' name="note" value={item.note} style={{marginBottom: "10px"}} />
      <OperazioniNuovoItem />   
    </>
  );
}

function FormCercaClienti({ item, isVisible, setIsVisible, arrowUp, setArrowUp }) {
  return (
    <>
      <SlideContainer isVisible={isVisible}>
        <StyledLabel>Nome</StyledLabel>
        <StyledTextAreaModifica rows="1" placeholder='Nome*' name="nome" value={item.nome} />
        <StyledLabel>Cognome</StyledLabel>
        <StyledTextAreaModifica rows="1" placeholder='Cognome*' name="cognome" value={item.cognome} />
        <StyledLabel>Contatto</StyledLabel>
        <StyledInputModifica rows="1" type="text" placeholder='Contatto*' name="contatto" value={item.contatto} />
        <StyledLabel>Note</StyledLabel>
        <StyledTextAreaModifica rows="1" placeholder='Note' name="note" value={item.note} /> 
        <br /> <br />
      </SlideContainer>
      <OperazioniCercaItems 
        isVisible={isVisible} setIsVisible={setIsVisible} 
        arrowUp={arrowUp} setArrowUp={setArrowUp}
      />
    </>
  );
}

function FormNuovoProfessionista({item}) {
  return (
    <>
      <StyledLabel>Nome</StyledLabel>
      <StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} />
      <StyledLabel>Professione</StyledLabel>
      <StyledTextAreaModifica rows="1" name="professione" placeholder='Professione*' value={item.professione} />
      <StyledLabel>Contatto</StyledLabel>
      <StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} />
      <StyledLabel>Email</StyledLabel>
      <StyledInputModifica rows="1" type="text" name="email" placeholder='Email' value={item.email} />
      <StyledLabel>Note</StyledLabel>
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
      <br /> <br />
      <OperazioniNuovoItem  />
    </>
  );
}

function FormCercaProfessionisti({ item, isVisible, setIsVisible, arrowUp, setArrowUp }) {
  return (
    <>
      <SlideContainer isVisible={isVisible}>
        <StyledLabel>Nome</StyledLabel>
        <StyledTextAreaModifica rows="1" name="nome" placeholder='Nome*' value={item.nome} />
        <StyledLabel>Professione</StyledLabel>
        <StyledTextAreaModifica rows="1" name="professione" placeholder='Professione*' value={item.professione} />
        <StyledLabel>Contatto</StyledLabel>
        <StyledInputModifica rows="1" type="text" name="contatto" placeholder='Contatto' value={item.contatto} />
        <StyledLabel>Email</StyledLabel>
        <StyledInputModifica rows="1" type="text" name="email" placeholder='Email' value={item.email} />
        <StyledLabel>Note</StyledLabel>
        <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
        <br /> <br />
      </SlideContainer>
      <OperazioniCercaItems 
        isVisible={isVisible} setIsVisible={setIsVisible} 
        arrowUp={arrowUp} setArrowUp={setArrowUp}
      />
    </>
  );
}

function FormNuovoLavoro({tipoItem, item}) {
  return (
    <>
      <StyledLabel>Cliente</StyledLabel>
      <StyledTextAreaModifica rows="1" name="cliente" placeholder='cliente' value="Mario Rossi" />
      <StyledLabel>Professionista</StyledLabel>
      <StyledTextAreaModifica rows="1" name="professionista" placeholder='professionista' value="Alessandro Volta SRL" />
      <StyledLabel>Descrizione</StyledLabel>
      <StyledTextAreaModifica rows="1" name="descrizione" placeholder='Descrizione*' value={item.descrizione} />
      <StyledLabel>Giorno</StyledLabel>
      <StyledTextAreaModifica rows="1" name="giorno" placeholder='Giorno*' value={formatoDate(item.giorno, "AAAA-MM-GG")} />
      <StyledLabel>Orario inizio</StyledLabel>
      <StyledTextAreaModifica rows="1" name="orario_inizio" placeholder='Orario inizio*' value={formatoTime(item.orario_inizio)} />
      <StyledLabel>Orario fine</StyledLabel>
      <StyledTextAreaModifica rows="1" name="orario_fine" placeholder='Orario fine*' value={formatoTime(item.orario_fine)} />
      <StyledLabel>Note</StyledLabel>
      <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
      <br /> <br />
      <OperazioniNuovoItem  />
    </>
  );
}

function FormCercaLavori({ item, isVisible, setIsVisible, arrowUp, setArrowUp }) {
  return (
    <>
      <SlideContainer isVisible={isVisible}>
        <StyledLabel>Nome cliente</StyledLabel>
        <StyledTextAreaModifica rows="1" name="nome_cliente" placeholder='Nome cliente' value={item.nomeCliente} />
        <StyledLabel>Cognome cliente</StyledLabel>
        <StyledTextAreaModifica rows="1" name="cognome_cliente" placeholder='Cognome cliente' value={item.cognomeCliente} />
        <StyledLabel>Nome professionista</StyledLabel>
        <StyledTextAreaModifica rows="1" name="nome_professionista" placeholder='Nome professionista' value={item.nomeProfessionista} />
        <StyledLabel>Descrizione</StyledLabel>
        <StyledTextAreaModifica rows="1" name="descrizione" placeholder='Descrizione' value={item.descrizione} />
        <StyledLabel>Primo giorno</StyledLabel>
        <StyledInputModifica rows="1" type="date" name="primo_giorno" placeholder='Primo giorno' value={item.primoGiorno} />
        <StyledLabel>Ultimo giorno</StyledLabel>
        <StyledInputModifica rows="1" type="date" name="ultimo_giorno" placeholder='Ultimo giorno' value={item.ultimoGiorno} />
        <StyledLabel>Note</StyledLabel>
        <StyledTextAreaModifica rows="1" name="note" placeholder='Note' value={item.note} />
        <br /> <br />
      </SlideContainer>
      <OperazioniCercaItems 
        isVisible={isVisible} setIsVisible={setIsVisible} 
        arrowUp={arrowUp} setArrowUp={setArrowUp}
      />
    </>
  );
}

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

function FormItem({selectOperation, tipoItem, item, header}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  // const [height, setHeight] = useState("100%");
  // const slideRef = useRef(null);

  // useEffect(() => {
  //   // alert(height);
  //   if (slideRef.current) {
  //     if (isVisible) {
  //       setHeight(`${slideRef.current.scrollHeight}px`);
  //     } else {
  //       setHeight("0px");
  //     }
  //   }
  // }, [isVisible, slideRef.current]);
  
  

  return (
    <StyledForm>
      {(header !== "") && (
        <StyledHeader style={{backgroundColor: "#000000"}}>{header}</StyledHeader>
      )}
      <StyledListGroupItem variant="flush">
        {(tipoItem === "nuovo cliente") &&(
          <FormNuovoCliente item={item} />
        )}
        {(tipoItem === "cerca clienti") &&(
          <FormCercaClienti item={item} 
            isVisible={isVisible} setIsVisible={setIsVisible} 
            arrowUp={arrowUp} setArrowUp={setArrowUp}
          />
        )}
        {(tipoItem === "nuovo professionista") &&(
          <FormNuovoProfessionista item={item} />
        )}
        {(tipoItem === "cerca professionisti") &&(
          <FormCercaProfessionisti item={item} 
            isVisible={isVisible} setIsVisible={setIsVisible} 
            arrowUp={arrowUp} setArrowUp={setArrowUp}
          />
        )}
        {(tipoItem.startsWith("nuovo lavoro")) &&(
          <FormNuovoLavoro item={item} />
        )}
        {(tipoItem.startsWith("cerca lavori")) &&(
          <FormCercaLavori item={item} 
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
