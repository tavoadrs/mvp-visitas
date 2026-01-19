
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  HardHat, 
  Maximize2, 
  Plus,
  Camera,
  History,
  ChevronRight
} from 'lucide-react';
import { Task, TaskStatus } from '../types';
import { ImageModal } from '../components/ImageModal';
import { IMAGE_FALLBACK } from '../constants';

interface WorkerOrderDetailViewProps {
  task: Task;
  onBack: () => void;
  onRegisterProgress?: () => void;
}

export const WorkerOrderDetailView: React.FC<WorkerOrderDetailViewProps> = ({ task, onBack, onRegisterProgress }) => {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, url: '', title: '' });
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const historyPerPage = 5;

  const openModal = (url: string, title: string) => {
    setModalConfig({ isOpen: true, url, title });
  };

  const history = useMemo(() => (task.task_history || []).slice().reverse(), [task.task_history]);
  const totalHistoryPages = Math.ceil(history.length / historyPerPage);
  const paginatedHistory = history.slice((currentHistoryPage - 1) * historyPerPage, currentHistoryPage * historyPerPage);

  const formatFecha = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return isoString;
    }
  };

  const formatHora = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
    } catch {
      return "00:00 AM";
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.IN_REVIEW:
        return (
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1.5 uppercase">
            <span className="size-2 bg-blue-500 rounded-full"></span>
            En Revisión
          </span>
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1.5 uppercase">
            <span className="size-2 bg-blue-500 rounded-full animate-pulse"></span>
            En Proceso
          </span>
        );
      case TaskStatus.PENDING:
        return (
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold border border-orange-500/30 flex items-center gap-1.5 uppercase">
            <span className="size-2 bg-orange-500 rounded-full"></span>
            Pendiente
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans">
      <header className="bg-slate-900 pt-12 pb-5 px-4 shadow-lg z-20 shrink-0 sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-white hover:bg-white/10 p-1.5 rounded-full flex items-center justify-center">
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h2 className="text-white text-lg font-bold tracking-tight">Detalle de Orden</h2>
          </div>
          {getStatusBadge(task.status)}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Título</p>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{task.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-5 pt-5 border-t border-slate-50">
              <div className="space-y-0.5"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Obra</p><p className="text-sm font-bold text-slate-900">{task.project}</p></div>
              <div className="space-y-0.5 text-right"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Solicitante</p><p className="text-sm font-semibold text-slate-700">Arq. Marcos V.</p></div>
              <div className="space-y-0.5"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha de Solicitud</p><div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><Calendar size={14} className="text-slate-400" />{task.date}</div></div>
              <div className="space-y-0.5 text-right"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asignado</p><div className="flex items-center justify-end gap-1.5 text-sm font-medium text-slate-600"><HardHat size={14} className="text-slate-400" />{task.assignee || 'Ing. Salas'}</div></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción del Requerimiento</h3>
            <p className="text-[15px] leading-relaxed text-slate-700">{task.description}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Foto Original de Reporte</h3>
            <div className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => openModal(task.foto_original, "Captura Inicial")}>
              <img 
                alt="Foto Original" 
                className="w-full h-full object-cover" 
                src={task.foto_original}
                onError={(e) => { (e.target as HTMLImageElement).src = IMAGE_FALLBACK; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-active:opacity-100 transition-opacity"><Maximize2 className="text-white" size={32} /></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-8">Historial de Avances</h3>
            <div className="relative space-y-0">
              {paginatedHistory.length > 0 ? (
                paginatedHistory.map((item, index) => {
                  const isLast = index === paginatedHistory.length - 1;
                  return (
                    <div key={item.id} className="relative pl-14 pb-10 group cursor-pointer hover:bg-slate-50/80 -ml-2 p-2 rounded-xl transition-all" onClick={() => openModal(item.history_image , item.comentario)}>
                      {!isLast && <div className="absolute left-[25px] top-12 bottom-[-8px] w-[2px] bg-slate-100"></div>}
                      <div className={`absolute left-2 top-2 size-10 rounded-full overflow-hidden border-2 shadow-md z-10 bg-white border-slate-100`}>
                        <img 
                          src={item.history_image} 
                          className="w-full h-full object-cover" 
                          alt="Hito" 
                          onError={(e) => { (e.target as HTMLImageElement).src = IMAGE_FALLBACK; }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <p className={`text-[11px] font-bold uppercase tracking-tight text-slate-500`}>Registro de Avance</p>
                          <p className="text-[10px] font-semibold text-slate-400">{formatFecha(item.fecha)} • {formatHora(item.fecha)}</p>
                        </div>
                        <p className={`text-sm leading-snug text-slate-600`}>{item.comentario}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center py-8 text-slate-400 text-center"><History size={40} className="opacity-10 mb-2" /><p className="text-xs font-bold uppercase tracking-widest opacity-40">Sin registros</p></div>
              )}
            </div>

            {/* Pagination for History */}
            {totalHistoryPages > 1 && (
              <div className="flex items-center justify-center gap-4 py-4 border-t border-slate-50">
                <button 
                  disabled={currentHistoryPage === 1}
                  onClick={() => setCurrentHistoryPage(prev => Math.max(1, prev - 1))}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 disabled:opacity-20 uppercase tracking-widest"
                >
                  <ChevronLeft size={16} /> Anterior
                </button>
                <span className="text-[10px] font-black text-slate-900 uppercase">Página {currentHistoryPage} de {totalHistoryPages}</span>
                <button 
                  disabled={currentHistoryPage === totalHistoryPages}
                  onClick={() => setCurrentHistoryPage(prev => Math.min(totalHistoryPages, prev + 1))}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 disabled:opacity-20 uppercase tracking-widest"
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="pt-4">
              <button onClick={(e) => { e.stopPropagation(); onRegisterProgress?.(); }} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all">
                <Plus size={20} strokeWidth={3} /> Registrar Avance
              </button>
            </div>
          </div>
        </div>
      </main>
      <ImageModal isOpen={modalConfig.isOpen} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} imageUrl={modalConfig.url} title={modalConfig.title} />
    </div>
  );
};
