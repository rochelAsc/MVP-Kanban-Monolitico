// app/tasks/new/page.js
'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

export default function NewTaskPage() {
  const router = useRouter();

  const handleSubmit = (formData) => {
    // Enquanto a Server Action não existe, só logamos
    console.log('Criando tarefa:', formData);
    alert(`Tarefa "${formData.titulo}" criada com sucesso! (mock)`);
    router.push('/tasks');
  };

  return (
    <div>
      <h2>Criar Nova Tarefa</h2>
      <TaskForm
        onSubmit={handleSubmit}
        submitLabel="Criar Tarefa"
        onCancel={() => router.push('/tasks')}
      />
    </div>
  );
}