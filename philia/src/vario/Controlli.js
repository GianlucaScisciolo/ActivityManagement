const isEmpty = (value) => {
  return ((value === null) || (value === ""));
}

const isInRange = (num, min, max) => {
  return (num >= min && num <= max);
}

const matchRegex = (value, regexStr) => {
  const regex = new RegExp(regexStr);
  return regex.test(value);
};

const setErrore = (settersErrori, nomeErrore, messaggioErrore) => {
  settersErrori(prevErrori => ({
    ...prevErrori, 
    [nomeErrore]: messaggioErrore
    }));
}

export const controlloNuovoCliente = (data, settersErrori) => {
  /*
  Controlli clienti:
  empty:
    nome != empty FATTO
    cognome != empty FATTO
    contatto != enpty FATTO
  length:
    1 <= nome.length <= 30 FATTO
    1 <= cognome.length <= 30 FATTO
    1 <= contatto.length <= 11 FATTO
    0 <= note <= 65535 FATTO
  */
  
  let numErrori = 0;

  // controllo sul nome
  let messagioErrore = "";
  if (isEmpty(data.nome)) {
    numErrori += 1; 
    messagioErrore = "Inserire il nome";
  }
  else if(!isInRange(data.nome.length, 1, 30)) {
    numErrori += 1; 
    messagioErrore = "Lunghezza nome non valido, deve avere un numero di caratteri tra 1 e 30 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreNome", messagioErrore);

  // controllo sul cognome
  messagioErrore = "";
  if (isEmpty(data.cognome)) {
    numErrori += 1; 
    messagioErrore = "Inserire il cognome";
  }
  else if(!isInRange(data.nome.length, 1, 30)) {
    numErrori += 1; 
    messagioErrore = "Lunghezza cognome non valido, deve avere un numero di caratteri tra 1 e 30 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreCognome", messagioErrore);

  // controllo sul contatto
  messagioErrore = "";
  if (isEmpty(data.contatto)) {
    numErrori += 1; 
    messagioErrore = "Inserire il contatto";
  }
  else if(!matchRegex(data.contatto, "^3[0-9]{9}") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
    numErrori += 1;
    messagioErrore = "Contatto non valido. Inserire un numero di cellulare o un numero di telefono valido:\n";
    messagioErrore += "- numero di cellulare valido: 3XXXXXXXXX\n";
    messagioErrore += "- numero di telefono valido: 0XXXXXXXXX oppure 0XXXXXXXXXX\n";
    messagioErrore += "X è un numero tra 0 e 9 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreContatto", messagioErrore);
  
  // controllo sulle note
  messagioErrore = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1;
    messagioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreNote", messagioErrore);
  
  return numErrori;
}  

export const controlloNuovoProfessionista = (data, settersErrori) => {
  /*
  controllo professionisti:
  empty:
    nome != empty FATTO
    professione != empty FATTO
    contatto != empty or email != empty FATTO
  length:
    1 <= nome.length <= 60 FATTO
    1 <= professione.length <= 30 FATTO
    0 <= contatto.length <= 11 FATTO
    0 <= email <= 254 FATTO
    0 <= note <= 65535 FATTO
  */

  let numErrori = 0;

  // controllo sul nome
  let messagioErrore = "";
  if (isEmpty(data.nome)) {
    numErrori += 1; 
    messagioErrore = "Inserire il nome.";
  }
  else if(!isInRange(data.nome.length, 1, 60)) {
    numErrori += 1; 
    messagioErrore = "Lunghezza nome non valido, deve avere un numero di caratteri tra 1 e 60 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreNome", messagioErrore);

  // controllo sulla professione
  messagioErrore = "";
  if (isEmpty(data.professione)) {
    numErrori += 1; 
    messagioErrore = "Inserire la professione.";
  }
  else if(!isInRange(data.professione.length, 1, 30)) {
    numErrori += 1; 
    messagioErrore = "Lunghezza professione non valida, deve avere un numero di caratteri tra 1 e 30 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreProfessione", messagioErrore);

  // controllo sul contatto e sull'email
  messagioErrore = "";
  if (isEmpty(data.contatto) && isEmpty(data.email)) {
    numErrori += 1; 
    messagioErrore = "Inserire il contatto e/o l\'email.";
  }
  setErrore(settersErrori, "erroreContattoEEmail", messagioErrore);

  // controllo sul contatto
  messagioErrore = "";
  if(!isEmpty(data.contatto) && !matchRegex(data.contatto, "^3[0-9]{9}") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
    numErrori += 1;
    messagioErrore = "Contatto non valido. Inserire un numero di cellulare o un numero di telefono valido:\n";
    messagioErrore += "- numero di cellulare valido: 3XXXXXXXXX\n";
    messagioErrore += "- numero di telefono valido: 0XXXXXXXXX oppure 0XXXXXXXXXX\n";
    messagioErrore += "X è un numero tra 0 e 9 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreContatto", messagioErrore);

  // controllo sull'email
  messagioErrore = "";
  if(!isEmpty(data.email) && !matchRegex(data.email, "^([a-z\\d\\._-]+)@([a-z\\d-]+)\\.([a-z]{2,8})(\\.[a-z]{2,8})?$")) {
    numErrori += 1;
    messagioErrore = "Email non valida.";
  }
  setErrore(settersErrori, "erroreEmail", messagioErrore);

  // controllo sulle note
  messagioErrore = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1;
    messagioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreNote", messagioErrore);

  return numErrori;
}

