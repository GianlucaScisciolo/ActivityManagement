export function getCampiNuovoServizio(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Nuovo servizio", 
    label: ["Nome*", "Prezzo*", "Note"],  
    type: [null, "number", null], 
    step: [null, "0.50", null], 
    min: [null, "0.50", null], 
    name: ["nome", "prezzo", "note"], 
    value: [item.nome, item.prezzo, item.note], 
    placeholder: ["Nome*", "Prezzo*", "Note"],
    errore: [item.errore_nome, item.errore_prezzo, item.errore_note], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiRicercaServizi(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Ricerca servizi", 
    label: ["Nome", "Prezzo minimo", "Prezzo massimo", "Note"], 
    type: [null, "number", "number", null], 
    step: [null, "0.50", null], 
    min: [null, null, null, null], 
    name: ["nome", "prezzo_min", "prezzo_max", "note"], 
    value: [item.nome, item.prezzo_min, item.prezzo_max, item.note], 
    placeholder: ["Nome", "Prezzo minimo", "Prezzo massimo", "Note"], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiServizioEsistente(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Servizio", 
    tipoSelezione: item.tipo_selezione,  
    type: [null, "number", null], 
    step: [null, "0.50", null], 
    min: [null, "0.50", null], 
    name: ["nome", "prezzo", "note"], 
    value: [item.nome, item.prezzo, item.note], 
    placeholder: ["Nome", "Prezzo", "Note"], 
    valoreModificabile: [true, true, true], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export const indiciNuovoServizio = [0, 1, 2];
export const indiciRicercaServizi = [0, 1, 2, 3];
export const indiciServizioEsistente = [0, 1, 2];









