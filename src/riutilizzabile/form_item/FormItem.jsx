// React e Redux
import React, { useState } from 'react';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
// Riutilizzabile
import { 
  StyledListGroupItem, StyledRow, StyledCol, StyledSaveNotSelected, grandezzaIcona, 
  StyledSearchNotSelected, StyledArrowTopNotSelected, StyledArrowBottomNotSelected, 
  StyledLoginNotSelected, StyledPencilNotSelected, StyledLabel, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledForm, StyledHeader, SlideContainer, StyledSpanErrore, 
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina, 
  StyledEyeClosedNotSelected, StyledEyeOpenNotSelected, StyledEuroNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledTrashNotSelected 
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
          <StyledSaveNotSelected 
            className="salvaItemButton" 
            size={grandezzaIcona} 
            onClick={eseguiSalvataggio} 
          />
        </StyledCol>
      </StyledRow>
    </StyledListGroupItem>
  )
}

export function OperazioniCercaItems({ setIsVisible, arrowUp, setArrowUp, handleSearch }) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <StyledSearchNotSelected 
        className="ricercaItemsButton" 
        size={grandezzaIcona} 
        style={{ marginRight: "50%" }} 
        onClick={handleSearch} 
      />
      {arrowUp && (
        <StyledArrowTopNotSelected 
          className="nascondiFormButton" 
          size={grandezzaIcona} 
          onClick={() => nascondiForm(setIsVisible, setArrowUp)} 
        />
      )}
      {!arrowUp && (
        <StyledArrowBottomNotSelected 
          className="mostraFormButton"
          size={grandezzaIcona} 
          onClick={() => nascondiForm(setIsVisible, setArrowUp)} 
        />
      )}
    </StyledListGroupItem>
  );
};

export function OperazioniLogin({eseguiLogin}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledLoginNotSelected 
        className="loginButton" 
        size={grandezzaIcona} 
        onClick={eseguiLogin} 
      />
    </StyledListGroupItem>
  );
};

export function OperazioniModificaProfilo({eseguiModificaProfilo}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%", paddingBottom: "3%" }}>
      <StyledPencilNotSelected 
        className="modificaProfiloButton"
        size={grandezzaIcona} 
        onClick={eseguiModificaProfilo} 
      />
    </StyledListGroupItem>
  );
};

export function OperazioniFileItems({ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <div>
        <StyledFileIconNotSelected icon={faFilePdf} size="2xl" style={{ marginRight: "50%" }} />
        <StyledFileIconNotSelected icon={faFileExcel} size="2xl" />
      </div>
      <br />
      <div>
        <StyledDownloadNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={ottieniFileRangePDF} />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniFileRangeExcel} />
      </div>
      <br />
      <div>
        <StyledTrashNotSelected size={grandezzaIcona} onClick={eliminaItemsRange} />
      </div>
      <br />
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
          const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
            getTextAreaTag(1, true)
          );

          return ( 
            <React.Fragment key={i}>
              <StyledLabel htmlFor={campi.name[i]}>{campi.label[i]}</StyledLabel>
              {(campi.name[i] === "prezzo") ? (
                <StyledRow>
                  <>
                    <NomeTag 
                      style={(["prezzo", "totale"].includes(campi.name[i])) ? {marginLeft:"-10%", marginRight:0, minWidth:"105%"} : null}
                      rows={1}
                      name={campi.name[i]}
                      id={campi.id[i]}
                      type={campi.type[i]}
                      step={campi.step[i]}
                      value={campi.value[i]}
                      placeholder={campi.placeholder[i]}
                      onChange={campi.onChange}
                      onClick={campi.onClick}
                      onBlur={campi.onBlur}
                    />
                    {(["prezzo", "totale"].includes(campi.name[i])) && (
                      <StyledEuroNotSelected
                        style={{
                          maxWidth: "5%",
                          marginTop: "13px"
                        }} 
                        size={grandezzaIcona} 
                        onClick={null} 
                      />
                    )}
                    {campi.options[i]}
                  </>
                </StyledRow>
              ) : (
                <>
                  <NomeTag 
                    style={(["prezzo", "totale"].includes(campi.name[i])) ? {marginLeft:"-10%", marginRight:0, minWidth:"105%"} : null}
                    rows={1}
                    name={campi.name[i]}
                    id={campi.id[i]}
                    type={campi.type[i]}
                    step={campi.step[i]}
                    value={campi.value[i]}
                    placeholder={campi.placeholder[i]}
                    onChange={campi.onChange}
                    onClick={campi.onClick}
                    onBlur={campi.onBlur}
                  />
                  {(["prezzo", "totale"].includes(campi.name[i])) && (
                    <StyledEuroNotSelected
                      style={{
                        maxWidth: "5%",
                        marginTop: "13px"
                      }} 
                      size={grandezzaIcona} 
                      onClick={null} 
                    />
                  )}
                  {campi.options[i]}
                </>
              )}
              {(campi.errore[i] !== "") && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
            </React.Fragment>
          );
        })}
        <br /> <br />
      </SlideContainer>
      <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
    </StyledForm>
  );
}

export function FormRicercaItems({campi, indici, handleSearch}) {
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
                id={campi.id[i]}
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
        // eseguiRicerca={eseguiRicerca}
        handleSearch={handleSearch}
      />
    </StyledForm>
  );
}

