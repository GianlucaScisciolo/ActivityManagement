import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import { SQL_SELECT_UTENTE } from './AutenticazioneSQL.js';
import { SQL_INSERIMENTO_CLIENTE, SQL_SELEZIONE_CLIENTI } from './PersonaSQL.js';
import { SQL_INSERIMENTO_SERVIZIO, SQL_SELEZIONE_SERVIZI } from './ServizioSQL.js';
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

db.connect(err => {
  if (err) {
    console.error('Errore di connessione al database:', err.stack);
    return;
  }
  console.log('Connesso al database.');
});

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

app.post("/LOGIN", async (req, res) => {
  const params = [req.body.username];

  try {
    await beginTransaction();

    const [utentiResult] = await executeQuery(SQL_SELECT_UTENTE, params);

    await commitTransaction();

    const utente = utentiResult;
    console.log(utente);
    
    return res.status(200).json({ utente: utente });
  } 
  catch (err) {
    await rollbackTransaction();
    console.error('Errore durante il login: ', err);
    return res.status(500).json({ message: 'Errore del server.', error: err.message });
  }
});

app.post("/MODIFICA_PROFILO", async (req, res) => {

  console.log("Dati ricevuti per la modifica:");
  console.log(`
    username_attuale: ${req.body.username_attuale}
    password_attuale: ${req.body.password_attuale}
    nuove_note: ${req.body.nuove_note}
    nuova_password: ${req.body.nuova_password}
    nuovo_salt_hex: ${req.body.nuovo_salt_hex}
    num_lavori_clienti: ${req.body.num_lavori_clienti}
  `);
  
  const sql_modifica_utente = `
    UPDATE 
      \`utente\` 
    SET 
      \`username\` = ?, 
      \`note\` = ? 
      ${req.body.nuova_password !== "" ? ", \`password\` = ?, \`salt_hex\` = ? " : ""} 
    WHERE 
      \`username\` = ? AND \`password\` = ?; 
  `;

  const sql_modifica_salone = `
    UPDATE 
      \`salone\` 
    SET 
      \`num_lavori_clienti\` = ?  
    WHERE 
      \`username_utente\` = ?; 
  `;
  
  const params_sql_modifica_utente = [
    `${req.body.nuovo_username}`, 
    `${req.body.nuove_note}` 
  ];
  if (req.body.nuova_password !== "") {
    params_sql_modifica_utente.push(`${req.body.nuova_password}`); 
    params_sql_modifica_utente.push(`${req.body.nuovo_salt_hex}`); 
  }
  params_sql_modifica_utente.push(`${req.body.username_attuale}`); 
  params_sql_modifica_utente.push(`${req.body.password_attuale}`); 

  const params_sql_modifica_salone = [
    `${req.body.num_lavori_clienti}`, 
    `${req.body.nuovo_username}` 
  ]

  try {
    await beginTransaction();

    await executeQuery(sql_modifica_utente, params_sql_modifica_utente);
    await executeQuery(sql_modifica_salone, params_sql_modifica_salone);

    await commitTransaction();

    return res.status(200);
  } 
  catch (err) {
    await rollbackTransaction();
    console.error('Errore durante il login: ', err);
    return res.status(500).json({ message: 'Errore del server.' });
  }
});

/*************************************************************************************************************/

/************************************************** Persona **************************************************/

