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

const isNumber = (numStr) => {
  const num = parseFloat(numStr);
  return !isNaN(num) && isFinite(num);  
}

export const controlloProfessionista = (data, settersErrori) => {
  return 0;
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
  setErrore(settersErrori, "errore_nome", "");
  setErrore(settersErrori, "errore_cognome", "");
  setErrore(settersErrori, "errore_email", "");
  setErrore(settersErrori, "errore_contatto", "");
  setErrore(settersErrori, "errore_note", "");

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

  // controllo sul contatto e sull'email
  if(isEmpty(data.contatto) && isEmpty(data.email)) {
    numErrori += 1;
    messaggioErrore = "Inserire il contatto e/o l\'email";
    setErrore(settersErrori, "errore_contatto", messaggioErrore);
    setErrore(settersErrori, "errore_email", messaggioErrore);
  }
  else {
    if(!isEmpty(data.contatto) && !matchRegex(data.contatto, "^3[0-9]{9}$") && !matchRegex(data.contatto, "^0\\d{9,10}$")) {
      numErrori += 1;
      messaggioErrore = "Contatto non valido. Inserire un numero di cellulare o un numero di telefono valido:\n";
      messaggioErrore += "- numero di cellulare valido: 3XXXXXXXXX\n";
      messaggioErrore += "- numero di telefono valido: 0XXXXXXXXX oppure 0XXXXXXXXXX\n";
      messaggioErrore += "X è un numero tra 0 e 9 estremi inclusi.";
      setErrore(settersErrori, "errore_contatto", messaggioErrore);
    }
    messaggioErrore = "";
    if(!isEmpty(data.email) && !matchRegex(data.email, "^([a-z\\d\\._-]+)@([a-z\\d-]+)\\.([a-z]{2,8})(\\.[a-z]{2,8})?$")) {
      numErrori += 1;
      messaggioErrore = "Email non valida.";
      setErrore(settersErrori, "errore_email", messaggioErrore);
    }
  }
  
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

export const controlloServizio = (data, settersErrori) => {
  let numErrori = 0;
  setErrore(settersErrori, "errore_nome", "");
  setErrore(settersErrori, "errore_prezzo", "");
  setErrore(settersErrori, "errore_note", "");
  
  // controllo sul nome
  let messaggioErrore = "";
  if (isEmpty(data.nome)) {
    numErrori += 1; 
    messaggioErrore = "Inserire il nome";
  }
  else if(!isInRange(data.nome.length, 1, 100)) {
    numErrori += 1; 
    messaggioErrore = "Lunghezza nome non valido, deve avere un numero di caratteri tra 1 e 100 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_nome", messaggioErrore);

  // controllo sul prezzo
  messaggioErrore = "";
  if(!isNumber(data.prezzo.toString())) {
    numErrori += 1;
    messaggioErrore = (isEmpty(data.prezzo.toString())) ? "Inserire il prezzo." : (
      "Il prezzo inserito non è un numero.");
  }
  else if(!isInRange(parseFloat(data.prezzo.toString()), 0.50, Number.MAX_VALUE)) {
    numErrori += 1;
    messaggioErrore = "Inserire un presso di almeno 0.50 €."
  }
  setErrore(settersErrori, "errore_prezzo", messaggioErrore);
  
  // controllo sulle note
  messaggioErrore = "";
  if(!isInRange(data.note.length, 0, 200)) {
    numErrori += 1;
    messaggioErrore = "Lunghezza note non valida, deve avere un numero di caratteri tra 0 e 200 estremi inclusi.";
  }
  setErrore(settersErrori, "errore_note", messaggioErrore);
}

export const controlloLavoro = (data, settersErrori) => {  
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
  if (isEmpty(data.orario_inizio)) {
    numErrori += 1; 
    messaggioErrore1 = "Inserire l\'orario iniziale.";
  }
  setErrore(settersErrori, "errore_orario_inizio", messaggioErrore1);

  // controllo sull'orario finale
  // messaggioErrore1 = "";
  // if (isEmpty(data.orario_fine)) {
  //   numErrori += 1; 
  //   messaggioErrore1 = "Inserire l\'orario finale.";
  // }
  // setErrore(settersErrori, "errore_orario_fine", messaggioErrore1);

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

  return numErrori;
}









