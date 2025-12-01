import { encryptPassword, generateRandomString, PEPPER_HEX } from "../src/utils/Sicurezza.js";

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
      `${params_in.note}` 
    ];
    if (params_in.nuova_password !== "") {
      const nuovo_salt_hex = generateRandomString(32);
      const nuova_password = encryptPassword(params_in.nuova_password, nuovo_salt_hex, PEPPER_HEX);
      params_out.push(`${nuova_password}`); 
      params_out.push(`${nuovo_salt_hex}`);
    }
    params_out.push(`${params_in.username_attuale}`);
    const password_attuale = encryptPassword(params_in.password_attuale, params_in.salt_hex_db, PEPPER_HEX)
    params_out.push(`${password_attuale}`); 
    return params_out
  }
}









