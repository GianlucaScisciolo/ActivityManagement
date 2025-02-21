import React, { useState, useEffect, useRef } from 'react';
import { 
  StyledListGroupItem, StyledRow, StyledCol, StyledSaveNotSelected, grandezzaIcona, 
  StyledSearchNotSelected, StyledArrowTopNotSelected, StyledArrowBottomNotSelected, 
  StyledLoginNotSelected, StyledPencilNotSelected, StyledLabel, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledForm, StyledHeader, SlideContainer, StyledSpanErrore, 
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina
} from "./StyledFormItem";

export function getSelectTag(tipoSelezione) {
  return (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledSelectBlock : (
    (tipoSelezione === 1) ? StyledSelectModifica : StyledSelectElimina
  );
}; 

export function getInputTag(tipoSelezione, isModificabile) {
  return (isModificabile) ? (
    (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledInputBlock : (
      (tipoSelezione === 1) ? StyledInputModifica : StyledInputElimina
    )
  ) : (
    (tipoSelezione !== 2) ? StyledInputBlock : StyledInputElimina
  );
};

export function getTextAreaTag(tipoSelezione, isModificabile) {
  return (isModificabile) ? (
    (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledTextAreaBlock : (
      (tipoSelezione === 1) ? StyledTextAreaModifica : StyledTextAreaElimina
    )
  ) : (
    (tipoSelezione !== 2) ? StyledTextAreaBlock : StyledTextAreaElimina
  );
};

export const nascondiForm = (setIsVisible, setArrowUp) => {
  setIsVisible(prev => !prev);
  
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 1000); 
};

export function OperazioniNuovoItem({eseguiSalvataggio}) {
  return (
    <StyledListGroupItem style={{border: "5px solid #000000", backgroundColor:"#000000", paddingTop: "3%"}}>
      <StyledRow>
        <StyledCol>
          <StyledSaveNotSelected size={grandezzaIcona} onClick={eseguiSalvataggio} />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

export function OperazioniCercaItems({ setIsVisible, arrowUp, setArrowUp, eseguiRicerca }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
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

export function OperazioniLogin({eseguiLogin}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledLoginNotSelected size={grandezzaIcona} onClick={eseguiLogin} />
    </StyledListGroupItem>
  );
};

export function OperazioniModificaProfilo({eseguiModificaProfilo}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledPencilNotSelected size={grandezzaIcona} onClick={eseguiModificaProfilo} />
    </StyledListGroupItem>
  );
};

export function FormNuovoItem({campi, indici, eseguiSalvataggio}) {
  let maxHeight = "2000px";

  return (
    <StyledForm>
      <StyledHeader>{campi["header"]}</StyledHeader>  
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        {indici.map((i) => {
          // onClick={handleGiornoClick(setUltimoGiornoType)}
          // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
          // onChange={(e) => handleInputChange(e, setItem)}
          const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
            getTextAreaTag(1, true)
          );
          return ( 
            <React.Fragment key={i}>
              <StyledLabel htmlFor={campi.name[i]}>{campi.label[i]}</StyledLabel>
              <NomeTag 
                key={i}
                rows={1}
                name={campi.name[i]}
                type={campi.type[i]}
                step={campi.step[i]}
                value={campi.value[i]}
                placeholder={campi.placeholder[i]}
                onChange={campi.onChange}
                onClick={campi.onClick}
                onBlur={campi.onBlur}
              />
              {campi.options[i]}

              {(campi.errore[i] !== "") && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
            </React.Fragment>
          );
        })}
        <br /> <br />
      </SlideContainer>
      <OperazioniNuovoItem 
        eseguiSalvataggio={eseguiSalvataggio} 
      />
    </StyledForm>
  );
}

export function FormRicercaItems({campi, indici, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <StyledForm>
      <StyledHeader>{campi["header"]}</StyledHeader>
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        {indici.map((i) => {
          // onClick={handleGiornoClick(setUltimoGiornoType)}
          // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
          // onChange={(e) => handleInputChange(e, setItem)}
          const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
            getTextAreaTag(1, true)
          );
          return ( 
            <React.Fragment key={i}>
              <StyledLabel htmlFor={campi.name[i]}>{campi.label[i]}</StyledLabel>
              <NomeTag 
                key={i}
                rows={1}
                name={campi.name[i]}
                type={campi.type[i]}
                step={campi.step[i]}
                value={campi.value[i]}
                placeholder={campi.placeholder[i]}
                onChange={campi.onChange}
                onClick={campi.onClick}
                onBlur={campi.onBlur}
              />
            </React.Fragment>
          );
        })}
        <br /> <br />
      </SlideContainer>
      <OperazioniCercaItems
        setIsVisible={setIsVisible}
        arrowUp={arrowUp}
        setArrowUp={setArrowUp}
        eseguiRicerca={eseguiRicerca}
      />
    </StyledForm>
  );
}










