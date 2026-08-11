import db from './db.js';

export function getAllTasks() {
  const stmt = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC');
  return stmt.all();
}

export function getTaskById(id) {
  const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
  return stmt.get(id);
}

export function createTask(task) {
  const { title, description, status, priority } = task;
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, status, priority)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(title, description || '', status || 'todo', priority || 'medium');
  return getTaskById(info.lastInsertRowid);
}

export function updateTask(id, updates) {
  const { title, description, status, priority } = updates;
  const stmt = db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, status = ?, priority = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  stmt.run(title, description || '', status, priority, id);
  return getTaskById(id);
}

export function deleteTask(id) {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  return stmt.run(id);
}
