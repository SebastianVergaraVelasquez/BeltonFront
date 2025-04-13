// import './App.css'
import './styles.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
// import Memberships from './pages/Memberships';
import PrivateRoute from './components/PrivateRoute';

function BeltonApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          {/* <Route path="memberships" element={<Memberships />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default BeltonApp
