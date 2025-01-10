export const handleInputChange = (e, setItem) => {
  const nome_campi = [
    "nome", "cognome", "contatto", "note", "professione", "email", 
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

const getCampiRicercaClienti = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome", "Nome", "nome", item.nome, null],
    ["Cognome", "Cognome", "cognome", item.cognome, null],
    ["Contatto", "Contatto", "contatto", item.contatto, "text"],
    ["Note", "Note", "note", item.note, null]
  ];
};

const getCampiRicercaProfessionisti = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome", "Nome", "nome", item.nome, null],
    ["Professione", "Professione", "professione", item.professione, null],
    ["Contatto", "Contatto", "contatto", item.contatto, "text"],
    ["Email", "Email", "email", item.email, "text"],
    ["Note", "Note", "note", item.note, null]
  ];
};

const getCampiRicercaLavori = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome cliente", "Nome cliente", "nome_cliente", item.nome_cliente, null],
    ["Cognome cliente", "Cognome cliente", "cognome_cliente", item.cognome_cliente, null],
    ["Nome professionista", "Nome professionista", "nome_professionista", item.nome_professionista, null],
    ["Descrizione", "Descrizione", "descrizione", item.descrizione, null],
    ["Primo giorno", "Primo giorno", "primo_giorno", item.primo_giorno, "date"],
    ["Ultimo giorno", "Ultimo giorno", "ultimo_giorno", item.ultimo_giorno, "date"],
    ["Note", "Note", "note", item.note, null]
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
    ["Nome*", "Nome*", "nome", item.nome, null],
    ["Cognome*", "Cognome*", "cognome", item.cognome, null],
    ["Contatto*", "Contatto*", "contatto", item.contatto, "text"],
    ["Note", "Note", "note", item.note, null]
  ];
}

const getCampiNuovoProfessionista = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome*", "Nome*", "nome", item.nome, null],
    ["Professione*", "Professione*", "professione", item.professione, null],
    ["Contatto", "Contatto", "contatto", item.contatto, "text"],
    ["Email", "Email", "email", item.email, "text"],
    ["Note", "Note", "note", item.note, null]
  ];
};

const getCampiNuovoLavoro = (item) => {
  return [
    // label, placeholder, name, value, type
    ["Nome cliente", "Nome cliente", "nome_cliente", item.nome_cliente, null],
    ["Cognome cliente", "Cognome cliente", "cognome_cliente", item.cognome_cliente, null],
    ["Nome professionista", "Nome professionista", "nome_professionista", item.nome_professionista, null],
    ["Descrizione", "Descrizione", "descrizione", item.descrizione, null],
    ["Giorno", "Giorno", "giorno", item.giorno, "date"],
    ["Orario inizio", "Orario inizio", "orario_inizio", item.orario_inizio, "time"],
    ["Orario fine", "Orario fine", "orario_fine", item.orario_fine, "time"],
    ["Note", "Note", "note", item.note, null]
  ];
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






