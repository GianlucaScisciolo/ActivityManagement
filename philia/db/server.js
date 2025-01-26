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

// const executeQuery = (sql, params) => {
//   return new Promise((resolve, reject) => {
//     db.query(sql, params, (err, data) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(data);
//     });
//   });
// };
const executeQuery = (sql, params, connection = db) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const beginTransaction = (connection = db) => {
  return new Promise((resolve, reject) => {
    connection.beginTransaction(err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

const commitTransaction = (connection = db) => {
  return new Promise((resolve, reject) => {
    connection.commit(err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

const rollbackTransaction = (connection = db) => {
  return new Promise((resolve) => {
    connection.rollback(() => {
      return resolve();
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

  console.log("Dati ricevuti per l'inserimento:", req.body);

  const sql = ` 
    INSERT INTO cliente (nome, cognome, contatto, note) 
    VALUES (?, ?, ?, ?); 
  `;

  const params = [`${nome}`, `${cognome}`, `${contatto}`, `${note}`];
  
  try {
    const result = await executeQuery(sql, params);
    const insertedId = result.insertId; // ottengo l'id inserito
    return res.status(201).json({ message: 'Cliente inserito con successo', id: insertedId });
  } 
  catch (err) {
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
    const result = await executeQuery(sql, params);
    const insertedId = result.insertId; // ottengo l'id inserito
    return res.status(201).json({ message: 'Professionista inserito con successo', id: insertedId });
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

  console.log("id_cliente: " + id_cliente + "\n" + "id_professionista: " + id_professionista + "\n" + 
              "descrizione: " + descrizione + "\n" + "giorno: " + giorno + "\n" + "ora_inizio: " + ora_inizio + "\n" + 
              "minuto_inizio: " + minuto_inizio + "\n" + "ora_fine: " + ora_fine + "\n" + 
              "minuto_fine: " + minuto_fine + "\n" + "note: " + note
  );

  const sql_inserimento_lavoro = `
    INSERT INTO lavoro (giorno, ora_inizio, minuto_inizio, ora_fine, minuto_fine) 
    VALUES (?, ?, ?, ?, ?);
  `

  const sql_selezione_lavoro = `
    SELECT 
      id 
    FROM 
      lavoro 
    WHERE 
      giorno = ? AND ora_inizio = ? AND minuto_inizio = ? AND ora_fine = ? AND minuto_fine = ?;
  `;

  const sql_inserimento_prenotazione = `
    INSERT INTO prenotazione (id_cliente, id_lavoro, descrizione, note) 
    VALUES (?, ?, ?, ?);
  `

  const sql_inserimento_impegno = `
    INSERT INTO impegno (id_professionista, id_lavoro, descrizione, note) 
    VALUES (?, ?, ?, ?);
  `

  const parametri_inserimento_lavoro = [
    `${giorno}`, 
    `${ora_inizio}`, 
    `${minuto_inizio}`, 
    `${ora_fine}`, 
    `${minuto_fine}`
  ];

  const parametri_selezione_lavoro = [
    `${giorno}`, 
    `${ora_inizio}`, 
    `${minuto_inizio}`, 
    `${ora_fine}`, 
    `${minuto_fine}`
  ];

  let id_lavoro = 0;

  // Inserimento lavoro ed ottenimento suo id. Se già presente ottengo il suo id con una ricerca.
  try {
    const risultato_inserimento_lavoro = await executeQuery(sql_inserimento_lavoro, parametri_inserimento_lavoro);
    id_lavoro = risultato_inserimento_lavoro.insertId;
  }
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      try {
        const selectResult = await executeQuery(sql_selezione_lavoro, parametri_selezione_lavoro);
        id_lavoro = selectResult[0].id;
      }
      catch (err) {
        console.error('Errore durante l\'inserimento del lavoro: ', err);
        return res.status(500).json({ message: 'Errore del server.' });
      }
    }
    else {
      console.error('Errore durante l\'inserimento del lavoro: ', err);
      return res.status(500).json({ message: 'Errore del server.' });
    }
  }

  const parametri_inserimento_prenotazione = [
    `${id_cliente}`, 
    `${id_lavoro}`, 
    `${descrizione}`, 
    `${note}`
  ];

  const parametri_inserimento_impegno = [
    `${id_professionista}`, 
    `${id_lavoro}`, 
    `${descrizione}`, 
    `${note}`
  ];
  
  console.log("id_lavoro: " + id_lavoro);

  try {
    // Inserimento prenotazione
    if(parseInt(id_cliente) !== 0) {
      const risultato_inserimento_prenotazione = await executeQuery(sql_inserimento_prenotazione, parametri_inserimento_prenotazione);
    }
    // inserimento impegno
    else if(parseInt(id_professionista) !== 0) {
      const risultato_inserimento_impegno = await executeQuery(sql_inserimento_impegno, parametri_inserimento_impegno);
    }
  }
  catch(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Errore, lavoro gia\' presente' });
    }
    console.error('Errore durante l\'inserimento del lavoro: ', err);
    return res.status(500).json({ message: 'Errore del server' });
  }
  
  // Restituisce l'id del lavoro nel response
  return res.status(200).json({ id_lavoro: id_lavoro });
});


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

  let notePrenotazioneSQL = (note === "") ? ` AND (p.note LIKE ? OR p.note IS NULL) ` : ` AND p.note LIKE ? `;
  let noteImpegnoSQL = (note === "") ? ` AND (i.note LIKE ? OR i.note IS NULL) ` : ` AND i.note LIKE ? `;
  
  const sql = `
    ( 
      SELECT 
        0 AS tipo_selezione, 
        c.id AS id_cliente, 
        0 AS id_professionista, 
        l.id AS id_lavoro, 
        c.nome AS nome_cliente, 
        c.cognome AS cognome_cliente, 
        null AS nome_professionista, 
        null AS professione, 
        l.giorno AS giorno, 
        l.ora_inizio AS ora_inizio, 
        l.minuto_inizio AS minuto_inizio, 
        l.ora_fine AS ora_fine, 
        l.minuto_fine AS minuto_fine, 
        p.descrizione AS descrizione, 
        COALESCE(p.note, "Note non inserite") AS note 
      FROM
        lavoro l 
        LEFT JOIN prenotazione p ON l.id = p.id_lavoro 
        LEFT JOIN cliente c ON p.id_cliente = c.id 
      WHERE 
        c.nome LIKE ? 
        AND c.cognome LIKE ? 
        AND (l.giorno BETWEEN ? AND ?) 
        AND p.descrizione LIKE ? 
        ${notePrenotazioneSQL} 
    )
    UNION ( 
      SELECT 
        0 AS tipo_selezione, 
        0 AS id_cliente, 
        p.id AS id_professionista, 
        l.id AS id_lavoro, 
        null AS nome_cliente, 
        null AS cognome_cliente, 
        p.nome AS nome_professionista, 
        p.professione AS professione, 
        l.giorno AS giorno, 
        l.ora_inizio AS ora_inizio, 
        l.minuto_inizio AS minuto_inizio, 
        l.ora_fine AS ora_fine, 
        l.minuto_fine AS minuto_fine, 
        i.descrizione AS descrizione, 
        COALESCE(i.note, "Note non inserite") AS note 
      FROM 
        lavoro l 
        LEFT JOIN impegno i ON l.id = i.id_lavoro 
        LEFT JOIN professionista p ON i.id_professionista = p.id 
      WHERE 
        p.nome LIKE ? 
        AND p.professione LIKE ? 
        AND (l.giorno BETWEEN ? AND ?) 
        AND i.descrizione LIKE ? 
        ${noteImpegnoSQL} 
    );
  `;

  /*
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
  */

  // c.nome LIKE ? AND c.cognome LIKE ? AND (l.giorno BETWEEN ? AND ?) AND p.descrizione LIKE ? AND p.note LIKE ? 
  // p.nome LIKE ? AND p.professione LIKE ? AND (l.giorno BETWEEN ? AND ?) AND i.descrizione LIKE ? AND i.note LIKE ? 
  const params = [
    `${nome_cliente}%`, `${cognome_cliente}%`, `${primo_giorno}%`, `${ultimo_giorno}%`, `${descrizione}%`, `${note}%`, 
    `${nome_professionista}%`, `${professione}%`, `${primo_giorno}%`, `${ultimo_giorno}%`, `${descrizione}%`, `${note}%`, 
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
  let ids_prenotazioni = [], ids_impegni = [];

  console.log("Dati ricevuti per l'eliminazione: ", ids);

  for (let i = 0; i < ids.length; i++) {
    if (ids[i][1] !== 0) ids_prenotazioni.push([ids[i][0], ids[i][1]]);
    if (ids[i][2] !== 0) ids_impegni.push([ids[i][0], ids[i][2]]);
  }

  console.log("Ids prenotazioni: ", ids_prenotazioni);
  console.log("Ids impegni: ", ids_impegni);

  const placeholders_prenotazioni = ids_prenotazioni.map(() => `(?, ?)`).join(", ");
  const placeholders_impegni = ids_impegni.map(() => `(?, ?)`).join(", ");

  const sqlPrenotazioni = `
    DELETE FROM prenotazione WHERE (id_lavoro, id_cliente) IN (${placeholders_prenotazioni});
  `;
  const sqlImpegni = `
    DELETE FROM impegno WHERE (id_lavoro, id_professionista) IN (${placeholders_impegni});
  `;

  try {
    await beginTransaction();

    // Esegui la query per le prenotazioni
    if (ids_prenotazioni.length > 0) {
      await executeQuery(sqlPrenotazioni, ids_prenotazioni.flat());
    }

    // Esegui la query per gli impegni
    if (ids_impegni.length > 0) {
      await executeQuery(sqlImpegni, ids_impegni.flat());
    }

    await commitTransaction();
    res.sendStatus(200);
  } 
  catch (err) {
    await rollbackTransaction();
    console.error('Errore durante l\'eliminazione dei lavori: ', err);
    res.status(500).json({ message: 'Errore del server.' });
  }
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
  const sql_selezione_lavoro = `
    SELECT id AS id_lavoro 
    FROM lavoro 
    WHERE giorno = ? AND ora_inizio = ? AND minuto_inizio = ? AND ora_fine = ? AND minuto_fine = ?; 
  `;

  const sql_inserimento_lavoro = ` 
    INSERT INTO lavoro (giorno, ora_inizio, minuto_inizio, ora_fine, minuto_fine) 
    VALUES (?, ?, ?, ?, ?);
  `;

  const sql_modifica_prenotazione = `
    UPDATE prenotazione 
    SET id_lavoro = ?, descrizione = ?, note = ? 
    WHERE id_cliente = ? AND id_lavoro = ?; 
  `;

  const sql_modifica_impegno = `
    UPDATE impegno 
    SET id_lavoro = ?, descrizione = ?, note = ? 
    WHERE id_professionista = ? AND id_lavoro = ?; 
  `;

  let ids_lavori = [];
  try {
    for (let lavoro of req.body) {
      console.log(lavoro);
      await beginTransaction();
      console.log("START");
      console.log(1);

      const giorno = new Date(lavoro.giorno).toISOString().split('T')[0];
      console.log(2);
      let parametri_selezione_lavoro = [
        `${giorno}`, `${lavoro.ora_inizio}`, `${lavoro.minuto_inizio}`, 
        `${lavoro.ora_fine}`, `${lavoro.minuto_fine}`
      ];
      console.log(3);
      let parametri_inserimento_lavoro = [
        `${giorno}`, `${lavoro.ora_inizio}`, `${lavoro.minuto_inizio}`, 
        `${lavoro.ora_fine}`, `${lavoro.minuto_fine}`
      ];
      console.log(4);
      let resultSQL = await executeQuery(sql_selezione_lavoro, parametri_selezione_lavoro);
      let id_lavoro;
      console.log("---------------------" + resultSQL.length);
      if (resultSQL.length > 0) {
        console.log("|||||||||||||||||||||||");
        id_lavoro = resultSQL[0].id_lavoro;
        console.log("|||||||||||||||||||||||" + id_lavoro);
      } 
      else {
        await executeQuery(sql_inserimento_lavoro, parametri_inserimento_lavoro);
        resultSQL = await executeQuery(sql_selezione_lavoro, parametri_selezione_lavoro);
        id_lavoro = resultSQL[0].id_lavoro;
      }
      console.log(5);

      let parametri_modifica_prenotazione = [
        id_lavoro, `${lavoro.descrizione}`, `${lavoro.note}`, `${lavoro.id_cliente}`, `${lavoro.id_lavoro}`
      ];
      console.log(6);
      let parametri_modifica_impegno = [
        id_lavoro, `${lavoro.descrizione}`, `${lavoro.note}`, `${lavoro.id_professionista}`, `${lavoro.id_lavoro}`
      ];
      console.log(7);

      if (lavoro.id_cliente !== 0) {
        await executeQuery(sql_modifica_prenotazione, parametri_modifica_prenotazione);
      } 
      else if (lavoro.id_professionista !== 0) {
        await executeQuery(sql_modifica_impegno, parametri_modifica_impegno);
      }
      console.log(8);
      ids_lavori.push(id_lavoro);
      console.log(9);
    }
    await commitTransaction();
    console.log(10);
    console.log(ids_lavori);
    return res.status(200).json({ ids_lavori: ids_lavori });
  } 
  catch (err) {
    console.log(11)
    await rollbackTransaction();
    console.log(12)
    console.error('Errore durante la modifica dei lavori: ', err);
    console.log(13)
    return res.status(500).json({ message: 'Errore del server.' });
  }
});

/*************************************************************************************************************/









