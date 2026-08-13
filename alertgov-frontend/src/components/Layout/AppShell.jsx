import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';

import { LiveProvider } from '../../context/LiveContext';

export default function AppShell() {
  return (
    <LiveProvider>
      <div className="app-container">
        <TopBar />
        <main className="main-content page-content">
          <Outlet />
        </main>
      </div>
    </LiveProvider>
  );
}
