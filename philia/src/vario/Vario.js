export const handleInputChange = (e, setItem, items, setItems, tipoItem, id) => {
  const nome_campi = [
    "nome", "cognome", "contatto", "note", "professione", "email", "id_cliente", "id_professionista", 
    "nome_cliente", "cognome_cliente", "nome_professionista", "descrizione", 
    "giorno", "primo_giorno", "ultimo_giorno", "ora_inizio", "ora_fine", "minuto_inizio", "minuto_fine", 
    "username", "password", "nuovo_username", "password_attuale", "nuova_password", "conferma_nuova_password", 
    "num_lavori_clienti", "num_lavori_professionisti", "num_lavori_giorno"
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
    return;
  }

  if(name === "id_cliente") {
    setItem(prevState => ({
      ...prevState, 
      "id_professionista": 0
    }));
  }
  else if(name === "id_professionista") {
    setItem(prevState => ({
      ...prevState, 
      "id_cliente": 0
    }));
  }
};

export const handleInputChangeNuovoLavoro = (e, setItem) => {
  const nome_campi = [
    "id_cliente", "id_professionista", "giorno", "orario_inizio", "orario_fine", "descrizione", "note"
  ];
  
  const { name, value } = e.target;

  if (nome_campi.includes(name)) {
    setItem(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
  
      if (name === "id_cliente") {
        newState.id_professionista = 0;
      } 
      else if (name === "id_professionista") {
        newState.id_cliente = 0;
      }
  
      return newState;
    });
  }  
  else {
    alert("Errore, nome campo " + name + " non valido.");
    return;
  }
}

export const handleInputChangeLavoroEsistente = (e, items, setItems, id_lavoro, id_cliente, id_professionista) => {
  e.preventDefault();
  const nome_campi = ["giorno", "orario_inizio", "orario_fine", "descrizione", "note"];

  const { name, value } = e.target;

  if(nome_campi.includes(name)) {
    // alert("Campo valido!!");
    const updatedItems = items.map(item => {
      if(id_lavoro === item.id_lavoro && id_cliente === item.id_cliente && id_professionista === item.id_professionista) {
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
    return;
  }
}

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

export const attesaLista = (funzione) => {
  let lista = -1;
  useEffect(() => {
    lista = 
    console.log("<<<<"+lista+">>>>");
  }, lista === -1);
  return lista; 
}









