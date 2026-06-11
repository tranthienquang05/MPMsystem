import React, { useState, useRef, useEffect, SyntheticEvent } from "react";

interface CanvasAreaProps {
  backgroundImageUrl?: string;
  title: string;
  onClose: () => void;
  onSave: (drawnDataUrl: string) => void;
}

export default function CanvasArea({ backgroundImageUrl, title, onClose, onSave }: CanvasAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [brushSize, setBrushSize] = useState<number>(3);
  const [color, setColor] = useState<string>("#ffffff"); // white ink on dark grid

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high DP scale if needed, otherwise standard
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 500;

    // Fill canvas background depending on mode
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    // Draw some helper grids (manga drafting borders)
    ctx.strokeStyle = "rgba(245, 242, 237, 0.08)";
    ctx.lineWidth = 1;
 
    // Vertical & Horizontal Grid line
    ctx.beginPath();
    // Border box
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    // Panel cuts
    ctx.moveTo(canvas.width / 2, 30);
    ctx.lineTo(canvas.width / 2, canvas.height - 30);
    ctx.moveTo(30, canvas.height / 2);
    ctx.lineTo(canvas.width - 30, canvas.height / 2);
    ctx.stroke();

    // Context presets
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  }, []);

  const getCoordinates = (e: MouseEvent | TouchEvent | SyntheticEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    
    // Check if touch event
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ("clientX" in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    
    // Fallback for click events mapped from react synthesised event
    const nativeEvent = e.nativeEvent as MouseEvent;
    return {
      x: nativeEvent.clientX - rect.left,
      y: nativeEvent.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault(); // prevent touch gesture scrolling

    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = tool === "pen" ? color : "#121212";
    ctx.lineWidth = tool === "pen" ? brushSize : brushSize * 4;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid back
    ctx.strokeStyle = "rgba(245, 242, 237, 0.08)";
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 30);
    ctx.lineTo(canvas.width / 2, canvas.height - 30);
    ctx.moveTo(30, canvas.height / 2);
    ctx.lineTo(canvas.width - 30, canvas.height / 2);
    ctx.stroke();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="bg-[#181818] border border-[#F5F2ED]/15 rounded-none w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
        id="canvas_layer"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#F5F2ED]/10 flex items-center justify-between bg-[#1c1c1c]/40 font-serif">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#F5F2ED] fill">gesture</span>
            <div>
              <h3 className="font-serif text-lg font-light italic text-[#F5F2ED] tracking-wide">{title}</h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#F5F2ED]/40 mt-1 font-sans">Active Drawing Studio - Click & drag to draw speedlines & backgrounds</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#F5F2ED]/50 hover:text-white transition-colors p-1.5 hover:bg-[#F5F2ED]/5 rounded-none cursor-pointer"
            id="close-canvas-btn"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 border-b border-[#F5F2ED]/10 bg-[#121212] flex flex-wrap gap-4 items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTool("pen")}
              className={`px-3 py-1.5 rounded-none flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                tool === "pen" 
                  ? "bg-[#F5F2ED] text-[#121212] border-transparent" 
                  : "bg-transparent border border-[#F5F2ED]/10 text-[#F5F2ED]/60 hover:text-white hover:bg-[#F5F2ED]/5"
              }`}
              id="set-pen-btn"
            >
              <span className="material-symbols-outlined text-xs">edit</span>
              <span>Pen Tool</span>
            </button>
            <button
              onClick={() => setTool("eraser")}
              className={`px-3 py-1.5 rounded-none flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                tool === "eraser" 
                  ? "bg-[#F5F2ED] text-[#121212]" 
                  : "bg-transparent border border-[#F5F2ED]/10 text-[#F5F2ED]/60 hover:text-white hover:bg-[#F5F2ED]/5"
              }`}
              id="set-eraser-btn"
            >
              <span className="material-symbols-outlined text-xs">auto_fix_normal</span>
              <span>Eraser</span>
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-none bg-red-950/10 border border-red-900/40 text-red-300 hover:bg-red-950/25 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-1 cursor-pointer"
              id="clear-canvas-btn"
            >
              <span className="material-symbols-outlined text-xs">delete_sweep</span>
              <span>Clear</span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#F5F2ED]/50">
              <span>Brush Size:</span>
              <input
                type="range"
                min="1"
                max="15"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-24 accent-[#F5F2ED]"
                id="brush-size-slider"
              />
              <span className="w-5 font-mono text-[#F5F2ED] text-right font-bold text-xs">{brushSize}px</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#F5F2ED]/50">
              <span>Color:</span>
              <div className="flex gap-1.5">
                {["#ffffff", "#F5F2ED", "#cf7e7e", "#8c8c8c"].map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setColor(hex)}
                    style={{ backgroundColor: hex }}
                    className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                      color === hex ? "scale-125 border-white ring-1 ring-white/50" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Body Container */}
        <div className="flex-1 w-full bg-[#121212] flex items-center justify-center relative overflow-hidden">
          {backgroundImageUrl && (
            <img 
              src={backgroundImageUrl} 
              alt="Manga Draft background reference overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none mix-blend-screen grayscale contrast-125"
            />
          )}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair w-full h-full block"
            id="manga-drawing-canvas"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F5F2ED]/10 bg-[#1c1c1c]/40 flex items-center justify-between font-sans">
          <span className="text-[10px] text-[#F5F2ED]/40 flex items-center gap-1.5 uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5F2ED] animate-pulse"></span>
            <span>Canvas linked to local production draft. Progress automatically synced.</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-transparent text-white border border-[#F5F2ED]/10 hover:bg-[#F5F2ED]/5 font-bold text-[10px] rounded-none transition-all tracking-widest uppercase cursor-pointer"
              id="cancel-canvas-footer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#F5F2ED] hover:bg-[#F5F2ED]/90 text-[#121212] font-semibold text-[10px] rounded-none transition-all tracking-widest uppercase flex items-center gap-1.5 cursor-pointer"
              id="save-canvas-footer"
            >
              <span className="material-symbols-outlined text-[15px] fill">upload_file</span>
              <span>Save Inking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
