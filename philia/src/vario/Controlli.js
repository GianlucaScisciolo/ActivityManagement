export const isEmpty = (str) => {
  return ((str === null) || (str === ""));
}

export const matchRegex = (str, regexStr) => {
  const regex = new RegExp(regexStr);
  return regex.test(str);
};

export const isInRange = (num, min, max) => {
  return (num >= min && num <= max);
}

export const clienteIsValid = (nome, cognome, contatto, note) => {
  return (!isEmpty(nome) && !isEmpty(cognome) && isInRange(contatto.length, 10, 10));
  // controlli sul nome
  // controlli sul cognome
  // per il momento nessun controllo sulle note
}

export const controlloNuovoCliente = (data, settersErrori) => {
  let numErrori = 0;

  // controllo se il nome non è vuoto
  if(isEmpty(data.nome)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreNome: "Il nome non puo\' essere vuoto."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreNome: ""
    }));
  }

  // controllo se il cognome non è vuoto
  if(isEmpty(data.cognome)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreCognome: "Il cognome non puo\' essere vuoto."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreCognome: ""
    }));
  }

  // controllo se il contatto è valido
  if(isEmpty(data.contatto)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreContatto: "Il contatto non puo\' essere vuoto."
    }));
    numErrori += 1;
  }
  else if(!matchRegex(data.contatto, "^3[0-9]{9}") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreContatto: "Il contatto non e\' valido, deve essere un numero di cellulare o un numero di telefono fisso italiano."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreContatto: ""
    }));
  }

  return numErrori;
}  

export const controlloNuovoProfessionista = (data, settersErrori) => {
  let numErrori = 0;

  // controllo se il nome non è vuoto
  if(isEmpty(data.nome)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreNome: "Il nome non puo\' essere vuoto."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreNome: ""
    }));
  }

  // controllo se la professione non è vuota
  if(isEmpty(data.professione)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreProfessione: "La professione non puo\' essere vuota."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreProfessione: ""
    }));
  }

  // controllo se il contatto e l'email sono vuoti
  if(isEmpty(data.contatto) && isEmpty(data.email)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreContattoEEmail: "Inserire il contatto e/o l'email"
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreContattoEEmail: ""
    }));
  }

  // controllo se il contatto è valido
  if(!isEmpty(data.contatto) && (!matchRegex(data.contatto, "^3[0-9]{9}$") && !matchRegex(data.contatto, "^0\\d{9,10}$"))) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreContatto: "Il contatto inserito non e\' valido. Deve essere un numero di cellulare o un numero di telefono fisso italiano."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreContatto: ""
    }));
  }

  // controllo se l'email è valida
  if(!isEmpty(data.email) && !matchRegex(data.email, "^([a-z\\d\\._-]+)@([a-z\\d-]+)\\.([a-z]{2,8})(\\.[a-z]{2,8})?$")) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreEmail: "L\'email inserita non e\' valida."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreEmail: ""
    }));
  }

  return numErrori;
}

export const controlloNuovoLavoro = (data, settersErrori) => {  
  let numErrori = 0;

  // controllo se solo il cliente o il professionista è stato selezionato
  if(
           !((isEmpty(data.id_cliente) && !isEmpty(data.id_professionista)) 
        || (!isEmpty(data.id_cliente) && isEmpty(data.id_professionista)))) {
    
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreClienteEProfessionista: "Selezionare un cliente oppure un professionista (non entrambi)."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreClienteEProfessionista: ""
    }));
  }

  // controllo se la descrizione non è vuota
  if(isEmpty(data.descrizione)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreDescrizione: "La descrizione non puo\' essere vuota."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreDescrizione: ""
    }));
  }

  // controllo se è stato selezionato il giorno
  if(isEmpty(data.giorno)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreGiorno: "Selezionare il giorno."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreGiorno: ""
    }));
  }

  // controllo se è stato selezionato l'orario iniziale
  if(isEmpty(data.orario_inizio)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreOrarioInizio: "Selezionare l\'orario iniziale."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreOrarioInizio: ""
    }));
  }

  // controllo se è stato selezionato l'orario finale
  if(isEmpty(data.orario_fine)) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreOrarioFine: "Selezionare l\'orario finale."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreOrarioFine: ""
    }));
  }

  // controllo se l'orario iniziale e l'orario finale sono validi
  if(data.orario_fine <= data.orario_inizio) {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreOrari: "L\'orario finale non può venire prima dell'orario iniziale."
    }));
    numErrori += 1;
  }
  else {
    settersErrori(prevErrori => ({
      ...prevErrori, 
      erroreOrari: ""
    }));
  }

  return numErrori;

}









