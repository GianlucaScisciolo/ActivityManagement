import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../component/Header";
import LavoroAction from "../../action/lavoro_action/LavoroAction";
import { operazioniLavori } from "../../vario/Operazioni";
import lavoroStore from "../../store/lavoro_store/LavoroStore";
import { aggiornamentoLista } from "../../vario/OperazioniRicerca";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatoDate, formatoTime } from "../../vario/Tempo";
import { generaFileLavoriPDF, generaFileLavoriExcel } from "../../vario/File";
// import { FormFileLavori } from "../component/form_item/FormsLavori";
// import { CardFileLavori } from "../component/card_item/CardsLavori";
// import { RowFileLavori } from "../component/row_item/RowsLavori";

const FileLavori = () => {
  return (
    <>In corso.</>
  )
}
// const FileLavori = () => {
//   const formSession = useSelector((state) => state.formSession.value);
//   const itemSession = useSelector((state) => state.itemSession.value);
  
//   const [datiRicerca, setDatiRicerca] = useState({
//     nome_cliente: "",
//     cognome_cliente: "",
//     nome_professionista: "",
//     professione: "",
//     primo_giorno: "",
//     ultimo_giorno: "",
//     descrizione: "",
//     note: "",
//   });
//   const [lavori, setLavori] = useState(-1);
//   const [aggiornamentoCompletato, setAggiornamentoCompletato] = useState("");
//   const [tipoFile, setTipoFile] = useState('');
//   const [eliminaLavori, setEliminaLavori] = useState(false);
  
//   const updateDatiLastSearch = () => {
//     console.log("Dati aggiornati.");
//   };

//   const ottieniLavori = async () => {
//     lavoroStore.azzeraLavori(); // rende lavori === -1
//     await LavoroAction.dispatchAction(datiRicerca, operazioniLavori.VISUALIZZA_LAVORI);
//     setAggiornamentoCompletato(false);
//   };

//   const ottieniLavoriRange = async (e, tipoFile) => {
//     e.preventDefault();
//     if (confirm("Sei sicuro di voler ottenere il file?")) {
//       setTipoFile(tipoFile);
//       await ottieniLavori();
//     }
//     else {
//       alert("Operazione annullata.");
//     }
//   };

//   useEffect(() => {
//     if (aggiornamentoCompletato === false) {
//       aggiornamentoLista("lavori", setLavori);
//       console.log("Aggiornamento in corso ...");
//     }
//   }, [aggiornamentoCompletato]);

//   useEffect(() => {
//     if (aggiornamentoCompletato === false && lavori !== -1) {
//       setAggiornamentoCompletato(true);
//       console.log("Aggiornamento completato.")
//       if(tipoFile === "pdf") {
//         generaFileLavoriPDF(lavori);
//       }
//       else if(tipoFile === "excel") {
//         generaFileLavoriExcel(lavori);
//       }
//       setDatiRicerca(prevState => ({
//         ...prevState,
//         primo_giorno: "", 
//         ultimo_giorno: ""
//       }));
//     }
//   }, [lavori]);


//   const handleDelete = async (e) => {
//     e.preventDefault();
//     if (confirm("Sei sicuro di voler eliminare i lavori?")) {
//       const dati = {
//         tipo_item: "lavoro", 
//         "primo_giorno": datiRicerca.primo_giorno, 
//         "ultimo_giorno": datiRicerca.ultimo_giorno 
//       }
    
//       const response = await fetch('/ELIMINA_ITEMS_RANGE_GIORNI', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dati),
//       });
//       if(response.status === 200) {
//         alert("Eliminazione completata con successo.");
//       }
//       else {
//         alert("Errore durante l\'eliminazione dei lavori, riprova più tardi."); 
//       }
//     }
//     else {
//       alert("Eliminazione annullata.");
//     }
//   }

//   const FormFileLavoriTag = (formSession.view === "form") ? FormFileLavori : (
//     (formSession.view === "card") ? CardFileLavori : RowFileLavori
//   );

//   return (
//     <>
//       <Header />

//       <div className="main-content" />
      
//       <FormFileLavoriTag 
//       item={datiRicerca}
//       setItem={setDatiRicerca}
//       ottieniLavoriRangePDF={(e) => ottieniLavoriRange(e, "pdf")}
//       ottieniLavoriRangeExcel={(e) => ottieniLavoriRange(e, "excel")}
//       eliminaLavoriRange={(e) => handleDelete(e)}
//       />

//     </>
//   );
// };

export default FileLavori;









