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
  let messagioErrore = "";
  if (isEmpty(data.nome)) {
    numErrori += 1; 
    messagioErrore = "Inserire il nome";
  }
  else if(!isInRange(data.nome.length, 1, 30)) {
    numErrori += 1; 
    messagioErrore = "Lunghezza nome non valido, deve avere un numero di caratteri tra 1 e 30 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_nome", messagioErrore);

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
  setErrore(settersErrori, "errore_cognome", messagioErrore);

  // controllo sul contatto
  messagioErrore = "";
  if (isEmpty(data.contatto)) {
    numErrori += 1; 
    messagioErrore = "Inserire il contatto";
  }
  else if(!matchRegex(data.contatto, "^3[0-9]{9}$") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
    numErrori += 1;
    messagioErrore = "Contatto non valido. Inserire un numero di cellulare o un numero di telefono valido:\n";
    messagioErrore += "- numero di cellulare valido: 3XXXXXXXXX\n";
    messagioErrore += "- numero di telefono valido: 0XXXXXXXXX oppure 0XXXXXXXXXX\n";
    messagioErrore += "X è un numero tra 0 e 9 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_contatto", messagioErrore);
  
  // controllo sulle note
  messagioErrore = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1;
    messagioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messagioErrore);
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
  let messagioErrore = "";
  if (isEmpty(data.nome)) {
    numErrori += 1; 
    messagioErrore = "Inserire il nome.";
  }
  else if(!isInRange(data.nome.length, 1, 60)) {
    numErrori += 1; 
    messagioErrore = "Lunghezza nome non valido, deve avere un numero di caratteri tra 1 e 60 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_nome", messagioErrore);

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
  setErrore(settersErrori, "errore_professione", messagioErrore);

  // controllo sul contatto e sull'email
  let erroreContattoEEmail = false;
  messagioErrore = "";
  if (isEmpty(data.contatto) && isEmpty(data.email)) {
    numErrori += 1; 
    messagioErrore = "Inserire il contatto e/o l\'email.";
    erroreContattoEEmail = true;
  }
  setErrore(settersErrori, "errore_contatto", messagioErrore);
  setErrore(settersErrori, "errore_email", messagioErrore);

  // controllo sul contatto
  messagioErrore = "";
  if(!erroreContattoEEmail && !isEmpty(data.contatto) && !matchRegex(data.contatto, "^3[0-9]{9}$") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
    numErrori += 1;
    messagioErrore = "Contatto non valido. Inserire un numero di cellulare o un numero di telefono valido:\n";
    messagioErrore += "- numero di cellulare valido: 3XXXXXXXXX\n";
    messagioErrore += "- numero di telefono valido: 0XXXXXXXXX oppure 0XXXXXXXXXX\n";
    messagioErrore += "X è un numero tra 0 e 9 estremi inclusi.";
  }
  if(!erroreContattoEEmail) {
    setErrore(settersErrori, "errore_contatto", messagioErrore);
  }

  // controllo sull'email
  messagioErrore = "";
  if(!erroreContattoEEmail && !isEmpty(data.email) && !matchRegex(data.email, "^([a-z\\d\\._-]+)@([a-z\\d-]+)\\.([a-z]{2,8})(\\.[a-z]{2,8})?$")) {
    numErrori += 1;
    messagioErrore = "Email non valida.";
  }
  if(!erroreContattoEEmail) {
    setErrore(settersErrori, "errore_email", messagioErrore);
  }

  // controllo sulle note
  messagioErrore = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1;
    messagioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messagioErrore);

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
  let messagioErrore1 = "";
  let messagioErrore2 = "";
  // alert(data.id_cliente.toString());
  // alert(data.id_professionista.toString());
  if(data.id_cliente <= 0 && data.id_professionista <= 0) {
    numErrori += 1; 
    messagioErrore1 = "Selezionare un cliente oppure un professionista (non entrambi).";
  }
  setErrore(settersErrori, "cliente_e_professionista", messagioErrore1);


  // controllo sulla descrizione
  messagioErrore1 = "";
  if (isEmpty(data.descrizione)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire la descrizione.";
  }
  else if(!isInRange(data.descrizione.length, 1, 100)) {
    numErrori += 1; 
    messagioErrore1 = "Lunghezza descrizione non valida, deve avere un numero di caratteri tra 1 e 100 estremi inclusi.";
  }
  setErrore(settersErrori, "descrizione", messagioErrore1);

  // controllo sul giorno
  messagioErrore1 = "";
  if (isEmpty(data.giorno)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire il giorno.";
  }
  setErrore(settersErrori, "giorno", messagioErrore1);

  // controllo sull'orario iniziale
  messagioErrore1 = "";
  if (isEmpty(data.orario_inizio)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire l\'orario iniziale.";
  }
  setErrore(settersErrori, "orario_inizio", messagioErrore1);

  // controllo sull'orario finale
  messagioErrore1 = "";
  if (isEmpty(data.orario_fine)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire l\'orario finale.";
  }
  setErrore(settersErrori, "orario_fine", messagioErrore1);

  // controllo sull'orario iniziale e sull'orario finale
  if(!isEmpty(data.orario_inizio) && !isEmpty(data.orario_fine) && data.orario_inizio >= data.orario_fine) {
    numErrori += 1; 
    messagioErrore1 = "L\'orario iniziale deve avvenire prima dell\'orario finale e non possono essere uguali.";
    messagioErrore2 = "L\'orario finale deve avvenire dopo l\'orario iniziale e non possono essere uguali.";
    setErrore(settersErrori, "orario_inizio", messagioErrore1);
    setErrore(settersErrori, "orario_fine", messagioErrore2);
  }
  
  // controllo sulle note
  messagioErrore1 = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1; 
    messagioErrore1 = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "note", messagioErrore1);

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

  let messagioErrore1 = "";
  let messagioErrore2 = "";
  
  // controllo sul cliente e sul professionista
  messagioErrore1 = "";
  // alert(getInt(data.id_cliente) + " - " + getInt(data.id_professionista));
  if(getInt(data.id_cliente) === 0 && getInt(data.id_professionista) === 0) {
    numErrori += 1; 
    messagioErrore1 = "Selezionare il cliente oppure il professionista (non entrambi).";
  }
  setErrore(settersErrori, "errore_cliente_e_professionista", messagioErrore1);

  // controllo sul giorno
  messagioErrore1 = "";
  if (isEmpty(data.giorno)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire il giorno.";
  }
  setErrore(settersErrori, "errore_giorno", messagioErrore1);

  // controllo sull'orario iniziale
  messagioErrore1 = "";
  if (isEmpty(data.ora_inizio) || isEmpty(data.minuto_inizio)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire l\'orario iniziale.";
  }
  setErrore(settersErrori, "errore_orario_inizio", messagioErrore1);

  // controllo sull'orario finale
  messagioErrore1 = "";
  if (isEmpty(data.ora_fine) || isEmpty(data.minuto_fine)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire l\'orario finale.";
  }
  setErrore(settersErrori, "errore_orario_fine", messagioErrore1);

  // controllo sull'orario iniziale e sull'orario finale
  messagioErrore1 = "";
  messagioErrore2 = "";
  if( !(isEmpty(data.ora_inizio) || isEmpty(data.minuto_inizio)) && 
      !(isEmpty(data.ora_fine) || isEmpty(data.minuto_fine)) && 
      (getInt(data.ora_fine) <= getInt(data.ora_inizio)) ) {
    
    if((getInt(data.ora_fine) < getInt(data.ora_inizio)) || 
        (getInt(data.ora_fine) === getInt(data.ora_inizio) && getInt(data.minuto_fine) <= getInt(data.minuto_inizio))) {
      numErrori += 1; 
      messagioErrore1 = "L\'orario iniziale deve avvenire prima dell\'orario finale e non possono essere uguali.";
      messagioErrore2 = "L\'orario finale deve avvenire dopo l\'orario iniziale e non possono essere uguali.";
    }    
    setErrore(settersErrori, "errore_orario_inizio", messagioErrore1);
    setErrore(settersErrori, "errore_orario_fine", messagioErrore2);
  }

  // controllo sulla descrizione
  messagioErrore1 = "";
  if (isEmpty(data.descrizione)) {
    numErrori += 1; 
    messagioErrore1 = "Inserire la descrizione.";
  }
  else if(!isInRange(data.descrizione.length, 1, 100)) {
    numErrori += 1; 
    messagioErrore1 = "Lunghezza descrizione non valida, deve avere un numero di caratteri tra 1 e 100 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_descrizione", messagioErrore1);
  
  // controllo sulle note
  messagioErrore1 = "";
  if(!isInRange(data.note.length, 0, 65535)) {
    numErrori += 1; 
    messagioErrore1 = "Lunghezza note non valida, deve avere un numero di caratteri tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messagioErrore1);

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
  setErrore(settersErrori, "nuovo_username", messaggioErrore);

  // controllo sulle nuove note
  messaggioErrore = "";
  if(!isInRange(dati.note.length, 0, 65535)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza note non valida, deve avere un numero di caratteri alfanumerici tra 1 e 65.535 estremi inclusi.";
  }
  setErrore(settersErrori, "note", messaggioErrore);
  
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
  setErrore(settersErrori, "password_attuale", messaggioErrore);

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
  setErrore(settersErrori, "nuova_password", messaggioErrore);
  setErrore(settersErrori, "conferma_nuova_password", messaggioErrore);
  
  return numErrori;
}









