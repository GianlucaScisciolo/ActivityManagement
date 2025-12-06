export class ClienteSQL {

  SQL_INSERIMENTO_CLIENTE = ` 
    INSERT INTO cliente (nome, cognome, contatto, email, note) 
    VALUES (?, ?, ?, ?, ?); 
  `;

  SQL_SELEZIONE_TUTTI_I_CLIENTI = `
    SELECT 
      id, nome, cognome, contatto, email 
    FROM 
      cliente; 
  `;

  SQL_MODIFICA_CLIENTE = `
    UPDATE 
      cliente 
    SET 
      contatto = ?, email = ?, note = ? 
    WHERE 
      id = ?; 
  `;
  
  constructor() {
    
  }

  sql_selezione_clienti(params) { 
    let sql = `
      SELECT 
        id, 
        nome, 
        cognome, 
        contatto, 
        contatto AS contatto_attuale, 
        email, 
        email AS email_attuale, 
        note, 
        note AS note_attuale, 
        0 AS tipo_selezione 
      FROM 
        cliente 
      WHERE 
        nome LIKE ? AND cognome LIKE ? AND contatto LIKE ? AND email LIKE ?  
    `;
  
    sql += (!params.note) ? " AND (note LIKE ? OR note IS NULL); " : " AND note LIKE ?; ";
  
    return sql;
  };

  sql_eliminazione_clienti(ids) {
    const placeholders = ids.map(() => '?').join(', ');
    return (` 
      DELETE FROM 
        cliente 
      WHERE 
        id IN (${placeholders}); 
    `);
  }

  params_inserimento_cliente(params) {
    return [
      `${params.nome}`, 
      `${params.cognome}`, 
      `${params.contatto}` ? params.contatto : "", 
      `${params.email}` ? params.email : "", 
      `${params.note}` 
    ];
  }
  
  params_selezione_tutti_i_clienti() {
    return [];
  }

  params_modifica_cliente(params) {
    return [
      `${params.contatto}`, 
      `${params.email}`, 
      `${params.note}`, 
      `${params.id}`
    ];
  }

  params_selezione_clienti(params_in) {
    let params_out = [
      `%${params_in.nome}%`, 
      `%${params_in.cognome}%`, 
      `%${params_in.contatto}%`, 
      `%${params_in.email}%`
    ];
    params_out.push((!params_in.note) ? '%' : `%${params_in.note}%`);
    return params_out;
  }

  params_eliminazione_clienti(ids) {
    return [];
  }
}



