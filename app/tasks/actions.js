'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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
  // Extrai dados do formData
  const rawTask = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
  };

  // Valida e sanitiza
  let validated;
  try {
    validated = validateTask(rawTask);
  } catch (error) {
    // Retorna erro para o formulário
    return { error: error.message };
  }

  createTask(validated);
  revalidatePath('/tasks');
  redirect('/tasks');
}

export async function updateTaskAction(id, formData) {
  const rawTask = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status'),
    priority: formData.get('priority'),
  };

  let validated;
  try {
    validated = validateTask(rawTask);
  } catch (error) {
    return { error: error.message };
  }

  updateTask(id, validated);
  revalidatePath('/tasks');
  redirect('/tasks');
}

export async function deleteTaskAction(id) {
  deleteTask(id);
  revalidatePath('/tasks');
  redirect('/tasks');
}