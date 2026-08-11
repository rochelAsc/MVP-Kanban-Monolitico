import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Página não encontrada</h2>
      <Link href="/tasks">Voltar para tarefas</Link>
    </div>
  );
}