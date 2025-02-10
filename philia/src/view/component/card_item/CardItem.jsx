import React, { useState, useEffect } from 'react';
import { 
  StyledPencilNotSelected, StyledPencilSelected, grandezzaIcona, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledListGroupItem, StyledRow, StyledCol, StyledSaveNotSelected, 
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

function getPencilTag(tipoSelezione) {
  return (tipoSelezione === 0 || tipoSelezione === 2) ? StyledPencilNotSelected : (
    (tipoSelezione === 1) ? StyledPencilSelected : Pencil
  );
  // console.log(tipoSelezione);
};

function getTrashTag(tipoSelezione) {
  // console.log(tipoSelezione);
  return (tipoSelezione === 0 || tipoSelezione === 1) ? StyledTrashNotSelected : (
    (tipoSelezione === 2) ? StyledTrashSelected : Trash2
  );
};

export function getSelectTag(tipoSelezione) {
  return (item.tipo_selezione !== 1 && item.tipo_selezione !== 2) ? StyledSelectBlock : (
    (item.tipo_selezione === 1) ? StyledSelectModifica : StyledSelectElimina
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

  // let TrashTag = Trash2;
  // let PencilTag = Pencil;
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
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
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
                value={campi.value[i]}
                placeholder={campi.placeholder[i]}
                onChange={campi.onChange}
                onClick={campi.onClick}
                onBlur={campi.onBlur}
              />
              {(campi.errore[i] !== "") && (<StyledSpanErrore>{campi.errore[i]}</StyledSpanErrore>)}
            </React.Fragment>
          );
        })}
      </SlideContainer>
      <OperazioniNuovoItem 
        eseguiSalvataggio={eseguiSalvataggio} 
      />
    </StyledCard>
  );
}

export function CardRicercaItems({campi, indici, eseguiRicerca}) {
  const [isVisible, setIsVisible] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);
  let maxHeight = (isVisible) ? "2000px" : "0px";
  let InputTag = getInputTag(1, true);
  let TextAreaTag = getTextAreaTag(1, true);

  return (
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
  );
}

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
        <OperazioniItemEsistente 
          selectOperation={selectOperation} 
          item={item} 
        />
      </StyledCard>
    </>
  )
}









