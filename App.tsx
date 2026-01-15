
import React, { useState, useMemo } from 'react';
import { UserRole, TaskStatus, Task } from './types';
import { MOCK_TASKS } from './constants';
import { LoginView } from './views/LoginView';
import { RoleSelectionView } from './views/RoleSelectionView';
import { ManagerDashboard } from './views/ManagerDashboard';
import { WorkerDashboard } from './views/WorkerDashboard';
import { OrderDetailView } from './views/OrderDetailView';
import { NewOrderView } from './views/NewOrderView';
import { WorkerOrderDetailView } from './views/WorkerOrderDetailView';
import { WorkerProgressView } from './views/WorkerProgressView';
import { WorkerCloseVisitView } from './views/WorkerCloseVisitView';
import { WorkerOrderDetailInProgressView } from './views/WorkerOrderDetailInProgressView';
import { ManagerOrderDetailView } from './views/ManagerOrderDetailView';
import { ManagerOrderDetailNoHistoryView } from './views/ManagerOrderDetailNoHistoryView';
import { WorkerOrderDetailFinishedView } from './views/WorkerOrderDetailFinishedView';
import { ManagerOrderDetailFinishedView } from './views/ManagerOrderDetailFinishedView';

type ViewState = 'LOGIN' | 'ROLE_SELECT' | 'DASHBOARD' | 'ORDER_DETAIL' | 'NEW_ORDER' | 'WORKER_ORDER_DETAIL' | 'WORKER_PROGRESS' | 'WORKER_CLOSE_VISIT' | 'WORKER_ORDER_DETAIL_IN_PROGRESS' | 'MANAGER_ORDER_DETAIL' | 'MANAGER_ORDER_DETAIL_NO_HISTORY' | 'WORKER_ORDER_DETAIL_FINISHED' | 'MANAGER_ORDER_DETAIL_FINISHED';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [previousView, setPreviousView] = useState<ViewState | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = useMemo(() => 
    MOCK_TASKS.find(t => t.id === selectedTaskId), 
    [selectedTaskId]
  );

  const handleLogin = () => {
    setView('ROLE_SELECT');
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('DASHBOARD');
  };

  const handleTaskClick = (taskId: string) => {
    const task = MOCK_TASKS.find(t => t.id === taskId);
    setSelectedTaskId(taskId);

    if (role === UserRole.MANAGER) {
      if (task?.status === TaskStatus.PENDING) {
        setView('MANAGER_ORDER_DETAIL_NO_HISTORY');
      } else if (task?.status === TaskStatus.COMPLETED) {
        setView('MANAGER_ORDER_DETAIL_FINISHED');
      } else if (task?.status === TaskStatus.IN_PROGRESS || task?.status === TaskStatus.IN_REVIEW) {
        setView('MANAGER_ORDER_DETAIL');
      } else {
        setView('ORDER_DETAIL');
      }
    } else if (role === UserRole.WORKER) {
      if (task?.status === TaskStatus.IN_PROGRESS || task?.status === TaskStatus.IN_REVIEW) {
        setView('WORKER_ORDER_DETAIL_IN_PROGRESS');
      } else if (task?.status === TaskStatus.COMPLETED) {
        setView('WORKER_ORDER_DETAIL_FINISHED');
      } else {
        setView('WORKER_ORDER_DETAIL');
      }
    } else {
      setView('ORDER_DETAIL');
    }
  };

  const handleBackToDashboard = () => {
    setView('DASHBOARD');
    setSelectedTaskId(null);
  };

  const handleBackToWorkerOrderDetail = () => {
    setView('WORKER_ORDER_DETAIL');
  };
  
  const handleBackToWorkerOrderDetailInProgress = () => {
    setView('WORKER_ORDER_DETAIL_IN_PROGRESS');
  };

  const handleAddNewOrder = () => {
    setView('NEW_ORDER');
  };

  const handleRegisterProgress = () => {
    setPreviousView(view);
    setView('WORKER_PROGRESS');
  };

  const handleRegisterProgressSubmit = () => {
    setView('WORKER_ORDER_DETAIL_IN_PROGRESS');
  };

  const handleCloseVisit = () => {
    setPreviousView(view);
    setView('WORKER_CLOSE_VISIT');
  };

  const handleConfirmCloseVisit = () => {
    setView('WORKER_ORDER_DETAIL_FINISHED');
  };

  const renderDashboard = () => {
    switch (role) {
      case UserRole.MANAGER:
        return <ManagerDashboard onTaskClick={handleTaskClick} onAddClick={handleAddNewOrder} />;
      case UserRole.WORKER:
        return <WorkerDashboard onTaskClick={handleTaskClick} />;
      default:
        return <LoginView onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans mx-auto max-w-md w-full shadow-2xl overflow-hidden relative">
      {view === 'LOGIN' && <LoginView onLogin={handleLogin} />}
      {view === 'ROLE_SELECT' && <RoleSelectionView onSelectRole={handleRoleSelect} />}
      {view === 'DASHBOARD' && renderDashboard()}
      {view === 'ORDER_DETAIL' && <OrderDetailView onBack={handleBackToDashboard} />}
      {view === 'NEW_ORDER' && <NewOrderView onBack={handleBackToDashboard} />}
      {view === 'WORKER_ORDER_DETAIL' && selectedTask && <WorkerOrderDetailView task={selectedTask} onBack={handleBackToDashboard} onRegisterProgress={handleRegisterProgress} onCloseVisit={handleCloseVisit} />}
      {view === 'WORKER_PROGRESS' && <WorkerProgressView onBack={previousView === 'WORKER_ORDER_DETAIL_IN_PROGRESS' ? handleBackToWorkerOrderDetailInProgress : handleBackToWorkerOrderDetail} onSubmit={handleRegisterProgressSubmit} />}
      {view === 'WORKER_CLOSE_VISIT' && <WorkerCloseVisitView onBack={previousView === 'WORKER_ORDER_DETAIL_IN_PROGRESS' ? handleBackToWorkerOrderDetailInProgress : handleBackToWorkerOrderDetail} onConfirmClose={handleConfirmCloseVisit} />}
      {view === 'WORKER_ORDER_DETAIL_IN_PROGRESS' && selectedTask && <WorkerOrderDetailInProgressView task={selectedTask} onBack={handleBackToDashboard} onRegisterProgress={handleRegisterProgress} onCloseVisit={handleCloseVisit} />}
      {view === 'WORKER_ORDER_DETAIL_FINISHED' && selectedTask && <WorkerOrderDetailFinishedView task={selectedTask} onBack={handleBackToDashboard} />}
      {view === 'MANAGER_ORDER_DETAIL' && selectedTask && <ManagerOrderDetailView task={selectedTask} onBack={handleBackToDashboard} />}
      {view === 'MANAGER_ORDER_DETAIL_NO_HISTORY' && selectedTask && <ManagerOrderDetailNoHistoryView task={selectedTask} onBack={handleBackToDashboard} />}
      {view === 'MANAGER_ORDER_DETAIL_FINISHED' && selectedTask && <ManagerOrderDetailFinishedView task={selectedTask} onBack={handleBackToDashboard} />}
    </div>
  );
};

export default App;
