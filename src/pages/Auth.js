// pages/Auth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './Auth.css';



function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigation

  const toggleMode = () => {
    setIsRegister(prev => !prev);
    setSuccessMessage('');
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (isRegister) {
    // Check if email already exists
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert('User already exists. Try logging in.');
      return;
    }

    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setSuccessMessage('Registration successful! You can now log in.');
    toggleMode();
  } else {
    // Login
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert('Invalid credentials. Try again.');
      return;
    }

    // Fake login: set token + email in localStorage
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('email', user.email);

    setSuccessMessage('Login successful! Redirecting...');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/');
    }, 1500);
  }
};

  return (
    <div className="auth-container">
      {successMessage && (
        <div className="auth-success-popup">
          {successMessage}
        </div>
      )}

      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="auth-field">
              <FaUser />
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          )}
          <div className="auth-field">
            <FaEnvelope />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="auth-field">
            <FaLock />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="auth-btn"
            type="submit"
          >
            {isRegister ? 'Register' : 'Login'}
          </motion.button>
        </form>

        <p className="toggle-link" onClick={toggleMode}>
          {isRegister ? (
            <>
              <FaArrowLeft /> Already have an account? <strong>Login</strong>
            </>
          ) : (
            <>
              <FaArrowRight /> New user? <strong>Register</strong>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;
