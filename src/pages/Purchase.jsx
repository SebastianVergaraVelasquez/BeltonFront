import React, { useEffect, useState } from 'react';
import PurchaseAddModal from '../components/modals/PurchaseAddModal';
import PurchaseDetailModal from '../components/modals/PurchaseDetailModal';
import { data } from 'react-router-dom';
// import PurchaseEditModal from '../components/modals/PurchaseEditModal';

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [filterDoc, setFilterDoc] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchPurchases = () => {
    fetch('http://localhost:8080/belton/supplierPurchase')
      .then(res => res.json())
      .then(data => setPurchases(data))
      .catch(err => console.error('Error al obtener compras:', err));
  };

  const fetchProducts = () => {
    fetch('http://localhost:8080/belton/product')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error al obtener productos:', err));

  };

  useEffect(() => {
    fetchPurchases();
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleDetail = (purchase) => {
    setSelectedPurchase(purchase);
    setShowDetailModal(true);
  };

  // const handleEdit = (purchase) => {
  //   setSelectedPurchase(purchase);
  //   setShowEditModal(true);
  // };
  
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/belton/supplierPurchase/${id}`, { method: 'DELETE' })
      .then(() => fetchPurchases());
  };

  const handleSubmitPurchase = (purchaseData) => {
    fetch('http://localhost:8080/belton/supplierPurchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData)
    })
      .then(() => fetchPurchases())
      .catch((err) => console.error('Error al registrar la compra:', err));
  };

  const filtered = purchases.filter(purchase => {
    const docMatch = purchase.supplier.name.includes(filterDoc);
    const dateMatch = filterDate === '' || purchase.date.startsWith(filterDate);
    return docMatch && dateMatch;
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Compras</h2>
        <button className="btn btn-success" onClick={handleAdd}>
          <i className="bi bi-calendar-plus me-2"></i>Registrar compra
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por documento de proveedor..."
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
              <th>id Proveedor</th>
              <th>Nombre Proveedor</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Detalles</th>
              {/* <th>Editar</th> */}
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, index) => (
                <tr key={index}>
                  <td>{p.supplier.id}</td>
                  <td>{p.supplier.name} {p.supplier.lastname}</td>
                  <td>{p.date}</td>
                  <td>${p.total}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDetail(p)}>
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                  {/* <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(p)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td> */}
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>
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

      <PurchaseAddModal show={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleSubmitPurchase} products={products} />
      <PurchaseDetailModal show={showDetailModal} onClose={() => setShowDetailModal(false)} purchase={selectedPurchase} />
      {/* <PurchaseEditModal show={showEditModal} onClose={() => setShowEditModal(false)} purchase={selectedPurchase} onSuccess={fetchPurchases} /> */}
    </div>
  );
};

export default Purchase;
