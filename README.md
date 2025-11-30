# WebApp "ActivityManagement"
## Scopo del sistema
Lo scopo del sistema è fornire un software in grado di gestire un'attività (salone barbiere, negozio vestiti, pizzeria, etc.).
## Prerequisiti
- Tecnologie utilizzate
	- Lato Back-End:
		- Node.js (JavaScript).
		- MySQL Workbench.
	- Lato Front-End:
		- HTML5.
		- CSS3.
		- React.js (JavaScript).
		- React Redux.
		- React Bootstrap.
	- Testing:
		- Jest.
		- Selenium Script.
## Installazione e configurazione WebApp "ActivityManagement"
1. Clonare la repository con il seguente comando con 1 dei seguenti modi: 
	1. `git clone https://github.com/GianlucaScisciolo/ActivityManagement.git`
	2. utilizzando la web URL su GitHub (<> Code --> Local --> HTTPS --> copia).
2. Installare le dipendenze con il seguente comando: `npm install` oppure: `npm i`
3. Installare la dipendenza **express** con il seguente comando: `npm install express`.
4. Modificare il seguente codice presente nel file **/db/server.js**:
```js
const db = mysql.createConnection({
	host: "host", // riga 34 <-- modificare
	user: "user_db", // riga 35 <-- modificare
	password: "password_db", // riga 36 <-- modificare
	database: "activity_management" // riga 37 <-- non modificare
})
```
con i propri dati per connettersi al database MySQL.
## Creazione DataDase "activity_management":
1. Aprire MySQL Workbench.
2. Eseguire lo script **CREATE DATABASE TEST.sql** presente nella cartella **/db/FileSQL** per creare il database.
3. Eseguire lo script **CREATE TABLES.sql** presente nella cartella **/db/FileSQL** per creare le tabelle del database.
4. Se c'è bisogno di eliminare il database, eseguire lo script **DROP DATABASE.sql** presente nella cartella **/db/FileSQL**.
# Esecuzione WebApp "ActivityManagement"
1. Eseguire il seguente comando: `npm run start-all`.
	- Dopo aver eseguito il comando, se va a buon fine, dovrebbe comparire nel terminale l'url per eseguire la web-app, ovvero, il seguente: `http://localhost:5173/`.
2. Una volta lanciata la webapp, per eseguire il login dell'utente, inserire nel form di login i seguenti dati (che potranno essere modificati successivamente nel form del profilo):
	- **Username:** username.
	- **Password:** Password10!!
