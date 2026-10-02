import styles from './StatCard.module.css';

const StatCard = ({ title, value, icon, colorTheme }) => {
  // colorTheme can be 'primary', 'secondary', 'accent', or 'error'
  const iconClass = `${styles.iconWrapper} ${styles[colorTheme] || styles.primary}`;

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
      <div className={iconClass}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