app.post("/INSERISCI_CLIENTE", async (req, res) => {
  const params = [
    `${req.body.nome}`, 
    `${req.body.cognome}`, 
    `${(req.body.contatto) ? req.body.contatto : "Contatto non inserito."}`, 
    `${(req.body.email) ? req.body.email : "Email non inserita."}`, 
    `${req.body.note}`
  ];
    
  try {
    const result = await executeQuery(SQL_INSERIMENTO_CLIENTE, params);
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

app.post("/VISUALIZZA_CLIENTI", async (req, res) => {
  console.log(req.body.email);
  const params = [`%${req.body.nome}%`, `%${req.body.cognome}%`, `%${req.body.contatto}%`, `%${req.body.email}%`];
  params.push((!req.body.note) ? '%' : `%${req.body.note}%`);

  return getResults(SQL_SELEZIONE_CLIENTI(req.body.note), params, res);
});

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

app.post("/ELIMINA_CLIENTI", async (req, res) => {
  const { ids = [] } = req.body;

  console.log("Dati ricevuti per l\'eliminazione:", [ids]);

  const placeholders = ids.map(() => '?').join(', ');
  
  const sql = ` 
    DELETE FROM 
      cliente 
    WHERE 
      id IN (${placeholders}); 
  `;

  return getResults(sql, ids, res);
});

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

/*********************************************** Servizi **********************************************/

app.post("/INSERISCI_SERVIZIO", async (req, res) => {
  const params = [
    `${req.body.nome}`, 
    `${req.body.prezzo}`, 
    `${req.body.note}`, 
  ];
    
  try {
    const result = await executeQuery(SQL_INSERIMENTO_SERVIZIO, params);
    return res.status(201).json({ message: 'Cliente inserito con successo', id: result.insertId });
  } 
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Errore, servizio gia\' presente.' });
    }
    console.error('Errore durante l\'inserimento del servizio: ', err);
    return res.status(500).json({ message: 'Errore del server' });
  }
});

app.post("/VISUALIZZA_SERVIZI", async (req, res) => {
  const prezzo_min = (req.body.prezzo_min) ? req.body.prezzo_min : Number.MIN_VALUE;
  const prezzo_max = (req.body.prezzo_max) ? req.body.prezzo_max : Number.MAX_VALUE;
  console.log("|"+req.body.nome+"|");
  console.log(prezzo_min);
  console.log(prezzo_max);
  console.log("|"+req.body.note+"|");
  const params = [`%${req.body.nome}%`, `${prezzo_min}`, `${prezzo_max}`];
  params.push((!req.body.note) ? '%' : `%${req.body.note}%`);

  return getResults(SQL_SELEZIONE_SERVIZI(req.body.note), params, res);
});

/*************************************************************************************************************/

/*************************************************** Lavori **************************************************/

app.post("/INSERISCI_LAVORO", async (req, res) => {
  const sql_inserimento_lavoro = `
    INSERT INTO lavoro (giorno, orario_inizio) 
    VALUES (?, ?);
  `

  const sql_selezione_lavoro = `
    SELECT 
      id 
    FROM 
      lavoro 
    WHERE 
      giorno = ? AND orario_inizio = ?;
  `;

  const sql_inserimento_prenotazione = `
    INSERT INTO prenotazione (id_cliente, id_lavoro, descrizione, note) 
    VALUES (?, ?, ?, ?);
  `

  const sql_inserimento_impegno = `
    INSERT INTO impegno (id_professionista, id_lavoro, descrizione, note) 
    VALUES (?, ?, ?, ?);
  `

  const parametri_inserimento_lavoro = [`${req.body.giorno}`, `${req.body.orario_inizio}`];

  const parametri_selezione_lavoro = [`${req.body.giorno}`, `${req.body.orario_inizio}`];

  let id_lavoro = 0;

  try {
    const risultato_inserimento_lavoro = await executeQuery(sql_inserimento_lavoro, parametri_inserimento_lavoro);
    id_lavoro = risultato_inserimento_lavoro.insertId;
    console.log("------------------------- " + id_lavoro + " -----------------------------------")
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
    `${req.body.id_cliente}`, `${id_lavoro}`, `${req.body.descrizione}`, `${req.body.note}`
  ];
  const parametri_inserimento_impegno = [
    `${req.body.id_professionista}`, `${id_lavoro}`, `${req.body.descrizione}`, `${req.body.note}`
  ];

  try {
    // Inserimento prenotazione
    if(parseInt(req.body.id_cliente) !== 0) {
      await executeQuery(sql_inserimento_prenotazione, parametri_inserimento_prenotazione);
    }
    // inserimento impegno
    else if(parseInt(req.body.id_professionista) !== 0) {
      await executeQuery(sql_inserimento_impegno, parametri_inserimento_impegno);
    }
  }
  catch(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Errore, lavoro gia\' presente' });
    }
    console.error('Errore durante l\'inserimento del lavoro: ', err);
    return res.status(500).json({ message: 'Errore del server' });
  }
  
  return res.status(200).json({ id_lavoro: id_lavoro });
});

