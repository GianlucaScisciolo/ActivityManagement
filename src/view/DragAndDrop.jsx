import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardWidget, CardEntrateLavori, CardUsciteSpese, CardRicavi } from "../riutilizzabile/card_item/CardItem";
import { modificaWidget } from "../store/redux/WidgetSlice";

const DragAndDrop = ({ initialPositions, onClickWidget }) => {
  const [dragging, setDragging] = useState(false);
  const [positions, setPositions] = useState(initialPositions);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggedElement, setDraggedElement] = useState(null);
  const gridSize = 310; // Definisci la larghezza delle celle della griglia
  const gridHeight = 410; // Definisci l'altezza delle celle della griglia
  const widgetReducer = useSelector((state) => state.widgetReducer.value);

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
            {(pos.tipo === "CardEntrateLavori") && (
              <CardEntrateLavori entrateLavori={pos.entrateLavori} />
            )}
            {(pos.tipo === "CardUsciteSpese") && (
              <CardUsciteSpese usciteSpese={pos.usciteSpese} />
            )}
            {(pos.tipo === "CardRicavi") && (
              <CardRicavi entrateLavori={pos.entrateLavori} usciteSpese={pos.usciteSpese} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DragAndDrop;

const onClickWidget = (e, widget, dispatch, navigate) => {
  e.preventDefault();
  if(widget.tipoVisualizzazione !== 2) {
    dispatch(modificaWidget({
      nomeWidget: widget.nome,
      tipoVisualizzazione: (widget.tipoVisualizzazione === 0 || widget.tipoVisualizzazione === 2) ? 1 : 0,
    }));
  }
  else {
    if(widget.nome === "nuovo_cliente") 
      navigate("/nuovo-cliente");
    else if(widget.nome === "clienti") 
      navigate("/clienti");

    else if(widget.nome === "nuovo_servizio") 
      navigate("/nuovo-servizio");
    else if(widget.nome === "servizi") 
      navigate("/servizi");
    
    else if(widget.nome === "nuovo_lavoro") 
      navigate("/nuovo-lavoro");
    else if(widget.nome === "lavori") 
      navigate("/lavori");
    else if(widget.nome === "file_lavori") 
      navigate("/file-lavori");
    else if(widget.nome === "prenotazione") 
      window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2GRuG5B0k6Qyo2DLBkT1-OOXXC1XO60HQkWAl3Txvc3z-PcBL0EYhfc62sAor46nbg-szeiADZ", "_blank");
    
    else if(widget.nome === "nuovo_servizio") 
      navigate("/nuovo-servizio");
    else if(widget.nome === "servizi") 
      navigate("/servizi");
    else if(widget.nome === "file_servizi") 
      navigate("/file-servizi");
    
    else if(widget.nome === "salone") 
      navigate("/salone");
    else if(widget.nome === "profilo") 
      navigate("/profilo");
  }
}

const WidgetTag = ({ widget, handleDragStart, handleDragEnd }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div 
      draggable
      onDragStart={(e) => handleDragStart(e, widget.id)}
      onDragEnd={handleDragEnd}
      style={{
        width: '310px', // Larghezza fissa delle celle
        height: '410px', // Altezza fissa delle celle
        position: 'absolute',
        left: widget.x,
        top: widget.y,
        cursor: 'pointer'
      }}
    >
      <CardWidget 
        nome={widget.nome} 
        img={widget.img} 
        backgroundColor={widget.backgroundColor} 
        id={widget.id} 
        onClickWidget={(e) => onClickWidget(e, widget, dispatch, navigate)} 
      /> 
    </div>
  );
}

export const DragAndDropWidgetHomePage = ({plusCliccato}) => {
  const widgetReducer = useSelector((state) => state.widgetReducer.value);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggedElement, setDraggedElement] = useState(null);
  // const dispatch = useDispatch();

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
        <WidgetTag widget={widgetReducer.nuovo_cliente} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.clienti} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetReducer.nuovo_servizio} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.servizi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetReducer.nuovo_lavoro} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.file_lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.prenotazione} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetReducer.nuova_spesa} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.file_spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetReducer.salone} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetReducer.profilo} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
      </>) : (<>
        {(widgetReducer.nuovo_cliente.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.nuovo_cliente} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.clienti.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.clienti} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        
        {(widgetReducer.nuovo_servizio.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.nuovo_servizio} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.servizi.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.servizi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        
        {(widgetReducer.nuovo_lavoro.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.nuovo_lavoro} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.lavori.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.file_lavori.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.file_lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.prenotazione.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.prenotazione} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        
        {(widgetReducer.nuova_spesa.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.nuova_spesa} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.spese.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.file_spese.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.file_spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
                
        {(widgetReducer.salone.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.salone} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetReducer.profilo.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetReducer.profilo} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
      </>)}
    </div>
  );
};








