// lib/validators.js

const VALID_STATUSES = ['todo', 'doing', 'done'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

/**
 * Valida o título de uma tarefa.
 * @param {string} title - O título a ser validado.
 * @throws {Error} Se o título for inválido.
 */
export function validateTitle(title) {
  if (!title || typeof title !== 'string') {
    throw new Error('Título é obrigatório e deve ser um texto.');
  }
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    throw new Error('Título não pode estar vazio.');
  }
  if (trimmed.length < 3) {
    throw new Error('Título deve ter pelo menos 3 caracteres.');
  }
  if (trimmed.length > 100) {
    throw new Error('Título deve ter no máximo 100 caracteres.');
  }
  return trimmed;
}

/**
 * Valida a descrição de uma tarefa (opcional).
 * @param {string} description - A descrição a ser validada.
 * @returns {string} Descrição sanitizada (ou string vazia se null/undefined).
 */
export function validateDescription(description) {
  if (description == null) return '';
  if (typeof description !== 'string') {
    throw new Error('Descrição deve ser um texto.');
  }
  const trimmed = description.trim();
  if (trimmed.length > 500) {
    throw new Error('Descrição deve ter no máximo 500 caracteres.');
  }
  return trimmed;
}

/**
 * Valida o status de uma tarefa.
 * @param {string} status - O status a ser validado.
 * @throws {Error} Se o status for inválido.
 * @returns {string} Status validado.
 */
export function validateStatus(status) {
  if (!status || typeof status !== 'string') {
    throw new Error('Status é obrigatório.');
  }
  const normalized = status.trim().toLowerCase();
  if (!VALID_STATUSES.includes(normalized)) {
    throw new Error(`Status inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}`);
  }
  return normalized;
}

/**
 * Valida a prioridade de uma tarefa.
 * @param {string} priority - A prioridade a ser validada.
 * @throws {Error} Se a prioridade for inválida.
 * @returns {string} Prioridade validada.
 */
export function validatePriority(priority) {
  if (!priority || typeof priority !== 'string') {
    throw new Error('Prioridade é obrigatória.');
  }
  const normalized = priority.trim().toLowerCase();
  if (!VALID_PRIORITIES.includes(normalized)) {
    throw new Error(`Prioridade inválida. Valores permitidos: ${VALID_PRIORITIES.join(', ')}`);
  }
  return normalized;
}

/**
 * Valida um objeto de tarefa completo.
 * @param {Object} task - O objeto da tarefa com campos title, description, status, priority.
 * @throws {Error} Se qualquer campo for inválido.
 * @returns {Object} Objeto validado com campos sanitizados.
 */
export function validateTask(task = {}) {
  const validated = {
    title: validateTitle(task.title),
    description: validateDescription(task.description),
    status: validateStatus(task.status || 'todo'),
    priority: validatePriority(task.priority || 'medium'),
  };
  return validated;
}

/**
 * Valida apenas os campos fornecidos (para atualização parcial).
 * @param {Object} updates - Objeto com campos a serem atualizados.
 * @returns {Object} Objeto com campos validados e sanitizados.
 */
export function validateTaskPartial(updates = {}) {
  const result = {};
  if (updates.title !== undefined) {
    result.title = validateTitle(updates.title);
  }
  if (updates.description !== undefined) {
    result.description = validateDescription(updates.description);
  }
  if (updates.status !== undefined) {
    result.status = validateStatus(updates.status);
  }
  if (updates.priority !== undefined) {
    result.priority = validatePriority(updates.priority);
  }
  return result;
}

// Exporta também as listas para uso externo
export const ALLOWED_STATUSES = VALID_STATUSES;
export const ALLOWED_PRIORITIES = VALID_PRIORITIES;