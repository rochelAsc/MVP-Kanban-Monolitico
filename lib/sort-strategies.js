// lib/sort-strategies.js

export class SortByDate {
  sort(tasks) {
    return [...tasks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
}

export class SortByTitle {
  sort(tasks) {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class SortByStatus {
  sort(tasks) {
    return [...tasks].sort((a, b) => a.status.localeCompare(b.status));
  }
}

export class SortByPriority {
  sort(tasks) {
    const ordem = { high: 1, medium: 2, low: 3 };
    return [...tasks].sort((a, b) => (ordem[a.priority] || 2) - (ordem[b.priority] || 2));
  }
}

export const strategyMap = {
  data: SortByDate,
  titulo: SortByTitle,
  status: SortByStatus,
  prioridade: SortByPriority,
};