import React, { useEffect, useState } from 'react';
import SaleAddModal from '../components/modals/SaleAddModal';
import SaleDetailModal from '../components/modals/SaleDetailModal';
// import SaleEditModal from '../components/modals/SaleEditModal';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filterDoc, setFilterDoc] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchSales = () => {
    fetch('http://localhost:8080/belton/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error('Error al obtener ventas:', err));
  };

  const fetchProducts = () => {
    fetch('http://localhost:8080/belton/product')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error al obtener productos:', err));
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleDetail = (sale) => {
    setSelectedSale(sale);
    setShowDetailModal(true);
  };

  // const handleEdit = (sale) => {
  //   setSelectedSale(sale);
  //   setShowEditModal(true);
  // };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/belton/sales/${id}`, { method: 'DELETE' })
      .then(() => fetchSales());
  };

  const handleSubmitSale = (saleData) => {
    fetch('http://localhost:8080/belton/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData)
    })
      .then(() => fetchSales())
      .catch((err) => console.error('Error al registrar venta:', err));
  };

  const filtered = sales.filter(sale => {
    const docMatch = sale.user.document.toString().includes(filterDoc);
    const dateMatch = filterDate === '' || sale.date.startsWith(filterDate);
    return docMatch && dateMatch;
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ventas</h2>
        <button className="btn btn-success" onClick={handleAdd}>
          <i className="bi bi-calendar-plus me-2"></i>Registrar venta
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
              <th>Fecha</th>
              <th>Total</th>
              <th>Detalles</th>
              {/* <th>Editar</th> */}
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s, index) => (
                <tr key={index}>
                  <td>{s.user.document}</td>
                  <td>{s.user.name} {s.user.lastname}</td>
                  <td>{s.date}</td>
                  <td>${s.total}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDetail(s)}>
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                  {/* <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(s)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td> */}
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>
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

      <SaleAddModal show={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleSubmitSale} products={products} />
      <SaleDetailModal show={showDetailModal} onClose={() => setShowDetailModal(false)} sale={selectedSale} />
      {/* <SaleEditModal show={showEditModal} onClose={() => setShowEditModal(false)} sale={selectedSale} onSuccess={fetchSales} /> */}
    </div>
  );
};

export default Sales;
