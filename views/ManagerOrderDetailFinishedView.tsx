
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Maximize2, 
  History
} from 'lucide-react';
import { ImageModal } from '../components/ImageModal';
import { Task } from '../types';
import { IMAGE_FALLBACK } from '../constants';

interface ManagerOrderDetailFinishedViewProps {
  task: Task;
  onBack: () => void;
}

export const ManagerOrderDetailFinishedView: React.FC<ManagerOrderDetailFinishedViewProps> = ({ task, onBack }) => {
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  // Imagen de cierre de obra real (Picsum ID 349 - Estructura terminada)
  const closingImageUrl = "https://picsum.photos/id/349/1000/600";

  const openModal = (url: string, title: string) => {
    setModalConfig({ isOpen: true, url, title });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const formatFecha = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) + ' • ' + 
             date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-slate-900 pt-12 pb-4 px-4 shadow-lg z-20 shrink-0 sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white hover:bg-white/10 p-1 rounded-full"><ChevronLeft size={24} /></button>
            <h2 className="text-white text-lg font-bold tracking-tight">Orden Auditada</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 uppercase">Finalizada</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-8">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Título</p>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{task.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-slate-50">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proyecto</p>
                <p className="text-sm font-bold text-slate-900">{task.project}</p>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha Cierre</p>
                <div className="flex items-center justify-end gap-1 text-sm font-medium text-slate-600">
                  <Calendar size={16} />
                  {task.date}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-8">Bitácora de Ejecución</h3>
            <div className="space-y-0">
              {task.task_history && task.task_history.length > 0 ? (
                task.task_history.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative pl-14 pb-10 cursor-pointer group p-2 rounded-xl -ml-2 transition-colors active:bg-slate-50" 
                    onClick={() => openModal(item.history_image, item.comentario)}
                  >
                    {index < (task.task_history?.length || 0) - 1 && (
                      <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-slate-200"></div>
                    )}
                    <div className="absolute left-0 top-2 h-11 w-11 rounded-lg bg-slate-100 overflow-hidden border-2 border-white shadow-sm z-10 group-hover:border-emerald-500">
                      <img 
                        src={item.history_image} 
                        className="w-full h-full object-cover" 
                        alt={`Thumb ${item.id}`} 
                        onError={(e) => { (e.target as HTMLImageElement).src = IMAGE_FALLBACK; }}
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-[11px] font-bold text-emerald-500 uppercase">Hito Auditado</p>
                      <p className="text-[10px] text-slate-400">{formatFecha(item.fecha)}</p>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{item.comentario}</p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-6 text-slate-400">
                  <History size={32} className="opacity-20 mb-2" />
                  <p className="text-xs font-medium">No hay registros para auditar</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
             <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Captura de Apertura</h3>
                  <div className="relative group aspect-video rounded-xl overflow-hidden cursor-pointer" onClick={() => openModal(task.foto_original, "Captura Inicial")}>
                    <img 
                      src={task.foto_original} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { (e.target as HTMLImageElement).src = IMAGE_FALLBACK; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="text-white" size={32} /></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-emerald-600 uppercase mb-3">Evidencia de Entrega Final</h3>
                  <div className="relative group aspect-video rounded-xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform" onClick={() => openModal(closingImageUrl, "Entrega Final del Trabajo")}>
                    <img 
                      src={closingImageUrl} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { (e.target as HTMLImageElement).src = IMAGE_FALLBACK; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="text-white" size={32} /></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <ImageModal isOpen={modalConfig.isOpen} onClose={closeModal} imageUrl={modalConfig.url} title={modalConfig.title} />
    </div>
  );
};
