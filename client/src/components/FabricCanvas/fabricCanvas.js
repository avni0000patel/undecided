import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ff69b4');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const skirtRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    const initialSkirt = new fabric.Polygon([
      { x: 150, y: 100 },
      { x: 150 + width, y: 100 },
      { x: 150 + width + 50, y: 100 + height },
      { x: 150 - 50, y: 100 + height }
    ], {
      fill: color,
      selectable: true,
    });

    canvas.add(initialSkirt);
    skirtRef.current = initialSkirt;

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (skirtRef.current) {
      skirtRef.current.set({ fill: color });
      skirtRef.current.canvas.renderAll();
    }
  }, [color]);

  useEffect(() => {
    if (skirtRef.current) {
      skirtRef.current.set({
        points: [
          { x: 150, y: 100 },
          { x: 150 + width, y: 100 },
          { x: 150 + width + 50, y: 100 + height },
          { x: 150 - 50, y: 100 + height }
        ]
      });
      skirtRef.current.canvas.renderAll();
    }
  }, [width, height]);

  return (
    <div>
      <div id="canvas-container">
        <canvas ref={canvasRef} width="600" height="400"></canvas>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <label htmlFor="colorPicker">Choose Skirt Color:</label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <label htmlFor="skirtWidth">Skirt Width:</label>
        <input
          type="range"
          id="skirtWidth"
          min="100"
          max="500"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
        />
        <label htmlFor="skirtHeight">Skirt Height:</label>
        <input
          type="range"
          id="skirtHeight"
          min="100"
          max="500"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default FabricCanvas;