import { useState } from 'react';
import styles from './OrderModal.module.css';
import { FiX } from 'react-icons/fi';

const OrderModal = ({ isOpen, onClose, onSave, initialData }) => {
  const createFormData = () => initialData || {
    id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
    client: '',
    date: new Date().toISOString().split('T')[0],
    items: 1,
    total: 10000,
    status: 'pending'
  };
  const [formState, setFormState] = useState(() => ({
    initialData,
    isOpen,
    data: createFormData()
  }));

  if (formState.initialData !== initialData || formState.isOpen !== isOpen) {
    setFormState({ initialData, isOpen, data: createFormData() });
  }
  const formData = formState.data;

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, data: { ...prev.data, [name]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{initialData ? 'Edit Order' : 'Create New Order'}</h2>
          <button className={styles.closeBtn} onClick={onClose}><FiX /></button>
        </div>

        <div className={styles.modalBody}>
          <form id="orderForm" onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Client Name</label>
              <input type="text" name="client" value={formData.client} onChange={handleChange} placeholder="e.g. City Hospital" required />
            </div>

            <div className={styles.formGroup}>
              <label>Order Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Total Items</label>
              <input type="number" name="items" value={formData.items} onChange={handleChange} required min="1" />
            </div>

            <div className={styles.formGroup}>
              <label>Total Amount (MMK)</label>
              <input type="number" name="total" value={formData.total} onChange={handleChange} required min="0" />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="submit" form="orderForm" className={styles.submitBtn}>
            {initialData ? 'Update Order' : 'Save Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

