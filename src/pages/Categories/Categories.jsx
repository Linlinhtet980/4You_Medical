import { useState } from 'react';
import styles from './Categories.module.css';
import { FiPlus, FiEdit, FiTrash2, FiSave } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import productsData from '../../data/product.json';

const Categories = () => {
  // Extract initial categories from product.json to simulate database
  const initialCategories = [...new Set(productsData.map(p => p.category))].map((name, index) => ({
    id: index + 1,
    name: name,
    productCount: productsData.filter(p => p.category === name).length
  }));

  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    // Check if exists
    if (categories.some(c => c.name.toLowerCase() === newCategoryName.toLowerCase())) {
      toast.error('Category already exists!');
      return;
    }

    const newCat = {
      id: Date.now(),
      name: newCategoryName,
      productCount: 0
    };

    setCategories([...categories, newCat]);
    setNewCategoryName('');
    toast.success('Category added successfully!');
  };

  const handleDelete = (id, count) => {
    if (count > 0) {
      Swal.fire('Cannot Delete', 'This category has existing products linked to it.', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this category?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(categories.filter(c => c.id !== id));
        toast.success('Category deleted!');
      }
    });
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = (id) => {
    if (!editName.trim()) {
      setEditingId(null);
      return;
    }
    
    setCategories(categories.map(c => 
      c.id === id ? { ...c, name: editName } : c
    ));
    setEditingId(null);
    toast.success('Category updated!');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Categories Management</h1>
        <p className={styles.pageSubtitle}>Add, edit, and organize product categories.</p>
      </div>

      <div className={styles.contentGrid}>
        
        {/* Left: Table */}
        <div className={`${styles.card} ${styles.tableContainer}`}>
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Total Products</th>
                <th style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td>
                    {editingId === cat.id ? (
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                        autoFocus
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td>
                    <span style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {cat.productCount} items
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      {editingId === cat.id ? (
                        <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => saveEdit(cat.id)} title="Save"><FiSave /></button>
                      ) : (
                        <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => startEdit(cat)} title="Edit"><FiEdit /></button>
                      )}
                      
                      <button 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`} 
                        onClick={() => handleDelete(cat.id, cat.productCount)} 
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-500)' }}>No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right: Add Form */}
        <div className={styles.card}>
          <h3>Add New Category</h3>
          <form onSubmit={handleAddCategory}>
            <div className={styles.formGroup}>
              <label>Category Name</label>
              <input 
                type="text" 
                value={newCategoryName} 
                onChange={(e) => setNewCategoryName(e.target.value)} 
                placeholder="e.g. Syrup, Injection..."
                required 
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <FiPlus /> Add Category
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Categories;
