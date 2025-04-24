import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';

const SaleDetailModal = ({ show, onClose, sale }) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (sale) {
      fetch(`http://localhost:8080/belton/saleDetail/sale/${sale.id}`)
        .then(res => res.json())
        .then(setDetails);
    }
  }, [sale]);

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Cliente:</strong> {sale?.user?.name} {sale?.user?.lastname}</p>
        <p><strong>Fecha:</strong> {sale?.date}</p>
        <p><strong>Total:</strong> ${sale?.total}</p>
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

export default SaleDetailModal;