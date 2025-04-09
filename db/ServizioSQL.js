export class ServizioSQL {
  SQL_INSERIMENTO_SERVIZIO = ` 
    INSERT INTO servizio (nome, prezzo, note) 
    VALUES (?, ?, ?); 
  `;

  SQL_INSERIMENTO_ENTRATE_SERVIZIO = `
    INSER INTO entrate_servizio (servizio, prezzo, anno) 
    VALUE (?, ?, ?); 
  `;

  SQL_SELEZIONE_TUTTI_I_SERVIZI = `
    SELECT 
      id, 
      nome, 
      prezzo, 
      0 AS quantita 
    FROM 
      servizio; 
  `;

  SQL_MODIFICA_SERVIZIO = `
    UPDATE 
      servizio 
    SET 
      nome = ?, prezzo = ?, note = ? 
    WHERE 
      id = ?; 
  `;
  
  constructor() {

  }
  
  sql_selezione_servizi(params) { 
    let sql = `
      SELECT 
        id, 
        nome, 
        nome AS nome_attuale, 
        prezzo, 
        prezzo AS prezzo_attuale, 
        note, 
        note AS note_attuale,  
        0 AS tipo_selezione 
      FROM 
        servizio 
      WHERE 
        nome LIKE ? AND (prezzo BETWEEN ? AND ?) 
    `;
  
    sql += (!params.note) ? " AND (note LIKE ? OR note IS NULL); " : " AND note LIKE ?; ";
  
    return sql;
  };

  sql_eliminazione_servizi(ids) {
    const placeholders = ids.map(() => '?').join(', ');
    
    return (` 
      DELETE FROM 
        servizio 
      WHERE 
        id IN (${placeholders}); 
    `);
  }
  
  params_inserimento_servizio(params) {
    return [
      `${params.nome}`, 
      `${params.prezzo}`, 
      `${params.note}`, 
    ];
  }

  params_selezione_tutti_i_servizi() {
    return [];
  }

  params_modifica_servizio(params) {
    // const params = [];
    return [
      `${params.nome}`, 
      `${params.prezzo}`, 
      `${params.note}`, 
      `${params.id}` 
    ];
  }

  params_selezione_servizi(params_in) {
    let params_out = [
      `%${params_in.nome}%`, 
      `${(params_in.prezzo_min) ? params_in.prezzo_min : Number.MIN_VALUE}`, 
      `${(params_in.prezzo_max) ? params_in.prezzo_max : Number.MAX_VALUE}`, 
    ];
    params_out.push((!params_in.note) ? '%' : `%${params_in.note}%`)
    return params_out;
  }

  params_eliminazione_servizi(params) {
    return [];
  }
}









