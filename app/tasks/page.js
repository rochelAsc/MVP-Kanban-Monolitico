'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import TaskCard from '@/components/TaskCard';

const tarefasMock = [
  { id: 1, titulo: 'Estudar Next.js', status: 'A Fazer', prioridade: 'Alta', dataCriacao: '2026-08-01' },
  { id: 2, titulo: 'Configurar Banco', status: 'Em Andamento', prioridade: 'Média', dataCriacao: '2026-08-03' },
  { id: 3, titulo: 'Fazer deploy', status: 'Concluído', prioridade: 'Baixa', dataCriacao: '2026-08-05' },
  { id: 4, titulo: 'Escrever documentação', status: 'A Fazer', prioridade: 'Média', dataCriacao: '2026-08-02' },
  { id: 5, titulo: 'Revisar PR', status: 'Em Andamento', prioridade: 'Alta', dataCriacao: '2026-08-04' },
];

const sortStrategies = {
  data: (a, b) => new Date(a.dataCriacao) - new Date(b.dataCriacao),
  prioridade: (a, b) => {
    const ordem = { Alta: 1, Média: 2, Baixa: 3 };
    return ordem[a.prioridade] - ordem[b.prioridade];
  },
  status: (a, b) => a.status.localeCompare(b.status),
};

export default function TaskListPage() {
  const router = useRouter();
  const [ordenacao, setOrdenacao] = useState('data');
  const [tarefas] = useState(tarefasMock);

  const tarefasOrdenadas = [...tarefas].sort(sortStrategies[ordenacao]);

  const handleEdit = (id) => router.push(`/tasks/${id}/edit`);
  const handleDelete = (id) => {
    alert(`Excluir tarefa ${id}`);
    console.log('Excluir tarefa ID:', id);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Minhas Tarefas</h2>
        <Link href="/tasks/new">
          <button className="br-button primary">
            <FiPlus /> Nova Tarefa
          </button>
        </Link>
      </div>

      <div className="br-select mb-4">
        <label htmlFor="ordenacao">Ordenar por</label>
        <select
          id="ordenacao"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="data">Data de Criação</option>
          <option value="prioridade">Prioridade</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div className="row">
        {tarefasOrdenadas.map((task) => (
          <div key={task.id} className="col-12 col-md-6 col-lg-4 mb-3">
            <TaskCard
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}