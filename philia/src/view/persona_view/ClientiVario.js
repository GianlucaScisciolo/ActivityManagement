export function getCampiNuovoCliente(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Nuovo cliente", 
    type: [null, null, "text", "text", null], 
    label: ["Nome*", "Cognome*", "Contatto", "Email", "Note"],  
    name: ["nome", "cognome", "contatto", "email", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.email, item.note], 
    placeholder: ["Nome*", "Cognome*", "Contatto", "Email", "Note"],
    errore: [item.errore_nome, item.errore_cognome, item.errore_contatto, item.errore_email, item.errore_note], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiRicercaClienti(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Ricerca clienti", 
    label: ["Nome", "Cognome", "Contatto", "email", "Note"], 
    type: [null, null, "text", "text", null],  
    name: ["nome", "cognome", "contatto", "email", "note"], 
    value: [item.nome, item.cognome, item.contatto, item.email, item.note], 
    placeholder: ["Nome", "Cognome", "Contatto", "Email", "Note"], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiClienteEsistente(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Cliente", 
    tipoSelezione: item.tipo_selezione,  
    type: [null, "text", "text", null],  
    name: ["nome_e_cognome", "contatto", "email", "note"], 
    value: [item.nome + " " + item.cognome, item.contatto, item.email, item.note], 
    placeholder: ["Nome e cognome", "Contatto", "Email", "Note"], 
    valoreModificabile: [false, true, true, true], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export const indiciNuovoCliente = [0, 1, 2, 3, 4];
export const indiciRicercaClienti = [0, 1, 2, 3, 4];
export const indiciClienteEsistente = [0, 1, 2, 3];









