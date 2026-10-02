import { useState } from 'react';
import styles from './Products.module.css';
import initialProductsData from '../../data/product.json';
import ProductTable from '../../components/Products/ProductTable/ProductTable';
import AddProduct from '../../components/Products/AddProduct/AddProduct';
import EditProduct from '../../components/Products/EditProduct/EditProduct';
import { FiSearch, FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Products = () => {
  // Main Data State
  const [productsList, setProductsList] = useState(initialProductsData);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Extract unique categories for the dropdown from the dynamic list
  const categories = ['All', ...new Set(productsList.map(p => p.category))];

  // Delete Handler with SweetAlert2
  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // error-500
      cancelButtonColor: '#94a3b8', // text-400
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setProductsList(prevList => prevList.filter(product => product.id !== productId));
        toast.success('Product deleted successfully!');
      }
    });
  };

  // Filter products based on search, category, and status
  const filteredProducts = productsList.filter(product => {
    // 1. Search Logic
    const term = searchTerm.toLowerCase();
    const matchesSearch = (
      product.name.toLowerCase().includes(term) ||
      product.generic_name.toLowerCase().includes(term) ||
      product.id.toLowerCase().includes(term)
    );

    // 2. Category Logic
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;

    // 3. Status Logic
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className={styles.pageWrapper}>
      {/* Page Header */}
      <div className={styles.headerSection}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Products Management</h1>
          <p className={styles.pageSubtitle}>Manage your wholesale catalog, pricing, and stock.</p>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className={styles.filterBar}>
        {/* Search Box */}
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category Filter */}
        <select 
          className={styles.filterSelect}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select 
          className={styles.filterSelect}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="active">Active</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
        
        {/* Actions Container */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Export Button */}
          <button 
            onClick={() => {
              import('xlsx').then((XLSX) => {
                const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
                XLSX.writeFile(workbook, "4You_Products.xlsx");
                toast.success('Excel exported successfully!');
              });
            }} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 16px', borderRadius: '8px', 
              backgroundColor: 'white', border: '1px solid var(--primary-600)', 
              color: 'var(--primary-600)', fontWeight: 600, cursor: 'pointer' 
            }}
          >
            Export
          </button>
          
          {/* Add Button */}
          <button className={styles.addBtn} onClick={() => setIsAddModalOpen(true)}>
            <FiPlus /> Add New
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div>
        <ProductTable 
          products={filteredProducts} 
          onEditClick={(product) => {
            setSelectedProduct(product);
            setIsEditModalOpen(true);
          }}
          onDeleteClick={handleDeleteProduct}
        />
      </div>

      {/* Add Product Modal */}
      <AddProduct 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Edit Product Modal */}
      <EditProduct 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }} 
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