export const controlloNuovoLavoro = (data, settersErrori) => {  
  /*
  lavoro:
    empty:
      solo id_cliente oppure solo id_professionista != empty FATTO
      descrizione != empty FATTO
      giorno != empty FATTO
      orario_inizio != empty FATTO
      orario_fine != empty FATTO
    length:
      1 <= descrizione <= 100 FATTO
      0 <= note <= 65535 FATTO
    validità:
      orario_fine > orario_inizio FATTO
  */

  let numErrori = 0;

  // controllo sull'id_cliente e sull'id_professionista
  let messagioErrore = "";
  if (   (isEmpty(data.id_cliente) && !isEmpty(data.id_professionista)) 
      || (!isEmpty(data.id_cliente) && isEmpty(data.id_professionista))) {
    numErrori += 1; 
    messagioErrore = "Selezionare un cliente oppure un profesionista (non entrambi).";
  }
  setErrore(settersErrori, "erroreClienteEProfessionista", messagioErrore);

  // controllo sulla descrizione
  messagioErrore = "";
  if (isEmpty(data.descrizione)) {
    numErrori += 1; 
    messagioErrore = "Inserire la descrizione.";
  }
  else if(!isInRange(data.descrizione.length, 1, 100)) {
    numErrori += 1; 
    messagioErrore = "Lunghezza descrizione non valida, deve avere un numero di caratteri tra 1 e 100 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreDescrizione", messagioErrore);

  // controllo sul giorno
  messagioErrore = "";
  if (isEmpty(data.giorno)) {
    numErrori += 1; 
    messagioErrore = "Inserire il giorno.";
  }
  setErrore(settersErrori, "erroreGiorno", messagioErrore);

  // controllo sull'orario iniziale
  messagioErrore = "";
  if (isEmpty(data.orario_inizio)) {
    numErrori += 1; 
    messagioErrore = "Inserire l\'orario iniziale.";
  }
  setErrore(settersErrori, "erroreOrarioInizio", messagioErrore);

  // controllo sull'orario finale
  messagioErrore = "";
  if (isEmpty(data.orario_fine)) {
    numErrori += 1; 
    messagioErrore = "Inserire l\'orario finale.";
  }
  setErrore(settersErrori, "erroreOrarioFine", messagioErrore);

  // controllo sull'orario iniziale e sull'orario finale
  messagioErrore = "";
  if(!isEmpty(data.orario_inizio) && !isEmpty(data.orario_fine) && data.orario_inizio >= data.orario_fine) {
    numErrori += 1; 
    messagioErrore = "L\'orario iniziale deve avvenire prima dell\'orario finale e non possono essere uguali.";
  }
  setErrore(settersErrori, "erroreOrari", messagioErrore);

  // controllo sulle note
  messagioErrore = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1;
    messagioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "erroreNote", messagioErrore);

  return numErrori;
}









