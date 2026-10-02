import styles from './RecentTable.module.css';
import { Link } from 'react-router-dom';

const RecentTable = ({ products }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h3>Recent Products Added</h3>
        <Link to="/products" className={styles.viewAll}>View All</Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Wholesale Unit</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
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
              <td>{product.category}</td>
              <td>{product.unit}</td>
              <td style={{ fontWeight: 500 }}>{product.stock_quantity}</td>
              <td>
                <span className={`${styles.badge} ${product.status === 'active' ? styles.active : styles.outOfStock}`}>
                  {product.status === 'active' ? 'Active' : 'Out of Stock'}
                </span>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-500)' }}>
                No recent products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTable;