export function FormLogin({campi, indici, eseguiLogin}) {
  let maxHeight = "2000px";
  const [inputType, setInputType] = useState('password');

  const onChangeVisibilityPassword = (e) => {
    e.preventDefault();
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <StyledForm>
      <StyledHeader>{campi["header"]}</StyledHeader>  
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        {indici.map((i) => {
          const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
            getTextAreaTag(1, true)
          );
          const StyledEyeTag = (inputType === "password") ? StyledEyeClosedNotSelected : StyledEyeOpenNotSelected;
          return ( 
            <React.Fragment key={i}>
              <StyledLabel htmlFor={campi.name[i]}>{campi.label[i]}</StyledLabel>
              <StyledRow>
                <NomeTag 
                  style={(campi.name[i] === "password") ? {maxWidth:"90%"} : null}
                  rows={1}
                  name={campi.name[i]} 
                  id={campi.id[i]}
                  type={(campi.name[i] === "password") ? inputType : campi.type[i]}
                  step={campi.step[i]}
                  min={campi.min[i]}
                  value={campi.value[i]}
                  placeholder={campi.placeholder[i]}
                  onChange={campi.onChange}
                  onClick={campi.onClick}
                  onBlur={campi.onBlur}
                />
                {(campi.name[i] === "password") && (
                  <StyledEyeTag
                    style={{
                      // border: "5px solid #000000",
                      maxWidth: "10%",
                      marginLeft: "-6px", 
                      marginTop: "13px"
                    }} 
                    size={grandezzaIcona} 
                    onClick={onChangeVisibilityPassword} 
                  />
                )}
              </StyledRow>
              {campi.options[i]}

              {(campi.errore[i]) && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
            </React.Fragment>
          );
        })}
        <br /> <br />
      </SlideContainer>
      <OperazioniLogin 
        eseguiLogin={eseguiLogin}
      />
    </StyledForm>
  );
}

export function FormProfilo({campi, indici, eseguiModificaProfilo}) {
  let maxHeight = "2000px";
  const [passwordAttualeType, setPasswordAttualeType] = useState('password');
  const [nuovaPasswordType, setNuovaPasswordType] = useState('password');
  const [confermaNuovaPasswordType, setConfermaNuovaPasswordType] = useState('password');

  const onChangeVisibilityPassword = (e, nome) => {
    e.preventDefault();
    if(nome === "password_attuale") {
      setPasswordAttualeType(passwordAttualeType === 'text' ? 'password' : 'text');
    }
    else if(nome === "nuova_password") {
      setNuovaPasswordType(nuovaPasswordType === 'text' ? 'password' : 'text');
    }
    else if(nome === "conferma_nuova_password") {
      setConfermaNuovaPasswordType(confermaNuovaPasswordType === 'text' ? 'password' : 'text');
    } 
  };

  return (
    <StyledForm>
      <StyledHeader>{campi["header"]}</StyledHeader>  
      <SlideContainer style={{maxHeight: `${maxHeight}`}}>
        {indici.map((i) => {
          const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
            getTextAreaTag(1, true)
          );
          const StyledEyeTag = (
            (
              campi.name[i] === "password_attuale" && passwordAttualeType === "password" || 
              campi.name[i] === "nuova_password" && nuovaPasswordType === "password" || 
              campi.name[i] === "conferma_nuova_password" && confermaNuovaPasswordType === "password"
            ) ? StyledEyeClosedNotSelected : StyledEyeOpenNotSelected
          );
          //(inputType === "password") ? StyledEyeClosedNotSelected : StyledEyeOpenNotSelected;
          return ( 
            <React.Fragment key={i}>
              <StyledLabel htmlFor={campi.name[i]}>{campi.label[i]}</StyledLabel>
              <StyledRow>
                <NomeTag 
                  style={(campi.name[i].includes("password")) ? {maxWidth:"90%"} : null}
                  rows={1}
                  name={campi.name[i]}
                  id={campi.id[i]}
                  type={(campi.name[i].includes("password")) ? (
                    (campi.name[i] === "password_attuale") ? passwordAttualeType : (
                      (campi.name[i] === "nuova_password")) ? nuovaPasswordType : confermaNuovaPasswordType
                  ) : campi.type[i]}
                  step={campi.step[i]}
                  min={campi.min[i]}
                  value={campi.value[i]}
                  placeholder={campi.placeholder[i]}
                  onChange={campi.onChange}
                  onClick={campi.onClick}
                  onBlur={campi.onBlur}
                />
                {(campi.name[i].includes("password")) && (
                  <StyledEyeTag
                    style={{
                      // border: "5px solid #000000",
                      maxWidth: "10%",
                      marginLeft: "-6px", 
                      marginTop: "13px"
                    }} 
                    size={grandezzaIcona} 
                    onClick={(e) => onChangeVisibilityPassword(e, campi.name[i])} 
                  />
                )}
              </StyledRow>
              {campi.options[i]}

              {(campi.errore[i]) && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
            </React.Fragment>
          );
        })}
        <br /> <br />
      </SlideContainer>
      <OperazioniModificaProfilo 
        eseguiModificaProfilo={eseguiModificaProfilo}
      />
    </StyledForm>
  );
}

export function FormFileItems({campi, indici, ottieniFileRangePDF, ottieniFileRangeExcel, eliminaItemsRange}) {
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
                id={campi.id[i]}
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
      <OperazioniFileItems 
        ottieniFileRangePDF={ottieniFileRangePDF} 
        ottieniFileRangeExcel={ottieniFileRangeExcel} 
        eliminaItemsRange={eliminaItemsRange} 
      />
    </StyledForm>
  );
}











