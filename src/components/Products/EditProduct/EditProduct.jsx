import { useState, useEffect } from 'react';
import styles from './EditProduct.module.css';
import { FiX } from 'react-icons/fi';

const EditProduct = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    generic_name: '',
    category: '',
    unit: '',
    stock_quantity: 0,
    buying_price: 0,
    selling_price: 0,
    expiry_date: '',
    manufacturer: '',
    status: ''
  });

  // Populate form data when the product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        generic_name: product.generic_name || '',
        category: product.category || '',
        unit: product.unit || '',
        stock_quantity: product.stock_quantity || 0,
        buying_price: product.buying_price || 0,
        selling_price: product.selling_price || 0,
        expiry_date: product.expiry_date || '',
        manufacturer: product.manufacturer || '',
        status: product.status || 'active'
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product Data for ID:", product.id, formData);
    // TODO: In the future, save updates to state or API
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit Product <span style={{ fontSize: '0.9rem', color: 'var(--text-500)', marginLeft: '10px' }}>({product.id})</span></h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <form id="editProductForm" onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Generic Name</label>
              <input type="text" name="generic_name" value={formData.generic_name} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Vitamins">Vitamins</option>
                <option value="First Aid">First Aid</option>
                <option value="Cold & Flu">Cold & Flu</option>
                <option value="Digestive Health">Digestive Health</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Eye Care">Eye Care</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Wholesale Unit</label>
              <select name="unit" value={formData.unit} onChange={handleChange}>
                <option value="Box">Box</option>
                <option value="Carton">Carton</option>
                <option value="Dozen">Dozen</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Buying Price (MMK)</label>
              <input type="number" name="buying_price" value={formData.buying_price} onChange={handleChange} required min="0" />
            </div>

            <div className={styles.formGroup}>
              <label>Selling Price (MMK)</label>
              <input type="number" name="selling_price" value={formData.selling_price} onChange={handleChange} required min="0" />
            </div>

            <div className={styles.formGroup}>
              <label>Stock Quantity</label>
              <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required min="0" />
            </div>

            <div className={styles.formGroup}>
              <label>Expiry Date</label>
              <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Manufacturer</label>
              <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="submit" form="editProductForm" className={styles.submitBtn}>Update Product</button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
