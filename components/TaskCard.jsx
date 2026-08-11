'use client';

import Link from 'next/link';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="br-card">
      <div className="card-content">
        <Link href={`/tasks/${task.id}`}>
          <h3 style={{ cursor: 'pointer' }}>{task.title}</h3> 
        </Link>
        <div style={{ marginTop: '0.5rem' }}>
          <StatusBadge status={task.status} /> 
        </div>
        <div className="d-flex gap-1 mt-3">
          <button 
            className="br-button primary small"
            onClick={() => onEdit(task.id)}
          >
            <FiEdit2 /> Editar
          </button>
          <button 
            className="br-button danger small"
            onClick={() => onDelete(task.id)}
          >
            <FiTrash2 /> Excluir
          </button>
        </div>
      </div>
    </div>
  );
}