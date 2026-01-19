
export enum UserRole {
  MANAGER = 'MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  WORKER = 'WORKER',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
}

export interface TaskHistory {
  id: number;
  fecha: string; // ISO date string or formatted string
  comentario: string;
  history_image?: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  date: string; // ISO date string or formatted string
  time?: string;
  description: string;
  solicitante: string; // agregado manualmente
  assignee?: string;
  status: TaskStatus;
  duration?: string; // e.g. "2d 15h"
  task_history?: TaskHistory[];
  foto_original: string;
  evidencia_final: string; //agregado manualmente
  descripcion_final: string; //agregado manual 19/01
}

export interface ProjectStats {
  total: number;
  completed: number;
  open: number;
  efficiency: number;
}
