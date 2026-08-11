import db from './db.js';
import TaskFactory from './task-factory.js';
import eventBus from './event-bus.js';

export function getAllTasks() {
  const stmt = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC');
  return stmt.all();
}

export function getTaskById(id) {
  const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
  return stmt.get(id);
}

export function createTask(task) {
  const normalized = TaskFactory.createTask(task);
  const { title, description, status, priority } = normalized;
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, status, priority)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(title, description, status, priority);
  const newTask = getTaskById(info.lastInsertRowid);
  eventBus.emit('taskCreated', newTask);
  return newTask;
}

export function updateTask(id, updates) {
  const { title, description, status, priority } = updates;
  const stmt = db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, status = ?, priority = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  stmt.run(title, description, status, priority, id);
  const updatedTask = getTaskById(id);
  eventBus.emit('taskUpdated', updatedTask);
  return updatedTask;
}

export function deleteTask(id) {
  const task = getTaskById(id);
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  stmt.run(id);
  eventBus.emit('taskDeleted', { id });
  return task;
}