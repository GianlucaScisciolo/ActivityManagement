export const getTotaleEntrateAnno = (entrata) => {
  return (
      entrata.totale_gennaio   + entrata.totale_febbraio + entrata.totale_marzo    + entrata.totale_aprile 
    + entrata.totale_maggio    + entrata.totale_giugno   + entrata.totale_luglio   + entrata.totale_agosto 
    + entrata.totale_settembre + entrata.totale_ottobre  + entrata.totale_novembre + entrata.totale_dicembre
  ); 
}

export const getQuantitaEntrateAnno = (entrata) => {
  return (
      parseInt(entrata.quantita_gennaio) + parseInt(entrata.quantita_febbraio) + parseInt(entrata.quantita_marzo) 
    + parseInt(entrata.quantita_aprile)  + parseInt(entrata.quantita_maggio)   + parseInt(entrata.quantita_giugno) 
    + parseInt(entrata.quantita_luglio)  + parseInt(entrata.quantita_agosto)   + parseInt(entrata.quantita_settembre) 
    + parseInt(entrata.quantita_ottobre) + parseInt(entrata.quantita_novembre) + parseInt(entrata.quantita_dicembre) 
  ); 
}