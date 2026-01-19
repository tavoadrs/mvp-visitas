
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

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'INSPECCIÓN DE CIMENTACIÓN',
    project: 'PORTAL K',
    date: '24 Oct',
    time: '10:30 AM',
    description: 'Inspección de cimentación requerida para el sector B según nuevas normativas sísmicas. Resultados de compactación pendientes.',
    solicitante: 'Arq. Marcos V.',
    assignee: 'PABLO PEREZ',
    status: TaskStatus.IN_PROGRESS,
    duration: '2d 15h',
    foto_original: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    descripcion_final: '',
    task_history: [
      {
        id: 101,
        fecha: '2023-10-25T09:15:00Z',
        comentario: 'Personal en sitio. Limpieza de superficie para visualización de fisuras.',
        history_image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '2',
    title: 'REVISIÓN DE CABLEADO',
    project: 'PORTAL K',
    date: '23 Oct',
    time: '02:15 PM',
    description: 'Revisión de cableado eléctrico completo en salas técnicas. Se requiere validación de peinado de cables y etiquetado.',
    solicitante: 'Ing. Roberto S.',
    assignee: 'JUAN PEREZ',
    status: TaskStatus.COMPLETED,
    duration: '4h 45m',
    foto_original: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1454165833767-027eeef1593e?q=80&w=1000&auto=format&fit=crop',
    descripcion_final: 'Se validaron todas las conexiones según el plano eléctrico v2. Certificación emitida.',
    task_history: [
      {
        id: 201,
        fecha: '2023-10-23T14:30:00Z',
        comentario: 'Inicio de peinado de cables en rack principal.',
        history_image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 202,
        fecha: '2023-10-23T16:00:00Z',
        comentario: 'Etiquetado de circuitos completado al 100%.',
        history_image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 203,
        fecha: '2023-10-23T17:15:00Z',
        comentario: 'Pruebas de continuidad exitosas. Instalación cerrada.',
        history_image: 'https://images.unsplash.com/photo-1454165833767-027eeef1593e?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 204,
        fecha: '2023-10-23T14:30:00Z',
        comentario: 'Inicio de peinado de cables en rack principal.',
        history_image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 205,
        fecha: '2023-10-23T16:00:00Z',
        comentario: 'Etiquetado de circuitos completado al 100%.',
        history_image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 206,
        fecha: '2023-10-23T17:15:00Z',
        comentario: 'Pruebas de continuidad exitosas. Instalación cerrada.',
        history_image: 'https://images.unsplash.com/photo-1454165833767-027eeef1593e?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 207,
        fecha: '2023-10-23T14:30:00Z',
        comentario: 'Inicio de peinado de cables en rack principal.',
        history_image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 208,
        fecha: '2023-10-23T16:00:00Z',
        comentario: 'Etiquetado de circuitos completado al 100%.',
        history_image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 209,
        fecha: '2023-10-23T17:15:00Z',
        comentario: 'Pruebas de continuidad exitosas. Instalación cerrada.',
        history_image: 'https://images.unsplash.com/photo-1454165833767-027eeef1593e?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 210,
        fecha: '2023-10-23T14:30:00Z',
        comentario: 'Inicio de peinado de cables en rack principal.',
        history_image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 211,
        fecha: '2023-10-23T16:00:00Z',
        comentario: 'Etiquetado de circuitos completado al 100%.',
        history_image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 212,
        fecha: '2023-10-23T17:15:00Z',
        comentario: 'Pruebas de continuidad exitosas. Instalación cerrada.',
        history_image: 'https://images.unsplash.com/photo-1454165833767-027eeef1593e?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '3',
    title: 'INSTALACIÓN ELÉCTRICA - PISO 2',
    project: 'PORTAL K',
    date: '25 Oct',
    description: 'Revisión de conexiones eléctricas en el sector norte, asegurando la correcta polaridad en todos los puntos de red.',
    solicitante: 'Arq. Lucía M.',
    assignee: 'ANA GARCIA',
    status: TaskStatus.PENDING,
    foto_original: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '4',
    title: 'AUDITORÍA DE SEGURIDAD',
    project: 'PORTAL K',
    date: '26 Oct',
    description: 'Validación final de protocolos de seguridad en andamiaje antes de la visita del inspector externo.',
    solicitante: 'Prevencionista Soto',
    assignee: 'ANA GARCIA',
    status: TaskStatus.IN_REVIEW,
    duration: '1d 0h',
    foto_original: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1000&auto=format&fit=crop',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '5',
    title: 'PINTURA FACHADA NORTE',
    project: 'TORRE ALPHA',
    date: '27 Oct',
    description: 'Aplicación de primera mano de pintura hidrófuga en la fachada norte.',
    solicitante: 'Ing. Ruiz',
    assignee: 'CARLOS LOPEZ',
    status: TaskStatus.IN_PROGRESS,
    foto_original: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '6',
    title: 'REVISIÓN DE ASCENSORES',
    project: 'TORRE ALPHA',
    date: '27 Oct',
    description: 'Pruebas de carga y frenado de emergencia en ascensor 1 y 2.',
    solicitante: 'Adm. Torre',
    assignee: 'PEDRO DUARTE',
    status: TaskStatus.COMPLETED,
    foto_original: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1527605156685-f12b75f3c763?q=80&w=1000&auto=format&fit=crop',
    descripcion_final: 'Pruebas satisfactorias. Ascensores operativos y entregados a la administración.',
    task_history: [
      {
        id: 601,
        fecha: '2023-10-27T10:00:00Z',
        comentario: 'Verificación de sensores de puerta y nivelación de cabina.',
        history_image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 602,
        fecha: '2023-10-27T13:45:00Z',
        comentario: 'Pruebas de peso máximo y frenado dinámico superadas.',
        history_image: 'https://images.unsplash.com/photo-1527605156685-f12b75f3c763?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '7',
    title: 'REVESTIMIENTO CERÁMICO',
    project: 'PORTAL K',
    date: '28 Oct',
    description: 'Colocación de porcelanato en el lobby principal.',
    solicitante: 'Arq. Lucía M.',
    assignee: 'JUAN PEREZ',
    status: TaskStatus.PENDING,
    foto_original: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '8',
    title: 'MONTAJE DE GRÚA',
    project: 'LOGISTICA SUR',
    date: '28 Oct',
    description: 'Supervisión del montaje de la grúa torre principal para el sector de carga.',
    solicitante: 'Gerente Operativo',
    assignee: 'MARCO SOTO',
    status: TaskStatus.IN_REVIEW,
    foto_original: 'https://images.unsplash.com/photo-1531834361270-369403328e20?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '9',
    title: 'LIMPIEZA DE OBRA',
    project: 'PORTAL K',
    date: '29 Oct',
    description: 'Retiro de escombros y limpieza general tras finalización de obra gruesa.',
    solicitante: 'Arq. Marcos V.',
    assignee: 'EQUIPO A',
    status: TaskStatus.IN_PROGRESS,
    foto_original: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '10',
    title: 'PRUEBAS DE PRESIÓN AGUA',
    project: 'TORRE ALPHA',
    date: '29 Oct',
    description: 'Validación de presión en tuberías de agua potable del piso 10 al 15.',
    solicitante: 'Ing. Ruiz',
    assignee: 'ANTONIO SOLIS',
    status: TaskStatus.PENDING,
    foto_original: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '11',
    title: 'INSTALACIÓN DE VENTANALES',
    project: 'PLAZA CENTRAL',
    date: '30 Oct',
    description: 'Montaje de vidrios templados en el área comercial del primer nivel.',
    solicitante: 'Arq. Elena P.',
    assignee: 'SERGIO VIDAL',
    status: TaskStatus.IN_PROGRESS,
    foto_original: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '12',
    title: 'REVISIÓN DE ESTRUCTURA METÁLICA',
    project: 'LOGISTICA SUR',
    date: '30 Oct',
    description: 'Inspección de soldaduras en las vigas principales del galpón 3.',
    solicitante: 'Gerente Operativo',
    assignee: 'RAUL MENDEZ',
    status: TaskStatus.PENDING,
    foto_original: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '13',
    title: 'AJUSTE DE TABLEROS ELÉCTRICOS',
    project: 'PORTAL K',
    date: '31 Oct',
    description: 'Equilibrado de cargas en tableros secundarios de iluminación.',
    solicitante: 'Ing. Roberto S.',
    assignee: 'JUAN PEREZ',
    status: TaskStatus.IN_REVIEW,
    foto_original: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '14',
    title: 'JARDINERÍA EXTERIOR',
    project: 'PLAZA CENTRAL',
    date: '31 Oct',
    description: 'Plantación de palmeras y arbustos en el área perimetral de la plaza.',
    solicitante: 'Arq. Elena P.',
    assignee: 'EQUIPO PAISAJE',
    status: TaskStatus.COMPLETED,
    foto_original: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1590013330462-094d214f9976?q=80&w=1000&auto=format&fit=crop',
    descripcion_final: 'Paisajismo terminado según diseño aprobado. Sistema de riego funcionando.',
    task_history: [
      {
        id: 1401,
        fecha: '2023-10-31T08:00:00Z',
        comentario: 'Preparación del sustrato y excavación para palmeras.',
        history_image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 1402,
        fecha: '2023-10-31T12:00:00Z',
        comentario: 'Plantación y primera hidratación de especies.',
        history_image: 'https://images.unsplash.com/photo-1590013330462-094d214f9976?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '15',
    title: 'INSPECCIÓN DE CUBIERTA',
    project: 'LOGISTICA SUR',
    date: '01 Nov',
    description: 'Revisión de estanqueidad en la cubierta tras lluvias recientes.',
    solicitante: 'Gerente Operativo',
    assignee: 'MARCO SOTO',
    status: TaskStatus.PENDING,
    foto_original: 'https://images.unsplash.com/photo-1635339001026-686e30ed321c?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '16',
    title: 'INSTALACIÓN DE CLIMATIZACIÓN',
    project: 'PORTAL K',
    date: '01 Nov',
    description: 'Montaje de unidades exteriores de aire acondicionado en azotea.',
    solicitante: 'Ing. Roberto S.',
    assignee: 'PABLO PEREZ',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/101/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '17',
    title: 'REVISIÓN DE RED DE INCENDIO',
    project: 'TORRE ALPHA',
    date: '02 Nov',
    description: 'Prueba de flujo en gabinetes de red húmeda, niveles 1 al 5.',
    solicitante: 'Ing. Ruiz',
    assignee: 'ANA GARCIA',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/102/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '18',
    title: 'COLOCACIÓN DE LUMINARIAS',
    project: 'PLAZA CENTRAL',
    date: '02 Nov',
    description: 'Instalación de focos LED en el estacionamiento subterráneo.',
    solicitante: 'Arq. Elena P.',
    assignee: 'JUAN PEREZ',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/103/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '19',
    title: 'PULIDO DE PISOS',
    project: 'PORTAL K',
    date: '03 Nov',
    description: 'Pulido de mármol en el hall de entrada principal.',
    solicitante: 'Arq. Lucía M.',
    assignee: 'CARLOS LOPEZ',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/104/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '20',
    title: 'IMPERMEABILIZACIÓN DE BALCONES',
    project: 'TORRE ALPHA',
    date: '03 Nov',
    description: 'Tratamiento hidrófugo en terrazas del piso 12.',
    solicitante: 'Ing. Ruiz',
    assignee: 'SERGIO VIDAL',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/106/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '21',
    title: 'REVISIÓN DE ESTRUCTURA SECTOR C',
    project: 'PORTAL K',
    date: '04 Nov',
    description: 'Inspección visual de columnas tras desencofrado.',
    solicitante: 'Arq. Marcos V.',
    assignee: 'RAUL MENDEZ',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/107/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '22',
    title: 'SELLADO DE VENTANAS',
    project: 'TORRE ALPHA',
    date: '04 Nov',
    description: 'Aplicación de silicona estructural en marcos exteriores.',
    solicitante: 'Ing. Ruiz',
    assignee: 'EQUIPO A',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/108/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '23',
    title: 'INSTALACIÓN DE PORCELANATO',
    project: 'PLAZA CENTRAL',
    date: '05 Nov',
    description: 'Colocación de revestimiento en baños de locales comerciales.',
    solicitante: 'Arq. Elena P.',
    assignee: 'JUAN PEREZ',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/109/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '24',
    title: 'PRUEBAS DE RED LAN',
    project: 'LOGISTICA SUR',
    date: '05 Nov',
    description: 'Certificación de puntos de red en oficinas administrativas.',
    solicitante: 'Gerente Operativo',
    assignee: 'EQUIPO TEC',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/110/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  },
  {
    id: '25',
    title: 'MONTAJE DE PUERTAS',
    project: 'PORTAL K',
    date: '06 Nov',
    description: 'Instalación de puertas cortafuego en cajas de escalera.',
    solicitante: 'Arq. Lucía M.',
    assignee: 'ANTONIO SOLIS',
    status: TaskStatus.PENDING,
    foto_original: 'https://picsum.photos/id/111/800/600',
    evidencia_final: '',
    descripcion_final: '',
    task_history: []
  }
];
