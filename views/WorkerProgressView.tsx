
import React, { useState } from 'react';
// Fixed: Replaced non-existent 'FactCheck' with 'ClipboardCheck'
import { X, Camera, ImagePlus, FileText, CheckCircle, TrendingUp, ClipboardCheck, Check } from 'lucide-react';

interface WorkerProgressViewProps {
  onBack: () => void;
  onSubmit: () => void;
}

type RegistrationType = 'PROGRESS' | 'REVIEW';

export const WorkerProgressView: React.FC<WorkerProgressViewProps> = ({ onBack, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState<RegistrationType>('PROGRESS');
  
  const minChars = 20;
  const maxChars = 500;

  const handleInitialSubmit = () => {
    setIsModalOpen(true);
  };

  const handleFinalConfirm = () => {
    setIsModalOpen(false);
    onSubmit();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans h-screen overflow-hidden text-slate-900">
      {/* Header */}
      <header className="flex-none bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200 z-30 transition-colors">
        <button 
          onClick={onBack}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 transition-colors active:scale-95"
        >
          <X size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center mx-2">Visita</h2>
        <div className="flex w-10 items-center justify-end shrink-0">
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32 w-full max-w-lg mx-auto">
        <section className="p-4 pt-6">
          <h3 className="text-slate-900 text-lg font-bold leading-tight px-1 pb-3 flex items-center gap-2">
            <Camera className="text-slate-900/80" size={20} />
            Evidencia Visual
          </h3>
          <div className="flex flex-col">
            <div className="group relative flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-[#d5d9e2] bg-white px-6 py-10 transition-all hover:border-slate-900 cursor-pointer active:bg-slate-50">
              <div className="size-14 rounded-full bg-[#eaecf1] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ImagePlus className="text-slate-900" size={28} />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-slate-900 text-base font-bold leading-tight">Foto (Obligatoria)</p>
                <p className="text-[#5d6a89] text-xs font-normal">JPG, PNG • Máx 20MB</p>
              </div>
              <button className="mt-2 flex items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-slate-900/10 text-slate-900 text-sm font-bold leading-normal transition-colors group-hover:bg-slate-900 group-hover:text-white">
                Abrir Cámara
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 pb-6">
          <h3 className="text-slate-900 text-lg font-bold leading-tight px-1 pb-3 pt-2 flex items-center gap-2">
            <FileText className="text-slate-900/80" size={20} />
            Detalles
          </h3>
          <div className="relative">
            <label className="block text-slate-900 text-sm font-medium leading-normal pb-2 ml-1">Descripción (Mín. {minChars} caracteres)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-slate-900 p-4 text-base shadow-sm min-h-[160px] resize-none placeholder:text-[#5d6a89]/60 outline-none border" 
              placeholder="Escriba los detalles de la visita técnica..."
              maxLength={maxChars}
            ></textarea>
            <div className="flex justify-between items-center mt-2 px-1">
              <div className="flex items-center gap-1.5">
                <div className={`size-2 rounded-full ${description.length < minChars ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                <span className={`text-xs font-semibold ${description.length < minChars ? 'text-red-500' : 'text-emerald-600'}`}>
                  {description.length < minChars ? `Mínimo ${minChars} caracteres` : 'Longitud correcta'}
                </span>
              </div>
              <span className="text-xs font-medium text-[#5d6a89]">{description.length}/{maxChars}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-40 max-w-md mx-auto">
        <div className="p-4">
          <button 
            onClick={handleInitialSubmit}
            className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-base transition-all active:scale-[0.98] group"
          >
            <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
            Registrar Avance
          </button>
        </div>
      </div>

      {/* Selection Modal (Popup) */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[50] animate-in fade-in duration-300"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-0 animate-in slide-in-from-bottom duration-300">
            <div className="bg-white w-full max-w-md rounded-t-[32px] shadow-2xl pb-10">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-6">
                <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
              </div>
              
              <div className="px-6">
                <h3 className="text-slate-900 text-xl font-bold text-center mb-1">Tipo de Registro</h3>
                <p className="text-slate-500 text-sm text-center mb-8">Seleccione la acción para completar su visita</p>
                
                <div className="space-y-3 mb-8">
                  {/* Option 1: Registrar Avance */}
                  <label 
                    className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      selection === 'PROGRESS' 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-slate-100 bg-white hover:bg-slate-50'
                    }`}
                    onClick={() => setSelection('PROGRESS')}
                  >
                    <input type="radio" className="hidden" name="action_type" checked={selection === 'PROGRESS'} readOnly />
                    <div className="flex-1 flex items-center gap-4">
                      <div className={`size-10 rounded-full flex items-center justify-center ${
                        selection === 'PROGRESS' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-base leading-tight">Registrar Avance</p>
                        <p className={`text-xs mt-0.5 ${selection === 'PROGRESS' ? 'text-emerald-700' : 'text-slate-500'}`}>Agregar progreso actual</p>
                      </div>
                    </div>
                    {selection === 'PROGRESS' && (
                      <div className="size-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check size={14} className="text-white font-bold" strokeWidth={4} />
                      </div>
                    )}
                    {selection !== 'PROGRESS' && (
                      <div className="size-6 rounded-full border-2 border-slate-200"></div>
                    )}
                  </label>

                  {/* Option 2: Solicitar Revisión */}
                  <label 
                    className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      selection === 'REVIEW' 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-slate-100 bg-white hover:bg-slate-50'
                    }`}
                    onClick={() => setSelection('REVIEW')}
                  >
                    <input type="radio" className="hidden" name="action_type" checked={selection === 'REVIEW'} readOnly />
                    <div className="flex-1 flex items-center gap-4">
                      <div className={`size-10 rounded-full flex items-center justify-center ${
                        selection === 'REVIEW' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <ClipboardCheck size={20} />
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-base leading-tight">Solicitar Revisión</p>
                        <p className={`text-xs mt-0.5 ${selection === 'REVIEW' ? 'text-emerald-700' : 'text-slate-500'}`}>Solicitar validación de un supervisor</p>
                      </div>
                    </div>
                    {selection === 'REVIEW' && (
                      <div className="size-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check size={14} className="text-white font-bold" strokeWidth={4} />
                      </div>
                    )}
                    {selection !== 'REVIEW' && (
                      <div className="size-6 rounded-full border-2 border-slate-200"></div>
                    )}
                  </label>
                </div>

                <button 
                  onClick={handleFinalConfirm}
                  className="w-full h-14 bg-slate-900 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-base transition-all active:scale-[0.98]"
                >
                  Confirmar Selección
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
