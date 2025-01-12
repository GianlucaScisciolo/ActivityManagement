export const handleInputChange = (e, setItem) => {
  const nome_campi = [
    "nome", "cognome", "contatto", "note", "professione", "email", "id_cliente", "id_professionista", 
    "nome_cliente", "cognome_cliente", "nome_professionista", "descrizione", 
    "giorno", "primo_giorno", "ultimo_giorno", "orario_inizio", "orario_fine"
  ]
  const { name, value } = e.target;
  if(nome_campi.includes(name)) {
    setItem(prevState => ({
      ...prevState, 
      [name]: value
    }));
  }
  else {
    alert("Errore, nome campo non valido.");
  }
};

export const cambiamentoBloccato = (e) => {
  e.preventDefault();
}

export const selezionaInserimentoLavoroCliente = (setItem) => {
  setItem(prevState => ({
    ...prevState, 
    "lavoro_cliente_selezionato": !prevState.lavoro_cliente_selezionato,
    "lavoro_professionista_selezionato": false,
    "id_cliente": null,
    "id_professionista": null
  }));
};


export const selezionaInserimentoLavoroProfessionista = (setItem) => {
  setItem(prevState => ({
    ...prevState, 
    "lavoro_cliente_selezionato": false,
    "lavoro_professionista_selezionato": !prevState.lavoro_professionista_selezionato,
    "id_cliente": null,
    "id_professionista": null
  }));
};

const getCampiRicercaClienti = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome", "Nome", "nome", item.nome, ""],
    ["Cognome", "Cognome", "cognome", item.cognome, ""],
    ["Contatto", "Contatto", "contatto", item.contatto, "text"],
    ["Note", "Note", "note", item.note, ""]
  ];
};

const getCampiRicercaProfessionisti = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome", "Nome", "nome", item.nome, ""],
    ["Professione", "Professione", "professione", item.professione, ""],
    ["Contatto", "Contatto", "contatto", item.contatto, "text"],
    ["Email", "Email", "email", item.email, "text"],
    ["Note", "Note", "note", item.note, ""]
  ];
};

const getCampiRicercaLavori = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome cliente", "Nome cliente", "nome_cliente", item.nome_cliente, ""],
    ["Cognome cliente", "Cognome cliente", "cognome_cliente", item.cognome_cliente, ""],
    ["Nome professionista", "Nome professionista", "nome_professionista", item.nome_professionista, ""],
    ["Descrizione", "Descrizione", "descrizione", item.descrizione, ""],
    ["Primo giorno", "Primo giorno", "primo_giorno", item.primo_giorno, "date"],
    ["Ultimo giorno", "Ultimo giorno", "ultimo_giorno", item.ultimo_giorno, "date"],
    ["Note", "Note", "note", item.note, ""]
  ];
};

export const getCampiRicerca = (tipoItem, item) => {
  switch(tipoItem) {
    case "cerca clienti":
      return getCampiRicercaClienti(item);
    case "cerca professionisti":
      return getCampiRicercaProfessionisti(item);
    case "cerca lavori":
      return getCampiRicercaLavori(item);
    default:
      alert("Errore nel recupero dei campi per la ricerca, riprovare.");
      break;
  }
};

export const getCampiNuovoCliente = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome*", "Nome*", "nome", item.nome, ""],
    ["Cognome*", "Cognome*", "cognome", item.cognome, ""],
    ["Contatto*", "Contatto*", "contatto", item.contatto, "text"],
    ["Note", "Note", "note", item.note, ""]
  ];
}

const getCampiNuovoProfessionista = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome*", "Nome*", "nome", item.nome, ""],
    ["Professione*", "Professione*", "professione", item.professione, ""],
    ["Contatto", "Contatto", "contatto", item.contatto, "text"],
    ["Email", "Email", "email", item.email, "text"],
    ["Note", "Note", "note", item.note, ""]
  ];
};

const getCampiNuovoLavoro = (item) => {
  const tipo_bottone_1 = (item.lavoro_cliente_selezionato) ? "bottoneBluSelezionato" : "bottoneBluNonSelezionato";
  const tipo_bottone_2 = (item.lavoro_professionista_selezionato) ? "bottoneBluSelezionato" : "bottoneBluNonSelezionato";
  const campi = [
    ["Lavoro cliente", "", "lavoro_cliente", item.lavoro_cliente_selezionato, tipo_bottone_1, "selezionaInserimentoLavoroCliente"],
    ["Lavoro professionista", "", "lavoro_professionista", item.lavoro_professionista_selezionato, tipo_bottone_2, "selezionaInserimentoLavoroProfessionista"]
  ];
  // campi.push(["Nome cliente", "Nome cliente", "nome_cliente", item.nome_cliente, null, null]);

  if (item.lavoro_cliente_selezionato) {
    campi.push(["Nome cliente", "Nome cliente", "nome_cliente", item.nome_cliente, "", null]);
    campi.push(["Cognome cliente", "Cognome cliente", "cognome_cliente", item.cognome_cliente, "", null]);
  }

  if (item.lavoro_professionista_selezionato) {
    campi.push(["Nome professionista", "Nome professionista", "nome_professionista", item.nome_professionista, "", null]);
  }
  if (item.lavoro_cliente_selezionato || item.lavoro_professionista_selezionato) {
    campi.push(["Descrizione", "Descrizione", "descrizione", item.descrizione, "", null]);
    campi.push(["Giorno", "Giorno", "giorno", item.giorno, "date", ""]);
    campi.push(["Orario inizio", "Orario inizio", "orario_inizio", item.orario_inizio, "time", null]);
    campi.push(["Orario fine", "Orario fine", "orario_fine", item.orario_fine, "time", null]);
    campi.push(["Note", "Note", "note", item.note, "", null]);
  }
  else {
    campi.push(["", "", "", null, "br", null]);
  }
  return campi;
};


export const getCampiNuovoItem = (tipoItem, item) => {
  switch(tipoItem) {
    case "nuovo cliente":
      return getCampiNuovoCliente(item);
    case "nuovo professionista":
      return getCampiNuovoProfessionista(item);
    case "nuovo lavoro":
      return getCampiNuovoLavoro(item);
    default:
      alert("Errore nel recupero dei campi per il nuovo inserimento, riprovare.");
      break;
  }
};






