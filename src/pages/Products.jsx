import React, { useEffect, useState } from 'react';
import ProductModal from '../components/modals/ProductsModal';

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    fetch('http://localhost:8080/belton/product')
      .then(res => res.json())
      .then(data => setProductList(data))
      .catch(err => console.error('Error al obtener productos:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/belton/product/${id}`, { method: 'DELETE' })
      .then(() => fetchProducts());
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (data) => {
    const method = data.id ? 'PUT' : 'POST';
    const url = data.id
      ? `http://localhost:8080/belton/product/${data.id}`
      : 'http://localhost:8080/belton/product';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => fetchProducts());
  };

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Productos</h2>
        <button className="btn btn-success" onClick={handleAdd}>
          <i className="bi bi-plus-circle me-2"></i>Registrar producto
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, index) => (
                <tr key={index}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.stock}</td>
                  <td>${p.price}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(p)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
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

      <ProductModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        product={selectedProduct}
      />
    </div>
  );
};

export default Product;
