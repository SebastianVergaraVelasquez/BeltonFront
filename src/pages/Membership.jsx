import React, { useEffect, useState } from 'react';
import MembershipModal from '../components/modals/MembershipModal';

const Membership = () => {
    const [memberships, setMemberships] = useState([]);
    const [filterUser, setFilterUser] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState(null);

    const fetchMemberships = () => {
        fetch('http://localhost:8080/belton/membership')
            .then(res => res.json())
            .then(data => setMemberships(data))
            .catch(err => console.error('Error al obtener membresías:', err));
    };

    useEffect(() => {
        fetchMemberships();
    }, []);

    const handleAdd = () => {
        setSelectedMembership(null);
        setShowModal(true);
    };

    const handleEdit = (membership) => {
        setSelectedMembership(membership);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/belton/membership/${id}`, { method: 'DELETE' })
            .then(() => fetchMemberships());
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (data) => {
        const method = data.id ? 'PUT' : 'POST';
        const url = data.id
            ? `http://localhost:8080/belton/membership/${data.id}`
            : 'http://localhost:8080/belton/membership';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(() => fetchMemberships());
    };

    const filtered = memberships.filter((m) =>
        m.user.document.toString().toLowerCase().includes(filterUser.toLowerCase())
      );

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Membresías</h2>
                <button className="btn btn-success" onClick={handleAdd}>
                    <i className="bi bi-plus-circle me-2"></i>Registrar membresía
                </button>
            </div>

            <div className="row mb-3">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por número de documento..."
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Documento</th>
                            <th>Usuario</th>
                            <th>Tipo de Membresía</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Comentario</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.user.document}</td>
                                    <td>{m.user.name} {m.user.lastname}</td>
                                    <td>{m.membershipType.name}</td>
                                    <td>{m.startDate}</td>
                                    <td>{m.endDate}</td>
                                    <td>{m.comment}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(m)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8" className="text-center">Sin registros</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <MembershipModal
                show={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                membership={selectedMembership}
            />
        </div>
    );
};

export default Membership;