import React, { useState } from 'react';

const DragAndDrop = () => {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const gridSize = 50; // Definisci la dimensione delle celle della griglia

    const handleDragStart = (e) => {
        setDragging(true);
        const rect = e.target.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const containerRect = e.currentTarget.getBoundingClientRect();
        const x = Math.round((e.clientX - offset.x - containerRect.left) / gridSize) * gridSize;
        const y = Math.round((e.clientY - offset.y - containerRect.top) / gridSize) * gridSize;
        setPosition({ x, y });
        setDragging(false);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
                width: '100%',
                height: '100vh',
                border: '2px dashed #ccc',
                position: 'relative'
            }}
        >
            <div
                draggable
                onDragStart={handleDragStart}
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'skyblue',
                    position: 'absolute',
                    left: position.x,
                    top: position.y
                }}
            >
                Trascinami!
            </div>
        </div>
    );
};

export default DragAndDrop;
