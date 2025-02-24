import React, { useState, useEffect } from 'react';
import { 
  StyledPencilNotSelected, StyledPencilSelected, grandezzaIcona, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledListGroupItem, StyledRow, StyledCol, StyledSaveNotSelected, 
  StyledEyeOpenNotSelected, StyledEyeClosedNotSelected,
  StyledSearchNotSelected, StyledArrowTopNotSelected, StyledArrowBottomNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledTrashNotSelected2, 
  StyledLoginNotSelected, 
  StyledPencilNotSelected2, 
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledCard, StyledCardHeader, SlideContainer, 
  StyledSpanErrore
} from './StyledCardItem';
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Trash2, Pencil } from 'lucide-react';

function onChangeVisibilityPassword(e, type) {
  e.preventDefault();
  console.log(type);
  type = (type === "text") ? "password" : "text";
  console.log(type);
}

function getPencilTag(tipoSelezione) {
  return (tipoSelezione === 0 || tipoSelezione === 2) ? StyledPencilNotSelected : (
    (tipoSelezione === 1) ? StyledPencilSelected : Pencil
  );
};

function getTrashTag(tipoSelezione) {
  // console.log(tipoSelezione);
  return (tipoSelezione === 0 || tipoSelezione === 1) ? StyledTrashNotSelected : (
    (tipoSelezione === 2) ? StyledTrashSelected : Trash2
  );
};

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

export function nascondiForm(setIsVisible, setArrowUp) {
  setIsVisible(prev => !prev);
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, 450); 
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

export function OperazioniItemEsistente ({ selectOperation, item }) {
  let TrashTag = getTrashTag(item.tipo_selezione);
  let PencilTag = getPencilTag(item.tipo_selezione);

  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <PencilTag size={grandezzaIcona} onClick={() => selectOperation("pencil", item)} style={{ marginRight: "50%" }} />
      <TrashTag  size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />
    </StyledListGroupItem>
  )
}

export function OperazioniFileItems({ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  return (
    <StyledListGroupItem style={{ border: "5px solid #000000", backgroundColor: "#000000", paddingTop: "3%" }}>
      <div>
        <StyledFileIconNotSelected icon={faFilePdf} size="2xl" style={{ marginRight: "50%" }} />
        <StyledFileIconNotSelected icon={faFileExcel} size="2xl" />
      </div>
      <br />
      <div>
        <StyledDownloadNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={ottieniLavoriRangePDF} />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniLavoriRangeExcel} />
      </div>
      <br />
      <div>
        <StyledTrashNotSelected2 size={grandezzaIcona} onClick={eliminaLavoriRange} />
      </div>
      <br />
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
      <StyledPencilNotSelected2 size={grandezzaIcona} onClick={eseguiModificaProfilo} />
    </StyledListGroupItem>
  );
};

export function CardNuovoItem({campi, indici, eseguiSalvataggio}) {
  let maxHeight = "2000px";
  
  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
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
        </SlideContainer>
        <OperazioniNuovoItem 
          eseguiSalvataggio={eseguiSalvataggio} 
        />
      </StyledCard>
    </center>
  );
}

export function CardRicercaItems({campi, indici, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            // onClick={handleGiornoClick(setUltimoGiornoType)}
            // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
            // onChange={(e) => handleInputChange(e, setItem)}
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            return ( 
              <NomeTag 
                key={i}
                rows={1}
                name={campi.name[i]}
                type={campi.type[i]}
                value={campi.value[i]}
                placeholder={campi.placeholder[i]}
                onChange={campi.onChange}
                onClick={campi.onClick}
                onBlur={campi.onBlur}
              />
            );
          })}
        </SlideContainer>
        <OperazioniCercaItems
          setIsVisible={setIsVisible}
          arrowUp={arrowUp}
          setArrowUp={setArrowUp}
          eseguiRicerca={eseguiRicerca}
        />
      </StyledCard>
    </center>
  );
}

/*
<ItemEsistenteTag 
  campi={campi(servizi, item, (e) => handleInputChange(e, null, items, setItems, tipoItem, item.id), null, null)}  
/>
*/
export function CardItemEsistente({item, campi, indici, selectOperation}) {
  let maxHeight = "2000px";
  return (
    <>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            // onClick={handleGiornoClick(setUltimoGiornoType)}
            // onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
            // onChange={(e) => handleInputChange(e, setItem)}
            const NomeTag = (campi.type[i]) ? getInputTag(campi.tipoSelezione, campi.valoreModificabile[i]) : (
              getTextAreaTag(campi.tipoSelezione, campi.valoreModificabile[i])
            );
            return ( 
              <React.Fragment key={i}>
                <NomeTag 
                  rows={1}
                  name={campi.name[i]}
                  type={campi.type[i]}
                  value={campi.value[i]}
                  placeholder={campi.placeholder[i]}
                  onChange={campi.onChange}
                  onClick={campi.onClick}
                  onBlur={campi.onBlur}
                />
                {campi.options[i]}
              </React.Fragment>
            );
          })}
        </SlideContainer>
        <OperazioniItemEsistente 
          selectOperation={selectOperation} 
          item={item} 
        />
      </StyledCard>
    </>
  )
}

export function CardLogin({campi, indici, eseguiLogin}) {
  let maxHeight = "2000px";
  const [inputType, setInputType] = useState('password');

  const onChangeVisibilityPassword = (e) => {
    e.preventDefault();
    setInputType(inputType === 'text' ? 'password' : 'text');
  };
  
  return (
    <center>
      <StyledCard>
        <StyledCardHeader>{campi["header"]}</StyledCardHeader>
        <SlideContainer style={{maxHeight: `${maxHeight}`}}>
          {indici.map((i) => {
            const NomeTag = (campi.type[i]) ? getInputTag(1, true) : (
              getTextAreaTag(1, true)
            );
            const StyledEyeTag = (inputType === "password") ? StyledEyeClosedNotSelected : StyledEyeOpenNotSelected;
            return ( 
              <React.Fragment key={i}>
                <StyledRow>
                  <NomeTag 
                    style={(campi.name[i] === "password") ? {maxWidth:"80%"} : null}
                    rows={1}
                    name={campi.name[i]}
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
                        maxWidth: "20%",
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
        </SlideContainer>
        <OperazioniLogin
          eseguiLogin={eseguiLogin} 
        />
      </StyledCard>
    </center>
  );
}

export function CardProfilo({campi, indici, eseguiModificaProfilo}) {
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
    <StyledCard>
      <StyledCardHeader>{campi["header"]}</StyledCardHeader>  
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
          return ( 
            <React.Fragment key={i}>
              <StyledRow>
                <NomeTag 
                  style={(campi.name[i].includes("password")) ? {maxWidth:"80%"} : null}
                  rows={1}
                  name={campi.name[i]}
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
                      maxWidth: "20%",
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
      </SlideContainer>
      <OperazioniModificaProfilo 
        eseguiModificaProfilo={eseguiModificaProfilo}
      />
    </StyledCard>
  );
}










