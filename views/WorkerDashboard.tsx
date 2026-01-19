
import React, { useState, useMemo } from 'react';
import { RefreshCw, WifiOff, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { MOCK_TASKS } from '../constants';
import { TaskStatus } from '../types';
import { BottomNav } from '../components/BottomNav';

interface WorkerDashboardProps {
  onTaskClick?: (taskId: string) => void;
}

type TabType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ onTaskClick }) => {
  const [activeTab, setActiveTab] = useState<TabType>('PENDING');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTasks = useMemo(() => {
    return MOCK_TASKS.filter(task => {
      if (activeTab === 'PENDING') return task.status === TaskStatus.PENDING;
      if (activeTab === 'IN_PROGRESS') return task.status === TaskStatus.IN_PROGRESS || task.status === TaskStatus.IN_REVIEW;
      if (activeTab === 'COMPLETED') return task.status === TaskStatus.COMPLETED;
      return false;
    });
  }, [activeTab]);

  // Reset page when tab changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pendingCount = MOCK_TASKS.filter(t => t.status === TaskStatus.PENDING).length;
  const inProgressCount = MOCK_TASKS.filter(t => t.status === TaskStatus.IN_PROGRESS || t.status === TaskStatus.IN_REVIEW).length;
  const completedCount = MOCK_TASKS.filter(t => t.status === TaskStatus.COMPLETED).length;

  const getTitle = () => {
    if (activeTab === 'PENDING') return 'Tareas Pendientes';
    if (activeTab === 'IN_PROGRESS') return 'Tareas en Proceso';
    return 'Tareas Terminadas';
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
       <header className="bg-slate-900 px-4 py-6 sticky top-0 z-50 shadow-md">
          <div className="flex items-center justify-between">
              <h1 className="text-white text-xl font-bold leading-tight tracking-tight flex-1">{getTitle()}</h1>
              <button className="flex items-center justify-center text-white/80 hover:text-white transition-colors">
                  <RefreshCw size={22} />
              </button>
          </div>
       </header>

       <div className="bg-amber-100 border-b border-amber-200">
          <div className="flex items-center justify-center gap-2 py-2 px-4 text-amber-800">
              <WifiOff size={14} />
              <p className="text-[10px] font-bold uppercase tracking-tight">Modo Offline Activo</p>
          </div>
       </div>

       <main className="flex-1 flex flex-col p-4 gap-6 pb-28">
          {/* Tabs / Stats */}
          <section className="flex gap-2 pb-1">
              <button onClick={() => setActiveTab('PENDING')} className={`flex-1 flex flex-col gap-0.5 rounded-2xl p-3 border transition-all ${activeTab === 'PENDING' ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-200' : 'bg-white border-slate-200 opacity-60'}`}>
                  <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Pendientes</span>
                  <span className="text-orange-600 text-xl font-black">{pendingCount}</span>
              </button>
              <button onClick={() => setActiveTab('IN_PROGRESS')} className={`flex-1 flex flex-col gap-0.5 rounded-2xl p-3 border transition-all ${activeTab === 'IN_PROGRESS' ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'bg-white border-slate-200 opacity-60'}`}>
                  <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">En Proceso</span>
                  <span className="text-blue-600 text-xl font-black">{inProgressCount}</span>
              </button>
              <button onClick={() => setActiveTab('COMPLETED')} className={`flex-1 flex flex-col gap-0.5 rounded-2xl p-3 border transition-all ${activeTab === 'COMPLETED' ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200' : 'bg-white border-slate-200 opacity-60'}`}>
                  <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Terminado</span>
                  <span className="text-emerald-600 text-xl font-black">{completedCount}</span>
              </button>
          </section>

          {/* List Section */}
          <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 mb-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registros {filteredTasks.length > 0 ? `${(currentPage-1)*itemsPerPage + 1}-${Math.min(currentPage*itemsPerPage, filteredTasks.length)} de ${filteredTasks.length}` : '0'}</p>
              </div>
              
              {paginatedTasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => onTaskClick?.(task.id)} 
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 transition-all hover:border-slate-300 active:scale-[0.98] cursor-pointer"
                >
                    <div className="flex flex-col gap-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 truncate">{task.title}</h3>
                          {task.status === TaskStatus.IN_REVIEW && (
                            <span className="px-1.5 py-0.5 rounded bg-violet-100 text-violet-600 text-[8px] font-black uppercase">Revisión</span>
                          )}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.project} • {task.date}</p>
                    </div>
                    <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-slate-900 transition-colors">
                      <ChevronRight size={18} />
                    </div>
                </div>
              ))}
              
              {filteredTasks.length === 0 && (
                <div className="text-center py-16 text-slate-300">
                    <FileText size={48} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-bold uppercase tracking-widest opacity-40">Bandeja Vacía</p>
                </div>
              )}

              {/* Pagination UI - Visible only if totalPages > 1 */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 pt-8 pb-4">
                  <div className="flex items-center gap-1.5">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className="size-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-20 transition-all active:bg-slate-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex items-center gap-1.5 mx-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                        // Lógica para mostrar solo algunas páginas si hay muchas
                        if (totalPages > 5) {
                          if (page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1) {
                            if (page === 2 || page === totalPages - 1) return <span key={page} className="text-slate-300">...</span>;
                            return null;
                          }
                        }
                        
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`size-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${
                              currentPage === page 
                              ? 'bg-slate-900 text-white shadow-lg' 
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className="size-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-20 transition-all active:bg-slate-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Página {currentPage} de {totalPages}</p>
                </div>
              )}
          </section>
       </main>

       <BottomNav activeTab="dashboard" onTabChange={() => {}} />
    </div>
  );
};
