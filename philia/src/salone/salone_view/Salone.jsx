import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../../app/app_view/component/Header";
import DragAndDrop from '../../app/app_view/DragAndDrop';

const Salone = () => {
  const formSession = useSelector((state) => state.formSession.value);
  const itemSession = useSelector((state) => state.itemSession.value);
  const [entrateLavori, setEntrateLavori] = useState(-1);
  const [usciteSpese, setUsciteSpese] = useState(-1);
  const [aggiornamento, setAggiornamento] = useState(0);
  const [initialPositions, setInitialPositions] = useState([]);
  
  const getEntrateLavori = async () => {
    // setEntrateLavori(-1);
    // saloneStore.setEntrateLavori(-1);
    // await SaloneAction.dispatchAction(null, operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI);
    // setEntrateLavori(saloneStore.getEntrateLavori());
    // e.preventDefault();
    
    const dati = {
      tipo_item: "lavoro" 
    };
    
    const response = await fetch('/VISUALIZZA_ENTRATE_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dati), 
    });
    
    if(response.status === 200) {
      const result = await response.json();
      setEntrateLavori(result.items);
    }
    else {
      alert("Errore durante la ricerca delle entrate dei lavori, riprova più tardi.");
    }
  };

  const getUsciteSpese = async () => {
    // setUsciteSpese(-1);
    // saloneStore.setUsciteSpese(-1);
    // await SaloneAction.dispatchAction(null, operazioniSaloni.VISUALIZZA_USCITE_SPESE);
    // setUsciteSpese(saloneStore.getUsciteSpese());
    // e.preventDefault();
    
    const dati = {
      tipo_item: "spesa" 
    };
    
    const response = await fetch('/VISUALIZZA_USCITE_ITEMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dati), 
    });
    
    if(response.status === 200) {
      const result = await response.json();
      setUsciteSpese(result.items);
    }
    else {
      alert("Errore durante la ricerca delle uscite delle spese, riprova più tardi.");
    }
  };

  useEffect(() => {
    getEntrateLavori();
  }, []);

  useEffect(() => {
    if(entrateLavori.length > 0)
      getUsciteSpese();
  }, [entrateLavori]);

  useEffect(() => {
    if(entrateLavori.length > 0 && usciteSpese.length > 0) {
      setInitialPositions([
        { id: '1', tipo: "CardEntrateLavori", entrateLavori: entrateLavori, x: 100, y: 100 }, 
        { id: '2', tipo: "CardUsciteSpese", usciteSpese: usciteSpese, x: 2000, y: 100 }, 
        { id: '3', tipo: "CardRicavi", entrateLavori: entrateLavori, usciteSpese: usciteSpese, x: 100, y: 1000 }
      ]);
    }
  }, [usciteSpese]);

  // useEffect(() => {
  //   getEntrateLavori();
  //   const onChange = () => setEntrateLavori(saloneStore.getEntrateLavori());
  //   saloneStore.addChangeListener(operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI, onChange);
  //   return () => saloneStore.removeChangeListener(operazioniSaloni.VISUALIZZA_ENTRATE_LAVORI, onChange);
  // }, []);

  // useEffect(() => {
  //   getUsciteSpese();
  //   const onChange = () => setUsciteSpese(saloneStore.getUsciteSpese());
  //   saloneStore.addChangeListener(operazioniSaloni.VISUALIZZA_USCITE_SPESE, onChange);
  //   saloneStore.removeChangeListener(operazioniSaloni.VISUALIZZA_USCITE_SPESE, onChange);
  //   console.log("Aggiornamento in corso...");
  //   setAggiornamento(true);
  // }, []);

  // useEffect(() => {
  //   if(aggiornamento !== 0) {
  //     if(entrateLavori.length > 0 && usciteSpese.length > 0) {
  //       console.log("Aggiornamento completato.");
  //       setInitialPositions([
  //         { id: '1', tipo: "CardEntrateLavori", entrateLavori: entrateLavori, x: 100, y: 100 }, 
  //         { id: '2', tipo: "CardUsciteSpese", usciteSpese: usciteSpese, x: 2000, y: 100 }, 
  //         { id: '3', tipo: "CardRicavi", entrateLavori: entrateLavori, usciteSpese: usciteSpese, x: 100, y: 1000 }
  //       ]);
  //       setAggiornamento("FINE");
  //     }      
  //     else {
  //       console.log("Aggiornamento in corso...");
  //       setEntrateLavori(saloneStore.getEntrateLavori());
  //       setUsciteSpese(saloneStore.getUsciteSpese());
  //       setAggiornamento(!aggiornamento);
  //     }
  //   }
  // }, [aggiornamento]);

  return (
    <>
      <Header />
      <div className="main-content" />
      
      {(initialPositions.length > 0) && (
        <DragAndDrop initialPositions={initialPositions} />
      )}
    </>
  );
}

export default Salone;
