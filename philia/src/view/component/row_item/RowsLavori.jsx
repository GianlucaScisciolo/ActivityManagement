import React, { useState, useEffect } from 'react';
import { formatoDate, formatoTime } from "../../../vario/Tempo";
import { faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { 
  StyledRow, StyledCol, StyledColBlack, StyledColOperazioni, StyledColAnimato, SlideContainer, grandezzaIcona, 
  StyledTextAreaBlock, StyledTextAreaModifica, StyledTextAreaElimina, 
  StyledInputBlock, StyledInputModifica, StyledInputElimina, 
  StyledSaveNotSelected, StyledSearchNotSelected, 
  StyledArrowLeftNotSelected, StyledArrowRightNotSelected,  
  StyledPencilNotSelected, StyledPencilSelected, 
  StyledTrashNotSelected, StyledTrashSelected, StyledPencilNotSelectedModificaProfilo, 
  StyledSelect, StyledSelectBlock, StyledSelectModifica, StyledSelectElimina, 
  StyledOption, StyledSpanErrore, StyledLoginNotSelected, 
  StyledFileIconNotSelected, StyledDownloadNotSelected, StyledDeleteNotSelected, StyledTrashNotSelected2
} from "./StyledRowItem";
import { 
  handleInputChange, handleInputChangeLavoroEsistente, cambiamentoBloccato
} from '../../../vario/Vario';
import { 
  OperazioniNuovoItem, OperazioniCercaItems, OperazioniItemEsistente, OperazioniFileItems, 
  RowRicercaItems
} from './RowItem';

const handleGiornoClick = (setGiornoType) => {
  return () => {
    setGiornoType('date');
  };
};

const handleGiornoBlur = (setGiornoType, item, setItem) => {
  return () => {
    if(!item.giorno)
      setGiornoType('text');
    else
      setGiornoType('date');
  };
};

function cambioValoriOrari(e, setValue) {
  e.preventDefault();

  const nome_campi = [
    "ora_inizio", "ora_fine", "minuto_inizio", "minuto_fine"
  ]
  
  const { name, value } = e.target;

  if(nome_campi.includes(name)) {
    setValue(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  else {
    alert("Errore, nome campo " + name + " non valido.");
  }
}

export function RowNuovoLavoro({
  lavoriGiornoSelezionato, setLavoriGiornoSelezionato, handleInputChangeGiorno, handleGiornoBlur, 
  clienti, professionisti, item, setItem, eseguiSalvataggio
}) {
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  // let [visibilita, setVisibilita] = useState([true, true, true, true, true, true, true]);
  const [arrowUp, setArrowUp] = useState(true);

  const [giornoType, setGiornoType] = useState('text');
  const [orario, setOrario] = useState({
    ora_inizio: "", 
    ora_fine: "",
    minuto_inizio: "", 
    minuto_fine: ""
  });

  const giornoValue = item.giorno !== undefined ? item.giorno : '';

  return (
    <>
      <StyledRow>
        <OperazioniNuovoItem eseguiSalvataggio={eseguiSalvataggio} />
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledSelect name="id_cliente" value={item.id_cliente} onChange={(e) => handleInputChange(e, setItem)}>
              <StyledOption value="0">Seleziona il cliente</StyledOption>
              {clienti.map((cliente) => (
                <StyledOption key={cliente.id} value={cliente.id}>{cliente.nome + " " + cliente.cognome}</StyledOption>  
              ))}
            </StyledSelect>
            {/* <br /> <br /> */}
            {(item.errore_cliente_e_professionista !== "") && (<StyledSpanErrore>{item.errore_cliente_e_professionista}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledSelect name="id_professionista" value={item.id_professionista} onChange={(e) => handleInputChange(e, setItem)}>
              <StyledOption value="0">Seleziona il professionista</StyledOption>
              {professionisti.map((professionista) => (
                <StyledOption key={professionista.id} value={professionista.id}>{professionista.nome + " - " + professionista.professione}</StyledOption>  
              ))}
            </StyledSelect>
            {/* <br /> <br /> */}
            {(item.errore_cliente_e_professionista !== "") && (<StyledSpanErrore>{item.errore_cliente_e_professionista}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledInputModifica
              rows="1"
              placeholder="Giorno*"
              type={giornoType}
              name="giorno"
              value={giornoValue}
              onClick={handleGiornoClick(setGiornoType)}
              onBlur={handleGiornoBlur(setGiornoType, item, setItem)}
              onChange={(e) => handleInputChange(e, setItem)}
            />
            {/* <br /> <br /> */}
            {(item.errore_giorno !== "") && (<StyledSpanErrore>{item.errore_giorno}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledSelect name="ora_inizio" value={item.ora_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Ora inizio</StyledOption>
              {ore.map((ora) => (
                <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
              ))}
            </StyledSelect>
            {/* <br /> <br /> */}
            {(item.errore_orario_inizio !== "") && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledSelect name="minuto_inizio" value={item.minuto_inizio} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Minuto inizio</StyledOption>
              {minuti.map((minuto) => (
                <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
              ))}
            </StyledSelect>
            {/* <br /> <br /> */}
            {(item.errore_orario_inizio !== "") && (<StyledSpanErrore>{item.errore_orario_inizio}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledSelect name="ora_fine" value={item.ora_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Ora fine</StyledOption>
              {ore.map((ora) => (
                <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
              ))}
            </StyledSelect>
            {/* <br /> <br /> */}
            {(item.errore_orario_fine !== "") && (<StyledSpanErrore>{item.errore_orario_fine}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledSelect name="minuto_fine" value={item.minuto_fine} onChange={(e) => cambioValoriOrari(e, setItem)}>
              <StyledOption value="">Minuto fine</StyledOption>
              {minuti.map((minuto) => (
                <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
              ))}
            </StyledSelect>
            {/* <br /> <br /> */}
            {(item.errore_orario_fine !== "") && (<StyledSpanErrore>{item.errore_orario_fine}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledTextAreaModifica
              rows="1"
              placeholder="Descrizione*"
              name="descrizione"
              value={item.descrizione}
              onChange={(e) => handleInputChange(e, setItem)}
            />
            {/* <br /> <br /> */}
            {(item.errore_descrizione !== "") && (<StyledSpanErrore>{item.errore_descrizione}</StyledSpanErrore>)}
          </div>
        </StyledCol>
        <StyledCol>
          <div style={{width: "100%"}}>
            <StyledTextAreaModifica
              rows="1"
              placeholder="Note"
              name="note"
              value={item.note}
              onChange={(e) => handleInputChange(e, setItem)}
            />
            {/* <br /> <br /> */}
            {(item.errore_note !== "") && (<StyledSpanErrore>{item.errore_note}</StyledSpanErrore>)}
          </div>
        </StyledCol>
      </StyledRow>
    </>
  );
}

// export function RowRicercaLavori({item, setItem, eseguiRicerca}) {
//   const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
//   const minuti = ["00", "30"];
//   let [visibilita, setVisibilita] = useState([true, true, true, true, true, true, true, true]);
//   const [arrowUp, setArrowUp] = useState(true);
//   let maxHeight = "2000px";

//   const [primoGiornoType, setPrimoGiornoType] = useState('text');
//   const [ultimoGiornoType, setUltimoGiornoType] = useState('text');

//   item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
//   item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : ''; 

//   return (
//     <>
//       <StyledRow>
//         <OperazioniCercaItems 
//           visibilita={visibilita} setVisibilita={setVisibilita} 
//           arrowUp={arrowUp} setArrowUp={setArrowUp} eseguiRicerca={eseguiRicerca}
//         />
//         <StyledCol>
//           {(visibilita[0]) && (
//             <StyledInputModifica
//               rows="1"
//               placeholder="Nome cliente"
//               type="text"
//               name="nome_cliente"
//               value={item.nome_cliente}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>
//         <StyledCol>
//           {(visibilita[1]) && (
//             <StyledInputModifica
//               rows="1"
//               placeholder="Cognome cliente"
//               type="text"
//               name="cognome_cliente"
//               value={item.cognome_cliente}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>        
//         <StyledCol>
//           {(visibilita[2]) && (
//             <StyledInputModifica
//               rows="1"
//               placeholder="Nome professionista"
//               type="text"
//               name="nome_professionista"
//               value={item.nome_professionista}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>        
//         <StyledCol>
//           {(visibilita[3]) && (
//             <StyledInputModifica
//               rows="1"
//               placeholder="Professione"
//               type="text"
//               name="professione"
//               value={item.professione}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>        
//         <StyledCol>
//           {(visibilita[4]) && (
//             <StyledInputModifica
//               rows="1"
//               placeholder="Primo giorno"
//               type={primoGiornoType}
//               name="primo_giorno"
//               value={item.primo_giorno}
//               onClick={handleGiornoClick(setPrimoGiornoType)}
//               onBlur={handleGiornoBlur(setPrimoGiornoType, item, setItem)}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>        
//         <StyledCol>
//           {(visibilita[5]) && (
//             <StyledInputModifica
//               rows="1"
//               placeholder="Ultimo giorno"
//               type={ultimoGiornoType}
//               name="ultimo_giorno"
//               value={item.ultimo_giorno}
//               onClick={handleGiornoClick(setUltimoGiornoType)}
//               onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>        
//         <StyledCol>
//           {(visibilita[6]) && (
//             <StyledTextAreaModifica
//               rows="1"
//               placeholder="Descrizione"
//               name="descrizione"
//               value={item.descrizione}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>        
//         <StyledCol>
//           {(visibilita[7]) && (
//             <StyledTextAreaModifica
//               rows="1"
//               placeholder="Note"
//               name="note"
//               value={item.note}
//               onChange={(e) => handleInputChange(e, setItem)}
//             />
//           )}
//         </StyledCol>
//       </StyledRow>
//     </>
//   );
// }

export function RowRicercaLavori({ item, setItem, eseguiRicerca }) {
  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';  

  let campi = {
    header: "Ricerca lavori", 
    type: [null, null, null, null, primoGiornoType, ultimoGiornoType, null, null], 
    name: [
      "nome_cliente", "cognome_cliente", "nome_professionista", "professione", 
      "primo_giorno", "ultimo_giorno", "descrizione", "note"
    ], 
    value: [
      item.nome_cliente, item.cognome_cliente, item.nome_professionista, item.professione, 
      item.primo_giorno, item.ultimo_giorno, item.descrizione, item.note
    ], 
    placeholder: [
      "Nome cliente", "Cognome cliente", "nome professionista", "Professione", 
      "Primo giorno", "Ultimo giorno", "Descrizione", "Note"
    ], 
    onChange: (e) => handleInputChange(e, setItem), 
    onClick: null, 
    onBlur: null
  }
  const indici = [0, 1, 2, 3, 4, 5, 6, 7];
  
  return (
    <>
      <RowRicercaItems 
        campi={campi}
        indici={indici}
        eseguiRicerca={eseguiRicerca}
      />
    </>
  );
}

export function RowLavoroEsistente({item, items, setItems, selectOperation}) {
  /*
  const ore = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
  const minuti = ["00", "30"];
  let maxHeight = "2000px";
  const [giornoType, setGiornoType] = useState('text');
  item.giorno = item.giorno !== undefined ? item.giorno : '';
  const header = (item.nome_cliente) ? "Lavoro cliente" : "Lavoro professionista";
  if(item.ora_inizio.toString().length === 1) item.ora_inizio = "0" + item.ora_inizio.toString();
  if(item.ora_fine.toString().length === 1) item.ora_fine = "0" + item.ora_fine.toString();
  if(item.minuto_inizio.toString().length === 1) item.minuto_inizio = "0" + item.minuto_inizio.toString();
  if(item.minuto_fine.toString().length === 1) item.minuto_fine = "0" + item.minuto_fine.toString();
  
  const ClasseSelect = (item.tipo_selezione !== 1 && item.tipo_selezione !== 2) ? StyledSelectBlock : (
    item.tipo_selezione === 1) ? StyledSelectModifica : StyledSelectElimina;

  const ClasseInputModificabile = (item.tipo_selezione !== 1 && item.tipo_selezione !== 2) ? StyledInputBlock : (
    item.tipo_selezione === 1) ? StyledInputModifica : StyledInputElimina;

  const ClasseInputNonModificabile = (item.tipo_selezione !== 2) ? StyledInputBlock : StyledInputElimina;
    
  const ClasseTextAreaModificabile = (item.tipo_selezione !== 1 && item.tipo_selezione !== 2) ? StyledTextAreaBlock : (
    item.tipo_selezione === 1) ? StyledTextAreaModifica : StyledTextAreaElimina;
  
  const ClasseTextAreaNonModificabile = (item.tipo_selezione !== 2) ? StyledTextAreaBlock : StyledTextAreaElimina;
  */
  // return (
  //   <>
  //     <StyledRow>
  //       <OperazioniItemEsistente selectOperation={selectOperation} item={item} />
  //       {(item.nome_cliente) && (
  //         <StyledCol>
  //           <ClasseTextAreaNonModificabile 
  //             rows="1" 
  //             name="nome_cognome_cliente" 
  //             value={item.nome_cliente + " " + item.cognome_cliente} 
  //             placeholder="Nome e cognome cliente*"
  //             readOnly 
  //           />
  //         </StyledCol>
  //       )}
  //       {(item.nome_professionista) && (
  //         <StyledCol>
  //           <ClasseTextAreaNonModificabile 
  //             rows="1" 
  //             name="nome_professione_professionista" 
  //             value={item.nome_professionista + " - " + item.professione} 
  //             placeholder="Nome e professione professionista*"
  //             readOnly 
  //           />
  //         </StyledCol>
  //       )}
  //       <StyledCol>
  //         <ClasseInputModificabile 
  //           rows="1" 
  //           name="giorno" 
  //           type={giornoType} 
  //           value={formatoDate(item.giorno, "AAAA-MM-GG")} 
  //           placeholder="Giorno*" 
  //           onClick={handleGiornoClick(setGiornoType)}
  //           onBlur={handleGiornoBlur(setGiornoType, item, setItems)}
  //           readOnly={item.tipo_selezione !== 1}
  //           onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
  //         />
  //       </StyledCol>
  //       <StyledCol>
  //         <ClasseSelect
  //           name="ora_inizio" 
  //           value={item.ora_inizio.toString()} 
  //           readOnly={item.tipo_selezione !== 1}
  //           onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
  //         >
  //           <StyledOption value="">Ora inizio</StyledOption>
  //           {ore.map((ora) => (
  //             <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
  //           ))}
  //         </ClasseSelect>
  //       </StyledCol>
  //       <StyledCol>
  //         <ClasseSelect 
  //           name="minuto_inizio" 
  //           value={item.minuto_inizio} 
  //           readOnly={item.tipo_selezione !== 1}
  //           onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
  //         >
  //           <StyledOption value="">Minuto inizio</StyledOption>
  //           {minuti.map((minuto) => (
  //             <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
  //           ))}
  //         </ClasseSelect>
  //       </StyledCol>
  //       <StyledCol>
  //         <ClasseSelect 
  //           name="ora_fine" 
  //           value={item.ora_fine} 
  //           readOnly={item.tipo_selezione !== 1}
  //           onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
  //         >
  //           <StyledOption value="">Ora fine</StyledOption>
  //           {ore.map((ora) => (
  //             <StyledOption key={ora} value={ora}>{ora}</StyledOption>  
  //           ))}
  //         </ClasseSelect>          
  //       </StyledCol>
  //       <StyledCol>
  //         <ClasseSelect 
  //           name="minuto_fine" 
  //           value={item.minuto_fine} 
  //           readOnly={item.tipo_selezione !== 1}
  //           onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
  //         >
  //           <StyledOption value="">Minuto fine</StyledOption>
  //           {minuti.map((minuto) => (
  //             <StyledOption key={minuto} value={minuto}>{minuto}</StyledOption>  
  //           ))}
  //         </ClasseSelect>
  //       </StyledCol>
  //       <StyledCol>
  //         <ClasseTextAreaModificabile 
  //           rows="1" 
  //           name="descrizione" 
  //           value={item.descrizione}
  //           placeholder="Descrizione*"
  //           readOnly={item.tipo_selezione !== 1}
  //           onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
  //         />          
  //       </StyledCol>
  //       <StyledCol>
  //         <ClasseTextAreaModificabile 
  //           rows="1" 
  //           name="note" 
  //           value={item.note} 
  //           placeholder="Note" 
  //           readOnly={item.tipo_selezione !== 1}
  //           onChange={item.tipo_selezione === 1 ? (e) => handleInputChangeLavoroEsistente(e, items, setItems, item.id_lavoro, item.id_cliente, item.id_professionista) : undefined}
  //         />
  //       </StyledCol>
  //     </StyledRow>
  //   </>
  // );
  return (
    <>
      <button>RowLavoroEsistente!!</button>
    </>
  );
}

export function RowFileLavori({item, setItem, ottieniLavoriRangePDF, ottieniLavoriRangeExcel, eliminaLavoriRange}) {
  const [primoGiornoType, setPrimoGiornoType] = useState('text');
  const [ultimoGiornoType, setUltimoGiornoType] = useState('text');
  let maxHeight = "2000px";

  item.primo_giorno = (item.primo_giorno !== undefined) ? item.primo_giorno : '';
  item.ultimo_giorno = (item.ultimo_giorno !== undefined) ? item.ultimo_giorno : '';

  return (
    <>
      <StyledRow>
        <OperazioniFileItems 
          ottieniLavoriRangePDF={ottieniLavoriRangePDF} 
          ottieniLavoriRangeExcel={ottieniLavoriRangeExcel} 
          eliminaLavoriRange={eliminaLavoriRange} 
        />
        <StyledCol>
          <StyledInputModifica
            rows="1"
            placeholder="Primo giorno"
            type={primoGiornoType}
            name="primo_giorno"
            value={item.primo_giorno}
            onClick={handleGiornoClick(setPrimoGiornoType)}
            onBlur={handleGiornoBlur(setPrimoGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />
        </StyledCol>
        <StyledCol>
          <StyledInputModifica
            rows="1"
            placeholder="Ultimo giorno"
            type={ultimoGiornoType}
            name="ultimo_giorno"
            value={item.ultimo_giorno}
            onClick={handleGiornoClick(setUltimoGiornoType)}
            onBlur={handleGiornoBlur(setUltimoGiornoType, item, setItem)}
            onChange={(e) => handleInputChange(e, setItem)}
          />          
        </StyledCol>
      </StyledRow>
    </>
  );
}









