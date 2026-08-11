// app/tasks/[id]/edit/page.js
'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

// Mock de dados (depois será substituído pelo Model)
const tarefasMock = [
  { id: 1, titulo: 'Estudar Next.js', descricao: 'Ler documentação oficial', status: 'A Fazer' },
  { id: 2, titulo: 'Configurar Banco', descricao: 'Instalar SQLite', status: 'Em Andamento' },
  { id: 3, titulo: 'Fazer deploy', descricao: 'Publicar no Vercel', status: 'Concluído' },
];

export default function EditTaskPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const task = tarefasMock.find(t => t.id === parseInt(id));

  if (!task) {
    return <div style={{ padding: '2rem' }}>Tarefa não encontrada</div>;
  }

  const handleSubmit = (formData) => {
    // Enquanto a Server Action não existe, só logamos
    console.log(`Atualizando tarefa ID ${id}:`, formData);
    alert(`Tarefa "${formData.titulo}" atualizada com sucesso! (mock)`);
    router.push('/tasks');
  };

  return (
    <div>
      <h2>Editar Tarefa</h2>
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        submitLabel="Atualizar Tarefa"
        onCancel={() => router.push('/tasks')}
      />
    </div>
  );
}