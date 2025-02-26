export function getCampiNuovaUscita(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Nuova uscita", 
    label: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"],  
    type: [null, null, "number", "date", null], 
    step: [null, null, "0.50", null, null], 
    min: [null, null, "0.50", null, null], 
    name: ["nome", "descrizione", "totale", "giorno", "note"], 
    value: [item.nome, item.descrizione, item.totale, item.giorno, item.note], 
    placeholder: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"], 
    errore: [item.errore_nome, item.errore_descrizione, item.errore_totale, item.errore_giorno, item.errore_note], 
    options: [null, null, null, null, null],
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiUscitaEsistente(nullo, item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Uscita", 
    tipoSelezione: item.tipo_selezione,  
    type: [null, null, "number", "date", null], 
    step: [null, null, "0.50", null, null], 
    min: [null, null, "0.50", null, null], 
    name: ["nome", "descrizione", "totale", "giorno", "note"], 
    value: [item.nome, item.descrizione, item.totale, item.giorno, item.note], 
    placeholder: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"], 
    valoreModificabile: [false, true, true, true, true], 
    options: [null, null, null, null, null], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export const indiciNuovaUscita = [0, 1, 2, 3, 4];
export const indiciUscitaEsistente = [0, 1, 2, 3, 4];









