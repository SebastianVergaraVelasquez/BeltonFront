// import './App.css'
import './styles.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Membership from './pages/Membership';
import Attendance from './pages/Attendance';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import PrivateRoute from './components/PrivateRoute';

function BeltonApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="sales" element={<Sales />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="products" element={<Products />} />
          <Route path="membership" element={<Membership />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default BeltonApp
