'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { getTask } from '@/app/tasks/actions';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      const data = await getTask(id);
      setTask(data);
      setLoading(false);
    }
    loadTask();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!task) return <p>Tarefa não encontrada</p>;

  return (
    <div className="container mt-4">
      <h1 className="display-5">Editar Tarefa</h1>
      <TaskForm
        initialData={task}
        isEdit={true}
        taskId={id}
        submitLabel="Atualizar Tarefa"
        onCancel={() => router.push('/tasks')}
      />
    </div>
  );
}
