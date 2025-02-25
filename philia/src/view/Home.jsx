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
    { id: '1', nome: 'Nuovo cliente', img: clienti, url: 'url-B', x: 100, y: 100 },
    { id: '2', nome: 'Clienti', img: clienti, url: 'url-B', x: 450, y: 100 },
    { id: '3', nome: 'Nuovo servizio', img: servizi, url: 'url-C', x: 800, y: 100 },
    { id: '4', nome: 'Servizi', img: servizi, url: 'url-C', x: 1150, y: 100 },
    { id: '5', nome: 'Nuovo lavoro', img: lavori, url: 'url-C', x: 1500, y: 100 },
    { id: '6', nome: 'Lavori', img: lavori, url: 'url-C', x: 1850, y: 100 },
    { id: '7', nome: 'File lavori', img: lavori, url: 'url-C', x: 2200, y: 100 },
    { id: '8', nome: 'Prenotazione', img: prenotazione, url: 'url-A', x: 2550, y: 100 },
    { id: '9', nome: 'Salone', img: salone, url: 'url-C', x: 2900, y: 100 },
    { id: '10', nome: 'Profilo', img: profilo, url: 'url-C', x: 3250, y: 100 },
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
