const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.json("from backend side");
})

app.listen(8081, () => {
  console.log("listening");
})

app.listen(3000, () => {
  console.log('Server in esecuzione sulla porta 3000');
});

/************************************************** Database **************************************************/

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "utente",
  database: "philia_test"
})

// const setLangSQL = `SET lc_time_names = 'it_IT';`;

db.connect(err => {
  if (err) {
    console.error('Errore di connessione al database:', err.stack);
    return;
  }
  console.log('Connesso al database.');
});

const executeQuery = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const getResults = async (sql, params, res) => {
  try {
    const data = await executeQuery(sql, params);
    return res.json(data);
  } 
  catch (err) {
    console.error('Errore durante l\'esecuzione della query: ', err);
    return res.json(err);
  }
}


/*************************************************** Autenticazione **************************************************/

/**
 * Login:
 */
app.post("/LOGIN", async (req, res) => {
  const { username = '', password = '' } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per il login: ", [username, password]);

  const sql = ` 
    SELECT 
      \`username\`, \`ruolo\`, \`note\`, \`password\`, \`salt_hex\` 
    FROM 
      \`utente\` 
    WHERE 
      \`username\` = ?; 
  `;

  const params = [`${username}`];//, `${password}`];

  return getResults(sql, params, res);
});


/**
 * Modifica profilo
 */
app.post("/MODIFICA_PROFILO", async (req, res) => {
  const { 
    username_attuale = '', password_attuale = '', nuovo_username = '', nuova_password = '', 
    nuovo_ruolo = '', nuove_note = '', nuovo_salt_hex = ''
  } = req.body;

  console.log("Dati ricevuti per la modifica: ", [
    username_attuale, password_attuale, nuovo_username, nuova_password, nuovo_ruolo, nuove_note, nuovo_salt_hex
  ]);
  
  const sql = `
    UPDATE 
      \`utente\` 
    SET 
      \`username\` = ?, 
      \`ruolo\` = ?, 
      \`note\` = ? 
      ${nuova_password !== "" ? ", \`password\` = ?, \`salt_hex\` = ? " : ""} 
    WHERE 
      \`username\` = ? AND \`password\` = ?; 
  `;
  
  const params = [
    `${nuovo_username}`, 
    `${nuovo_ruolo}`, 
    `${nuove_note}`
  ];

  if (nuova_password !== "") {
    params.push(`${nuova_password}`);
    params.push(`${nuovo_salt_hex}`);
  }

  params.push(`${username_attuale}`);
  params.push(`${password_attuale}`);


  return getResults(sql, params, res);
});



/*************************************************************************************************************/

/************************************************** Persona **************************************************/

/**
 * Inserisci cliente:
 */
app.post("/INSERISCI_CLIENTE", async (req, res) => {
  const { nome = '', cognome = '', contatto = '', note = '' } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per l\'inserimento:", req.body);

  const sql = ` 
    INSERT INTO cliente (nome, cognome, contatto, note) 
    VALUES (?, ?, ?, ?); 
  `;

  const params = [`${nome}`, `${cognome}`, `${contatto}`, `${note}`];
  
  // return getResults(sql, params, res);
  try {
    await executeQuery(sql, params);
    return res.status(201).json({ message: 'Cliente inserito con successo' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Errore, cliente gia\' presente' });
    }
    console.error('Errore durante l\'inserimento del cliente: ', err);
    return res.status(500).json({ message: 'Errore del server' });
  }
});

/**
 * Visualizza clienti:
 */
app.post("/VISUALIZZA_CLIENTI", async (req, res) => {
  const { nome = '', cognome = '', contatto = '', note = '' } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per la ricerca:", req.body);

  let sql = `
    SELECT 
      id, 
      nome, 
      cognome, 
      IFNULL(NULLIF(contatto, ''), 'Contatto non inserito.') AS contatto, 
      IFNULL(NULLIF(note, ''), 'Nota non inserita.') AS note, 
      0 AS tipo_selezione 
    FROM 
      cliente 
    WHERE 
      nome LIKE ? AND cognome LIKE ?
  `;

  const params = [`${nome}%`, `${cognome}%`];

  if (contatto === '') {
    sql += " AND (contatto LIKE ? OR contatto IS NULL)";
    params.push('%');
  } 
  else {
    sql += " AND contatto LIKE ?";
    params.push(`${contatto}%`);
  }

  if (note === '') {
    sql += " AND (note LIKE ? OR note IS NULL)";
    params.push('%');
  } 
  else {
    sql += " AND note LIKE ?";
    params.push(`${note}%`);
  }

  return getResults(sql, params, res);
});




