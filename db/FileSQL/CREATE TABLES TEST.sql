USE `activity_management`;

CREATE TABLE `utente` (
	`username` VARCHAR(10) NOT NULL,
	`password` VARCHAR(128) NOT NULL,
	`salt_hex` VARCHAR(32) NOT NULL,
	`ruolo` SET("Dipendente", "Amministratore") NOT NULL,
	`note` VARCHAR(200),

	PRIMARY KEY(`username`)
);

CREATE TABLE `cliente` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(30) NOT NULL,
	`cognome` VARCHAR(30) NOT NULL,
	`contatto` VARCHAR(22) DEFAULT "Contatto non inserito." NOT NULL, 
	`email` VARCHAR(254) DEFAULT "Email non inserita." NOT NULL, 
	`note` VARCHAR(200),

	UNIQUE(`nome`, `cognome`, `contatto`, `email`), 

	PRIMARY KEY(`id`)
);

CREATE TABLE `lavoro` (
	`id` INTEGER AUTO_INCREMENT NOT NULL,
	`cliente` VARCHAR(500), 
	`giorno` DATE NOT NULL,
	`totale` DOUBLE NOT NULL, 
	`note` VARCHAR(200), 

	PRIMARY KEY(`id`)
);

CREATE TABLE `servizio` (
	`id` INTEGER AUTO_INCREMENT NOT NULL, 
	`nome` VARCHAR(100) NOT NULL, 
	`prezzo` DOUBLE NOT NULL, 
	`note` VARCHAR(200), 
	`in_uso` BOOLEAN, 

	PRIMARY KEY(`id`) 
);

CREATE TABLE `spesa` (
	`id` INTEGER AUTO_INCREMENT NOT NULL, 
	`nome` VARCHAR(50) NOT NULL, 
	`giorno` DATE NOT NULL, 
	`descrizione` VARCHAR(1000), 
	`totale` DOUBLE NOT NULL, 
	`note` VARCHAR(200), 

	PRIMARY KEY(`id`)
);

CREATE TABLE `collegamento` (
	id_lavoro INTEGER NOT NULL, 
	id_servizio INTEGER NOT NULL, 
	quantita INTEGER NOT NULL DEFAULT 0, 
	
	PRIMARY KEY(id_lavoro, id_servizio), 
	
	CONSTRAINT `fk_collegamento_lavoro`
		FOREIGN KEY (`id_lavoro`)
		REFERENCES `lavoro` (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE, 
	
	CONSTRAINT `fk_collegamento_servizio`
		FOREIGN KEY (`id_servizio`)
		REFERENCES `servizio` (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE 
);

INSERT INTO `utente` (
	`username`, `password`, `salt_hex`, `ruolo`, `note`
) VALUES ( 
	"username", 
    "f7687ff6a865350f3dd864b19465df2afe96b39863a1ee90b5abf7031b2dffd27fb070517ae703c1259cb62a2597130db093047627c4d0de7d446c38867a1a1a", 
    "agOlMPnXA4lZSZ9i", 
    "Amministratore", 
    "Password attuale: Password10!!"
);
















