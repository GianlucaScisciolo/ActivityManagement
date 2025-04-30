export class CollegamentoSQL {
  SQL_INSERIMENTO_COLLEGAMENTO = ` 
    INSERT INTO collegamento (id_lavoro, id_servizio, quantita) 
    VALUES (?, ?, ?); 
  `;

  SQL_SELEZIONE_COLLEGAMENTI_LAVORO = `
    SELECT 
      c.id_lavoro AS id_lavoro, 
      c.id_servizio AS id_servizio, 
      c.quantita AS quantita, 
      s.nome AS nome_servizio, 
      s.prezzo AS prezzo_servizio 
    FROM collegamento AS c 
    LEFT JOIN servizio AS s ON c.id_servizio = s.id 
    WHERE 
      id_lavoro = ?; 
  `;

  SQL_ELIMINAZIONE_COLLEGAMENTI_LAVORO = ` 
    DELETE FROM 
      collegamento 
    WHERE 
      id_lavoro = ?; 
  `;

  constructor() {
    
  }

  params_inserimento_collegamento(params) {
    return [
      `${params.id_lavoro}`, 
      `${params.id_servizio}`, 
      `${params.quantita}` 
    ];
  };

  params_selezione_collegamenti_lavoro(params) {
    return [
      `${params.id_lavoro}`, 
    ];
  };

  params_eliminazione_collegamenti_lavoro(params) {
    return [
      `${params.id_lavoro}`, 
    ];
  };
}