import { useState } from 'react';
import styles from './ClientModal.module.css';
import { FiX } from 'react-icons/fi';

const ClientModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(() => createFormData(initialData));

  const resetForm = () => setFormData(createFormData(initialData));

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{initialData ? 'Edit Client' : 'Add New Client'}</h2>
          <button className={styles.closeBtn} onClick={() => { resetForm(); onClose(); }}><FiX /></button>
        </div>

        <div className={styles.modalBody}>
          <form id="clientForm" onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Client Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Client Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Hospital">Hospital</option>
                <option value="Clinic">Clinic</option>
                <option value="Wholesaler">Wholesaler</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Contact Number</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Location (City)</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={() => { resetForm(); onClose(); }}>Cancel</button>
          <button type="submit" form="clientForm" className={styles.submitBtn}>
            {initialData ? 'Update Client' : 'Save Client'}
          </button>
        </div>
      </div>
    </div>
  );
};

const createFormData = (initialData) => initialData ? { ...initialData } : {
  id: `C-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
  name: '',
  type: 'Pharmacy',
  contact: '',
  location: '',
  status: 'active'
};

export default ClientModal;

