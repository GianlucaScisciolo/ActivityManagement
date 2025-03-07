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
    if(req.body.tipo_item === "lavoro") {
      for(let i = 0; i < result.length; i++) {
        const serviziSelezionatiAttuali = result[i].descrizione.split(',').map(item => item.trim()).filter(item => item !== "");
        for(let i = 0; i < serviziSelezionatiAttuali.length; i++) {
          serviziSelezionatiAttuali[i] = serviziSelezionatiAttuali[i].split('-').map(item => item.trim()).filter(item => item !== "");
          serviziSelezionatiAttuali[i] = {
            nome: serviziSelezionatiAttuali[i][0], 
            prezzo: serviziSelezionatiAttuali[i][1].substring(0, serviziSelezionatiAttuali[i][1].length-2)
          };
        }
        result[i]["serviziSelezionati"] = serviziSelezionatiAttuali;
      }
    }
    return res.status(200).json({ items: result });
  } 
  catch (err) {
    return res.status(500).json();
  }
});

app.post("/VISUALIZZA_ENTRATE_ITEMS", async(req, res) => {
  const lavoroSQL = new LavoroSQL();
  let sql = "";
  let params = [];
  switch(req.body.tipo_item) {
    case "lavoro":
      sql = lavoroSQL.SQL_SELEZIONE_ENTRATE_LAVORI;
      params = lavoroSQL.params_selezione_entrate_lavori(req.body);
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

app.post("/VISUALIZZA_USCITE_ITEMS", async(req, res) => {
  const spesaSQL = new SpesaSQL();
  let sql = "";
  let params = [];
  switch(req.body.tipo_item) {
    case "spesa":
      sql = spesaSQL.SQL_SELEZIONE_USCITE_SPESE;
      params = spesaSQL.params_selezione_uscite_spese(req.body);
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

app.post("/OTTIENI_TUTTI_GLI_ITEMS", async(req, res) => {
  const clienteSQL = new ClienteSQL();
  const servizioSQL = new ServizioSQL();
  let sql = "";
  let params = [];
  switch(req.body.tipo_item) {
    case "cliente": 
      sql = clienteSQL.SQL_SELEZIONE_TUTTI_I_CLIENTI;
      params = clienteSQL.params_selezione_tutti_i_clienti();
      break;
    case "servizio":
      sql = servizioSQL.SQL_SELEZIONE_TUTTI_I_SERVIZI;
      params = servizioSQL.params_selezione_tutti_i_servizi();
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

app.post("/ELIMINA_ITEMS", async(req, res) => {
  const clienteSQL = new ClienteSQL();
  const lavoroSQL = new LavoroSQL();
  const servizioSQL = new ServizioSQL();
  const spesaSQL = new SpesaSQL();
  let sql = "";
  switch(req.body.tipo_item) {
    case "cliente":
      sql = clienteSQL.sql_eliminazione_clienti(req.body.ids);
      break;
    case "servizio":
      sql = servizioSQL.sql_eliminazione_servizi(req.body.ids);
      break;
    case "lavoro":
      sql = lavoroSQL.sql_eliminazione_lavori(req.body.ids);
      break;
    case "spesa":
      sql = spesaSQL.sql_eliminazione_spese(req.body.ids);
      break;
    default:
      return res.status(500).json();
  }

  try {
    await executeQuery(sql, req.body.ids);
    return res.status(200).json();
  } 
  catch (err) {
    return res.status(500).json();
  }
});

app.post("/ELIMINA_ITEMS_RANGE_GIORNI", async(req, res) => {
  const clienteSQL = new ClienteSQL();
  const lavoroSQL = new LavoroSQL();
  const servizioSQL = new ServizioSQL();
  const spesaSQL = new SpesaSQL();
  let sql = "";
  let params = [];
  switch(req.body.tipo_item) {
    case "lavoro":
      sql = lavoroSQL.SQL_ELIMINAZIONE_LAVORI_RANGE_GIORNI; 
      params = lavoroSQL.params_eliminazione_lavori_range_giorni(req.body);
      break;
    case "spesa":
      sql = spesaSQL.SQL_ELIMINAZIONE_SPESE_RANGE_GIORNI;
      params = spesaSQL.params_eliminazione_spese_range_giorni(req.body);
      break;
    default:
      return res.status(500).json();
  }

  try {
    await executeQuery(sql, params);
    return res.status(200).json();
  } 
  catch (err) {
    return res.status(500).json();
  }
});

app.post("/MODIFICA_ITEM", async(req, res) => {
  const clienteSQL = new ClienteSQL();
  const lavoroSQL = new LavoroSQL();
  const servizioSQL = new ServizioSQL();
  const spesaSQL = new SpesaSQL();
  let sql = "";
  let params = [];
  switch(req.body.tipo_item) {
    case "cliente":
      sql = clienteSQL.SQL_MODIFICA_CLIENTE;
      params = clienteSQL.params_modifica_cliente(req.body.item);
      break;
    case "servizio":
      sql = servizioSQL.SQL_MODIFICA_SERVIZIO;
      params = servizioSQL.params_modifica_servizio(req.body.item);
      break;
    case "lavoro":
      console.log(req.body);
      sql = lavoroSQL.SQL_MODIFICA_LAVORO
      params = lavoroSQL.params_modifica_lavoro(req.body.item);
      break;
    case "spesa":
      sql = spesaSQL.SQL_MODIFICA_SPESA;
      params = spesaSQL.params_modifica_spesa(req.body.item);
      break;
    default:
      return res.status(500).json();
  }

  try {
    await executeQuery(sql, params);
    return res.status(200).json();
  } 
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json();
    }
    return res.status(500).json();
  }

  // await beginTransaction();
  // await commitTransaction();
});

/*************************************************** Lavori **************************************************/

// app.post("/MODIFICA_LAVORI", async (req, res) => {
//   try {
//     for(let servizio of req.body[1]) {
//       for(let i = 0; i < req.body[0].length; i++) {
//         if(req.body[0][i].id_servizi.includes(servizio.id)) {
//           req.body[0][i].descrizione += servizio.nome + " - " + servizio.prezzo + " €, ";
//         }
//       }
//     }
//     await beginTransaction();
//     for (let lavoro of req.body[0]) {
//       let parametri = [`${lavoro.giorno}`, `${lavoro.descrizione}`, `${lavoro.note}`, `${lavoro.id}`];
//       await executeQuery(SQL_MODIFICA_LAVORO, parametri);
//     }
//     await commitTransaction();
//     return res.status(200);
//   } 
//   catch (err) {
//     await rollbackTransaction();
//     console.error('Errore durante la modifica dei lavori: ', err);
//     return res.status(500).json({ message: 'Errore del server.' });
//   }
// });

/*************************************************************************************************************/









