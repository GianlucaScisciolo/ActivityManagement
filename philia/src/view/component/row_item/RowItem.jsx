import React, { useState, useEffect } from 'react';
import { 
  StyledPencilNotSelected, StyledPencilSelected, grandezzaIcona, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledColOperazioni, StyledSaveNotSelected, 
  StyledSearchNotSelected, StyledArrowLeftNotSelected, StyledArrowRightNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledTrashNotSelected2, 
  StyledLoginNotSelected, 
  StyledPencilNotSelectedModificaProfilo
} from "./StyledRowItem";
import { Trash2, Pencil } from 'lucide-react';

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

const nascondiForm = (visibilita, setVisibilita, setArrowUp) => {
  const steps = visibilita.length;
  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      setVisibilita(prevState => {
        const newState = [...prevState];
        newState[steps - i] = false;
        return newState;
      });
    }, i * 250);
  }
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, steps * 250);
};

const mostraForm = (visibilita, setVisibilita, setArrowUp) => {
  const steps = visibilita.length;
  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      setVisibilita(prevState => {
        const newState = [...prevState];
        newState[i - 1] = true;
        return newState;
      });
    }, i * 250);
  }
  setTimeout(() => {
    setArrowUp(prev => !prev);
  }, steps * 250);
};

function getPencilTag(tipoSelezione) {
  return (tipoSelezione === 0 || tipoSelezione === 2) ? StyledPencilNotSelected : (
    (tipoSelezione === 1) ? StyledPencilSelected : Pencil
  );
}

function getTrashTag(tipoSelezione) {
  return (tipoSelezione === 0 || tipoSelezione === 1) ? StyledTrashNotSelected : (
    (tipoSelezione === 2) ? StyledTrashSelected : Trash2
  );
}

export function OperazioniNuovoItem({eseguiSalvataggio}) {
  return (
    <StyledColOperazioni>
      <StyledSaveNotSelected size={grandezzaIcona} onClick={eseguiSalvataggio} />
    </StyledColOperazioni>
  )
}

export function OperazioniCercaItems({ visibilita, setVisibilita, arrowUp, setArrowUp, eseguiRicerca }) {
  return (
    <StyledColOperazioni>
      <StyledSearchNotSelected size={grandezzaIcona} style={{ marginRight: "50%" }} onClick={eseguiRicerca} />
      {arrowUp && (
        <StyledArrowLeftNotSelected size={grandezzaIcona} onClick={() => nascondiForm(visibilita, setVisibilita, setArrowUp)} />
      )}
      {!arrowUp && (
        <StyledArrowRightNotSelected size={grandezzaIcona} onClick={() => mostraForm(visibilita, setVisibilita, setArrowUp)} />
      )}
    </StyledColOperazioni>
  );
};

export function OperazioniItemEsistente ({ selectOperation, item }) {
  let TrashTag = getTrashTag(item.tipo_selezione);
  let PencilTag = getPencilTag(item.tipo_selezione);
  return (
    <StyledColOperazioni>
      <PencilTag size={grandezzaIcona} onClick={() => selectOperation("pencil", item)} style={{ marginRight: "50%" }} />
      <TrashTag  size={grandezzaIcona} onClick={() => selectOperation("trash", item)} />
    </StyledColOperazioni>
  )
}

export function OperazioniFileItems({ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  return (
    <>
      <StyledColOperazioni>
        <StyledFileIconNotSelected icon={faFilePdf} style={{ marginRight: "50%" }} size="2xl" />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniLavoriRangePDF} />
      </StyledColOperazioni>
      <StyledColOperazioni>
        <StyledFileIconNotSelected icon={faFileExcel} style={{ marginRight: "50%" }} size="2xl" />
        <StyledDownloadNotSelected size={grandezzaIcona} onClick={ottieniLavoriRangeExcel} />
      </StyledColOperazioni>
      <StyledColOperazioni>
        <StyledTrashNotSelected2 size={grandezzaIcona} onClick={eliminaLavoriRange} />
      </StyledColOperazioni>
    </>
  );
};

export function OperazioniLogin({eseguiLogin}) {
  return (
    <StyledColOperazioni>
      <StyledLoginNotSelected size={grandezzaIcona} onClick={eseguiLogin} />
    </StyledColOperazioni>
  );
};

export function OperazioniModificaProfilo({eseguiModificaProfilo}) {
  return (
    <StyledColOperazioni>
      <StyledPencilNotSelectedModificaProfilo size={grandezzaIcona} onClick={eseguiModificaProfilo} />
    </StyledColOperazioni>
  );
};









