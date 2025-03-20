import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardWidget, CardEntrateLavori, CardUsciteSpese, CardRicavi } from "../riutilizzabile/card_item/CardItem";
import { widgetSliceActions } from "../store/redux/WidgetSlice";

const DragAndDrop = ({ initialPositions, onClickWidget }) => {
  const [dragging, setDragging] = useState(false);
  const [positions, setPositions] = useState(initialPositions);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draggedElement, setDraggedElement] = useState(null);
  const gridSize = 310; // Definisci la larghezza delle celle della griglia
  const gridHeight = 410; // Definisci l'altezza delle celle della griglia
  const widgetSliceReducer = useSelector((state) => state.widgetSliceReducer.value);

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
    dispatch(widgetActions.modificaWidget({
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
  const widgetSliceReducer = useSelector((state) => state.widgetSliceReducer.value);
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
        <WidgetTag widget={widgetSliceReducer.nuovo_cliente} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.clienti} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetSliceReducer.nuovo_servizio} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.servizi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetSliceReducer.nuovo_lavoro} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.file_lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.prenotazione} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetSliceReducer.nuova_spesa} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.file_spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        
        <WidgetTag widget={widgetSliceReducer.salone} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        <WidgetTag widget={widgetSliceReducer.profilo} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
      </>) : (<>
        {(widgetSliceReducer.nuovo_cliente.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.nuovo_cliente} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.clienti.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.clienti} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        
        {(widgetSliceReducer.nuovo_servizio.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.nuovo_servizio} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.servizi.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.servizi} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        
        {(widgetSliceReducer.nuovo_lavoro.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.nuovo_lavoro} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.lavori.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.file_lavori.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.file_lavori} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.prenotazione.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.prenotazione} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        
        {(widgetSliceReducer.nuova_spesa.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.nuova_spesa} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.spese.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.file_spese.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.file_spese} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
                
        {(widgetSliceReducer.salone.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.salone} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
        {(widgetSliceReducer.profilo.tipoVisualizzazione !== 0) && (<WidgetTag widget={widgetSliceReducer.profilo} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />)}
      </>)}
    </div>
  );
};








