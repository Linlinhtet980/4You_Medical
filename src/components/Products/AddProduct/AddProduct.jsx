import { useState } from 'react';
import styles from './AddProduct.module.css';
import { FiX } from 'react-icons/fi';

const AddProduct = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    generic_name: '',
    category: 'Pain Relief',
    unit: 'Box',
    stock_quantity: 0,
    buying_price: 0,
    selling_price: 0,
    expiry_date: '',
    manufacturer: '',
    status: 'active',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Product Data:", formData);
    // TODO: In the future, we will save this data to our global state or API
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Add New Product</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <form id="addProductForm" onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Biogesic 500mg" />
            </div>

            <div className={styles.formGroup}>
              <label>Generic Name</label>
              <input type="text" name="generic_name" value={formData.generic_name} onChange={handleChange} required placeholder="e.g. Paracetamol" />
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Vitamins">Vitamins</option>
                <option value="First Aid">First Aid</option>
                <option value="Cold & Flu">Cold & Flu</option>
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

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Manufacturer</label>
              <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required placeholder="e.g. Johnson & Johnson" />
            </div>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="submit" form="addProductForm" className={styles.submitBtn}>Save Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