app.post("/VISUALIZZA_LAVORI", async (req, res) => {
  let primo_giorno = (req.body.primo_giorno) ? req.body.primo_giorno : "1111-01-01";
  let ultimo_giorno = (req.body.ultimo_giorno) ? req.body.ultimo_giorno : "9999-01-01";

  let notePrenotazioneSQL = (req.body.note === "") ? ` AND (p.note LIKE ? OR p.note IS NULL) ` : ` AND p.note LIKE ? `;
  let noteImpegnoSQL = (req.body.note === "") ? ` AND (i.note LIKE ? OR i.note IS NULL) ` : ` AND i.note LIKE ? `;

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
        l.orario_inizio AS orario_inizio, 
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
        l.orario_inizio AS orario_inizio, 
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

  const params = [
    `${req.body.nome_cliente}%`, `${req.body.cognome_cliente}%`, `${primo_giorno}%`, 
    `${ultimo_giorno}%`, `${req.body.descrizione}%`, `${req.body.note}%`, 
    `${req.body.nome_professionista}%`, `${req.body.professione}%`, `${primo_giorno}%`, 
    `${ultimo_giorno}%`, `${req.body.descrizione}%`, `${req.body.note}%`, 
  ];

  try {
    const result = await executeQuery(sql, params);
    console.log(result);
    res.json(result);
  } 
  catch (err) {
    console.error('Errore durante la visualizzazione dei lavori: ', err);
    return res.status(500).json({ message: 'Errore del server.' });
  }
});

app.post("/OTTIENI_LAVORI_GIORNO", async (req, res) => {
  const sqlSetIds = `
    SET @ids := (
      SELECT 
        GROUP_CONCAT(\`id\`) 
      FROM 
        \`lavoro\` 
      WHERE 
        \`giorno\` = ?
    );
  `;

  const sqlSelectLavori = `
    SELECT 
      "lavoro_cliente" AS \`tipo_lavoro\`, 
      l.\`orario_inizio\` AS \`orario_inizio\` 
    FROM 
      \`prenotazione\` AS p 
      LEFT JOIN \`lavoro\` AS l ON p.\`id_lavoro\` = l.\`id\` 
    WHERE 
      FIND_IN_SET(p.\`id_lavoro\`, @ids); 
  `;

  const params = [`${req.body.giorno}`];

  try {
    await beginTransaction();
    
    await executeQuery(sqlSetIds, params);
    const lavoriGiornoSelezionato = await executeQuery(sqlSelectLavori);
    await commitTransaction();
    
    return res.status(200).json({ lavoriGiornoSelezionato: lavoriGiornoSelezionato });
    console.log(lavoriGiornoSelezionato);
  } 
  catch (err) {
    await rollbackTransaction();
    console.error('Errore durante l\'operazione: ', err);
    return res.status(500).json({ message: 'Errore del server.' });
  }
});


