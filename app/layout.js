import '@govbr-ds/core/dist/core.min.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Sistema de Tarefas - Kanban',
  description: 'MVP para gerenciamento de tarefas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container" style={{ padding: '2rem 0' }}>
          {children}
        </main>
      </body>
    </html>
  );
}