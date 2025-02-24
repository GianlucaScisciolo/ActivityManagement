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

export const indiciLogin = [0, 1];









