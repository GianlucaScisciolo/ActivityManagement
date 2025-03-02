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
        email, 
        IFNULL(NULLIF(note, ''), 'Nota non inserita.') AS note, 
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
    return (` 
      DELETE FROM 
        cliente 
      WHERE 
        id IN (${ids}); 
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
  /*
      `${req.body.nome}`, 
    `${req.body.cognome}`, 
    `${(req.body.contatto) ? req.body.contatto : "Contatto non inserito."}`, 
    `${(req.body.email) ? req.body.email : "Email non inserita."}`, 
    `${req.body.note}`
  */

  params_selezione_tutti_i_clienti(params) {
    return [];
  }

  params_modifica_cliente(params) {
    return [];
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

  params_eliminazione_clienti(params) {
    return [];
  }
}



