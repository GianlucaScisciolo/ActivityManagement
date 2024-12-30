import { useState } from 'react';

export const HookItems = () => {
  const [isPencilSelected, setIsPencilSelected] = useState(false);
  const [isTrashSelected, setIsTrashSelected] = useState(false);
  // const [iconStyle, setIconStyle] = useState({ fill: 'none', stroke: 'white' });
  const [trashStyle, setTrashStyle] = useState('trash-style-not-selected');
  const [pencilStyle, setPencilStyle] = useState('pencil-style-not-selected');
  
  const [textAreaClassBlock, setTextAreaClassBlock] = useState('custom-textarea-block');
  const [textAreaClass, setTextAreaClass] = useState('custom-textarea-block');
  const [inputClassBlock, setInputClassBlock] = useState('custom-input-block');
  const [inputClass, setInputClass] = useState('custom-input-block');

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
        // alert("Presente");
        // Elimino id da selectedIds
        setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== item.id));
        // Decremento selectedTrashCount di 1, se maggiore di 0
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
        setTextAreaClassBlock("custom-textarea-block");
        setTextAreaClass("custom-textarea-block");
        setInputClassBlock("custom-input-block");
        setInputClass("custom-input-block");
        setTrashStyle("trash-style-not-selected");
      }
      else {
        // alert("Non presente");
        // Aggiungo id a selectedIds
        setSelectedIds(prevIds => [...prevIds, item.id]);
        // Incremento selectedTrashCount di 1
        setSelectedTrashCount(prevCount => prevCount + 1);
        setTextAreaClassBlock("custom-textarea-elimina");
        setTextAreaClass("custom-textarea-elimina");
        setInputClassBlock("custom-input-elimina");
        setInputClass("custom-input-elimina");
        setTrashStyle("trash-style-selected");
        setPencilStyle("pencil-style-not-selected");
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }
    else if(icon === "pencil") {
      if(selectedIdsModifica.includes(item.id)) {
        // alert("Presente");
        setSelectedIdsModifica(prevIdsModifica => prevIdsModifica.filter(itemId => itemId !== item.id));
        setSelectedPencilCount(prevCount => Math.max(prevCount - 1, 0));
        setTextAreaClassBlock("custom-textarea-block");
        setTextAreaClass("custom-textarea-block");
        setInputClassBlock("custom-input-block");
        setInputClass("custom-input-block");
        setPencilStyle("pencil-style-not-selected");
      }
      else {
        // alert("Non presente");
        setSelectedIdsModifica(prevIdsModifica => [...prevIdsModifica, item.id]);
        setSelectedPencilCount(prevCount => prevCount + 1);
        setTextAreaClassBlock("custom-textarea-block");
        setTextAreaClass("custom-textarea-modifica");
        setInputClassBlock("custom-input-block");
        setInputClass("custom-input-modifica");
        setPencilStyle("pencil-style-selected");
        setTrashStyle("trash-style-not-selected");
        setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== item.id));
        setSelectedTrashCount(prevCount => Math.max(prevCount - 1, 0));
      }
    }

  }

  return {
    trashStyle,
    setTrashStyle,
    pencilStyle,
    setPencilStyle,
    isPencilSelected,
    isTrashSelected,
    textAreaClassBlock,
    textAreaClass,
    inputClassBlock,
    inputClass,
    setTextAreaClassBlock,
    setTextAreaClass,
    setInputClassBlock,
    setInputClass,
    handlePencilClickWrapperClienti, 
    handlePencilClickWrapperProfessionisti, 
    handlePencilClickWrapperLavori, 
    handleTrashClickWrapper,
    onChangeValue,
    selectOperation,
  };
};









