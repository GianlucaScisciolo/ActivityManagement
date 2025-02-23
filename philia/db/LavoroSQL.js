export const SQL_INSERIMENTO_LAVORO = ` 
  INSERT INTO lavoro (id_cliente, giorno, descrizione, note) 
  VALUES (?, ?, ?, ?); 
`;

export function SQL_SELEZIONE_LAVORI(note) {
  let sql = `
    SELECT 
      0 AS tipo_selezione, 
      l.id AS id, 
      l.id_cliente AS id_cliente, 
      CONCAT ( 
        c.nome, ' ', c.cognome, 
        CASE 
          WHEN c.contatto IS NOT NULL AND c.contatto != "Contatto non inserito." 
          THEN CONCAT(" - ", c.contatto) 
          ELSE "" 
        END, 
        CASE 
          WHEN c.email IS NOT NULL AND c.email != "Email non inserita." 
          THEN CONCAT(" - ", c.email) 
          ELSE "" 
        END 
      ) AS cliente, 
      c.nome AS nome_cliente, 
      c.cognome AS cognome_cliente, 
      c.contatto AS contatto, 
      c.email AS email, 
      DATE_FORMAT(l.giorno, "%Y-%m-%d") AS giorno, 
      l.descrizione AS descrizione, 
      l.note AS note 
    FROM 
      lavoro l 
      LEFT JOIN cliente c ON l.id_cliente = c.id 
    WHERE 
      c.nome LIKE ? AND c.cognome LIKE ? AND (l.giorno BETWEEN ? AND ?) AND l.descrizione LIKE ? 
  `;
  
  sql += (!note) ? " AND (l.note LIKE ? OR l.note IS NULL); " : " AND l.note LIKE ?; "; 

  return sql;
}

export function SQL_ELIMINA_LAVORI(ids) {
  return (` 
    DELETE FROM 
      lavoro 
    WHERE 
      id IN (${ids}); 
  `);
}

export const SQL_ELIMINA_LAVORI_RANGE_GIORNI = ` 
  DELETE FROM 
    lavoro 
  WHERE 
    giorno BETWEEN ? AND ?; 
`;

export const SQL_MODIFICA_LAVORO = `
  UPDATE 
    lavoro 
  SET 
    giorno = ?, descrizione = ?, note = ? 
  WHERE 
    id = ?; 
`;









