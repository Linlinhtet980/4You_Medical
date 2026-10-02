import { useState } from 'react';
import styles from './ProductTable.module.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Pagination from '../../Common/Pagination/Pagination';
import { useAuth } from '../../../context/AuthContext';

const ProductTable = ({ products, onEditClick, onDeleteClick }) => {
  const { user } = useAuth();
  
  // --- Pagination Logic ---
  const [pagination, setPagination] = useState({ products, currentPage: 1 });
  // Derive the reset page during render when the product list changes.
  const currentPage = pagination.products === products ? pagination.currentPage : 1;
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = page => setPagination({ products, currentPage: page });

  // Calculate slice of products to show for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Product Details</th>
            <th>Generic Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Selling Price</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>
                <div className={styles.productInfo}>
                  <img src={product.image} alt={product.name} className={styles.productImg} />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-900)' }}>{product.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-500)' }}>{product.id}</div>
                  </div>
                </div>
              </td>
              <td>{product.generic_name}</td>
              <td>{product.category}</td>
              <td>
                <span style={{ fontWeight: 600 }}>{product.stock_quantity}</span> {product.unit}s
              </td>
              <td style={{ fontWeight: 600, color: 'var(--primary-700)' }}>
                {product.selling_price.toLocaleString()} MMK
              </td>
              <td>{product.expiry_date}</td>
              <td>
                <span className={`${styles.badge} ${product.status === 'active' ? styles.active : styles.outOfStock}`}>
                  {product.status === 'active' ? 'Active' : 'Out of Stock'}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className={styles.actionBtn} 
                    title="Edit Product"
                    onClick={() => onEditClick && onEditClick(product)}
                  >
                    <FiEdit />
                  </button>
                  
                  {/* RBAC: Only Admin can delete products */}
                  {user?.role === 'Admin' && (
                    <button 
                      className={styles.actionBtn} 
                      title="Delete Product"
                      onClick={() => onDeleteClick && onDeleteClick(product.id)}
                      style={{ color: 'var(--error-500)' }}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          
          {currentProducts.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-500)' }}>
                No products found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Reusable Pagination Component */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalItems={products.length}
      />
    </div>
  );
};

export default ProductTable;