/**
 * Ottieni tutti i clienti:
 */
app.post("/OTTIENI_TUTTI_I_CLIENTI", async (req, res) => {
  const sql = `
    SELECT 
      id, nome, cognome, contatto 
    FROM 
      cliente; 
  `;

  const params = [];

  try {
    const data = await executeQuery(sql, []);
    res.status(200).json(data);
  } 
  catch (err) {
    console.error('Errore durante l\'esecuzione della query: ', err);
    res.status(500).json({ message: 'Errore durante l\'esecuzione della query' });
  }
});

/**
 * Elimina clienti
 */
app.post("/ELIMINA_CLIENTI", async (req, res) => {
  const { ids = [] } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per l\'eliminazione:", [ids]);

  // Creare una stringa di parametri di placeholder per la query
  const placeholders = ids.map(() => '?').join(', ');
  

  const sql = ` 
    DELETE FROM 
      cliente 
    WHERE 
      id IN (${placeholders}); 
  `;

  return getResults(sql, ids, res);
});

/**
 * Modifica clienti
 */
app.post("/MODIFICA_CLIENTI", async (req, res) => {
  const [id, contatto, note] = [req.body.id, req.body.contatto, req.body.note];
  
  console.log("Dati ricevuti per la modifica: ", [id, contatto, note]);
  
  const sql = ` 
    UPDATE 
      cliente 
      SET 
        contatto = ?, note = ? 
      WHERE 
        id = ?; 
  `;
  
  const params = [`${contatto}`, `${note}`, `${id}`];
  
  return getResults(sql, params, res);
});


/*************************************************************************************************************/

/*********************************************** Professionista **********************************************/

/**
 * Inserisci professionista
 */
// app.post("/INSERISCI_PROFESSIONISTA", async (req, res) => {
//   const { nome = '', professione = '', contatto = '', email = '', note = '' } = req.body;
  
//   const sql = ` 
//     INSERT INTO professionista (nome, professione, contatto, email, note) 
//     VALUES (?, ?, ?, ?, ?); 
//   `;

//   const params = [`${nome}`, `${professione}`, `${contatto}`, `${email}`, `${note}`];
  
//   return getResults(sql, params, res);
// });
app.post("/INSERISCI_PROFESSIONISTA", async (req, res) => {
  const { nome = '', professione = '', contatto = '', email = '', note = '' } = req.body;
  
  const sql = ` 
    INSERT INTO professionista (nome, professione, contatto, email, note) 
    VALUES (?, ?, ?, ?, ?); 
  `;

  const params = [`${nome}`, `${professione}`, `${contatto}`, `${email}`, `${note}`];
    
  try {
    await executeQuery(sql, params);
    return res.status(201).json({ message: 'Professionista inserito con successo' });
  } 
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Errore, professionista gia\' presente' });
    }
    console.error('Errore durante l\'inserimento del professionista: ', err);
    return res.status(500).json({ message: 'Errore del server' });
  }
});

/**
 * Visualizza professionisti 
 */
app.post("/VISUALIZZA_PROFESSIONISTI", async (req, res) => {
  const { nome = '', professione = '', contatto = '', email = '', note = '' } = req.body;
  console.log([nome, professione, contatto, email, note]);
  
  let sql = `
    SELECT 
      id, 
      nome, 
      professione, 
      IFNULL(NULLIF(contatto, ''), 'Contatto non inserito.') AS contatto, 
      IFNULL(NULLIF(email, ''), 'Email non inserita.') AS email, 
      IFNULL(NULLIF(note, ''), 'Nota non inserita.') AS note, 
      0 AS tipo_selezione 
    FROM 
      professionista 
    WHERE 
      nome LIKE ? AND professione LIKE ? 
  `;

  const params = [`${nome}%`, `${professione}%`];

  if (contatto === '') {
    sql += " AND (contatto LIKE ? OR contatto IS NULL)";
    params.push('%');
  } 
  else {
    sql += " AND contatto LIKE ?";
    params.push(`${contatto}%`);
  }

  if (email === '') {
    sql += " AND (email LIKE ? OR email IS NULL)";
    params.push('%');
  } 
  else {
    sql += " AND email LIKE ?";
    params.push(`${email}%`);
  }

  if (note === '') {
    sql += " AND (note LIKE ? OR note IS NULL)";
    params.push('%');
  } 
  else {
    sql += " AND note LIKE ?";
    params.push(`${note}%`);
  }
  
  return getResults(sql, params, res);
});


