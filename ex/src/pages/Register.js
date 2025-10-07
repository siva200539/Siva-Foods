import React, { useState } from 'react';
import { register } from './Api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // ✅ external CSS import

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setSuccess('Registered Successfully!');
      setError('');
      navigate('/login');
    } catch (err) {
      console.log('Registration Error:', err);
      setError('Registration Failed!');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">
        <h2>Create Your Account 🍽️</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-register">
          Register
        </button>

        {success && <p className="msg success">{success}</p>}
        {error && <p className="msg error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
