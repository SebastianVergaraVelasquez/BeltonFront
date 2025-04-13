import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header';

export default function Layout() {
  return (
    <div className="d-flex vh-100 w-100">
      <Sidebar />
      <div className="bodyheader">
        <Header />
        <main className="p-4 overflow-auto" style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}