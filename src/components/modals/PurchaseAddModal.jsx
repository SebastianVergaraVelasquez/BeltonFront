import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const PurchaseAddModal = ({ show, onClose, onSubmit }) => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchase, setPurchase] = useState({ supplierId: '', date: '' });
  const [details, setDetails] = useState([{ product: '', quantity: 1 }]);

  useEffect(() => {
    fetch('http://localhost:8080/belton/product')
      .then(res => res.json())
      .then(setProducts);

    fetch('http://localhost:8080/belton/supplier')
      .then(res => res.json())
      .then(setSuppliers);
  }, []);

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const addDetail = () => setDetails([...details, { product: '', quantity: 1 }]);
  const removeDetail = (index) => setDetails(details.filter((_, i) => i !== index));

  const handleSubmit = () => {
    const purchaseDetails = details.map(d => {
      const productObj = products.find(p => p.id === parseInt(d.product));
      return {
        product: productObj,
        quantity: d.quantity
      };
    });

    const supplierObj = suppliers.find(s => s.id === parseInt(purchase.supplierId));

    const dataToSend = {
      supplier: supplierObj,
      date: purchase.date,
      purchaseDetails
    };

    console.log("Enviando al backend:", JSON.stringify(dataToSend, null, 2));
    onSubmit(dataToSend);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Proveedor</Form.Label>
            <Form.Select
              value={purchase.supplierId}
              onChange={(e) => setPurchase({ ...purchase, supplierId: e.target.value })}
            >
              <option value="">Seleccione un proveedor</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control 
              type="date" 
              value={purchase.date} 
              onChange={(e) => setPurchase({ ...purchase, date: e.target.value })} 
            />
          </Form.Group>
          <hr />
          <h5>Productos</h5>
          {details.map((d, index) => (
            <div key={index} className="d-flex gap-2 align-items-center mb-2">
              <Form.Select 
                value={d.product} 
                onChange={(e) => handleDetailChange(index, 'product', e.target.value)}
              >
                <option value="">Producto</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Form.Select>
              <Form.Control 
                type="number" 
                min="1"
                value={d.quantity} 
                onChange={(e) => handleDetailChange(index, 'quantity', parseInt(e.target.value))} 
              />
              <Button variant="danger" onClick={() => removeDetail(index)}>X</Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addDetail}>Agregar producto</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseAddModal;
