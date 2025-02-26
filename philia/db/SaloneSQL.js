export const SQL_INSERIMENTO_USCITA = ` 
  INSERT INTO uscita (nome, giorno, descrizione, totale, note) 
  VALUES (?, ?, ?, ?, ?); 
`;

export const SQL_SELEZIONE_ENTRATE_LAVORI = ` 
  -- Creazione di una tabella temporanea con tutti i mesi degli ultimi 5 anni 
  WITH RECURSIVE DateRange AS ( 
    SELECT DATE_FORMAT(CURDATE() - INTERVAL 4 YEAR, '%Y-01-01') AS giorno 
    UNION ALL 
    SELECT DATE_ADD(giorno, INTERVAL 1 MONTH) 
    FROM DateRange 
    WHERE giorno < CURDATE() - INTERVAL 1 MONTH 
  ) 
  SELECT 
    YEAR(DateRange.giorno) AS Anno, 
    SUM(IF(MONTH(DateRange.giorno) = 1, IFNULL(lavoro.totale, 0), 0)) AS gen, 
    SUM(IF(MONTH(DateRange.giorno) = 2, IFNULL(lavoro.totale, 0), 0)) AS feb, 
    SUM(IF(MONTH(DateRange.giorno) = 3, IFNULL(lavoro.totale, 0), 0)) AS mar, 
    SUM(IF(MONTH(DateRange.giorno) = 4, IFNULL(lavoro.totale, 0), 0)) AS apr, 
    SUM(IF(MONTH(DateRange.giorno) = 5, IFNULL(lavoro.totale, 0), 0)) AS mag, 
    SUM(IF(MONTH(DateRange.giorno) = 6, IFNULL(lavoro.totale, 0), 0)) AS giu, 
    SUM(IF(MONTH(DateRange.giorno) = 7, IFNULL(lavoro.totale, 0), 0)) AS lug, 
    SUM(IF(MONTH(DateRange.giorno) = 8, IFNULL(lavoro.totale, 0), 0)) AS ago, 
    SUM(IF(MONTH(DateRange.giorno) = 9, IFNULL(lavoro.totale, 0), 0)) AS \`set\`, 
    SUM(IF(MONTH(DateRange.giorno) = 10, IFNULL(lavoro.totale, 0), 0)) AS ott, 
    SUM(IF(MONTH(DateRange.giorno) = 11, IFNULL(lavoro.totale, 0), 0)) AS nov, 
    SUM(IF(MONTH(DateRange.giorno) = 12, IFNULL(lavoro.totale, 0), 0)) AS dic, 
    SUM(IFNULL(lavoro.totale, 0)) AS totale_anno 
  FROM 
    DateRange 
  LEFT JOIN 
    lavoro ON YEAR(DateRange.giorno) = YEAR(lavoro.giorno) AND MONTH(DateRange.giorno) = MONTH(lavoro.giorno) 
  GROUP BY 
    YEAR(DateRange.giorno) 
  UNION ALL 
  SELECT 
    'Totale', 
    SUM(IF(MONTH(DateRange.giorno) = 1, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 2, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 3, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 4, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 5, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 6, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 7, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 8, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 9, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 10, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 11, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 12, IFNULL(lavoro.totale, 0), 0)), 
    SUM(IFNULL(lavoro.totale, 0)) 
  FROM 
    DateRange 
  LEFT JOIN 
    lavoro ON YEAR(DateRange.giorno) = YEAR(lavoro.giorno) AND MONTH(DateRange.giorno) = MONTH(lavoro.giorno) 
  ORDER BY Anno Desc; 
`;

export const SQL_SELEZIONE_USCITE_SPESE = `
  -- Creazione di una tabella temporanea con tutti i mesi degli ultimi 5 anni 
  WITH RECURSIVE DateRange AS ( 
    SELECT DATE_FORMAT(CURDATE() - INTERVAL 4 YEAR, '%Y-01-01') AS giorno 
    UNION ALL 
    SELECT DATE_ADD(giorno, INTERVAL 1 MONTH) 
    FROM DateRange 
    WHERE giorno < CURDATE() - INTERVAL 1 MONTH 
  ) 
  SELECT 
    YEAR(DateRange.giorno) AS Anno, 
    SUM(IF(MONTH(DateRange.giorno) = 1, IFNULL(uscita.totale, 0), 0)) AS gen, 
    SUM(IF(MONTH(DateRange.giorno) = 2, IFNULL(uscita.totale, 0), 0)) AS feb, 
    SUM(IF(MONTH(DateRange.giorno) = 3, IFNULL(uscita.totale, 0), 0)) AS mar, 
    SUM(IF(MONTH(DateRange.giorno) = 4, IFNULL(uscita.totale, 0), 0)) AS apr, 
    SUM(IF(MONTH(DateRange.giorno) = 5, IFNULL(uscita.totale, 0), 0)) AS mag, 
    SUM(IF(MONTH(DateRange.giorno) = 6, IFNULL(uscita.totale, 0), 0)) AS giu, 
    SUM(IF(MONTH(DateRange.giorno) = 7, IFNULL(uscita.totale, 0), 0)) AS lug, 
    SUM(IF(MONTH(DateRange.giorno) = 8, IFNULL(uscita.totale, 0), 0)) AS ago, 
    SUM(IF(MONTH(DateRange.giorno) = 9, IFNULL(uscita.totale, 0), 0)) AS \`set\`, 
    SUM(IF(MONTH(DateRange.giorno) = 10, IFNULL(uscita.totale, 0), 0)) AS ott, 
    SUM(IF(MONTH(DateRange.giorno) = 11, IFNULL(uscita.totale, 0), 0)) AS nov, 
    SUM(IF(MONTH(DateRange.giorno) = 12, IFNULL(uscita.totale, 0), 0)) AS dic, 
    SUM(IFNULL(uscita.totale, 0)) AS totale_anno 
  FROM 
    DateRange 
  LEFT JOIN 
    uscita ON YEAR(DateRange.giorno) = YEAR(uscita.giorno) AND MONTH(DateRange.giorno) = MONTH(uscita.giorno) 
  GROUP BY 
    YEAR(DateRange.giorno) 
  UNION ALL 
  SELECT 
    'Totale', 
    SUM(IF(MONTH(DateRange.giorno) = 1, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 2, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 3, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 4, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 5, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 6, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 7, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 8, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 9, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 10, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 11, IFNULL(uscita.totale, 0), 0)), 
    SUM(IF(MONTH(DateRange.giorno) = 12, IFNULL(uscita.totale, 0), 0)), 
    SUM(IFNULL(uscita.totale, 0)) 
  FROM 
    DateRange 
  LEFT JOIN 
    uscita ON YEAR(DateRange.giorno) = YEAR(uscita.giorno) AND MONTH(DateRange.giorno) = MONTH(uscita.giorno) 
  ORDER BY Anno Desc;  
`;









