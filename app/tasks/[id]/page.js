import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import StatusBadge from '@/components/StatusBadge';
import { getTask } from '@/app/tasks/actions';

export default async function TaskDetailPage({ params }) {
  const { id } = params;
  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  return (
    <div>
      <Link href="/tasks">
        <button className="br-button secondary small">
          <FiArrowLeft /> Voltar
        </button>
      </Link>

      <div className="br-card mt-4">
        <div className="card-content">
          <h2>{task.title}</h2>
          <div className="mt-3">
            <div className="row">
              <div className="col-6">
                <p><strong>Status:</strong> <StatusBadge status={task.status} /></p>
              </div>
              <div className="col-6">
                <p><strong>Prioridade:</strong> {task.priority}</p>
              </div>
              <div className="col-6">
                <p><strong>Criado em:</strong> {new Date(task.created_at).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="col-6">
                <p><strong>ID:</strong> {task.id}</p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p><strong>Descrição:</strong></p>
            <p className="br-text">{task.description || 'Sem descrição'}</p>
          </div>
          <div className="d-flex gap-2 mt-4">
            <Link href={`/tasks/${task.id}/edit`}>
              <button className="br-button primary">
                <FiEdit2 /> Editar
              </button>
            </Link>
            <form action={async () => {
              'use server';
              const { deleteTaskAction } = await import('@/app/tasks/actions');
              await deleteTaskAction(task.id);
            }}>
              <button type="submit" className="br-button danger">
                <FiTrash2 /> Excluir
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}