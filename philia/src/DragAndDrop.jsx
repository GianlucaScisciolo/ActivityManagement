import React, { useState } from 'react';
import { CardWidget } from './trasportabile/card_item/CardItem'; // Importa il componente CardWidget

const DragAndDrop = ({ initialPositions }) => {
    const [dragging, setDragging] = useState(false);
    const [positions, setPositions] = useState(initialPositions);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [draggedElement, setDraggedElement] = useState(null);
    const gridSize = 310; // Definisci la larghezza delle celle della griglia
    const gridHeight = 410; // Definisci l'altezza delle celle della griglia

    const findNearestFreePosition = (x, y) => {
        let newX = x;
        let newY = y;
        let collision = true;

        while (collision) {
            collision = false;
            for (const pos of positions) {
                if (newX === pos.x && newY === pos.y) {
                    collision = true;
                    newX += gridSize;
                    if (newX >= window.innerWidth) {
                        newX = 0;
                        newY += gridHeight;
                    }
                    break;
                }
            }
        }

        return { x: newX, y: newY };
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const containerRect = e.currentTarget.getBoundingClientRect();
        const x = Math.round((e.clientX - offset.x - containerRect.left) / gridSize) * gridSize;
        const y = Math.round((e.clientY - offset.y - containerRect.top) / gridHeight) * gridHeight;
        const newPosition = findNearestFreePosition(x, y);

        setPositions((prevPositions) =>
            prevPositions.map((pos) =>
                pos.id === id ? { ...pos, ...newPosition } : pos
            )
        );
        setDragging(false);
    };

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
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative'
            }}
        >
            {positions.map((pos) => (
                <div
                    key={pos.id}
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
                    <CardWidget nome={pos.nome} img={pos.img} url={pos.url} /> {/* Utilizza il componente CardWidget */}
                </div>
            ))}
        </div>
    );
};

export default DragAndDrop;
