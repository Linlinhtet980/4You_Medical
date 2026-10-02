import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { FiBell, FiLogOut, FiChevronDown, FiUser, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <button className={styles.hamburgerBtn} onClick={onMenuClick}>
        <FiMenu />
      </button>

      <div className={styles.profileArea}>
        
        <div className={styles.iconBtn}>
          <FiBell />
        </div>
        
        <div className={styles.profileDropdownContainer} ref={dropdownRef}>
          <div 
            className={styles.profileInfo} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles.avatar}>{user?.name?.charAt(0) || 'A'}</div>
            <div className={styles.adminDetails}>
              <span className={styles.adminName}>{user?.name || 'Admin User'}</span>
              <span className={styles.adminRole}>{user?.role || 'Manager'}</span>
            </div>
            <FiChevronDown className={`${styles.chevron} ${isDropdownOpen ? styles.chevronUp : ''}`} />
          </div>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button 
                className={styles.dropdownItem}
                onClick={() => {
                  navigate('/settings');
                  setIsDropdownOpen(false);
                }}
              >
                <FiUser className={styles.itemIcon} />
                My Profile
              </button>
              
              <div className={styles.divider}></div>
              
              <button 
                className={`${styles.dropdownItem} ${styles.logoutText}`}
                onClick={logout}
              >
                <FiLogOut className={styles.itemIcon} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
