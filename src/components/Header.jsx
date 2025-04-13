import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-4 shadow-sm">
      <div className="container-fluid">
        <form className="d-flex me-auto" role="search">
          <input className="form-control me-2" type="search" placeholder="Buscar..." />
          <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-primary">
            <FaUserCircle className="me-1" /> Ver Perfil
          </button>
          <button className="btn btn-outline-danger">
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}