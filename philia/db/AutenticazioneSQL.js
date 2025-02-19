export const SQL_SELECT_UTENTE = ` 
  SELECT 
    \`username\`, \`ruolo\`, \`note\`, \`password\`, \`salt_hex\` 
  FROM 
    \`utente\` 
  WHERE 
    \`username\` = ?; 
`;









