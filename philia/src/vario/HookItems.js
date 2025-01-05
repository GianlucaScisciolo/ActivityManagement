import { useState } from 'react';

export const HookItems = () => {
  const [isPencilSelected, setIsPencilSelected] = useState(false);
  const [isTrashSelected, setIsTrashSelected] = useState(false);

  const handlePencilClick = () => {
    setTrashStyle('trash-style-not-selected');
    setTextAreaClassBlock('custom-textarea-block');
    if (pencilStyle === 'pencil-style-not-selected') {
      setPencilStyle('pencil-style-selected');
      setTextAreaClass('custom-textarea-modifica');
      setInputClass('custom-input-modifica');
    }
    else {
      setPencilStyle('pencil-style-not-selected');
      setTextAreaClass('custom-textarea-block');
      setInputClass('custom-input-block');
    }
  };

  const handleTrashClick = () => {
    setPencilStyle('pencil-style-not-selected');
    if (trashStyle === 'trash-style-not-selected') {
      setTrashStyle('trash-style-selected');
      setTextAreaClassBlock('custom-textarea-elimina');
      setTextAreaClass('custom-textarea-elimina');
      setInputClass('custom-input-elimina');
    }
    else {
      setTrashStyle('trash-style-not-selected');
      setTextAreaClassBlock('custom-textarea-block');
      setTextAreaClass('custom-textarea-block');
      setInputClass('custom-input-block');
    }
  };

  const handlePencilClickWrapper = (updateTrashCount, updatePencilCount) => {
    const isActive = (pencilStyle === 'pencil-style-not-selected');
    if (!isActive && isTrashSelected) {
      updateTrashCount(-1);
      setIsTrashSelected(false);
    }
    handlePencilClick();
    updatePencilCount(isActive ? 1 : -1);
    setIsPencilSelected(isActive);
    
    // if (isActive) {
    //   onPencilClick(id, contattoValue, noteValue);
    // }
  };

  const handlePencilClickWrapperClienti = (updateTrashCount, updatePencilCount, onPencilClick, 
                                           id, contattoValue, noteValue) => {
    
    handlePencilClickWrapper(updateTrashCount, updatePencilCount);
    (pencilStyle.fill === 'none')
      onPencilClick(id, contattoValue, noteValue);
    
  };

  const handlePencilClickWrapperProfessionisti = (updateTrashCount, updatePencilCount, onPencilClick, 
                                                  id, contattoValue, emailValue, noteValue) => {
    
    handlePencilClickWrapper(updateTrashCount, updatePencilCount);
    (pencilStyle.fill === 'none')
      onPencilClick(id, contattoValue, emailValue, noteValue);
  };

  const handlePencilClickWrapperLavori = (updateTrashCount, updatePencilCount, onPencilClick, id, descrizioneValue, 
                                          giornoValue, orarioInizioValue, orarioFineValue, noteValue) => {
    
    handlePencilClickWrapper(updateTrashCount, updatePencilCount);
    (pencilStyle.fill === 'none')
      onPencilClick(id, descrizioneValue, giornoValue, orarioInizioValue, orarioFineValue, noteValue);

  };  

  const handleTrashClickWrapper = (updateTrashCount, updatePencilCount, id, onTrashClick) => {
    const isActive = (trashStyle === 'trash-style-not-selected');
    if (!isActive && isPencilSelected) {
      updatePencilCount(-1);
      setIsPencilSelected(false);
    }
    handleTrashClick();
    updateTrashCount(isActive ? 1 : -1);
    setIsTrashSelected(isActive);
  
    if (isActive) {
      onTrashClick(id);
    }
  };

  const updateItem = (setterItems, newItem) => {
    setterItems(prevItems => prevItems.map(
      item => (item.id === newItem.id ? newItem : item)
    ));
  }
  
  const onChangeValue = (e, nomeClasse, setter, item, setterItems, nameValue) => {
    if (nomeClasse.includes('modifica')) {
      setter(e.target.value);
    }
  
    const newItem = { ...item }; // creiamo una copia di item
  
    switch (nameValue) {
      case 'nome':
        newItem.nome = e.target.value;
        break;
      case 'cognome':
        newItem.cognome = e.target.value;
        break;
      case 'contatto':
        newItem.contatto = e.target.value;
        break;
      case 'note':
        newItem.note = e.target.value;
        break;
      case 'professione':
        newItem.professione = e.target.value;
        break;
      case 'email':
        newItem.email = e.target.value;
        break;
      case 'nomeCliente':
        newItem.nomeCliente = e.target.value;
        break;
      case 'cognomeCliente':
        newItem.cognomeCliente = e.target.value;
        break;
      case 'nomeProfessionista':
        newItem.nomeProfessionista = e.target.value;
        break;
      case 'descrizione':
        newItem.descrizione = e.target.value;
        break;
      case 'giorno':
        newItem.giorno = e.target.value;
        break;
      case 'orarioInizio':
        newItem.orarioInizio = e.target.value;
        break;
      case 'orarioFine':
        newItem.orarioFine = e.target.value;
        break;
      default:
        break;
    }
  
    updateItem(setterItems, newItem);
  }
  
  

  const selectOperation = (icon, item, setterItems, setSelectedTrashCount, setSelectedPencilCount, selectedIds, setSelectedIds, 
                           selectedIdsModifica, setSelectedIdsModifica) => {
    
    if(icon === "trash") {
      if(selectedIds.includes(item.id)) {
        item.tipo_selezione = 0;
        setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        item.tipo_selezione = 2;
        setSelectedIds(prevIds => [...prevIds, item.id]);
        setSelectedTrashCount(prevCount => prevCount + 1);
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        item.tipo_selezione = 0;
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
      else {
        item.tipo_selezione = 1;
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }

  }

  return {
    isPencilSelected,
    isTrashSelected,
    handlePencilClickWrapperClienti, 
    handlePencilClickWrapperProfessionisti, 
    handlePencilClickWrapperLavori, 
    handleTrashClickWrapper,
    onChangeValue,
    selectOperation,
  };
};









