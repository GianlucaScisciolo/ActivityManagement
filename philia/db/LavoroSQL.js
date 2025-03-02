export class LavoroSQL {
  SQL_INSERIMENTO_LAVORO = ` 
    INSERT INTO lavoro (id_cliente, giorno, descrizione, totale, note) 
    VALUES (?, ?, ?, ?, ?); 
  `;

  SQL_ELIMINAZIONE_LAVORI_RANGE_GIORNI = ` 
    DELETE FROM 
      lavoro 
    WHERE 
      giorno BETWEEN ? AND ?; 
  `;
  
  SQL_MODIFICA_LAVORO = `
    UPDATE 
      lavoro 
    SET 
      giorno = ?, descrizione = ?, note = ? 
    WHERE 
      id = ?; 
  `;
    
  constructor() {

  }

  sql_selezione_lavori(params) {
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
        l.totale AS totale, 
        l.note AS note 
      FROM 
        lavoro l 
        LEFT JOIN cliente c ON l.id_cliente = c.id 
      WHERE 
        c.nome LIKE ? AND c.cognome LIKE ? AND (l.giorno BETWEEN ? AND ?) AND l.descrizione LIKE ? 
    `;
    
    sql += (!params.note) ? " AND (l.note LIKE ? OR l.note IS NULL); " : " AND l.note LIKE ?; "; 
  
    return sql;
  }

  sql_eliminazione_lavori(ids) {
    const placeholders = ids.map(() => '?').join(', ');
    
    return (` 
      DELETE FROM 
        lavoro 
      WHERE 
        id IN (${placeholders}); 
    `);
  }
  
  params_inserimento_lavoro(params) {   
    return [
      `${params.id_cliente}`, 
      `${params.giorno}`, 
      `${params.descrizione}`, 
      `${params.totale}`, 
      `${params.note}`
    ];
  }

  params_eliminazione_lavori_range_giorni() {
    return [];
  }

  params_modifica_lavoro() {
    return [];
  }

  params_selezione_lavori(params_in) {
    let params_out = [
      `%${params_in.nome_cliente}%`, 
      `%${params_in.cognome_cliente}%`, 
      `${(params_in.primo_giorno) ? params_in.primo_giorno : "1111-01-01"}`, 
      `${(params_in.ultimo_giorno) ? params_in.ultimo_giorno : "9999-12-31"}`, 
      `%${params_in.descrizione}%` 
    ];
    params_out.push((!params_in.note) ? '%' : `%${params_in.note}%`);
    return params_out;
  }

  params_eliminazione_lavori() {
    return [];
  }  
}









