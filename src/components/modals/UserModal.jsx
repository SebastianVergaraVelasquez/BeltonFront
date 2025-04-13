import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserModal = ({ show, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    document: '',
    regis_date: '',
    user_type_id: '',
    address: '',
    email: '',
    lastname: '',
    name: '',
    tel: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        document: '',
        regis_date: '',
        user_type_id: '',
        address: '',
        email: '',
        lastname: '',
        name: '',
        tel: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Editar Usuario' : 'Registrar Usuario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Documento</Form.Label>
            <Form.Control type="text" name="document" value={formData.document} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Fecha de Registro</Form.Label>
            <Form.Control type="date" name="regis_date" value={formData.regis_date} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>ID Tipo de Usuario</Form.Label>
            <Form.Control type="text" name="user_type_id" value={formData.user_type_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" name="tel" value={formData.tel} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>{user ? 'Guardar Cambios' : 'Registrar'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
