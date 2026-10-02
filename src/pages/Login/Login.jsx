import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  // Splash Screen States
  const [showSplash, setShowSplash] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSplashClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 800); // Wait 800ms for animation to finish
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const success = login(email, password);
      if (success) navigate('/'); 
    }
  };

  // If showing splash, render the splash screen UI
  if (showSplash) {
    return (
      <div className={styles.splashPage}>
        <div 
          className={`${styles.appIconWrapper} ${isAnimating ? styles.clicked : ''}`}
          onClick={handleSplashClick}
        >
          <img src="/new_logo.jpg" alt="4You Medical App" className={styles.appIconImg} />
        </div>
        {/* Ripple Effect div */}
        <div className={`${styles.ripple} ${isAnimating ? styles.animateRipple : ''}`}></div>
      </div>
    );
  }

  // Otherwise, render normal login
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <img src="/new_logo.jpg" alt="4You Medical" className={styles.logo} />
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your admin dashboard</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <input 
                type="email" 
                placeholder="admin@4you.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Clear error as soon as user starts typing again
                  if (errors.email) setErrors({...errors, email: null});
                }}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
          </div>

          {/* Password Field */}
          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input 
                type="password" 
                placeholder="••••••••"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({...errors, password: null});
                }}
              />
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>
          </div>

          <button type="submit" className={styles.loginBtn}>Sign In</button>
        </form>

        <div className={styles.hint}>
          <strong>Demo Credentials:</strong><br />
          Email: <code>admin@4you.com</code><br />
          Password: <code>password123</code>
        </div>
      </div>
    </div>
  );
};

export default Login;
