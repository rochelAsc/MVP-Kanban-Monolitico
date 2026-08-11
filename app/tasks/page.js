'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { listTasks, deleteTaskAction } from './actions';
import TaskCard from '@/components/TaskCard';
import { strategyMap } from '@/lib/sort-strategies';
import eventBus from '@/lib/event-bus';

export default function TaskListPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [ordenacao, setOrdenacao] = useState('data');

  const loadTasks = async () => {
    const data = await listTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();

    const onTaskCreated = (task) => {
      console.log('[Observer] Tarefa criada:', task.title);
      loadTasks(); // recarrega a lista automaticamente
    };

    const onTaskUpdated = (task) => {
      console.log('[Observer] Tarefa atualizada:', task.title);
      loadTasks();
    };

    const onTaskDeleted = ({ id }) => {
      console.log('[Observer] Tarefa deletada:', id);
      loadTasks();
    };

    eventBus.on('taskCreated', onTaskCreated);
    eventBus.on('taskUpdated', onTaskUpdated);
    eventBus.on('taskDeleted', onTaskDeleted);

    // Cleanup: remove os listeners quando o componente desmontar
    return () => {
      eventBus.off('taskCreated', onTaskCreated);
      eventBus.off('taskUpdated', onTaskUpdated);
      eventBus.off('taskDeleted', onTaskDeleted);
    };
  }, []); // executa apenas uma vez

  const handleEdit = (id) => {
    router.push(`/tasks/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      await deleteTaskAction(id);
      // loadTasks() será chamado automaticamente pelo listener onTaskDeleted
      // Mas mantemos como fallback caso o evento falhe
      await loadTasks();
    }
  };

  // Aplica a estratégia de ordenação
  const StrategyClass = strategyMap[ordenacao] || strategyMap.data;
  const strategy = new StrategyClass();
  const tasksOrdenadas = strategy.sort(tasks);

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
          <option value="titulo">Título (A-Z)</option>
          <option value="status">Status</option>
          <option value="prioridade">Prioridade</option>
        </select>
      </div>

      {tasksOrdenadas.length === 0 ? (
        <p className="br-text">Nenhuma tarefa cadastrada.</p>
      ) : (
        tasksOrdenadas.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}