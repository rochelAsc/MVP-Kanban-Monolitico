'use client';

import { useState, useEffect, useActionState } from 'react';
import { useRouter } from 'next/navigation'; 
import { createTaskAction, updateTaskAction } from '@/app/tasks/actions';
import eventBus from '@/lib/event-bus'; 

const statusMap = {
  'todo': 'A Fazer',
  'doing': 'Em Andamento',
  'done': 'Concluído'
};

const statusReverseMap = {
  'A Fazer': 'todo',
  'Em Andamento': 'doing',
  'Concluído': 'done'
};

export default function TaskForm({
  initialData = {},
  submitLabel = 'Salvar',
  isLoading: externalLoading = false,
  onCancel,
  taskId = null,
  isEdit = false,
}) {
  const router = useRouter();

  const action = isEdit ? updateTaskAction : createTaskAction;

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      if (isEdit && taskId) {
        return await updateTaskAction(taskId, formData);
      }
      return await action(formData);
    },
    null 
  );

  useEffect(() => {
    if (state?.success) {
      if (isEdit) {
        console.log('[Observer] Tarefa atualizada:', state.task.title);
        eventBus.emit('taskUpdated', state.task);
      } else {
        console.log('[Observer] Tarefa criada:', state.task.title);
        eventBus.emit('taskCreated', state.task);
      }

      router.push('/tasks');
    }
  }, [state, isEdit, router]);


  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    status: 'A Fazer',
  });


  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const statusExibicao = statusMap[initialData.status] || initialData.status || 'A Fazer';
      setFormData({
        titulo: initialData.titulo || initialData.title || '',
        descricao: initialData.descricao || initialData.description || '',
        status: statusExibicao,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const error = state?.error || state?.message;

  return (
    <form action={formAction}>
      <input type="hidden" name="title" value={formData.titulo} />
      <input type="hidden" name="description" value={formData.descricao} />
      <input type="hidden" name="status" value={statusReverseMap[formData.status] || 'todo'} />
      <input type="hidden" name="priority" value="medium" />

      <div className="br-input">
        <label htmlFor="titulo">Título *</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={formData.titulo}
          onChange={handleChange}
          required
          disabled={externalLoading || isPending}
          placeholder="Digite o título da tarefa"
        />
      </div>

      <div className="br-input mt-3">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          rows="4"
          value={formData.descricao}
          onChange={handleChange}
          disabled={externalLoading || isPending}
          placeholder="Descreva a tarefa"
        />
      </div>

      <div className="br-select mt-3">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={externalLoading || isPending}
        >
          <option value="A Fazer">A Fazer</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      {error && (
        <div className="br-alert danger mt-3">
          <p>{error}</p>
        </div>
      )}

      <div className="d-flex gap-2 mt-4">
        <button
          type="submit"
          className="br-button primary"
          disabled={externalLoading || isPending}
        >
          {(externalLoading || isPending) ? 'Salvando...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className="br-button secondary"
            onClick={onCancel}
            disabled={externalLoading || isPending}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}