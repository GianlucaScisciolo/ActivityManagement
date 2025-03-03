export function getCampiNuovaSpesa(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Nuova spesa", 
    label: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"],  
    type: [null, null, "number", "date", null], 
    step: [null, null, "0.50", null, null], 
    min: [null, null, "0.50", null, null], 
    name: ["nome", "descrizione", "totale", "giorno", "note"], 
    id: ["nuovo_nome_spesa", "nuova_descrizione_spesa", "nuovo_totale_spesa", "nuovo_giorno_spesa", "nuove_note_spesa"], 
    value: [item.nome, item.descrizione, item.totale, item.giorno, item.note], 
    placeholder: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"], 
    errore: [item.errore_nome, item.errore_descrizione, item.errore_totale, item.errore_giorno, item.errore_note], 
    options: [null, null, null, null, null],
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiRicercaSpese(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Ricerca spese", 
    label: ["Nome", "Descrizione", "Totale minimo", "Totale massimo", "Primo giorno", "Ultimo giorno", "Note"], 
    type: [null, null, "number", "number", "date", "date", null], 
    step: [null, null, "0.50", "0.50", null, null, null], 
    min: [null, null, null, null, null, null, null], 
    name: ["nome", "descrizione", "totale_min", "totale_max", "primo_giorno", "ultimo_giorno", "note"], 
    id: ["ricerca_nome_spesa", "ricerca_descrizione_spesa", "ricerca_totale_min_spesa", "ricerca_totale_max_spesa", "ricerca_primo_giorno_spesa", "ricerca_ultimo_giorno_spesa", "ricerca_note_spesa"], 
    value: [item.nome, item.descrizione, item.totale_min, item.totale_max, item.primo_giorno, item.ultimo_giorno, item.note], 
    placeholder: ["Nome", "Descrizione", "Totale minimo", "Totale massimo", "Primo giorno", "Ultimo giorno", "Note"], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiSpesaEsistente(nullo, item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Spesa", 
    tipoSelezione: item.tipo_selezione,  
    type: [null, null, "number", "date", null], 
    step: [null, null, "0.50", null, null], 
    min: [null, null, "0.50", null, null], 
    name: ["nome", "descrizione", "totale", "giorno", "note"], 
    id: ["nome-spesa", "descrizione_spesa", "totale_spesa", "giorno_spesa", "note_spesa"], 
    value: [item.nome, item.descrizione, item.totale, item.giorno, item.note], 
    placeholder: ["Nome*", "Descrizione", "Totale*", "Giorno*", "Note"], 
    valoreModificabile: [false, true, true, true, true], 
    options: [null, null, null, null, null], 
    onChange: handleOnChange,  
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};
// campi={campi(OptionsServizi(servizi, descrizione, sottoStringa, setIdServizi), item, (e) => handleInputChange(e, null, items, setItems, tipoItem, item.id), null, null)} 
            

export function getCampiFile(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "File spese", 
    label: ["Primo giorno", "Ultimo giorno"], 
    type: ["date", "date"], 
    step: [null, null], 
    min: [null, null], 
    name: ["primo_giorno", "ultimo_giorno"], 
    id: ["file_primo_giorno_lavoro", "file_ultimo_giorno_lavoro"], 
    value: [item.primo_giorno, item.ultimo_giorno], 
    placeholder: ["Primo giorno", "Ultimo giorno"], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export const indiciNuovaSpesa = [0, 1, 2, 3, 4];
export const indiciRicercaSpese = [0, 1, 2, 3, 4, 5, 6];
export const indiciSpesaEsistente = [0, 1, 2, 3, 4]; 
export const indiciFile = [0, 1];









