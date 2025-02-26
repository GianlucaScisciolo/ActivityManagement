import Header from "./component/Header";
import { SiGooglecalendar } from "react-icons/si";
import DragAndDrop from "../DragAndDrop";

import clienti from './img/img_widget/clienti.png';
import servizi from './img/img_widget/servizi.png';
import lavori from './img/img_widget/lavori.png';
import prenotazione from './img/img_widget/prenotazione.png';
import salone from './img/img_widget/salone.png';
import profilo from './img/img_widget/profilo.png';

function Home() {
  const initialPositions = [
    { id: '1', tipo: "CardWidget", nome: 'Nuovo cliente', img: clienti, x: 100, y: 100 },
    { id: '2', tipo: "CardWidget", nome: 'Clienti', img: clienti, x: 450, y: 100 },
    { id: '3', tipo: "CardWidget", nome: 'Nuovo servizio', img: servizi, x: 800, y: 100 },
    { id: '4', tipo: "CardWidget", nome: 'Servizi', img: servizi, x: 1150, y: 100 },
    { id: '5', tipo: "CardWidget", nome: 'Nuovo lavoro', img: lavori, x: 1500, y: 100 },
    { id: '6', tipo: "CardWidget", nome: 'Lavori', img: lavori, x: 1850, y: 100 },
    { id: '7', tipo: "CardWidget", nome: 'File lavori', img: lavori, x: 2200, y: 100 },
    { id: '8', tipo: "CardWidget", nome: 'Prenotazione', img: prenotazione, x: 2550, y: 100 },
    { id: '9', tipo: "CardWidget", nome: 'Salone', img: salone, x: 2900, y: 100 },
    { id: '10', tipo: "CardWidget", nome: 'Profilo', img: profilo, x: 3250, y: 100 },
  ];

  return (
    <>
      <Header />
      <br /> <br /> <br /> 

      <DragAndDrop initialPositions={initialPositions} />
    </>
  );
}

export default Home;
