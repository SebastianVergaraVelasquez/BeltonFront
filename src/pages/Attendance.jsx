import React, { useEffect, useState } from 'react';
import AttendanceModal from '../components/modals/AttendanceModal';

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [filterDoc, setFilterDoc] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const fetchAttendance = () => {
    fetch('http://localhost:8080/belton/attendance')
      .then(res => res.json())
      .then(data => setAttendanceList(data))
      .catch(err => console.error('Error al obtener asistencia:', err));
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleAdd = () => {
    setSelectedAttendance(null);
    setShowModal(true);
  };

  const handleEdit = (attendance) => {
    setSelectedAttendance(attendance);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/belton/attendance/${id}`, { method: 'DELETE' })
      .then(() => fetchAttendance());
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (data) => {
    const method = data.id ? 'PUT' : 'POST';
    const url = data.id
      ? `http://localhost:8080/belton/attendance/${data.id}`
      : 'http://localhost:8080/belton/attendance';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => fetchAttendance());
  };

  const filtered = attendanceList.filter((a) => {
    const docMatch = a.user.document.toString().includes(filterDoc);
    const dateMatch = filterDate === '' || a.entryTime.startsWith(filterDate);
    return docMatch && dateMatch;
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Asistencia</h2>
        <button className="btn btn-success" onClick={handleAdd}>
          <i className="bi bi-calendar-plus me-2"></i>Registrar asistencia
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por documento..."
            value={filterDoc}
            onChange={(e) => setFilterDoc(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Comentario</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((a, index) => (
                <tr key={index}>
                  <td>{a.user.document}</td>
                  <td>{a.user.name} {a.user.lastname}</td>
                  <td>{a.entryTime}</td>
                  <td>{a.exitTime}</td>
                  <td>{a.comment}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(a)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(a.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center">Sin registros</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AttendanceModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        attendance={selectedAttendance}
      />
    </div>
  );
};

export default Attendance;
