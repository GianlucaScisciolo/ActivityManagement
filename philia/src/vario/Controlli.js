import { passwordIsCorrect, PEPPER_HEX } from "./Sicurezza";

function getInt(numStr) {
  if(numStr === "00" || numStr === "07" || numStr === "08" || numStr === "09") {
    return parseInt(numStr.substring(1));
  }
  return parseInt(numStr);
}

const isEmpty = (value) => {
  // return ((value === null) || (value === "") || (value !== null && value.split(' ').join('') === ""));
  return value == null || value.trim() === "";
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

export const controlloCliente = (data, settersErrori) => {
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
  let messaggioErrore = "";
  if (isEmpty(data.nome)) {
    numErrori += 1; 
    messaggioErrore = "Inserire il nome";
  }
  else if(!isInRange(data.nome.length, 1, 30)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza nome non valido, deve avere un numero di caratteri tra 1 e 30 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_nome", messaggioErrore);

  // controllo sul cognome
  messaggioErrore = "";
  if (isEmpty(data.cognome)) {
    numErrori += 1; 
    messaggioErrore = "Inserire il cognome";
  }
  else if(!isInRange(data.nome.length, 1, 30)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza cognome non valido, deve avere un numero di caratteri tra 1 e 30 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_cognome", messaggioErrore);

  // controllo sul contatto
  messaggioErrore = "";
  if (isEmpty(data.contatto)) {
    numErrori += 1; 
    messaggioErrore = "Inserire il contatto";
  }
  else if(!matchRegex(data.contatto, "^3[0-9]{9}$") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
    numErrori += 1;
    messaggioErrore = "Contatto non valido. Inserire un numero di cellulare o un numero di telefono valido:\n";
    messaggioErrore += "- numero di cellulare valido: 3XXXXXXXXX\n";
    messaggioErrore += "- numero di telefono valido: 0XXXXXXXXX oppure 0XXXXXXXXXX\n";
    messaggioErrore += "X è un numero tra 0 e 9 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_contatto", messaggioErrore);
  
  // controllo sulle note
  messaggioErrore = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1;
    messaggioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messaggioErrore);
  // alert(numErrori);
  return numErrori;
}  

export const controlloProfessionista = (data, settersErrori) => {
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
  let messaggioErrore = "";
  if (isEmpty(data.nome)) {
    numErrori += 1; 
    messaggioErrore = "Inserire il nome.";
  }
  else if(!isInRange(data.nome.length, 1, 60)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza nome non valido, deve avere un numero di caratteri tra 1 e 60 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_nome", messaggioErrore);

  // controllo sulla professione
  messaggioErrore = "";
  if (isEmpty(data.professione)) {
    numErrori += 1; 
    messaggioErrore = "Inserire la professione.";
  }
  else if(!isInRange(data.professione.length, 1, 30)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza professione non valida, deve avere un numero di caratteri tra 1 e 30 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_professione", messaggioErrore);

  // controllo sul contatto e sull'email
  let erroreContattoEEmail = false;
  messaggioErrore = "";
  if (isEmpty(data.contatto) && isEmpty(data.email)) {
    numErrori += 1; 
    messaggioErrore = "Inserire il contatto e/o l\'email.";
    erroreContattoEEmail = true;
  }
  setErrore(settersErrori, "errore_contatto", messaggioErrore);
  setErrore(settersErrori, "errore_email", messaggioErrore);

  // controllo sul contatto
  messaggioErrore = "";
  if(!erroreContattoEEmail && !isEmpty(data.contatto) && !matchRegex(data.contatto, "^3[0-9]{9}$") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
    numErrori += 1;
    messaggioErrore = "Contatto non valido. Inserire un numero di cellulare o un numero di telefono valido:\n";
    messaggioErrore += "- numero di cellulare valido: 3XXXXXXXXX\n";
    messaggioErrore += "- numero di telefono valido: 0XXXXXXXXX oppure 0XXXXXXXXXX\n";
    messaggioErrore += "X è un numero tra 0 e 9 estremi inclusi.";
  }
  if(!erroreContattoEEmail) {
    setErrore(settersErrori, "errore_contatto", messaggioErrore);
  }

  // controllo sull'email
  messaggioErrore = "";
  if(!erroreContattoEEmail && !isEmpty(data.email) && !matchRegex(data.email, "^([a-z\\d\\._-]+)@([a-z\\d-]+)\\.([a-z]{2,8})(\\.[a-z]{2,8})?$")) {
    numErrori += 1;
    messaggioErrore = "Email non valida.";
  }
  if(!erroreContattoEEmail) {
    setErrore(settersErrori, "errore_email", messaggioErrore);
  }

  // controllo sulle note
  messaggioErrore = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1;
    messaggioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messaggioErrore);

  return numErrori;
}

export const controlloLavoroOld = (data, settersErrori) => {  
  // alert("Prova");
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
  let messaggioErrore1 = "";
  let messaggioErrore2 = "";
  // alert(data.id_cliente.toString());
  // alert(data.id_professionista.toString());
  if(data.id_cliente <= 0 && data.id_professionista <= 0) {
    numErrori += 1; 
    messaggioErrore1 = "Selezionare un cliente oppure un professionista (non entrambi).";
  }
  setErrore(settersErrori, "cliente_e_professionista", messaggioErrore1);


  // controllo sulla descrizione
  messaggioErrore1 = "";
  if (isEmpty(data.descrizione)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire la descrizione.";
  }
  else if(!isInRange(data.descrizione.length, 1, 100)) {
    numErrori += 1; 
    messaggioErrore1 = "Lunghezza descrizione non valida, deve avere un numero di caratteri tra 1 e 100 estremi inclusi.";
  }
  setErrore(settersErrori, "descrizione", messaggioErrore1);

  // controllo sul giorno
  messaggioErrore1 = "";
  if (isEmpty(data.giorno)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire il giorno.";
  }
  setErrore(settersErrori, "giorno", messaggioErrore1);

  // controllo sull'orario iniziale
  messaggioErrore1 = "";
  if (isEmpty(data.orario_inizio)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire l\'orario iniziale.";
  }
  setErrore(settersErrori, "orario_inizio", messaggioErrore1);

  // controllo sull'orario finale
  messaggioErrore1 = "";
  if (isEmpty(data.orario_fine)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire l\'orario finale.";
  }
  setErrore(settersErrori, "orario_fine", messaggioErrore1);

  // controllo sull'orario iniziale e sull'orario finale
  if(!isEmpty(data.orario_inizio) && !isEmpty(data.orario_fine) && data.orario_inizio >= data.orario_fine) {
    numErrori += 1; 
    messaggioErrore1 = "L\'orario iniziale deve avvenire prima dell\'orario finale e non possono essere uguali.";
    messaggioErrore2 = "L\'orario finale deve avvenire dopo l\'orario iniziale e non possono essere uguali.";
    setErrore(settersErrori, "orario_inizio", messaggioErrore1);
    setErrore(settersErrori, "orario_fine", messaggioErrore2);
  }
  
  // controllo sulle note
  messaggioErrore1 = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1; 
    messaggioErrore1 = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "note", messaggioErrore1);

  // alert(numErrori);
  return numErrori;
}

export const controlloLavoro = (data, settersErrori) => {  
  // alert("Prova");
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

  let messaggioErrore1 = "";
  let messaggioErrore2 = "";
  
  // controllo sul cliente e sul professionista
  messaggioErrore1 = "";
  // alert(getInt(data.id_cliente) + " - " + getInt(data.id_professionista));
  if(getInt(data.id_cliente) === 0 && getInt(data.id_professionista) === 0) {
    numErrori += 1; 
    messaggioErrore1 = "Selezionare il cliente oppure il professionista (non entrambi).";
  }
  setErrore(settersErrori, "errore_cliente_e_professionista", messaggioErrore1);

  // controllo sul giorno
  messaggioErrore1 = "";
  if (isEmpty(data.giorno)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire il giorno.";
  }
  setErrore(settersErrori, "errore_giorno", messaggioErrore1);

  // controllo sull'orario iniziale
  messaggioErrore1 = "";
  if (isEmpty(data.ora_inizio) || isEmpty(data.minuto_inizio)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire l\'orario iniziale.";
  }
  setErrore(settersErrori, "errore_orario_inizio", messaggioErrore1);

  // controllo sull'orario finale
  messaggioErrore1 = "";
  if (isEmpty(data.ora_fine) || isEmpty(data.minuto_fine)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire l\'orario finale.";
  }
  setErrore(settersErrori, "errore_orario_fine", messaggioErrore1);

  // controllo sull'orario iniziale e sull'orario finale
  messaggioErrore1 = "";
  messaggioErrore2 = "";
  if( !(isEmpty(data.ora_inizio) || isEmpty(data.minuto_inizio)) && 
      !(isEmpty(data.ora_fine) || isEmpty(data.minuto_fine)) && 
      (getInt(data.ora_fine) <= getInt(data.ora_inizio)) ) {
    
    if((getInt(data.ora_fine) < getInt(data.ora_inizio)) || 
        (getInt(data.ora_fine) === getInt(data.ora_inizio) && getInt(data.minuto_fine) <= getInt(data.minuto_inizio))) {
      numErrori += 1; 
      messaggioErrore1 = "L\'orario iniziale deve avvenire prima dell\'orario finale e non possono essere uguali.";
      messaggioErrore2 = "L\'orario finale deve avvenire dopo l\'orario iniziale e non possono essere uguali.";
    }    
    setErrore(settersErrori, "errore_orario_inizio", messaggioErrore1);
    setErrore(settersErrori, "errore_orario_fine", messaggioErrore2);
  }

  // controllo sulla descrizione
  messaggioErrore1 = "";
  if (isEmpty(data.descrizione)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire la descrizione.";
  }
  else if(!isInRange(data.descrizione.length, 1, 100)) {
    numErrori += 1; 
    messaggioErrore1 = "Lunghezza descrizione non valida, deve avere un numero di caratteri tra 1 e 100 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_descrizione", messaggioErrore1);
  
  // controllo sulle note
  messaggioErrore1 = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1; 
    messaggioErrore1 = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messaggioErrore1);

  // alert(numErrori);
  return numErrori;
}

export const controlloLogin = (dati, settersErrori) => {
  const regexPassword = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,128}$";

  let numErrori = 0;
  let messaggioErrore = "";

  // controllo sullo username inserito
  messaggioErrore = "";
  if (isEmpty(dati.username)) {
    numErrori += 1; 
    messaggioErrore = "Inserire lo username.";
  }
  else if(!isInRange(dati.username.length, 1, 10)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza username non valida, deve avere un numero di caratteri alfanumerici tra 1 e 10 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_username", messaggioErrore);
  
  // constrollo sulla password inserita
  messaggioErrore = "";
  if(isEmpty(dati.password)) {
    numErrori += 1;
    messaggioErrore = "Inserire la password.";
  }
  else if(!matchRegex(dati.password, regexPassword)) {
    numErrori += 1;
    messaggioErrore =  "Password non valida. deve avere:<br>";
    messaggioErrore += "- minimo 8 e massimo 128 caratteri alfanumerici.<br>";
    messaggioErrore += "- almeno 1 numero.<br>";
    messaggioErrore += "- almeno 1 lettera maiuscola.<br>";
    messaggioErrore += "- almeno 1 lettera minuscola.<br>";
    messaggioErrore += "- almeno 1 dei seguenti caratteri speciali: !@#$%^&*<br>";
  }
  setErrore(settersErrori, "errore_password", messaggioErrore);

  if(numErrori === 0) {
    // controllo sullo username e sulla password inserita
    messaggioErrore = "";
    if(dati.num_utenti !== 1) {
      numErrori += 1;
      messaggioErrore = "Username e/o password errati.";
    }
    else if(!passwordIsCorrect(dati.password, dati.password_db, dati.salt_hex_db)) {
      numErrori += 1;
      messaggioErrore = "Username e/o password errati.";
    }
    setErrore(settersErrori, "errore_username", messaggioErrore);
    setErrore(settersErrori, "errore_password", messaggioErrore);
  }

  return numErrori;
}

export const controlloProfilo = (dati, settersErrori) => {
  const regexPassword = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,128}$";
  
  let numErrori = 0;
  let messaggioErrore = "";
  
  // controllo sul nuovo username
  messaggioErrore = "";
  if (isEmpty(dati.nuovo_username)) {
    numErrori += 1; 
    messaggioErrore = "Inserire lo username.";
  }
  else if(!isInRange(dati.nuovo_username.length, 1, 10)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza username non valida, deve avere un numero di caratteri tra 1 e 10 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_nuovo_username", messaggioErrore);

  // controllo sulle nuove note
  messaggioErrore = "";
  if(!isInRange(dati.note.length, 0, 65535)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza note non valida, deve avere un numero di caratteri alfanumerici tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messaggioErrore);
  
  // controllo sulla password attuale
  messaggioErrore = "";
  if (isEmpty(dati.password_attuale)) {
    numErrori += 1; 
    messaggioErrore = "Inserire la password attuale.";
  }
  else if(!passwordIsCorrect(dati.password_attuale, dati.password_db, dati.salt_hex_db)) {
    numErrori += 1;
    messaggioErrore = "La password attuale risulta errata.";
  }
  setErrore(settersErrori, "errore_password_attuale", messaggioErrore);

  // controllo le 2 nuove password:
  messaggioErrore = "";
  if(!isEmpty(dati.nuova_password) || !isEmpty(dati.conferma_nuova_password)) {
    if(!(dati.nuova_password === dati.conferma_nuova_password)) {
      numErrori += 1;
      messaggioErrore = "Nuova password e conferma nuova password sono diverse.";
    }
    else {
      if(!matchRegex(dati.nuova_password, regexPassword)) {
        numErrori += 1;
        messaggioErrore =  "Password non valida. deve avere:<br>";
        messaggioErrore += "- minimo 8 e massimo 128 caratteri alfanumerici.<br>";
        messaggioErrore += "- almeno 1 numero.<br>";
        messaggioErrore += "- almeno 1 lettera maiuscola.<br>";
        messaggioErrore += "- almeno 1 lettera minuscola.<br>";
        messaggioErrore += "- almeno 1 dei seguenti caratteri speciali: !@#$%^&*<br>";
      }
    }
  }
  setErrore(settersErrori, "errore_nuova_password", messaggioErrore);
  setErrore(settersErrori, "errore_conferma_nuova_password", messaggioErrore);

  console.log(dati.num_lavori_clienti);
  console.log(dati.num_lavori_professionisti);
  console.log(dati.num_lavori_giorno);

  // controllo il numero lavori dei clienti:
  messaggioErrore = "";
  if (isEmpty(dati.num_lavori_clienti.toString())) {
    numErrori += 1; 
    messaggioErrore = "Inserire il numero di lavori per i clienti.";
  }
  else if(dati.num_lavori_clienti < 0) {
    numErrori += 1; 
    messaggioErrore = "Il numero di lavori per i clienti deve essere maggiore o uguale a 0.";
  }
  setErrore(settersErrori, "errore_num_lavori_clienti", messaggioErrore);

  // controllo il numero di lavori dei professionisti:
  messaggioErrore = "";
  if (isEmpty(dati.num_lavori_professionisti.toString())) {
    numErrori += 1; 
    messaggioErrore = "Inserire il numero di lavori per i professionisti.";
  }
  else if(dati.num_lavori_professionisti < 0) {
    numErrori += 1; 
    messaggioErrore = "Il numero di lavori per i professionisti deve essere maggiore o uguale a 0.";
  }
  setErrore(settersErrori, "errore_num_lavori_professionisti", messaggioErrore);
  
  // controllo il numero massimo di lavori in un giorno:
  messaggioErrore = "";
  if(parseInt(dati.num_lavori_clienti) >= 0 && parseInt(dati.num_lavori_professionisti) >= 0) {
    if (isEmpty(dati.num_lavori_giorno.toString())) {
      numErrori += 1; 
      messaggioErrore = "Inserire il numero massimo di lavori in un giorno.";
    }
    else if(parseInt(dati.num_lavori_giorno) < 0) {
      numErrori += 1; 
      messaggioErrore = "Il numero massimo di lavori in un giorno deve essere maggiore o uguale a 0.";
    }
    else if(parseInt(dati.num_lavori_giorno) < (parseInt(dati.num_lavori_clienti) + parseInt(dati.num_lavori_professionisti))) {
      numErrori += 1;
      messaggioErrore = "Il numero massimo di loavori in un giorno non puo\' essere minore della somma del numero di lavori per i clienti e del numero di lavori per i professionisti.";
    }
  }
  setErrore(settersErrori, "errore_num_lavori_giorno", messaggioErrore);

  return numErrori;
}









