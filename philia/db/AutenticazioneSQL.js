export class AutenticazioneSQL {
  SQL_SELEZIONE_UTENTE = ` 
    SELECT 
      \`username\`, \`ruolo\`, \`note\`, \`password\`, \`salt_hex\` 
    FROM 
      \`utente\` 
    WHERE 
      \`username\` = ?; 
  `;

  constructor() {
    
  }
// SQL_MODIFICA_UTENTE(req.body.nuova_password)
  sql_modifica_utente(params) {
    return (`
      UPDATE 
        \`utente\` 
      SET 
        \`username\` = ?, 
        \`note\` = ? 
        ${params.nuova_password !== "" ? ", \`password\` = ?, \`salt_hex\` = ? " : ""} 
      WHERE 
        \`username\` = ? AND \`password\` = ?; 
    `);
  }

  params_selezione_utente(params) {
    return [
      `${params.username}`
    ];
  }

  params_modifica_utente(params_in) {
    const params_out = [
      `${params_in.nuovo_username}`, 
      `${params_in.nuove_note}` 
    ];
    if (params_in.nuova_password !== "") {
      params_out.push(`${params_in.nuova_password}`); 
      params_out.push(`${params_in.nuovo_salt_hex}`); 
    }
    params_out.push(`${params_in.username_attuale}`); 
    params_out.push(`${params_in.password_attuale}`); 
    
    return params_out
  }
}









