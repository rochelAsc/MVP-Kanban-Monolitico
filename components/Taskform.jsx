'use client';

import { useState, useEffect } from 'react';

export default function TaskForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Salvar',
  isLoading = false,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    status: 'A Fazer',
  });

  useEffect(() => {
    setFormData({
      titulo: initialData.titulo || '',
      descricao: initialData.descricao || '',
      status: initialData.status || 'A Fazer',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="br-input">
        <label htmlFor="titulo">Título *</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={formData.titulo}
          onChange={handleChange}
          required
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        >
          <option value="A Fazer">A Fazer</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button 
          type="submit" 
          className="br-button primary"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : submitLabel}
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="br-button secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}