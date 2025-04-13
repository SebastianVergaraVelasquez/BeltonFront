import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaIdCard, FaChartBar } from "react-icons/fa";


export default function Sidebar() {
    return (
        <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
      {/* Logo */}
      <div className="text-center mb-4">
        <img src="../media/logo.jpeg" alt="Belton Gym" style={{ width: '80%' }} />
      </div>

      {/* Navigation */}
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link text-white">
            <FaHome className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/users" className="nav-link text-white">
            <FaUsers className="me-2" /> Usuarios
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/memberships" className="nav-link text-white">
            <FaIdCard className="me-2" /> Membresías
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/reports" className="nav-link text-white">
            <FaChartBar className="me-2" /> Reportes
          </Link>
        </li>
      </ul>
    </div>
    );
  }