
import { Task, TaskStatus } from './types';

export const MOCK_STATS = {
  total: 128,
  completed: 82,
  open: 46,
  efficiency: 64,
  inProgress: 12,
  pending: 24,
  inReview: 10,
};

export const IMAGE_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Cpath d='M190 140h20v20h-20z' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%2394a3b8'%3EImagen no disponible%3C/text%3E%3C/svg%3E";

const generateLongHistory = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: 1000 + i,
    fecha: new Date(2023, 9, 20 + Math.floor(i/2), 10 + i, 30).toISOString(),
    comentario: `Registro de avance técnico etapa ${i + 1}. Verificación de parámetros conforme a norma.`,
    history_image: `https://picsum.photos/id/${340 + i}/800/600`
  }));
};

// Generamos 40 tareas para asegurar que el paginado sea necesario (>10 por categoría)
export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'INSPECCIÓN DE CIMENTACIÓN',
    project: 'PORTAL K',
    date: '24 Oct',
    description: 'Inspección de cimentación requerida para el sector B.',
    solicitante: 'Arq. Marcos V.',
    assignee: 'PABLO PEREZ',
    status: TaskStatus.IN_PROGRESS,
    foto_original: 'https://picsum.photos/id/342/1000/600',
    evidencia_final: '',
    task_history: generateLongHistory(12)
  },
  ...Array.from({ length: 39 }, (_, i) => {
    const id = i + 2;
    let status = TaskStatus.PENDING;
    if (id > 15 && id <= 25) status = TaskStatus.IN_PROGRESS;
    if (id > 25) status = TaskStatus.COMPLETED;

    return {
      id: `${id}`,
      title: `ORDEN DE VISITA #${1000 + id}`,
      project: id % 3 === 0 ? 'PORTAL K' : (id % 3 === 1 ? 'TORRE ALPHA' : 'CONDOMINIO SUR'),
      date: `${10 + (id % 20)} Oct`,
      description: `Descripción técnica detallada para la orden de trabajo número ${id}. Revisión de materiales y protocolos de seguridad en sitio.`,
      solicitante: 'Arq. Marcos V.',
      assignee: id % 2 === 0 ? 'JUAN PEREZ' : 'PABLO PEREZ',
      status: status,
      foto_original: `https://picsum.photos/id/${350 + id}/1000/600`,
      evidencia_final: status === TaskStatus.COMPLETED ? `https://picsum.photos/id/${400 + id}/800/600` : '',
      task_history: status === TaskStatus.COMPLETED ? generateLongHistory(3) : []
    };
  })
];
