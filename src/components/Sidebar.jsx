import { Link } from "react-router-dom";
import {FaHome,FaUsers,FaIdCard,FaCalendarCheck,FaBoxOpen,FaCashRegister,FaShoppingCart} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
      <div className="text-center mb-4">
        <img src="../media/logo.jpeg" alt="Belton Gym" style={{ width: '80%' }} />
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white">
            <FaHome className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/users" className="nav-link text-white">
            <FaUsers className="me-2" /> Usuarios
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/membership" className="nav-link text-white">
            <FaIdCard className="me-2" /> Membresías
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/attendance" className="nav-link text-white">
            <FaCalendarCheck className="me-2" /> Asistencia
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/products" className="nav-link text-white">
            <FaBoxOpen className="me-2" /> Productos
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/sales" className="nav-link text-white">
            <FaCashRegister className="me-2" /> Ventas
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/purchase" className="nav-link text-white">
            <FaShoppingCart className="me-2" /> Compras
          </Link>
        </li>
      </ul>
    </div>
  );
}
