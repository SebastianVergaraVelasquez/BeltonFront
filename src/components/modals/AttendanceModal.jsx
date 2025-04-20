import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AttendanceModal = ({ show, onClose, onSubmit, attendance }) => {
  const [formData, setFormData] = useState({
    entryTime: '',
    exitTime: '',
    comment: '',
    user: { id: '' }
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/belton/user')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (attendance) {
      setFormData({
        entryTime: attendance.entryTime,
        exitTime: attendance.exitTime,
        comment: attendance.comment,
        user: { id: attendance.user.id }
      });
    } else {
      setFormData({
        entryTime: '',
        exitTime: '',
        comment: '',
        user: { id: '' }
      });
    }
  }, [attendance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'user') {
      setFormData({ ...formData, user: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const ensureSeconds = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    return dateTimeStr.length === 16 ? `${dateTimeStr}:00` : dateTimeStr;
  };
  
  const handleSubmit = () => {
    const data = {
      ...formData,
      entryTime: ensureSeconds(formData.entryTime),
      exitTime: ensureSeconds(formData.exitTime)
    };
  
    console.log(data);
    onSubmit(attendance ? { ...attendance, ...data } : data);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{attendance ? 'Editar' : 'Registrar'} Asistencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Select name="user" value={formData.user.id} onChange={handleChange}>
              <option value="">Seleccione un usuario</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.document} - {u.name} {u.lastname}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hora de Entrada</Form.Label>
            <Form.Control
              type="datetime-local"
              name="entryTime"
              value={formData.entryTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hora de Salida</Form.Label>
            <Form.Control
              type="datetime-local"
              name="exitTime"
              value={formData.exitTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
