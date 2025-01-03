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
  } catch (err) {
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
  console.log("Dati ricevuti per il login: ", req.body);

  const sql = ` 
    SELECT 
      \`username\`, \`ruolo\`, \`note\`, \`password\`, \`salt_hex\` 
    FROM 
      \`utente\` 
    WHERE 
      \`username\` = ?; 
  `;

  const params = [`${username}`, `${password}`];

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
  
  return getResults(sql, params, res);
});

/**
 * Visualizza clienti:
 */
app.post("/VISUALIZZA_CLIENTI", async (req, res) => {
  const { nome = '', cognome = '', contatto = '', note = '' } = req.body;
  
  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per la ricerca:", req.body);

  const sql = `
    SELECT 
      id, nome, cognome, contatto, note, 0 AS tipo_selezione
    FROM 
      cliente 
    WHERE 
      nome LIKE ? AND cognome LIKE ? AND contatto LIKE ? AND note LIKE ?;
  `;

  const params = [`${nome}%`, `${cognome}%`, `${contatto}%`, `${note}%`];

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

  return getResults(sql, params, res);
});

/**
 * Elimina clienti
 */
app.post("/ELIMINA_CLIENTI", async (req, res) => {
  const { params = [] } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per la ricerca:", req.body);

  // Creare una stringa di parametri di placeholder per la query
  const placeholders = params.map(() => '?').join(', ');
  
  const sql = ` 
    DELETE FROM 
      cliente 
    WHERE 
      id IN (${placeholders}); 
  `;

  return getResults(sql, params, res);
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
app.post("/INSERISCI_PROFESSIONISTA", async (req, res) => {
  const { nome = '', professione = '', contatto = '', email = '', note = '' } = req.body;
  
  const sql = ` 
    INSERT INTO professionista (nome, professione, contatto, email, note) 
    VALUES (?, ?, ?, ?, ?); 
  `;

  const params = [`${nome}`, `${professione}`, `${contatto}`, `${email}`, `${note}`];
  
  return getResults(sql, params, res);
});

/**
 * Visualizza professionisti 
 */
app.post("/VISUALIZZA_PROFESSIONISTI", async (req, res) => {
  const { nome = '', professione = '', contatto = '', email = '', note = '' } = req.body;

  const sql = ` 
    SELECT 
      id, nome, professione, contatto, email, note 
    FROM 
      professionista 
    WHERE 
      nome LIKE ? AND professione LIKE ? AND contatto LIKE ? AND email LIKE ? AND note LIKE ?; 
  `;

  const params = [`${nome}%`, `${professione}%`, `${contatto}%`, `${email}%`, `${note}%`];
  
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

  const params = [];

  return getResults(sql, params, res);
});

/**
 * Elimina professionisti
 */
app.post("/ELIMINA_PROFESSIONISTI", async (req, res) => {
  const { params = [] } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per l\'eliminazione: ", req.body);

  // Creare una stringa di parametri di placeholder per la query
  const placeholders = params.map(() => '?').join(', ');

  const sql = ` 
    DELETE FROM 
      professionista 
    WHERE 
      id IN (${placeholders}); 
  `;

  return getResults(sql, params, res);
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
app.post("/INSERISCI_LAVORO", async (req, res) => {
  const { descrizione = '', giorno = '', orario_inizio = '', orario_fine = '', note = '', id_cliente = '', id_professionista = '' } = req.body;
  
  const sql = ` 
    INSERT INTO lavoro (descrizione, giorno, orario_inizio, orario_fine, note, id_cliente, id_professionista) 
    VALUES (?, ?, ?, ?, ?, ?, ?); 
  `;
  
  let params;

  if(id_cliente !== '' && id_cliente !== null)
    params = [`${descrizione}`, `${giorno}`, `${orario_inizio}`, `${orario_fine}`, `${note}`, `${id_cliente}`, null];
  else
    params = [`${descrizione}`, `${giorno}`, `${orario_inizio}`, `${orario_fine}`, `${note}`, null, `${id_professionista}`];
  
  return getResults(sql, params, res);
});

/**
 * Visualizza lavori clienti
 */
app.post("/VISUALIZZA_LAVORI_CLIENTI", async (req, res) => {
  let { 
    nome_cliente = '', cognome_cliente = '', nome_professionista = '', professione = '', 
    descrizione = '', primo_giorno = '', ultimo_giorno = '', note = '',
  } = req.body;

  if(primo_giorno === '')
    primo_giorno = '1111-01-01';
  if(ultimo_giorno === '')
    ultimo_giorno = '9999-01-01';

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per la ricerca dei lavori dei clienti: ", { 
    nome_cliente, cognome_cliente, nome_professionista, professione, 
    descrizione, primo_giorno, ultimo_giorno, note,
  });

  const sql = `
    SELECT 
      l.id AS id, l.descrizione AS descrizione, 
      l.giorno AS giorno, 
      l.orario_inizio AS orario_inizio, 
      l.orario_fine AS orario_fine, 
      l.note AS note, l.id_cliente AS id_cliente, c.nome AS nome_cliente, c.cognome AS cognome_cliente 
    FROM cliente AS c 
    INNER JOIN lavoro AS l 
      ON c.id = l.id_cliente 
    WHERE 
      (l.descrizione LIKE ?) AND (l.giorno BETWEEN ? AND ?) AND (l.note LIKE ?) AND 
      (c.nome LIKE ?) AND (c.cognome LIKE ?); 
  `;

  const params = [`${descrizione}%`, `${primo_giorno}%`, `${ultimo_giorno}%`, `${note}%`, `${nome_cliente}%`, `${cognome_cliente}%`];

  return getResults(sql, params, res);
});

/**
 * Visualizza lavori professionisti
 */
app.post("/VISUALIZZA_LAVORI_PROFESSIONISTI", async (req, res) => {
  let { 
    nome_cliente = '', cognome_cliente = '', nome_professionista = '', professione = '', 
    descrizione = '', primo_giorno = '', ultimo_giorno = '', note = '',
  } = req.body;

  if (primo_giorno === '')
    primo_giorno = '1111-01-01';
  if (ultimo_giorno === '')
    ultimo_giorno = '9999-01-01';

  // Aggiungo un log per vedere i dati ricevuti
  console.log("Dati ricevuti per la ricerca dei lavori dei professionisti: ", { 
    nome_cliente, cognome_cliente, nome_professionista, professione, 
    descrizione, primo_giorno, ultimo_giorno, note,
  });

  const sql = `
    SELECT 
      l.id AS id, l.descrizione AS descrizione, 
      l.giorno AS giorno, 
      l.orario_inizio AS orario_inizio, 
      l.orario_fine AS orario_fine, 
      l.note AS note, l.id_professionista AS id_professionista, p.nome AS nome_professionista, p.professione AS professione 
    FROM professionista AS p 
    INNER JOIN lavoro AS l 
      ON p.id = l.id_professionista 
    WHERE 
      (l.descrizione LIKE ?) AND (l.giorno BETWEEN ? AND ?) AND (l.note LIKE ?) AND 
      (p.nome LIKE ?) AND (p.professione LIKE ?); 
  `;

  const params = [`${descrizione}%`, `${primo_giorno}%`, `${ultimo_giorno}%`, `${note}%`, `${nome_professionista}%`, `${professione}%`];

  return getResults(sql, params, res);
});

/**
 * Elimina lavori
 */
app.post("/ELIMINA_LAVORI", async (req, res) => {
  const { params = [] } = req.body;

  // Aggiungi un log per vedere i dati ricevuti
  console.log("Dati ricevuti per l\'eliminazione: ", req.body);

  // Creare una stringa di parametri di placeholder per la query
  const placeholders = params.map(() => '?').join(', ');
  
  const sql = ` 
    DELETE FROM 
      lavoro 
    WHERE 
      id IN (${placeholders}); 
  `;
  
  return getResults(sql, params, res);
});

/**
 * Elimina lavori range giorni
 */
app.post("/ELIMINA_LAVORI_RANGE_GIORNI", async (req, res) => {
  const { primo_giorno = '', ultimo_giorno = '' } = req.body;

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

  // Parsing e formattazione della data
  const giornoFormattato = new Date(giorno).toISOString().slice(0, 10);
  
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









