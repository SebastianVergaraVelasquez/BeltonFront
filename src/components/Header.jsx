import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const routeMap = {
    "dashboard": "/",
    "usuarios": "/users",
    "membresías": "/membership",
    "asistencia": "/attendance",
    "productos": "/products",
    "ventas": "/sales",
    "compras": "/purchase"
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const texto = searchText.trim().toLowerCase();
    const ruta = routeMap[texto];
    navigate(ruta ? ruta : "/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light px-4 shadow-sm">
      <div className="container-fluid">
        <form className="d-flex me-auto" role="search" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </form>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-primary">
            <FaUserCircle className="me-1" /> Ver Perfil
          </button>
          <button className="btn btn-outline-danger" onClick={() => {navigate("/login")}}>
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}