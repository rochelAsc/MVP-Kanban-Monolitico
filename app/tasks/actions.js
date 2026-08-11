'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '@/lib/task-model.js';

export async function listTasks() {
  return getAllTasks();
}

export async function getTask(id) {
  return getTaskById(id);
}

export async function createTaskAction(formData) {
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
  };
  if (!task.title?.trim()) {
    throw new Error('Título é obrigatório');
  }
  createTask(task);
  revalidatePath('/tasks');
  redirect('/tasks');
}

export async function updateTaskAction(id, formData) {
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
  };
  if (!task.title?.trim()) {
    throw new Error('Título é obrigatório');
  }
  updateTask(id, task);
  revalidatePath('/tasks');
  redirect('/tasks');
}

export async function deleteTaskAction(id) {
  deleteTask(id);
  revalidatePath('/tasks');
  redirect('/tasks');
}
