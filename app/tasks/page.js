'use client';

import { useEffect, useState } from 'react';
import { listTasks, deleteTaskAction } from './actions';
import TaskCard from '@/components/TaskCard';

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await listTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteTaskAction(id);
    await loadTasks();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
