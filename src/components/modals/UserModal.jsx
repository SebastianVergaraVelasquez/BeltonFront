import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserModal = ({ show, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    document: '',
    regisDate: '',
    userType: { id: '', name: '' },
    address: '',
    email: '',
    lastname: '',
    name: '',
    tel: '',
    password: ''
  });

  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/belton/userType')
      .then(res => res.json())
      .then(data => setUserTypes(data))
      .catch(err => console.error('Error al cargar tipos de usuario:', err));
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        userType: user.userType || { id: '' },
        password: '' // no se usa al editar, pero lo dejamos vacío
      });
    } else {
      setFormData({
        document: '',
        regisDate: '',
        userType: { id: '', name: '' },
        address: '',
        email: '',
        lastname: '',
        name: '',
        tel: '',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== 'userType') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      const selectedType = userTypes.find(ut => ut.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        userType: selectedType || { id: '', name: '' }
      }));
    }
  };

  const handleSubmit = () => {
    console.log(formData);
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
            <Form.Control
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Fecha de Registro</Form.Label>
            <Form.Control
              type="date"
              name="regisDate"
              value={formData.regisDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Tipo de Usuario</Form.Label>
            <Form.Select
              name="userType"
              value={formData.userType.id}
              onChange={handleChange}
            >
              <option value="">Selecciona un tipo</option>
              {userTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
            />
          </Form.Group>
          {!user && (
            <Form.Group className="mb-2">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>
          {user ? 'Guardar Cambios' : 'Registrar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;