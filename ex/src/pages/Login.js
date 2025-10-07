import React, { useState } from 'react';
import { login } from './Api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // ✅ Import external CSS

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      console.log('Login successful, token:', token);
      alert('Login successful');
      setusername('');
      setpassword('');
      setsuccess('Successfully Logged In');
      seterror('');
      navigate('/Home');
    } catch (err) {
      console.log('Login Error', err);
      seterror('Login Failed');
      setsuccess('');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Welcome Back 👋</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login">Login</button>

        {success && <p className="msg success">{success}</p>}
        {error && <p className="msg error">{error}</p>}
      </form>
    </div>
  );
};
export default Login;
