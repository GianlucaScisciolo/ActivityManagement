export function getPencilTag(tipoSelezione, StyledComponents) {
  return (tipoSelezione === 0 || tipoSelezione === 2) ? StyledComponents.StyledPencilNotSelected : (
    (tipoSelezione === 1) ? StyledComponents.StyledPencilSelected : Pencil
  );
};

export function getTrashTag(tipoSelezione, StyledComponents) {
  // console.log(tipoSelezione);
  return (tipoSelezione === 0 || tipoSelezione === 1) ? StyledComponents.StyledTrashNotSelected : (
    (tipoSelezione === 2) ? StyledComponents.StyledTrashSelected : Trash2
  );
};

export function getSelectTag(tipoSelezione, StyledComponents) {
  return (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledComponents.StyledSelectBlock : (
    (tipoSelezione === 1) ? StyledComponents.StyledSelectModifica : StyledComponents.StyledSelectElimina
  );
}; 

export function getInputTag(tipoSelezione, isModificabile, StyledComponents) {
  return (isModificabile) ? (
    (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledComponents.StyledInputBlock : (
      (tipoSelezione === 1) ? StyledComponents.StyledInputModifica : StyledComponents.StyledInputElimina
    )
  ) : (
    (tipoSelezione !== 2) ? StyledComponents.StyledInputBlock : StyledComponents.StyledInputElimina
  );
};

export function getTextAreaTag(tipoSelezione, isModificabile, StyledComponents) {
  return (isModificabile) ? (
    (tipoSelezione !== 1 && tipoSelezione !== 2) ? StyledComponents.StyledTextAreaBlock : (
      (tipoSelezione === 1) ? StyledComponents.StyledTextAreaModifica : StyledComponents.StyledTextAreaElimina
    )
  ) : (
    (tipoSelezione !== 2) ? StyledComponents.StyledTextAreaBlock : StyledComponents.StyledTextAreaElimina
  );
};