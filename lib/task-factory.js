// lib/task-factory.js
export default class TaskFactory {
  static createTask(data = {}) {
    return {
      title: data.title || '',
      description: data.description || '',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
    };
  }
}