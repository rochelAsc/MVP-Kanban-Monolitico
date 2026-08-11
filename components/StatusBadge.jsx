export default function StatusBadge({ status }) {
  const statusMap = {
    'todo': 'warning',
    'doing': 'info',
    'done': 'success',
  };

  const labelMap = {
    'todo': 'A Fazer',
    'doing': 'Em Andamento',
    'done': 'Concluído',
  };

  const mappedStatus = statusMap[status] || 'warning';
  const label = labelMap[status] || status;

  return (
    <span className={`br-tag ${mappedStatus}`}>
      {label}
    </span>
  );
}