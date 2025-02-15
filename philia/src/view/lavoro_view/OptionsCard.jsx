import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dizionarioOrari } from "../../vario/Tempo";
import { handleInputChangeNuovoLavoro } from "../../vario/Vario";
import { 
  StyledCard, StyledRow, StyledCol, StyledCardHeader, grandezzaIcona,
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina,
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledListGroupItem, SlideContainer, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, 
  StyledArrowTopNotSelected, StyledArrowBottomNotSelected, StyledPencilNotSelectedModificaProfilo, 
  StyledSelectBlock, StyledSelectModifica, StyledSelectElimina, StyledOption, StyledSpanErrore, StyledLoginNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledDeleteNotSelected, StyledTrashNotSelected2
} from '../component/card_item/StyledCardItem';
// import { CardOptions } from "../component/card_item/CardsLavori";

const OptionsCard = ({item, setItem, tipoVisualizzazione}) => {
  item.giorno = item.giorno !== undefined ? item.giorno : '';
  
  const autenticazioneSession = useSelector((state) => state.autenticazioneSession.value);
  
  const [lavoriGiornoSelezionato, setLavoriGiornoSelezionato] = useState(0);
  const [aggiornato, setAggiornato] = useState(false);
  const [orari, setOrari] = useState(dizionarioOrari);
  const [giornoType, setGiornoType] = useState('text');

  // function OrariOptions({orari, item, autenticazioneSession}) {
  //   let listaOrari = Object.entries(orari);
  //   let orariPossibili = [];
  //   for (let i = 0; i < listaOrari.length; i++) {
  //     // console.log("| " + listaOrari[i][0] + " | " + listaOrari[i][1][0] + " | " + listaOrari[i][1][1] + " | " + listaOrari[i][1][2] + " | ");
  //     if(parseInt(listaOrari[i][1][0], 10) > parseInt(orari[item.orario_inizio][0])) {
  //       if(item.id_cliente !== 0 && autenticazioneSession.num_lavori_clienti > listaOrari[i][1][1]) {
  //         orariPossibili.push(<StyledOption key={listaOrari[i][0]} value={listaOrari[i][0]}>{listaOrari[i][0]}</StyledOption>);
  //       }
  //       else if(item.id_professionista !== 0 && autenticazioneSession.num_lavori_professionisti > listaOrari[i][1][2]) {
  //         orariPossibili.push(<StyledOption key={listaOrari[i][0]} value={listaOrari[i][0]}>{listaOrari[i][0]}</StyledOption>);
  //       }
  //       else {
  //         break;
  //       }
  //     }
  //   }
  //   return orariPossibili;
  // }

  const ottieniLavoriGiorno = async (setGiornoType, item) => {
    const response = await fetch('/OTTIENI_LAVORI_GIORNO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuovoLavoro),
    });
  
    // console.log((response).status);
    if(response.status === 200) {
      const risultato = await response.json();
      // console.log(risultato.lavoriGiornoSelezionato);
      setLavoriGiornoSelezionato(risultato.lavoriGiornoSelezionato);
    }
    else {
      const errorData = await response.json();
      if (response.status === 409 || response.status === 500) {
        alert(errorData.message);
      }
      else {
        response.status = 500;
        alert('Errore durante l\'ottenimento dei lavori.');
      }
    }
  }

  const aggiornaOrari = (lavoriGiornoSelezionato, orari, setOrari) => {
    // console.log("Funzione aggiornaOrari!!");
    if(lavoriGiornoSelezionato !== -1 && lavoriGiornoSelezionato !== 0) {
      let listaOrari = Object.entries(orari);
      for(let lavoroGiorno of lavoriGiornoSelezionato) {
        console.log(lavoroGiorno.tipo_lavoro + ": " + lavoroGiorno.orario_inizio + " - " + lavoroGiorno.orario_fine);
        let indicePrimoGiornoConsiderato = orari[lavoroGiorno.orario_inizio][0];
        let indiceUltimoGiornoConsiderato = orari[lavoroGiorno.orario_fine][0] - 1;
        for (let i = indicePrimoGiornoConsiderato; i <= indiceUltimoGiornoConsiderato; i++) {
          // console.log(`| ${listaOrari[i]} | : | ${listaOrari[i][0]} - ( ${listaOrari[i][1][0]} - ${listaOrari[i][1][1]} - ${listaOrari[i][1][2]} ) |`);
          if (lavoroGiorno.tipo_lavoro === "lavoro_cliente") {
            listaOrari[i][1][1] += 1;
          } else if (lavoroGiorno.tipo_lavoro === "lavoro_professionista") {
            listaOrari[i][1][2] += 1;
          }
        }
        setOrari(Object.fromEntries(listaOrari));
      }
      if(lavoriGiornoSelezionato.length === 0) {
        console.log("Nessun lavoro trovato per il giorno selezionato!!");
      }
    }
  };

  const handleGiornoClick = (setGiornoType) => {
    return () => {
      setGiornoType('date');
    };
  };

  const handleGiornoBlur = (setGiornoType, item, orari, setOrari) => {
    return () => {
      if(!item.giorno)
        setGiornoType('text');
      else {
        setGiornoType('date');
        setLavoriGiornoSelezionato(-1);
        ottieniLavoriGiorno(setGiornoType, item);
        setAggiornato(!aggiornato);
      }
    };
  };

  const handleInputChangeGiorno = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setItem(prevState => ({
      ...prevState, 
      [name]: value
    }));
  }

  useEffect(() => {
    if (lavoriGiornoSelezionato === 0) {
      return;
    }
    if(lavoriGiornoSelezionato === -1) {
      console.log("Aggiornamento in corso...")
      setAggiornato(!aggiornato);
    }
  }, [aggiornato]);

  useEffect(() => {
    if (lavoriGiornoSelezionato === 0) {
      return;
    }
    if(lavoriGiornoSelezionato !== -1) {
      console.log("Agggiornamento effettuato.");
      setOrari(dizionarioOrari);
      console.log(orari);
      aggiornaOrari(lavoriGiornoSelezionato, orari, setOrari);
    }
  }, [aggiornato]);

  return (
    <>
      <StyledInputModifica
        rows="1"
        placeholder="Giorno*"
        type={giornoType}
        name="giorno"
        value={item.giorno}
        onClick={handleGiornoClick(setGiornoType)}
        onBlur={handleGiornoBlur(setGiornoType, item, orari, setOrari)}
        onChange={(e) => handleInputChangeGiorno(e, setItem)}
      />
      {(item.errore_giorno !== "") && (<StyledSpanErrore>{item.errore_giorno}</StyledSpanErrore>)} 
    </>
  );
}

export default OptionsCard;









