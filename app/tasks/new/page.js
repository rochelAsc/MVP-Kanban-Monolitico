'use client';

import TaskForm from '@/components/TaskForm';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
  const router = useRouter();

  return (
    <div className="container mt-4">
      <h1 className="display-5">Nova Tarefa</h1>
      <TaskForm
        isEdit={false}
        submitLabel="Criar Tarefa"
        onCancel={() => router.push('/tasks')}
      />
    </div>
  );
}