app.post("/ELIMINA_LAVORI", async (req, res) => {
  const { ids = [] } = req.body;
  let ids_prenotazioni = [], ids_impegni = [];

  // console.log("Dati ricevuti per l'eliminazione: ", ids);

  for (let i = 0; i < ids.length; i++) {
    if (ids[i][1] !== 0) ids_prenotazioni.push([ids[i][0], ids[i][1]]);
    if (ids[i][2] !== 0) ids_impegni.push([ids[i][0], ids[i][2]]);
  }

  // console.log("Ids prenotazioni: ", ids_prenotazioni);
  // console.log("Ids impegni: ", ids_impegni);

  const placeholders_prenotazioni = ids_prenotazioni.map(() => `(?, ?)`).join(", ");
  const placeholders_impegni = ids_impegni.map(() => `(?, ?)`).join(", ");

  const sqlEliminaPrenotazioni = `
    DELETE FROM prenotazione WHERE (id_lavoro, id_cliente) IN (${placeholders_prenotazioni});
  `;
  const sqlEliminaImpegni = `
    DELETE FROM impegno WHERE (id_lavoro, id_professionista) IN (${placeholders_impegni});
  `;

  try {
    await beginTransaction();

    if (ids_prenotazioni.length > 0) {
      await executeQuery(sqlEliminaPrenotazioni, ids_prenotazioni.flat());
    }

    // Eseguo la query per gli impegni
    if (ids_impegni.length > 0) {
      await executeQuery(sqlEliminaImpegni, ids_impegni.flat());
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

app.post("/ELIMINA_LAVORI_RANGE_GIORNI", async (req, res) => {
  let primo_giorno = (req.body.primo_giorno) ? req.body.primo_giorno : "1111-01-01";
  let ultimo_giorno = (req.body.ultimo_giorno) ? req.body.ultimo_giorno : "9999-01-01";

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
    WHERE giorno = ? AND orario_inizio = ?; 
  `;

  const sql_inserimento_lavoro = ` 
    INSERT INTO lavoro (giorno, orario_inizio) 
    VALUES (?, ?);
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
      await beginTransaction();
      // console.log("START");
      // console.log(1);

      const giorno = new Date(lavoro.giorno).toISOString().split('T')[0];
      // console.log(2);
      let parametri_selezione_lavoro = [`${giorno}`, `${lavoro.orario_inizio}`];
      // console.log(3);
      let parametri_inserimento_lavoro = [`${giorno}`, `${lavoro.orario_inizio}`];
      // console.log(4);
      let resultSQL = await executeQuery(sql_selezione_lavoro, parametri_selezione_lavoro);
      let id_lavoro;
      // console.log("---------------------" + resultSQL.length);
      if (resultSQL.length > 0) {
        // console.log("|||||||||||||||||||||||");
        id_lavoro = resultSQL[0].id_lavoro;
        // console.log("|||||||||||||||||||||||" + id_lavoro);
      } 
      else {
        await executeQuery(sql_inserimento_lavoro, parametri_inserimento_lavoro);
        resultSQL = await executeQuery(sql_selezione_lavoro, parametri_selezione_lavoro);
        id_lavoro = resultSQL[0].id_lavoro;
      }
      // console.log(5);

      let parametri_modifica_prenotazione = [
        id_lavoro, `${lavoro.descrizione}`, `${lavoro.note}`, `${lavoro.id_cliente}`, `${lavoro.id_lavoro}`
      ];
      // console.log(6);
      let parametri_modifica_impegno = [
        id_lavoro, `${lavoro.descrizione}`, `${lavoro.note}`, `${lavoro.id_professionista}`, `${lavoro.id_lavoro}`
      ];
      // console.log(7);

      if (lavoro.id_cliente !== 0) {
        await executeQuery(sql_modifica_prenotazione, parametri_modifica_prenotazione);
      } 
      else if (lavoro.id_professionista !== 0) {
        await executeQuery(sql_modifica_impegno, parametri_modifica_impegno);
      }
      // console.log(8);
      ids_lavori.push(id_lavoro);
      // console.log(9);
    }
    await commitTransaction();
    // console.log(10);
    // console.log(ids_lavori);
    return res.status(200).json({ ids_lavori: ids_lavori });
  } 
  catch (err) {
    // console.log(11)
    await rollbackTransaction();
    // console.log(12)
    console.error('Errore durante la modifica dei lavori: ', err);
    // console.log(13)
    return res.status(500).json({ message: 'Errore del server.' });
  }
});

/*************************************************************************************************************/









