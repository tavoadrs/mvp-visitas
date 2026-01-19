
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Maximize2, 
  History,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { ImageModal } from '../components/ImageModal';
import { Task } from '../types';
import { IMAGE_FALLBACK } from '../constants';

interface WorkerOrderDetailFinishedViewProps {
  task: Task;
  onBack: () => void;
}

export const WorkerOrderDetailFinishedView: React.FC<WorkerOrderDetailFinishedViewProps> = ({ task, onBack }) => {
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
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) + ' • ' + 
             date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  const closingImageUrl = task.evidencia_final || task.foto_original;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-slate-900 pt-12 pb-4 px-4 shadow-lg z-20 shrink-0 sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white hover:bg-white/10 p-1 rounded-full"><ChevronLeft size={24} /></button>
            <h2 className="text-white text-lg font-bold tracking-tight">Orden Finalizada</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1.5 uppercase">
            <CheckCircle2 size={12} /> Completada
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-8">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="space-y-4">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Título</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{task.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="space-y-0.5"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Obra</p><p className="text-sm font-bold text-slate-900">{task.project}</p></div>
                <div className="space-y-0.5 text-right"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha Completada</p><div className="flex items-center justify-end gap-1 text-sm font-medium text-slate-600"><Calendar size={14} />{task.date}</div></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resumen del Trabajo</h3>
            <p className="text-[15px] leading-relaxed text-slate-700">{task.description}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Evidencia de Cierre</h3>
            <div className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => openModal(closingImageUrl, "Evidencia de Cierre")}>
              <img alt="Foto Cierre" className="w-full h-full object-cover" src={closingImageUrl} onError={(e) => { (e.target as HTMLImageElement).src = IMAGE_FALLBACK; }} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="text-white" size={32} /></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">Historial de Ejecución</h3>
            <div className="space-y-0">
              {paginatedHistory.length > 0 ? (
                paginatedHistory.map((item, index) => (
                  <div key={item.id} className="relative pl-14 pb-8 cursor-pointer group rounded-xl -ml-2 p-2 transition-colors active:bg-slate-50" onClick={() => openModal(item.history_image, item.comentario)}>
                    {index < paginatedHistory.length - 1 && <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-slate-100"></div>}
                    <div className="absolute left-0 top-2 h-11 w-11 rounded-lg bg-slate-100 overflow-hidden border-2 border-white shadow-sm z-10 group-hover:border-emerald-500">
                      <img src={item.history_image} className="w-full h-full object-cover" alt="Avance" onError={(e) => { (e.target as HTMLImageElement).src = IMAGE_FALLBACK; }} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <p className="text-[11px] font-bold text-emerald-500 uppercase">Hito Auditado</p>
                        <p className="text-[10px] text-slate-400">{formatFecha(item.fecha)}</p>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.comentario}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-4 text-slate-400"><History size={24} className="opacity-20 mb-2" /><p className="text-xs font-medium">No hay registros adicionales</p></div>
              )}
            </div>

            {totalHistoryPages > 1 && (
              <div className="flex items-center justify-center gap-4 py-4 border-t border-slate-50">
                <button 
                  disabled={currentHistoryPage === 1}
                  onClick={() => setCurrentHistoryPage(prev => Math.max(1, prev - 1))}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 disabled:opacity-20 uppercase tracking-widest"
                >
                  <ChevronLeft size={16} /> Anterior
                </button>
                <span className="text-[10px] font-black text-slate-900 uppercase">{currentHistoryPage} / {totalHistoryPages}</span>
                <button 
                  disabled={currentHistoryPage === totalHistoryPages}
                  onClick={() => setCurrentHistoryPage(prev => Math.min(totalHistoryPages, prev + 1))}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-400 disabled:opacity-20 uppercase tracking-widest"
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <ImageModal isOpen={modalConfig.isOpen} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} imageUrl={modalConfig.url} title={modalConfig.title} />
    </div>
  );
};
