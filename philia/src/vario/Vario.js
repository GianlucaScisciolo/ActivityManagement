const matchRegex = (value, regexStr) => {
  const regex = new RegExp(regexStr);
  return regex.test(value);
};

export const handleInputChange = (e, setItem) => {
  e.preventDefault();
  const { name, value, id } = e.target;
  console.log(id);

  let modificabile = true;

  if([
    "nuovo_nome_cliente", "nuovo_cognome_cliente" 
  ].includes(id)) {
    if(value.length > 30) {
      modificabile = false;
    }
  }
  else if([
    "nuove_note_cliente", "nuove_note_servizio", "nuove_note_lavoro", "nuove_note_spesa", "note_profilo" 
  ].includes(id)) {
    if(value.length > 200) {
      modificabile = false;
    }
  }
  else if([
    "nuova_descrizione_spesa" 
  ].includes(id)) {
    if(value.length > 65535) {
      modificabile = false;
    }
  }
  else if([
    "nuovo_nome_servizio" 
  ].includes(id)) {
    if(value.length > 100) {
      modificabile = false;
    }
  }
  else if([
    "nuovo_nome_spesa" 
  ].includes(id)) {
    if(value.length > 50) {
      modificabile = false;
    }
  }
  else if ([
    "nuovo_prezzo_servizio", "nuovo_totale_spesa" 
  ].includes(id)) {
    const isDecimal = !isNaN(value) && Number(value) === parseFloat(value);
    if (!isDecimal || value < 0) {
      modificabile = false;
    }
  }
  else if([
    "nuova_email_cliente" 
  ].includes(id)) {
    if(value.length > 254) {
      modificabile = false;
    }
  }
  else if([
    "nuovo_contatto_cliente" 
  ].includes(id)) {
    if(value === "") {
      modificabile = true;
    }
    else if (!(/^\d+$/.test(value)) || !((value.startsWith("0") && value.length <= 11) || (value.startsWith("3") && value.length <= 10))) {
      modificabile = false;
    }
  }
  else if([
    "nuovo_username_profilo"
  ].includes(id)) {
    if(value.length > 10) {
      modificabile = false;
    }
  }
  else if([
    "password_attuale_profilo", "nuova_password_profilo", "conferma_nuova_password_profilo" 
  ].includes(id)) {
    if(value.length > 128) {
      modificabile = false;
    }
  }
  
  if(modificabile === true) {
    setItem(prevState => ({
      ...prevState, 
      [name]: value
    }));
  }
};

export const handleGiornoBlur = (setGiornoType, item, setItem) => {
  return () => {
    if(!item.giorno)
      setGiornoType('text');
    else
      setGiornoType('date');
  };
};