/**
 * Ottieni tutti i professionisti:
 */
app.post("/OTTIENI_TUTTI_I_PROFESSIONISTI", async (req, res) => {
  const sql = `
    SELECT 
      id, nome, professione, contatto, email 
    FROM 
      professionista; 
  `;

  try {
    const data = await executeQuery(sql, []);
    res.status(200).json(data);
  } 
  catch (err) {
    console.error('Errore durante l\'esecuzione della query: ', err);
    res.status(500).json({ message: 'Errore durante l\'esecuzione della query' });
  }
});


/**
 * Elimina professionisti
 */
app.post("/ELIMINA_PROFESSIONISTI", async (req, res) => {
  const { ids = [] } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per l\'eliminazione: ", ids);

  // Creare una stringa di parametri di placeholder per la query
  const placeholders = ids.map(() => '?').join(', ');

  const sql = ` 
    DELETE FROM 
      professionista 
    WHERE 
      id IN (${placeholders}); 
  `;

  return getResults(sql, ids, res);
});

/**
 * Modifica professionisti
 */
app.post("/MODIFICA_PROFESSIONISTI", async (req, res) => {
  const [id, contatto, email, note] = [req.body.id, req.body.contatto, req.body.email, req.body.note];

  console.log("Dati ricevuti per la modifica: ", [id, contatto, email, note]);
  
  const sql = ` 
    UPDATE 
      professionista 
    SET 
      contatto = ?, email = ?, note = ? 
    WHERE 
      id = ?; 
  `;

  const params = [`${contatto}`, `${email}`, `${note}`, `${id}`];

  return getResults(sql, params, res);
});

/*************************************************************************************************************/

/*************************************************** Lavori **************************************************/

/**
 * Inserisci lavoro
 */
// app.post("/INSERISCI_LAVORO", async (req, res) => {
//   const {
//     id_cliente = '',
//     id_professionista = '',
//     descrizione = '',
//     giorno = '',
//     ora_inizio = '',
//     minuto_inizio = '',
//     ora_fine = '',
//     minuto_fine = '',
//     note = ''
//   } = req.body;
  
//   const sql = ` 
//     INSERT INTO lavoro (descrizione, giorno, orario_inizio, orario_fine, note) 
//     VALUES (?, ?, ?, ?, ?); 
//   `;
  
//   const params = [
//     `${descrizione}`, 
//     `${giorno}`, 
//     `${orario_inizio}`, 
//     `${orario_fine}`, 
//     `${note}`, 
//   ];
  
//   try {
//     await executeQuery(sql, params);
//     res.sendStatus(200);
//   } 
//   catch (err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       res.sendStatus(200);
//     }
//     console.error('Errore durante l\'inserimento del lavoro: ', err);
//     return res.status(500).json({ message: 'Errore del server.' });
//   }
// });

// app.post("/INSERISCI_LAVORO", async (req, res) => {
//   const {
//     lavoro_cliente_selezionato = '', 
//     lavoro_professionista_selezionato = '',
//     id_cliente = '',
//     id_professionista = '',
//     descrizione = '',
//     giorno = '',
//     orario_inizio = '',
//     orario_fine = '',
//     note = ''
//   } = req.body;
  
//   const sqlLavoro = ` 
//     INSERT INTO lavoro (descrizione, giorno, orario_inizio, orario_fine, note) 
//     VALUES (?, ?, ?, ?, ?); 
//   `;
  
//   const paramsLavoro = [
//     `${descrizione}`, 
//     `${giorno}`, 
//     `${orario_inizio}`, 
//     `${orario_fine}`, 
//     `${note}`
//   ];

//   id_cliente = (id_cliente) ? id_cliente : null;
//   id_professionista = (id_professionista) ? id_professionista : null;
  
//   try {
//     const resultLavoro = await executeQuery(sqlLavoro, paramsLavoro);
//     const id_lavoro = resultLavoro.insertId;

