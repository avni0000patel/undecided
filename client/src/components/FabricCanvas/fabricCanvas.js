import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const FabricCanvas = () => {
    const canvasRef = useRef(null);
    const [color, setColor] = useState('#ff69b4');
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [flare, setFlare] = useState(0);
    const [patternImage, setPatternImage] = useState(null);
    const skirtRef = useRef(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current);
        const initialSkirt = new fabric.Polygon([
            { x: 150, y: 100 },
            { x: 150 + width, y: 100 },
            { x: 150 + width + flare, y: 100 + height },
            { x: 150 - flare, y: 100 + height }
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
            const points = [
                { x: 150, y: 100 },
                { x: 150 + width, y: 100 },
                { x: 150 + width + flare, y: 100 + height },
                { x: 150 - flare, y: 100 + height }
            ];
            skirtRef.current.set({ points });
            skirtRef.current.canvas.renderAll();
        }
    }, [width, height, flare]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = () => {
                const pattern = new fabric.Pattern({
                    source: imgObj,
                    repeat: 'repeat'
                });
                if (skirtRef.current) {
                    skirtRef.current.set({ fill: pattern });
                    skirtRef.current.canvas.renderAll();
                }
            };
        };
        reader.readAsDataURL(file);
    };

    const mapToInches = (value, minPx, maxPx, minInches, maxInches) => {
        const rangePx = maxPx - minPx;
        const rangeInches = maxInches - minInches;
        return ((value - minPx) * rangeInches / rangePx + minInches).toFixed(2);
    };

    const widthInches = mapToInches(width, 100, 300, 5, 60);
    const heightInches = mapToInches(height, 100, 300, 5, 60);
    const flareInches = mapToInches(flare, 0, 500, 0, 50);

    return (
        <div>
            <div id="canvas-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <canvas ref={canvasRef} width="600" height="400" style={{ margin: 'auto' }}></canvas>
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
                <label htmlFor="patternUpload">Upload Pattern Image:</label>
                <input
                    type="file"
                    id="patternUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <label htmlFor="skirtWidth">Skirt Width:</label>
                <input
                    type="range"
                    id="skirtWidth"
                    min="100"
                    max="300"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                />
                <span>{widthInches} inches</span>
                <br />
                <label htmlFor="skirtHeight">Skirt Height:</label>
                <input
                    type="range"
                    id="skirtHeight"
                    min="100"
                    max="300"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                />
                <span>{heightInches} inches</span>
                <br />
                <label htmlFor="skirtFlare">Skirt Flare:</label>
                <input
                    type="range"
                    id="skirtFlare"
                    min="0"
                    max="500"
                    value={flare}
                    onChange={(e) => setFlare(parseInt(e.target.value))}
                />
                <span>{flareInches} inches</span>
            </div>
        </div>
    );
};

export default FabricCanvas;
