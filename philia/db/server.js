import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import { 
  SQL_SELECT_UTENTE, SQL_MODIFICA_UTENTE 
} from './AutenticazioneSQL.js';
import { 
  SQL_INSERIMENTO_CLIENTE, SQL_SELEZIONE_CLIENTI, SQL_SELEZIONE_TUTTI_I_CLIENTI, SQL_ELIMINA_CLIENTI, SQL_MODIFICA_CLIENTE
} from './PersonaSQL.js';
import { 
  SQL_INSERIMENTO_SERVIZIO, SQL_SELEZIONE_SERVIZI, SQL_SELEZIONE_TUTTI_I_SERVIZI, SQL_ELIMINA_SERVIZI, SQL_MODIFICA_SERVIZIO 
} from './ServizioSQL.js'; 
import {
  SQL_INSERIMENTO_LAVORO, SQL_SELEZIONE_LAVORI, SQL_ELIMINA_LAVORI, SQL_MODIFICA_LAVORO
} from './LavoroSQL.js'
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
  const params = [`${req.body.username}`];
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
  const params = [
    `${req.body.nuovo_username}`, 
    `${req.body.nuove_note}` 
  ];
  if (req.body.nuova_password !== "") {
    params.push(`${req.body.nuova_password}`); 
    params.push(`${req.body.nuovo_salt_hex}`); 
  }
  params.push(`${req.body.username_attuale}`); 
  params.push(`${req.body.password_attuale}`); 
  try {
    await beginTransaction();
    await executeQuery(SQL_MODIFICA_UTENTE(req.body.nuova_password), params);
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
  const params = [];
  try {
    const data = await executeQuery(SQL_SELEZIONE_TUTTI_I_CLIENTI, []);
    res.status(200).json(data);
  } 
  catch (err) {
    console.error('Errore durante l\'esecuzione della query: ', err);
    res.status(500).json({ message: 'Errore durante l\'esecuzione della query' });
  }
});

app.post("/ELIMINA_CLIENTI", async (req, res) => {
  const { ids = [] } = req.body;
  const placeholders = ids.map(() => '?').join(', ');
  return getResults(SQL_ELIMINA_CLIENTI(placeholders), ids, res);
});

app.post("/MODIFICA_CLIENTI", async (req, res) => {
  const params = [`${req.body.contatto}`, `${req.body.email}`, `${req.body.note}`, `${req.body.id}`];
  return getResults(SQL_MODIFICA_CLIENTE, params, res);
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
  const params = [`%${req.body.nome}%`, `${prezzo_min}`, `${prezzo_max}`];
  params.push((!req.body.note) ? '%' : `%${req.body.note}%`);
  return getResults(SQL_SELEZIONE_SERVIZI(req.body.note), params, res);
});

app.post("/OTTIENI_TUTTI_I_SERVIZI", async (req, res) => {
  const params = [];
  try {
    const data = await executeQuery(SQL_SELEZIONE_TUTTI_I_SERVIZI, []);
    res.status(200).json(data);
  } 
  catch (err) {
    console.error('Errore durante l\'esecuzione della query: ', err);
    res.status(500).json({ message: 'Errore durante l\'esecuzione della query' });
  }
});

app.post("/ELIMINA_SERVIZI", async (req, res) => {
  const { ids = [] } = req.body;
  const placeholders = ids.map(() => '?').join(', ');
  return getResults(SQL_ELIMINA_SERVIZI(placeholders), ids, res);
});

app.post("/MODIFICA_SERVIZI", async (req, res) => {
  const params = [`${req.body.nome}`, `${req.body.prezzo}`, `${req.body.note}`, `${req.body.id}`];
  return getResults(SQL_MODIFICA_SERVIZIO, params, res);
});

/*************************************************************************************************************/

/*************************************************** Lavori **************************************************/

app.post("/INSERISCI_LAVORO", async (req, res) => {
  const params = [
    `${req.body.id_cliente}`, 
    `${req.body.giorno}`, 
    `${req.body.descrizione}`, 
    `${req.body.note}`, 
  ];
  try {
    const result = await executeQuery(SQL_INSERIMENTO_LAVORO, params);
    return res.status(200).json({ message: 'Lavoro inserito con successo', id: result.insertId });
  }
  catch (err) {
    console.error('Errore durante l\'inserimento del lavoro: ', err);
    return res.status(500).json({ message: 'Errore del server' });
  }
});

app.post("/VISUALIZZA_LAVORI", async (req, res) => {
  req.body.primo_giorno = (req.body.primo_giorno) ? req.body.primo_giorno : "1111-01-01";
  req.body.ultimo_giorno = (req.body.ultimo_giorno) ? req.body.ultimo_giorno : "9999-01-01";
  const params = [
    `%${req.body.nome_cliente}%`, `%${req.body.cognome_cliente}%`, 
    `${req.body.primo_giorno}`, `${req.body.ultimo_giorno}`, `%${req.body.descrizione}%` 
  ];
  params.push((!req.body.note) ? '%' : `%${req.body.note}%`);
  return getResults(SQL_SELEZIONE_LAVORI(req.body.note), params, res);
});

app.post("/ELIMINA_LAVORI", async (req, res) => {
  const { ids = [] } = req.body;
  const placeholders = ids.map(() => '?').join(', ');
  return getResults(SQL_ELIMINA_LAVORI(placeholders), ids, res);
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
  try {
    for(let servizio of req.body[1]) {
      for(let i = 0; i < req.body[0].length; i++) {
        if(req.body[0][i].id_servizi.includes(servizio.id)) {
          req.body[0][i].descrizione += servizio.nome + " - " + servizio.prezzo + " €, ";
        }
      }
    }
    await beginTransaction();
    for (let lavoro of req.body[0]) {
      let parametri = [`${lavoro.giorno}`, `${lavoro.descrizione}`, `${lavoro.note}`, `${lavoro.id}`];
      await executeQuery(SQL_MODIFICA_LAVORO, parametri);
    }
    await commitTransaction();
    return res.status(200);
  } 
  catch (err) {
    await rollbackTransaction();
    console.error('Errore durante la modifica dei lavori: ', err);
    return res.status(500).json({ message: 'Errore del server.' });
  }
});

/*************************************************************************************************************/