//     if (id_professionista === null && id_cliente !== null) {
//       const sqlPrenotazione = `
//         INSERT INTO prenotazione (id_cliente, id_lavoro)
//         VALUES (?, ?);
//       `;
//       const paramsPrenotazione = [`${id_cliente}`, `${id_lavoro}`];
//       await executeQuery(sqlPrenotazione, paramsPrenotazione);
//     } else if (id_cliente === null && id_professionista !== null) {
//       const sqlImpegno = `
//         INSERT INTO impegno (id_professionista, id_lavoro)
//         VALUES (?, ?);
//       `;
//       const paramsImpegno = [`${id_professionista}`, `${id_lavoro}`];
//       await executeQuery(sqlImpegno, paramsImpegno);
//     }

//     return res.status(201).json({ message: 'Lavoro inserito con successo.' });
//   } 
//   catch (err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       return res.status(409).json({ message: 'Errore, lavoro già presente.' });
//     }
//     console.error('Errore durante l\'inserimento del lavoro: ', err);
//     return res.status(500).json({ message: 'Errore del server.' });
//   }
// });

app.post("/INSERISCI_LAVORO", async (req, res) => {
  const {
    id_cliente = '',
    id_professionista = '',
    descrizione = '',
    giorno = '',
    ora_inizio = '',
    minuto_inizio = '',
    ora_fine = '',
    minuto_fine = '',
    note = ''
  } = req.body;
  
  // SQL per inserire un nuovo lavoro
  const sqlInsertLavoro = `
    INSERT INTO lavoro (giorno, ora_inizio, minuto_inizio, ora_fine, minuto_fine)
    VALUES (?, ?, ?, ?, ?);
  `;
  
  // Parametri per la query di inserimento
  const paramsLavoro = [
    `${giorno}`, 
    `${ora_inizio}`, 
    `${minuto_inizio}`, 
    `${ora_fine}`, 
    `${minuto_fine}`
  ];

  try {
    const insertResult = await executeQuery(sqlInsertLavoro, paramsLavoro);

    // Ottieni l'ID del nuovo lavoro inserito
    const id_lavoro = insertResult.insertId;

    // Esegui la query per inserire prenotazione o impegno
    if (parseInt(id_cliente) !== 0) {
      const sqlInsertPrenotazione = `
        INSERT INTO prenotazione (id_cliente, id_lavoro, descrizione, note)
        VALUES (?, ?, ?, ?);
      `;
      const paramsPrenotazione = [
        `${id_cliente}`, 
        `${id_lavoro}`, 
        `${descrizione}`, 
        `${note}`
      ];
      await executeQuery(sqlInsertPrenotazione, paramsPrenotazione);
    } 
    else if (parseInt(id_professionista) !== 0) {
      const sqlInsertImpegno = `
        INSERT INTO impegno (id_professionista, id_lavoro, descrizione, note)
        VALUES (?, ?, ?, ?);
      `;
      const paramsImpegno = [
        `${id_professionista}`, 
        `${id_lavoro}`, 
        `${descrizione}`, 
        `${note}`
      ];
      await executeQuery(sqlInsertImpegno, paramsImpegno);
    }

    res.sendStatus(200);

  } 
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      // Se il lavoro è già presente, ottieni l'ID del lavoro esistente
      const sqlSelectLavoro = `
        SELECT id FROM lavoro WHERE giorno = ? AND ora_inizio = ? AND minuto_inizio = ? AND ora_fine = ? AND minuto_fine = ?;
      `;
      const paramsSelectLavoro = [
        `${giorno}`, 
        `${ora_inizio}`, 
        `${minuto_inizio}`, 
        `${ora_fine}`, 
        `${minuto_fine}`
      ];
      const selectResult = await executeQuery(sqlSelectLavoro, paramsSelectLavoro);
      const id_lavoro = selectResult[0].id;

      // Esegui la query per inserire prenotazione o impegno
      if (parseInt(id_cliente) !== 0) {
        const sqlInsertPrenotazione = `
          INSERT INTO prenotazione (id_cliente, id_lavoro, descrizione, note)
          VALUES (?, ?, ?, ?);
        `;
        const paramsPrenotazione = [
          `${id_cliente}`, 
          `${id_lavoro}`, 
          `${descrizione}`, 
          `${note}`
        ];
        await executeQuery(sqlInsertPrenotazione, paramsPrenotazione);
      } else if (parseInt(id_professionista) !== 0) {
        const sqlInsertImpegno = `
          INSERT INTO impegno (id_professionista, id_lavoro, descrizione, note)
          VALUES (?, ?, ?, ?);
        `;
        const paramsImpegno = [
          `${id_professionista}`, 
          `${id_lavoro}`, 
          `${descrizione}`, 
          `${note}`
        ];
        await executeQuery(sqlInsertImpegno, paramsImpegno);
      }

      res.sendStatus(200);

    } else {
      console.error('Errore durante l\'inserimento del lavoro: ', err);
      return res.status(500).json({ message: 'Errore del server.' });
    }
  }
});



