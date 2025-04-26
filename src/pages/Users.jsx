import React, { useEffect, useState } from 'react';
import UserModal from '../components/modals/UserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/belton/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data);
      })
      .catch(err => console.error('Error al obtener usuarios:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/belton/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => fetchUsers());
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitUser = (user) => {
    const token = localStorage.getItem('token');
    const method = user.id ? 'PUT' : 'POST';
    const url = user.id
      ? `http://localhost:8080/belton/user/${user.id}`
      : 'http://localhost:8080/belton/user';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user),
    }).then(() => fetchUsers());
  };

  const filteredUsers = users.filter(user =>
    user.document && user.document.toString().toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Usuarios</h2>
        <button className="btn btn-success" onClick={handleAddUser}>
          <i className="bi bi-person-plus me-2"></i>
          Registrar usuario
        </button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por documento..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Documento</th>
              <th>Fecha de Registro</th>
              <th>Tipo de Usuario</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.document}</td>
                  <td>{user.regisDate}</td>
                  <td>{user.userType.name}</td>
                  <td>{user.address}</td>
                  <td>{user.email}</td>
                  <td>{user.lastname}</td>
                  <td>{user.name}</td>
                  <td>{user.tel}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditUser(user)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(user.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">Cargando usuarios...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UserModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;
