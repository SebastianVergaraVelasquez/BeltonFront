import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Header from './Header';

export default function Layout() {
  return (
 
        <main>
          <Outlet />
        </main>
  );
}