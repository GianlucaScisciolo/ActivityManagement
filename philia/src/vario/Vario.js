export const handleInputChange = (e) => {
  const { name, value } = e.target;
  switch (name) {
    case 'nome':
      setNome(value);
      break;
    case 'cognome':
      setCognome(value);
      break;
    case 'contatto':
      setContatto(value);
      break;
    case 'note':
      setNote(value);
      break;
    case 'professione':
      setProfessione(value);
      break;
    case 'email':
      setEmail(value);
      break;
    case 'nomeCliente':
      setNomeCliente(value);
      break;
    case 'cognomeCliente':
      setCognomeCliente(value);
      break;
    case 'nomeProfessionista':
      setNomeProfessionista(value);
      break;
    case 'descrizione':
      setDescrizione(value);
      break;
    case 'primoGiorno':
      setPrimoGiorno(value);
      break;
    case 'ultimoGiorno':
      setUltimoGiorno(value);
      break;
    default:
      break;
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

/*
function FormNuovoCliente({item}) {
  return (
    <>
      <StyledLabel>Nome</StyledLabel>
      <StyledTextAreaModifica rows="1" placeholder='Nome*' name="nome" value={item.nome} />
      <StyledLabel>Cognome</StyledLabel>
      <StyledTextAreaModifica rows="1" placeholder='Cognome*' name="cognome" value={item.cognome} />
      <StyledLabel>Contatto</StyledLabel>
      <StyledInputModifica rows="1" type="text" placeholder='Contatto*' name="contatto" value={item.contatto} />
      <StyledLabel>Note</StyledLabel>
      <StyledTextAreaModifica rows="1" placeholder='Note' name="note" value={item.note} style={{marginBottom: "10px"}} />
      <OperazioniNuovoItem />   
    </>
  );
}
*/

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
    ["Primo giorno", "Primo giorno", "primo_giorno", item.primo_giorno, "date"],
    ["Ultimo giorno", "Ultimo giorno", "ultimo_giorno", item.ultimo_giorno, "date"],
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






