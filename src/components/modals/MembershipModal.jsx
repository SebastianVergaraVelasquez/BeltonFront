import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MembershipModal = ({ show, onClose, onSubmit, membership }) => {
  const [formData, setFormData] = useState({
    userDocument: '',
    membershipTypeId: '',
    startDate: '',
    endDate: '',
    comment: ''
  });

  const [membershipTypes, setMembershipTypes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/belton/membershipType')
      .then(res => res.json())
      .then(data => setMembershipTypes(data));

    if (membership) {
      setFormData({
        userDocument: membership.user?.document || '',
        membershipTypeId: membership.membershipType?.id || '',
        startDate: membership.startDate || '',
        endDate: membership.endDate || '',
        comment: membership.comment || ''
      });
    } else {
      setFormData({
        userDocument: '',
        membershipTypeId: '',
        startDate: '',
        endDate: '',
        comment: ''
      });
    }
  }, [membership]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const data = {
      user: { document: formData.userDocument },
      membershipType: { id: parseInt(formData.membershipTypeId, 10) },
      startDate: formData.startDate,
      endDate: formData.endDate,
      comment: formData.comment
    };

    if (membership) {
      data.id = membership.id;
    }

    onSubmit(data);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{membership ? 'Editar Membresía' : 'Registrar Membresía'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Documento del Usuario</Form.Label>
            <Form.Control
              type="text"
              name="userDocument"
              value={formData.userDocument}
              onChange={handleChange}
              placeholder="Ingrese el número de documento del usuario"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Membresía</Form.Label>
            <Form.Select
              name="membershipTypeId"
              value={formData.membershipTypeId}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              {membershipTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Fin</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              rows={3}
              value={formData.comment}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MembershipModal;
