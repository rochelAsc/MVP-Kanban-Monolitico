export default function StatusBadge({ status }) {
  const statusMap = {
    'A Fazer': 'warning',
    'Em Andamento': 'info',
    'Concluído': 'success',
  };

  return (
    <span className={`br-tag ${statusMap[status] || 'warning'}`}>
      {status}
    </span>
  );
}