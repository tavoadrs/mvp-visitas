
import React, { useEffect, useState, useRef } from 'react';
import { X, RotateCcw, Move, Minus, Plus, Loader2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { IMAGE_FALLBACK } from '../constants';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, title }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setLoading(true);
      setHasError(false);
      setImgSrc(imageUrl);
      resetView();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, imageUrl]);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    setLoading(true);
    // Cambiamos la URL ligeramente para forzar la recarga del navegador
    const separator = imageUrl.includes('?') ? '&' : '?';
    setImgSrc(`${imageUrl}${separator}refresh=${Date.now()}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    startPos.current = {
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1) return;
    const newX = e.touches[0].clientX - startPos.current.x;
    const newY = e.touches[0].clientY - startPos.current.y;
    
    const limitX = (window.innerWidth * (scale - 1)) / 2;
    const limitY = (window.innerHeight * (scale - 1)) / 2;
    
    setPosition({
      x: Math.max(-limitX, Math.min(limitX, newX)),
      y: Math.max(-limitY, Math.min(limitY, newY))
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col bg-[#050810] animate-in fade-in duration-300 touch-none select-none"
      onClick={onClose}
    >
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[120] pointer-events-none">
        <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
           <div className="flex items-center gap-2">
             <div className={`size-2 rounded-full ${hasError ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`}></div>
             <p className="text-white/90 text-[10px] font-black uppercase tracking-[0.2em]">Visor de Inspección</p>
           </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all active:scale-90 pointer-events-auto backdrop-blur-xl border border-white/10"
        >
          <X size={26} />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {loading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 z-[130]">
            <Loader2 size={48} className="animate-spin mb-4 text-emerald-500" />
            <p className="text-[10px] font-bold uppercase tracking-widest animate-pulse text-white/40">Procesando Imagen...</p>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 z-[130] p-10 text-center bg-[#050810]">
            <AlertCircle size={40} className="text-red-500 mb-6" />
            <h4 className="text-white font-bold text-lg mb-2">Error de Conexión</h4>
            <p className="text-sm text-white/40 max-w-[280px] mb-8">No se pudo cargar la evidencia técnica desde el repositorio central.</p>
            <div className="flex flex-col w-full max-w-xs gap-3">
              <button onClick={handleRetry} className="w-full h-12 bg-emerald-600 rounded-xl text-white text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2">
                <RefreshCw size={16} /> Reintentar Carga
              </button>
            </div>
          </div>
        )}
        
        <div 
          className="relative transition-transform duration-300 ease-out will-change-transform flex items-center justify-center"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            display: hasError ? 'none' : 'flex'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={imgSrc} 
            alt={title || "Evidencia"} 
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
            className={`max-w-[95vw] max-h-[75vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
            draggable={false}
          />
        </div>
      </div>

      <div className="relative z-[110] bg-gradient-to-t from-black px-8 pb-12 pt-16" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-md mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-6">
              <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest mb-1 block">Registro Técnico</span>
              <h3 className="text-white text-xl font-bold leading-tight line-clamp-2 tracking-tight">
                {title || "Evidencia Técnica"}
              </h3>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); resetView(); }}
              className={`size-14 flex items-center justify-center bg-white/5 text-white/70 rounded-2xl border border-white/10 ${scale > 1 ? 'opacity-100' : 'opacity-0'}`}
            >
              <RotateCcw size={22} />
            </button>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex-1 flex bg-white/5 rounded-2xl p-1.5 border border-white/5">
                <button onClick={handleZoomOut} disabled={scale <= 1 || hasError || loading} className="flex-1 h-14 flex items-center justify-center text-white/40 disabled:opacity-10 transition-colors"><Minus size={24} /></button>
                <div className="w-px bg-white/10 my-3"></div>
                <button onClick={handleZoomIn} disabled={scale >= 4 || hasError || loading} className="flex-1 h-14 flex items-center justify-center text-white/40 disabled:opacity-10 transition-colors"><Plus size={24} /></button>
             </div>
             <button onClick={onClose} className="px-8 h-14 bg-white/5 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
