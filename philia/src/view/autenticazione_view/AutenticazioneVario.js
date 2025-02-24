export function getCampiLogin(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Login", 
    label: ["Username*", "Password*"],  
    type: [null, "password"],
    step: [null, null],  
    min: [null, null], 
    name: ["username", "password"], 
    value: [item.username, item.password], 
    placeholder: ["Username*", "Password*"],
    errore: [item.errore_username, item.errore_password], 
    options: [null, null], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export function getCampiProfilo(item, handleOnChange, handleOnClick, handleOnBlur) {
  return {
    header: "Profilo", 
    label: ["Nuovo username*", "Note", "Password attuale*", "Nuova password", "Conferma nuova password"],  
    type: [null, null, "password", "password", "password"],
    step: [null, null, null, null, null],  
    min: [null, null, null, null, null], 
    name: ["nuovo_username", "note", "password_attuale", "nuova_password", "conferma_nuova_password"], 
    value: [item.nuovo_username, item.note, item.password_attuale, item.nuova_password, item.conferma_nuova_password], 
    placeholder: ["Nuovo username*", "Note", "Password attuale*", "Nuova password", "Conferma nuova password"],
    errore: [item.errore_nuovo_username, item.errore_note, item.errore_password_attuale, item.errore_nuova_password, item.errore_conferma_nuova_password], 
    options: [null, null, null, null, null], 
    onChange: handleOnChange, 
    onClick: handleOnClick, 
    onBlur: handleOnBlur
  };
};

export const indiciLogin = [0, 1];
export const indiciProfilo = [0, 1, 2, 3, 4];









