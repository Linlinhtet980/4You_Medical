import { useState } from 'react';
import styles from './Settings.module.css';
import { toast } from 'react-toastify';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>System Settings</h1>
        <p className={styles.pageSubtitle}>Manage your company profile and application preferences.</p>
      </div>

      <div className={styles.settingsGrid}>
        
        {/* Tabs Sidebar */}
        <div className={styles.tabsCard}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'company' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('company')}
          >
            Company Profile
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'preferences' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'tax' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tax')}
          >
            Tax & Currency
          </button>
        </div>

        {/* Content Area */}
        <div className={styles.contentCard}>
          {activeTab === 'company' && (
            <form onSubmit={handleSave}>
              <h3>Company Profile</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Company Name</label>
                  <input type="text" defaultValue="4You Medical Wholesale" />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input type="text" defaultValue="+95 9 123 456 789" />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Email Address</label>
                  <input type="email" defaultValue="admin@4youmedical.com" />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Company Address</label>
                  <textarea rows="3" defaultValue="No.123, Bogyoke Road, Yangon, Myanmar"></textarea>
                </div>
              </div>
              <button type="submit" className={styles.saveBtn}>Save Changes</button>
            </form>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={handleSave}>
              <h3>Application Preferences</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Timezone</label>
                  <select>
                    <option>Asia/Yangon (+06:30)</option>
                    <option>Asia/Bangkok (+07:00)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Theme</label>
                  <select>
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                  </select>
                </div>
              </div>
              <button type="submit" className={styles.saveBtn}>Save Preferences</button>
            </form>
          )}

          {activeTab === 'tax' && (
            <form onSubmit={handleSave}>
              <h3>Tax & Currency Settings</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Default Currency</label>
                  <select>
                    <option>MMK (Myanmar Kyat)</option>
                    <option>USD (US Dollar)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Commercial Tax (%)</label>
                  <input type="number" defaultValue="5" />
                </div>
              </div>
              <button type="submit" className={styles.saveBtn}>Save Settings</button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Settings;

