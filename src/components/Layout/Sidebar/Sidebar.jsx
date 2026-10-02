import styles from './Sidebar.module.css';
import { FiHome, FiBox, FiTag, FiUsers, FiShoppingCart, FiSettings, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logoArea}>
        <img src="/new_logo.jpg" alt="4You Medical Logo" className={styles.logoImage} />
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX />
        </button>
      </div>
      
      <div className={styles.menuList}>
        <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
          <FiHome className={styles.icon} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
          <FiBox className={styles.icon} />
          <span>Products</span>
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
          <FiTag className={styles.icon} />
          <span>Categories</span>
        </NavLink>
        <NavLink to="/clients" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
          <FiUsers className={styles.icon} />
          <span>Clients</span>
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
          <FiShoppingCart className={styles.icon} />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
          <FiSettings className={styles.icon} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
