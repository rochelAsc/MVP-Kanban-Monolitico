'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { createTaskAction, updateTaskAction } from '@/app/tasks/actions';

// Função auxiliar para mapear status do banco para exibição
const statusMap = {
  'todo': 'A Fazer',
  'doing': 'Em Andamento',
  'done': 'Concluído'
};

// Função auxiliar para mapear status de exibição para banco
const statusReverseMap = {
  'A Fazer': 'todo',
  'Em Andamento': 'doing',
  'Concluído': 'done'
};

export default function TaskForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Salvar',
  isLoading: externalLoading = false,
  onCancel,
  taskId = null, // se for edição, passa o id
  isEdit = false,
}) {
  // Se for edição, usa a Server Action de update; senão, create
  const action = isEdit ? updateTaskAction : createTaskAction;

  // Se for edição, precisamos passar o id para a action
  // Mas a action espera (id, formData), então precisamos de um wrapper
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      if (isEdit && taskId) {
        return await updateTaskAction(taskId, formData);
      }
      return await action(formData);
    },
    null
  );

  // Estado local para o formulário (para feedback imediato)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    status: 'A Fazer',
  });

  // Inicializar com dados existentes (para edição)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      // Mapeia status do banco para exibição
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

  // Se for usado com a prop onSubmit tradicional (para compatibilidade)
  const handleSubmit = (e) => {
    if (onSubmit) {
      e.preventDefault();
      onSubmit(formData);
    }
    // Se não houver onSubmit, o formAction será usado automaticamente
  };

  // Verifica se há erro da Server Action
  const error = state?.error || state?.message;

  return (
    <form action={onSubmit ? undefined : formAction} onSubmit={handleSubmit}>
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
          disabled={externalLoading || state?.loading}
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
          disabled={externalLoading || state?.loading}
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
          disabled={externalLoading || state?.loading}
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
          disabled={externalLoading || state?.loading}
        >
          {(externalLoading || state?.loading) ? 'Salvando...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className="br-button secondary"
            onClick={onCancel}
            disabled={externalLoading || state?.loading}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
