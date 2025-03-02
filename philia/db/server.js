import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ClienteSQL } from './ClienteSQL.js';
import { LavoroSQL } from './LavoroSQL.js';
import { ServizioSQL } from './ServizioSQL.js'
import { SpesaSQL } from './SpesaSQL.js';
import { 
  SQL_SELECT_UTENTE, SQL_MODIFICA_UTENTE 
} from './AutenticazioneSQL.js';

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

/************************************************** Item **************************************************/

app.post("/INSERISCI_ITEM", async(req, res) => {
  const clienteSQL = new ClienteSQL();
  const lavoroSQL = new LavoroSQL();
  const servizioSQL = new ServizioSQL();
  const spesaSQL = new SpesaSQL();
  let sql = "";
  let params = [];
  switch(req.body.tipo_item) {
    case "cliente":
      sql = clienteSQL.SQL_INSERIMENTO_CLIENTE;
      params = clienteSQL.params_inserimento_cliente(req.body);
      break;
    case "servizio":
      sql = servizioSQL.SQL_INSERIMENTO_SERVIZIO;
      params = servizioSQL.params_inserimento_servizio(req.body);
      break;
    case "lavoro":
      sql = lavoroSQL.SQL_INSERIMENTO_LAVORO;
      params = lavoroSQL.params_inserimento_lavoro(req.body);
      break;
    case "spesa":
      sql = spesaSQL.SQL_INSERIMENTO_SPESA;
      params = spesaSQL.params_inserimento_spesa(req.body);
      break;
    default:
      alert("Errore, riprova piu\' tardi.");
      return;
  }

  try {
    const result = await executeQuery(sql, params);
    const insertedId = result.insertId; // ottengo l'id inserito
    return res.status(200).json({ id: insertedId });
  } 
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json();
    }
    return res.status(500).json();
  }
});

app.post("/VISUALIZZA_ITEMS", async(req, res) => {
  const clienteSQL = new ClienteSQL();
  const lavoroSQL = new LavoroSQL();
  const servizioSQL = new ServizioSQL();
  const spesaSQL = new SpesaSQL();
  let sql = "";
  let params = [];
  switch(req.body.tipo_item) {
    case "cliente":
      sql = clienteSQL.sql_selezione_clienti(req.body);
      params = clienteSQL.params_selezione_clienti(req.body);
      break;
    case "servizio":
      sql = servizioSQL.sql_selezione_servizi(req.body);
      params = servizioSQL.params_selezione_servizi(req.body);
      break;
    case "lavoro":
      sql = lavoroSQL.sql_selezione_lavori(req.body);
      params = lavoroSQL.params_selezione_lavori(req.body);
      break;
    case "spesa":
      sql = spesaSQL.sql_selezione_spese(req.body);
      params = spesaSQL.params_selezione_spese(req.body);
      break;
    default:
      return res.status(500).json();
  }

  try {
    const result = await executeQuery(sql, params);
    return res.status(200).json({ items: result });
  } 
  catch (err) {
    return res.status(500).json();
  }
});

app



/************************************************** Persona **************************************************/

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

app.post("/ELIMINA_LAVORI", async (req, res) => {
  const { ids = [] } = req.body;
  const placeholders = ids.map(() => '?').join(', ');
  return getResults(SQL_ELIMINA_LAVORI(placeholders), ids, res);
});

app.post("/ELIMINA_LAVORI_RANGE_GIORNI", async (req, res) => {
  req.body.primo_giorno = (req.body.primo_giorno) ? req.body.primo_giorno : "1111-01-01";
  req.body.ultimo_giorno = (req.body.ultimo_giorno) ? req.body.ultimo_giorno : "9999-01-01";
  const params = [`${req.body.primo_giorno}`, `${req.body.ultimo_giorno}`];
  return getResults(SQL_ELIMINA_LAVORI_RANGE_GIORNI, params, res);
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

/*************************************************** Saloni **************************************************/

app.post("/ELIMINA_SPESE", async (req, res) => {
  const { ids = [] } = req.body;
  const placeholders = ids.map(() => '?').join(', ');
  return getResults(SQL_ELIMINA_SPESE(placeholders), ids, res);
});

app.post("/ELIMINA_SPESE_RANGE_GIORNI", async (req, res) => {
  req.body.primo_giorno = (req.body.primo_giorno) ? req.body.primo_giorno : "1111-01-01";
  req.body.ultimo_giorno = (req.body.ultimo_giorno) ? req.body.ultimo_giorno : "9999-01-01";
  const params = [`${req.body.primo_giorno}`, `${req.body.ultimo_giorno}`];
  return getResults(SQL_ELIMINA_SPESE_RANGE_GIORNI, params, res);
});

app.post("/MODIFICA_SPESE", async (req, res) => {
  const params = [`${req.body.descrizione}`, `${req.body.totale}`, `${req.body.giorno}`, `${req.body.note}`, `${req.body.id}`];
  return getResults(SQL_MODIFICA_SPESA, params, res);
});

app.post("/VISUALIZZA_ENTRATE_LAVORI", async (req, res) => {
  const params = [];
  // return getResults(SQL_SELEZIONE_ENTRATE_LAVORI, params, res);
  try {
    const data = await executeQuery(SQL_SELEZIONE_ENTRATE_LAVORI, params);
    // console.log("--------------------------------------------------");
    // console.log(data);
    // console.log("--------------------------------------------------");
    res.status(200).json({ entrateLavori: data });
  } 
  catch (err) {
    console.error('Errore durante l\'esecuzione della query: ', err);
    res.status(500).json({ message: 'Errore durante l\'esecuzione della query' });
  }
});

app.post("/VISUALIZZA_USCITE_SPESE", async (req, res) => {
  const params = [];
  
  try {
    const data = await executeQuery(SQL_SELEZIONE_USCITE_SPESE, params);
    // console.log("--------------------------------------------------");
    // console.log(data);
    // console.log("--------------------------------------------------");
    res.status(200).json({ usciteSpese: data });
  } 
  catch (err) {
    console.error('Errore durante l\'esecuzione della query: ', err);
    res.status(500).json({ message: 'Errore durante l\'esecuzione della query' });
  }
});

/*************************************************************************************************************/