/**
 * Visualizza lavori 
 */
// app.post("/VISUALIZZA_LAVORI", async (req, res) => {
//   let { 
//     nome_cliente = '', cognome_cliente = '', nome_professionista = '', professione = '',  
//     primo_giorno = '', ultimo_giorno = '', descrizione = '', note = '',
//   } = req.body;

//   if(primo_giorno === '')
//     primo_giorno = '1111-01-01';
//   if(ultimo_giorno === '')
//     ultimo_giorno = '9999-01-01';

//   console.log("Dati ricevuti per la ricerca dei lavori: ", { 
//     nome_cliente, cognome_cliente, nome_professionista, professione, primo_giorno, ultimo_giorno, descrizione, note
//   });

//   const sql = `
//   Vorrei ottenere una sql tale che, ottiene una lista formata da impegni e prenotazioni e devo avere, per ogni elemento della lista:
//   [nome_cliente, cognome_cliente, nome_professionista, professione, giorno, ora_inizio, minuto_inizio, ora_fine, minuto_fine, descrizione, note]
//   `;
// //   const sql = `
// //   SELECT 
// //     0 AS tipo_selezione, 
// //     l.id AS id, 
// //     l.descrizione AS descrizione, 
// //     l.giorno AS giorno, 
// //     l.orario_inizio AS orario_inizio, 
// //     l.orario_fine AS orario_fine, 
// //     IFNULL(NULLIF(l.note, ''), 'Nota non inserita.') AS note, 
// //     l.id_cliente AS id_cliente, 
// //     c.nome AS nome_cliente, 
// //     c.cognome AS cognome_cliente, 
// //     l.id_professionista AS id_professionista, 
// //     p.nome AS nome_professionista, 
// //     p.professione AS professione,
// //     CASE 
// //       WHEN l.id_cliente IS NOT NULL THEN 'Lavoro cliente'
// //       WHEN l.id_professionista IS NOT NULL THEN 'Lavoro professionista'
// //       ELSE 'Lavoro'
// //     END AS tipo_lavoro
// //   FROM 
// //     lavoro AS l 
// //     LEFT JOIN cliente AS c ON c.id = l.id_cliente 
// //     LEFT JOIN professionista AS p ON p.id = l.id_professionista 
// //   WHERE 
// //     (l.descrizione LIKE ?) AND (l.giorno BETWEEN ? AND ?) AND (l.note LIKE ?) 
// //     AND ((c.nome LIKE ? AND c.cognome LIKE ?) OR (p.nome LIKE ?));
// // `;


// //   const params = [`${descrizione}%`, `${primo_giorno}%`, `${ultimo_giorno}%`, `${note}%`, `${nome_cliente}%`, `${cognome_cliente}%`, `${nome_professionista}%`];

