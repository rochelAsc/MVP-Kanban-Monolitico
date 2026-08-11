import Link from 'next/link';
import { FiHome, FiPlus } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="br-header">
      <div className="container">
        <div className="header-top">
          <div className="header-logo">
            <h1>Tarefas</h1>
          </div>
          <div className="header-actions">
            <Link href="/tasks" className="br-button small">
              <FiHome/> Início
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}