// React e Redux
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Actions
import { SaloneActions } from '../../actions/SaloneActions';
// Riutilizzabile
import { CardWidget, CardEntrateItems, CardUsciteItems, CardRicavi } from "../../riutilizzabile/card_item/CardItem";

const DragAndDrop = ({ initialPositions, onClickWidget }) => {
  const [dragging, setDragging] = useState(false);
  const [positions, setPositions] = useState(initialPositions);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggedElement, setDraggedElement] = useState(null);
  const gridSize = 310; // Definisci la larghezza delle celle della griglia
  const gridHeight = 410; // Definisci l'altezza delle celle della griglia
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);

  const handleDragStart = (e, id) => {
    setDragging(true);
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.dataTransfer.setData('text/plain', id);
    // Aggiungi la classe "dragging" all'elemento trascinato
    e.target.classList.add('dragging');
    setDraggedElement(e.target);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    // Rimuovi la classe "dragging" dall'elemento trascinato
    if (draggedElement) {
      draggedElement.classList.remove('dragging');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (dragging && draggedElement) {
      const containerRect = e.currentTarget.getBoundingClientRect();
      draggedElement.style.left = `${e.clientX - offset.x - containerRect.left}px`;
      draggedElement.style.top = `${e.clientY - offset.y - containerRect.top}px`;
    }
  };
  
  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={null}
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative'
        }}
      >
        {positions.map((pos, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, pos.id)}
            onDragEnd={handleDragEnd}
            style={{
              width: '310px', // Larghezza fissa delle celle
              height: '410px', // Altezza fissa delle celle
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              cursor: 'pointer'
            }}
          >
            {(pos.tipo === "CardWidget") && (
              (pos.id >= 0) && (
                <CardWidget nome={pos.nome} img={pos.img} backgroundColor={pos.backgroundColor} id={pos.id} onClickWidget={onClickWidget} />
              )
            )}
            {(pos.tipo === "CardEntrateItems") && (
              <CardEntrateItems entrateItems={pos.entrateLavori} etichettaIta="Entrate lavori" etichettaEng="Revenue jobs" />
            )}
            {(pos.tipo === "CardUsciteSpese") && (
              <CardUsciteItems usciteItems={pos.usciteSpese} etichettaIta="Uscite spese" etichettaEng="Exit expenses" />
            )}
            {(pos.tipo === "CardRicavi") && (
              <CardRicavi entrate={pos.entrateLavori} uscite={pos.usciteSpese} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DragAndDrop;

const onClickWidget = (e, widget, navigate) => {
  const saloneActions = new SaloneActions();
  e.preventDefault();
  e.stopPropagation();
  if(widget.tipoVisualizzazione !== 2) {
    saloneActions.modificaWidget(
      widget.nome, 
      (widget.tipoVisualizzazione === 0 || widget.tipoVisualizzazione === 2) ? 1 : 0
    );
  }
  else {
    // Cliente
    const widgetNames = [
      "clienti", "clients", 
      "servizi", "services", 
      "lavori", "jobs", 
      "spese", "expenses", 
      "analisi", "analyses", 
      "profilo", "profile"
    ]
    if(widgetNames.includes(widget.nome)) {
      navigate("/" + widget.nome);
    }
  }
}

const WidgetTag = ({ widget, handleDragStart, handleDragEnd }) => {
  const navigate = useNavigate();

  return (
    <div 
      draggable
      onDragStart={(e) => handleDragStart(e, widget.id)}
      onDragEnd={handleDragEnd}
      style={{
        width: '310px',
        height: '410px',
        position: 'absolute',
        left: widget.x,
        top: widget.y,
        cursor: 'grab',
      }}
    >
      <CardWidget 
        nome={widget.nome === "analisi" ? "Analisi" :  widget.nome.charAt(0).toUpperCase() + widget.nome.slice(1)} 
        img={widget.img} 
        backgroundColor={widget.backgroundColor} 
        id={widget.id} 
        onClickWidget={(e) => onClickWidget(e, widget, navigate)} 
      /> 
    </div>
  );
};

export const DragAndDropWidgetHomePage = ({plusCliccato}) => {
  const saloneState = useSelector((state) => state.saloneSliceReducer.value);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggedElement, setDraggedElement] = useState(null);

  const handleDragStart = (e, id) => {
    setDragging(true);
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.dataTransfer.setData('text/plain', id);
    e.target.classList.add('dragging');
    setDraggedElement(e.target);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    if (draggedElement) {
      draggedElement.classList.remove('dragging');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (dragging && draggedElement) {
      const containerRect = e.currentTarget.getBoundingClientRect();
      draggedElement.style.left = `${e.clientX - offset.x - containerRect.left}px`;
      draggedElement.style.top = `${e.clientY - offset.y - containerRect.top}px`;
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative'
      }}
    >
      {(plusCliccato === true) ? (<>
        { /** Cliente **/}
        <WidgetTag widget={saloneState.clienti} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        { /** Servizio **/}
        <WidgetTag widget={saloneState.servizi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        { /** Lavoro **/}
        <WidgetTag widget={saloneState.lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        { /** Spesa **/}
        <WidgetTag widget={saloneState.spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        { /** analisi **/}
        <WidgetTag widget={saloneState.analisi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        { /** Profilo **/}
        <WidgetTag widget={saloneState.profilo} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
      </>) : (<>
        { /** Cliente **/}
        {(saloneState.clienti.tipoVisualizzazione !== 0) && (<WidgetTag widget={saloneState.clienti} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        { /** Servizio **/}
        {(saloneState.servizi.tipoVisualizzazione !== 0) && (<WidgetTag widget={saloneState.servizi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        { /** Lavoro **/}
        {(saloneState.lavori.tipoVisualizzazione !== 0) && (<WidgetTag widget={saloneState.lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        { /** Spesa **/}
        {(saloneState.spese.tipoVisualizzazione !== 0) && (<WidgetTag widget={saloneState.spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        { /** Analisi **/}
        {(saloneState.analisi.tipoVisualizzazione !== 0) && (<WidgetTag widget={saloneState.analisi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        { /** Profilo **/}
        {(saloneState.profilo.tipoVisualizzazione !== 0) && (<WidgetTag widget={saloneState.profilo} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
      </>)}
    </div>
  );
};








