import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';

const PurchaseDetailModal = ({ show, onClose, purchase }) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (purchase) {
      fetch(`http://localhost:8080/belton/purchaseDetail/purchase/${purchase.id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Respuesta del backend:', data);
            setDetails(data);
          })
        .catch(err => console.error('Error al obtener detalles de la compra:', err));
    }
  }, [purchase]);

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Proveedor:</strong> {purchase?.supplier?.name}</p>
        <p><strong>Fecha:</strong> {purchase?.date}</p>
        <p><strong>Total:</strong> ${purchase?.total}</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d, index) => (
              <tr key={index}>
                <td>{d.product.name}</td>
                <td>{d.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default PurchaseDetailModal;
