export class SpesaSQL {
  //SQL_INSERIMENTO_SPESA, SQL_SELEZIONE_SPESE, SQL_ELIMINA_SPESE, SQL_ELIMINA_SPESE_RANGE_GIORNI, SQL_MODIFICA_SPESA
  SQL_INSERIMENTO_SPESA = ` 
    INSERT INTO spesa (nome, giorno, descrizione, totale, note) 
    VALUES (?, ?, ?, ?, ?); 
  `;

  constructor() {

  }

  sql_selezione_spese(params) { 
    let sql = ` 
      SELECT 
        id, 
        nome, 
        descrizione, 
        totale, 
        DATE_FORMAT(giorno, "%Y-%m-%d") AS giorno, 
        note, 
        0 AS tipo_selezione 
      FROM 
        spesa 
      WHERE 
        nome LIKE ? AND (totale BETWEEN ? AND ?) AND (giorno BETWEEN ? AND ?) 
    `;
    sql += (!params.descrizione) ? " AND (descrizione LIKE ? OR descrizione IS NULL) " : " AND descrizione LIKE ? ";
    sql += (!params.note) ? " AND (note LIKE ? OR note IS NULL); " : " AND note LIKE ?; ";
  
    return sql;
  };

  params_inserimento_spesa(params) {
    return [
      `${params.nome}`, 
      `${params.giorno}`, 
      `${params.descrizione}`, 
      `${params.totale}`, 
      `${params.note}` 
    ];
  }

  params_selezione_spese(params_in) {
    let params_out = [
      `%${params_in.nome}%`, 
      `${(params_in.totale_min) ? params_in.totale_min : Number.MIN_VALUE}`, 
      `${(params_in.totale_max) ? params_in.totale_max : Number.MAX_VALUE}`, 
      `${(params_in.primo_giorno) ? params_in.primo_giorno : "1111-01-01"}`, 
      `${(params_in.ultimo_giorno) ? params_in.ultimo_giorno : "9999-12-31"}`
    ];
    params_out.push((!params_in.descrizione) ? '%' : `%${params_in.descrizione}%`);
    params_out.push((!params_in.note) ? '%' : `%${params_in.note}%`);
    
    return params_out;
  }
}









