import React, { useState, useEffect } from 'react';

const SaleEditModal = ({ show, onClose, onSubmit, sale }) => {
  const [formData, setFormData] = useState({
    user: '',
    date: '',
    total: 0,
    saleDetails: []
  });

  useEffect(() => {
    if (sale) {
      setFormData({
        user: sale.user ? sale.user.id : '',
        date: sale.date,
        total: sale.total,
        saleDetails: sale.saleDetails || []
      });
    }
  }, [sale]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDetailChange = (index, field, value) => {
    const newSaleDetails = [...formData.saleDetails];
    newSaleDetails[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      saleDetails: newSaleDetails
    }));
  };

  const handleSave = () => {
    // Submit the form data for editing the sale
    onSubmit(formData);
  };

  const handleAddProductDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      saleDetails: [...prevData.saleDetails, { productId: '', quantity: 1 }]
    }));
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" aria-labelledby="SaleEditModalLabel" aria-hidden={!show}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="SaleEditModalLabel">Editar Venta</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="user" className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  name="user"
                  value={formData.user}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="total" className="form-label">Total</label>
                <input
                  type="number"
                  className="form-control"
                  id="total"
                  name="total"
                  value={formData.total}
                  onChange={handleInputChange}
                />
              </div>
              <h5>Detalles de Venta</h5>
              {formData.saleDetails.map((detail, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-md-5">
                    <label className="form-label">Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={detail.productId}
                      onChange={(e) => handleDetailChange(index, 'productId', e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      value={detail.quantity}
                      onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-danger mt-4"
                      onClick={() => {
                        const newSaleDetails = [...formData.saleDetails];
                        newSaleDetails.splice(index, 1);
                        setFormData((prevData) => ({
                          ...prevData,
                          saleDetails: newSaleDetails
                        }));
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-primary" onClick={handleAddProductDetail}>
                Agregar Producto
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleEditModal;
