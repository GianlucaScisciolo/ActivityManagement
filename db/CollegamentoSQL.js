export class CollegamentoSQL {
  SQL_INSERIMENTO_COLLEGAMENTO = ` 
    INSERT INTO collegamento (id_lavoro, id_servizio, quantita) 
    VALUES (?, ?, ?); 
  `;

  SQL_SELEZIONE_COLLEGAMENTI_LAVORO = `
    SELECT 
      id_lavoro, 
      id_servizio, 
      quantita 
    FROM 
      collegamento 
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