export const SQL_INSERIMENTO_CLIENTE = ` 
  INSERT INTO cliente (nome, cognome, contatto, email, note) 
  VALUES (?, ?, ?, ?, ?); 
`;

export function SQL_SELEZIONE_CLIENTI(note) { 
  let sql = `
    SELECT 
      id, 
      nome, 
      cognome, 
      contatto, 
      email, 
      IFNULL(NULLIF(note, ''), 'Nota non inserita.') AS note, 
      0 AS tipo_selezione 
    FROM 
      cliente 
    WHERE 
      nome LIKE ? AND cognome LIKE ? AND contatto LIKE ? AND email LIKE ?  
  `;

  sql += (!note) ? " AND (note LIKE ? OR note IS NULL); " : " AND note LIKE ?; ";

  return sql;
};

export const SQL_SELEZIONE_TUTTI_I_CLIENTI = `
  SELECT 
    id, nome, cognome, contatto, email 
  FROM 
    cliente; 
`;

export function SQL_ELIMINA_CLIENTI(ids) {
  return (` 
    DELETE FROM 
      cliente 
    WHERE 
      id IN (${ids}); 
  `);
}

export const SQL_MODIFICA_CLIENTE = `
  UPDATE 
    cliente 
  SET 
    contatto = ?, email = ?, note = ? 
  WHERE 
    id = ?; 
`;









