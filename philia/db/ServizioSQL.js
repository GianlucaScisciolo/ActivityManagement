export const SQL_INSERIMENTO_SERVIZIO = ` 
  INSERT INTO servizio (nome, prezzo, note) 
  VALUES (?, ?, ?); 
`;

export function SQL_SELEZIONE_SERVIZI(note) { 
  let sql = `
    SELECT 
      id, 
      nome, 
      prezzo, 
      IFNULL(NULLIF(note, ''), 'Nota non inserita.') AS note, 
      0 AS tipo_selezione 
    FROM 
      servizio 
    WHERE 
      nome LIKE ? AND (prezzo BETWEEN ? AND ?) 
  `;

  sql += (!note) ? " AND (note LIKE ? OR note IS NULL); " : " AND note LIKE ?; ";

  return sql;
};









