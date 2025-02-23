export const SQL_SELECT_UTENTE = ` 
  SELECT 
    \`username\`, \`ruolo\`, \`note\`, \`password\`, \`salt_hex\` 
  FROM 
    \`utente\` 
  WHERE 
    \`username\` = ?; 
`;

export function SQL_MODIFICA_UTENTE(nuova_password) {
  return (`
    UPDATE 
      \`utente\` 
    SET 
      \`username\` = ?, 
      \`note\` = ? 
      ${nuova_password !== "" ? ", \`password\` = ?, \`salt_hex\` = ? " : ""} 
    WHERE 
      \`username\` = ? AND \`password\` = ?; 
  `);
}








