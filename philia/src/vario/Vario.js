export const handleInputChange = (e, setItem, items, setItems, tipoItem, id) => {
  const nome_campi = [
    "nome", "cognome", "contatto", "note", "professione", "email", "id_cliente", "id_professionista", 
    "nome_cliente", "cognome_cliente", "nome_professionista", "descrizione", 
    "giorno", "primo_giorno", "ultimo_giorno", "ora_inizio", "ora_fine", "minuto_inizio", "minuto_fine", 
    "username", "password", "nuovo_username", "password_attuale", "nuova_password", "conferma_nuova_password"
  ]
  
  const { name, value } = e.target;
  
  if(tipoItem === "cliente" || tipoItem === "professionista" || tipoItem === "lavoro") {
    if(nome_campi.includes(name)) {
      const updatedItems = items.map(item => {
        if(id === item.id) {
          return {
            ...item,
            [name]: value
          }
        }
        return item;
      });
      setItems(updatedItems);
    }
    else {
      alert("Errore, nome campo " + name + " non valido.");
    }
    return;
  }
  
  if(nome_campi.includes(name)) {
    setItem(prevState => ({
      ...prevState, 
      [name]: value
    }));
  }
  else {
    alert("Errore, nome campo " + name + " non valido.");
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

export const getCampiNuovoCliente = (item, errori) => {
  return [
    // label, placeholder, name, value, type, errore
    ["Nome*", "Nome*", "nome", item.nome, "", errori.nome],
    ["Cognome*", "Cognome*", "cognome", item.cognome, "", errori.cognome],
    ["Contatto*", "Contatto*", "contatto", item.contatto, "text", errori.contatto],
    ["Note", "Note", "note", item.note, "", errori.note]
  ];
}

const getCampiNuovoProfessionista = (item, errori) => {
  return [
    // label, placeholder, name, value, type, errori
    ["Nome*", "Nome*", "nome", item.nome, "", errori.nome],
    ["Professione*", "Professione*", "professione", item.professione, "", errori.professione],
    ["Contatto", "Contatto", "contatto", item.contatto, "text", errori.contatto],
    ["Email", "Email", "email", item.email, "text", errori.email],
    ["Note", "Note", "note", item.note, "", errori.note]
  ];
};

const getCampiNuovoLavoro = (item) => {
  // const tipo_bottone_1 = (item.lavoro_cliente_selezionato) ? "bottoneBluSelezionato" : "bottoneBluNonSelezionato";
  // const tipo_bottone_2 = (item.lavoro_professionista_selezionato) ? "bottoneBluSelezionato" : "bottoneBluNonSelezionato";
  // const campi = [
  //   ["Lavoro cliente", "", "lavoro_cliente", item.lavoro_cliente_selezionato, tipo_bottone_1, "selezionaInserimentoLavoroCliente"],
  //   ["Lavoro professionista", "", "lavoro_professionista", item.lavoro_professionista_selezionato, tipo_bottone_2, "selezionaInserimentoLavoroProfessionista"]
  // ];
  // // campi.push(["Nome cliente", "Nome cliente", "nome_cliente", item.nome_cliente, null, null]);

  // if (item.lavoro_cliente_selezionato) {
  //   campi.push(["Nome cliente", "Nome cliente", "nome_cliente", item.nome_cliente, "", null]);
  //   campi.push(["Cognome cliente", "Cognome cliente", "cognome_cliente", item.cognome_cliente, "", null]);
  // }

  // if (item.lavoro_professionista_selezionato) {
  //   campi.push(["Nome professionista", "Nome professionista", "nome_professionista", item.nome_professionista, "", null]);
  // }
  // if (item.lavoro_cliente_selezionato || item.lavoro_professionista_selezionato) {
  //   campi.push(["Descrizione", "Descrizione", "descrizione", item.descrizione, "", null]);
  //   campi.push(["Giorno", "Giorno", "giorno", item.giorno, "date", ""]);
  //   campi.push(["Orario inizio", "Orario inizio", "orario_inizio", item.orario_inizio, "time", null]);
  //   campi.push(["Orario fine", "Orario fine", "orario_fine", item.orario_fine, "time", null]);
  //   campi.push(["Note", "Note", "note", item.note, "", null]);
  // }
  // else {
  //   campi.push(["", "", "", null, "br", null]);
  // }
  // return campi;
  return [
    // label, placeholder, name, value, type
    ["Descrizione", "Descrizione", "descrizione", item.descrizione, ""],
    ["Descrizione", "Descrizione", "descrizione", item.descrizione, ""],
    ["Giorno", "Giorno", "giorno", item.giorno, "date"],
    ["Orario inizio", "Orario inizio", "orario_inizio", item.orario_inizio, "time"],
    ["Orario fine", "Orario fine", "orario_fine", item.orario_fine, "time"],
    ["Note", "Note", "note", item.note, ""]
  ];
};


export const getCampiNuovoItem = (tipoItem, item, errori) => {
  switch(tipoItem) {
    case "nuovo cliente":
      return getCampiNuovoCliente(item, errori);
    case "nuovo professionista":
      return getCampiNuovoProfessionista(item, errori);
    case "nuovo lavoro":
      return getCampiNuovoLavoro(item);
    default:
      alert("Errore nel recupero dei campi per il nuovo inserimento, riprovare.");
      break;
  }
};






