import React, { useState, useRef, useEffect } from 'react';
import { 
  Pencil, 
  Eraser, 
  Brush 
} from 'lucide-react';

const MsPaintClone = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('pencil');

  // Predefined color palette
  const colorPalette = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    context.lineCap = 'round';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = brushSize;
  }, [color, brushSize]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'pencil' || tool === 'brush') {
      context.lineTo(x, y);
      context.stroke();
    } else if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
      context.lineTo(x, y);
      context.stroke();
      context.globalCompositeOperation = 'source-over';
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'paint-drawing.png';
    link.href = image;
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="flex space-x-4 mb-4 items-center">
        {/* Tool Selection Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={() => setTool('pencil')} 
            className={`p-2 rounded ${tool === 'pencil' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            <Pencil />
          </button>
          <button 
            onClick={() => setTool('brush')} 
            className={`p-2 rounded ${tool === 'brush' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            <Brush />
          </button>
          <button 
            onClick={() => setTool('eraser')} 
            className={`p-2 rounded ${tool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            <Eraser />
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex space-x-1">
          {colorPalette.map((paletteColor) => (
            <button
              key={paletteColor}
              onClick={() => setColor(paletteColor)}
              className={`w-8 h-8 rounded-full border-2 ${
                color === paletteColor ? 'border-black' : 'border-transparent'
              }`}
              style={{ backgroundColor: paletteColor }}
            />
          ))}
        </div>

        {/* Custom Color Input */}
        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-10"
        />

        {/* Brush Size Slider */}
        <div className="flex items-center space-x-2">
          <span>Size:</span>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32"
          />
          <span>{brushSize}</span>
        </div>

        {/* Utility Buttons */}
        <button 
          onClick={clearCanvas} 
          className="p-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
        <button 
          onClick={saveImage} 
          className="p-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* Canvas */}
      <canvas 
        ref={canvasRef}
        width={800} 
        height={600} 
        className="bg-white border-2 border-gray-300"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <footer>
      <p className='text-red-400 text-xl font-bold '>
        Build by<a href="https://github.com/Khangithub17" target="_blank" rel="noopener noreferrer">@codewithkhan</a>
      </p>
    </footer>
    </div>
    
  );
};

export default MsPaintClone;