// //   return getResults(sql, params, res);
// });
app.post("/VISUALIZZA_LAVORI", async (req, res) => {
  let { 
    nome_cliente = '', cognome_cliente = '', nome_professionista = '', professione = '',  
    primo_giorno = '', ultimo_giorno = '', descrizione = '', note = '',
  } = req.body;

  if(primo_giorno === '')
    primo_giorno = '1111-01-01';
  if(ultimo_giorno === '')
    ultimo_giorno = '9999-01-01';

  console.log("Dati ricevuti per la ricerca dei lavori: ", { 
    nome_cliente, cognome_cliente, nome_professionista, professione, primo_giorno, ultimo_giorno, descrizione, note
  });

  const sql = `
    SELECT 
      0 AS tipo_selezione, 
      c.nome AS nome_cliente,
      c.cognome AS cognome_cliente,
      p.nome AS nome_professionista,
      p.professione,
      l.giorno,
      l.ora_inizio,
      l.minuto_inizio,
      l.ora_fine,
      l.minuto_fine,
      CASE 
        WHEN pr.descrizione IS NULL AND im.descrizione IS NULL THEN 'Descrizione non inserita'
        ELSE COALESCE(pr.descrizione, im.descrizione) 
      END AS descrizione,
      CASE 
        WHEN pr.note IS NULL AND im.note IS NULL THEN 'Note non inserite'
        ELSE COALESCE(pr.note, im.note)
      END AS note
    FROM
      lavoro l
    LEFT JOIN prenotazione pr ON l.id = pr.id_lavoro
    LEFT JOIN cliente c ON pr.id_cliente = c.id
    LEFT JOIN impegno im ON l.id = im.id_lavoro
    LEFT JOIN professionista p ON im.id_professionista = p.id
    WHERE
      (c.nome LIKE CONCAT('%', ?, '%') OR ? = '')
      AND (c.cognome LIKE CONCAT('%', ?, '%') OR ? = '')
      AND (p.nome LIKE CONCAT('%', ?, '%') OR ? = '')
      AND (p.professione LIKE CONCAT('%', ?, '%') OR ? = '')
      AND l.giorno BETWEEN ? AND ?
      AND (COALESCE(pr.descrizione, im.descrizione) LIKE CONCAT('%', ?, '%') OR ? = '')
      AND (COALESCE(pr.note, im.note) LIKE CONCAT('%', ?, '%') OR ? = '')
    ORDER BY l.giorno, l.ora_inizio, l.minuto_inizio;
  `;

  const params = [
    `${nome_cliente}`, `${nome_cliente}`,
    `${cognome_cliente}`, `${cognome_cliente}`,
    `${nome_professionista}`, `${nome_professionista}`,
    `${professione}`, `${professione}`,
    `${primo_giorno}`, `${ultimo_giorno}`,
    `${descrizione}`, `${descrizione}`,
    `${note}`, `${note}`
  ];

  try {
    const result = await executeQuery(sql, params);
    res.json(result);
  } catch (err) {
    console.error('Errore durante la visualizzazione dei lavori: ', err);
    return res.status(500).json({ message: 'Errore del server.' });
  }
});


/**
 * Elimina lavori
 */
app.post("/ELIMINA_LAVORI", async (req, res) => {
  const { ids = [] } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per l\'eliminazione: ", ids);

  // Creare una stringa di parametri di placeholder per la query
  const placeholders = ids.map(() => '?').join(', ');
  
  const sql = ` 
    DELETE FROM 
      lavoro 
    WHERE 
      id IN (${placeholders}); 
  `;
  
  return getResults(sql, ids, res);
});

/**
 * Elimina lavori range giorni
 */
app.post("/ELIMINA_LAVORI_RANGE_GIORNI", async (req, res) => {
  let { primo_giorno = '', ultimo_giorno = '' } = req.body;

  if (primo_giorno === "")
    primo_giorno = "1111-01-01";
  if (ultimo_giorno === "")
    ultimo_giorno = "9999-01-01";

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per l\'eliminazione: ", [primo_giorno, ultimo_giorno]);

  const sql = ` 
    DELETE FROM 
      lavoro 
    WHERE 
      giorno BETWEEN ? AND ?; 
  `;

  const params = [`${primo_giorno}`, `${ultimo_giorno}`];

  return getResults(sql, params, res);
});

app.post("/MODIFICA_LAVORI", async (req, res) => {
  const [id, descrizione, giorno, orario_inizio, orario_fine, note] = [
    req.body.id, req.body.descrizione, req.body.giorno, req.body.orario_inizio, req.body.orario_fine, req.body.note
  ];

  const giornoFormattato = new Date(giorno).toISOString().slice(0, 10);

  // note = (note === "Nota non inserita.") ? null : note;
  
  console.log("Dati ricevuti per la modifica: ", [id, descrizione, giornoFormattato, orario_inizio, orario_fine, note]);

  const sql = ` 
    UPDATE 
      lavoro 
    SET 
      descrizione = ?, giorno = ?, orario_inizio = ?, orario_fine = ?, note = ? 
    WHERE 
      id = ?; 
  `;

  const params = [`${descrizione}`, `${giornoFormattato}`, `${orario_inizio}`, `${orario_fine}`, `${note}`, `${id}`];
  
  return getResults(sql, params, res);
});


/*************************************************************************************************************/









