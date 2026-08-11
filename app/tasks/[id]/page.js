import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import StatusBadge from '@/components/StatusBadge';

const tarefasMock = [
  { id: 1, titulo: 'Estudar Next.js', descricao: 'Ler documentação oficial', status: 'A Fazer', prioridade: 'Alta', dataCriacao: '2026-08-01' },
  // ... outros
];

export default function TaskDetailPage({ params }) {
  const { id } = params;
  const task = tarefasMock.find(t => t.id === parseInt(id));

  if (!task) notFound();

  return (
    <div>
      <Link href="/tasks">
        <button className="br-button secondary small">
          <FiArrowLeft /> Voltar
        </button>
      </Link>

      <div className="br-card mt-4">
        <div className="card-content">
          <h2>{task.titulo}</h2>
          <div className="mt-3">
            <div className="row">
              <div className="col-6">
                <p><strong>Status:</strong> <StatusBadge status={task.status} /></p>
              </div>
              <div className="col-6">
                <p><strong>Prioridade:</strong> {task.prioridade}</p>
              </div>
              <div className="col-6">
                <p><strong>Data:</strong> {task.dataCriacao}</p>
              </div>
              <div className="col-6">
                <p><strong>ID:</strong> {task.id}</p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p><strong>Descrição:</strong></p>
            <p className="br-text">{task.descricao || 'Sem descrição'}</p>
          </div>
          <div className="d-flex gap-2 mt-4">
            <Link href={`/tasks/${task.id}/edit`}>
              <button className="br-button primary">
                <FiEdit2 /> Editar
              </button>
            </Link>
            <button className="br-button danger">
              <FiTrash2 /> Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}