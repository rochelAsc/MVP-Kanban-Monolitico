'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '@/lib/task-model.js';
import { validateTask } from '@/lib/validators.js';

export async function listTasks() {
  return getAllTasks();
}

export async function getTask(id) {
  return getTaskById(id);
}

export async function createTaskAction(formData) {
  const rawTask = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
  };

  try {
    const validated = validateTask(rawTask);
    const newTask = createTask(validated);
    revalidatePath('/tasks');
    return { success: true, task: newTask };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateTaskAction(id, formData) {
  const rawTask = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
  };

  try {
    const validated = validateTask(rawTask);
    const updatedTask = updateTask(id, validated);
    revalidatePath('/tasks');
    return { success: true, task: updatedTask };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteTaskAction(id) {
  try {
    const deleted = deleteTask(id);
    revalidatePath('/tasks');
    return { success: true, deleted };
  } catch (error) {
    return { error: error.message };
  }
}