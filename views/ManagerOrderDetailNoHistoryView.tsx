
import React from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  HardHat, 
  Maximize2, 
  Camera
} from 'lucide-react';
import { Task } from '../types';

interface ManagerOrderDetailNoHistoryViewProps {
  task: Task;
  onBack: () => void;
}

export const ManagerOrderDetailNoHistoryView: React.FC<ManagerOrderDetailNoHistoryViewProps> = ({ task, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 pt-12 pb-4 px-4 shadow-lg z-20 shrink-0 sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="text-white hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-white text-lg font-bold tracking-tight">Detalle de Orden</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200 flex items-center gap-1.5 uppercase">
            Pendiente
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-8">
        <div className="p-4 space-y-4">
          
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="space-y-4">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Título</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{task.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Obra</p>
                  <p className="text-sm font-bold text-slate-900">{task.project}</p>
                </div>
                <div className="space-y-0.5 text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Solicitante</p>
                  <p className="text-sm font-semibold text-slate-700">{task.solicitante}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha de Solicitud</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                    <Calendar size={16} />
                    {task.date}
                  </div>
                </div>
                <div className="space-y-0.5 text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asignado</p>
                  <div className="flex items-center justify-end gap-1 text-sm font-medium text-slate-600">
                    <HardHat size={16} />
                    {task.assignee || 'Sin asignar'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción del Requerimiento</h3>
            <p className="text-[15px] leading-relaxed text-slate-700">
              {task.description}
            </p>
          </div>

          {/* Photo Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Foto Original de Reporte</h3>
            <div className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                alt="Foto Original" 
                className="w-full h-full object-cover" 
                src={task.foto_original}
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-active:opacity-100 transition-opacity">
                <Maximize2 className="text-white" size={32} />
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-900/40 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                <Camera size={12} />
                Captura Inicial
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
