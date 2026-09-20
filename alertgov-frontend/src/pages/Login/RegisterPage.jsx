import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../../api';
import './LoginPage.css'; // Reusing the login page styles

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    designation: '',
    department: '',
    district: '',
    role: 'TALUK'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const res = await AuthService.register({
      ...formData,
      username: formData.username.trim(),
      password: formData.password.trim(),
    });

    if (res.success) {
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(res.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Top Header */}
      <div className="login-top-header">
        <div className="login-header-left">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrCtU8k-Z8dC8m0yFrXAll8qUAYJeg6ypB-MGZ2-keA&s=10" 
            alt="Emblem" 
            className="login-header-logo"
          />
          <div className="login-header-text">
            <h1>Government of Tamil Nadu</h1>
            <h2>ALERTGOV AI - Registration</h2>
          </div>
        </div>
        <Link to="/" className="back-home-link">← Back to Home</Link>
      </div>

      <div className="login-gradient-bar"></div>

      <div className="login-main-content">
        <div className="login-card" style={{ maxWidth: '500px' }}>
          <div className="login-card-header">
            Create Department Account
          </div>
          <div className="login-card-body">
            <form onSubmit={handleRegister}>
              <div className="form-row">
                <label>User ID</label>
                <input
                  type="text"
                  name="username"
                  placeholder="e.g. TALUK01"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Officer Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="VILLAGE">Village Administrative Officer (VAO)</option>
                  <option value="TALUK">Taluk Officer</option>
                  <option value="DISTRICT">District Official</option>
                  <option value="COLLECTOR">District Collector</option>
                  <option value="STATE">State Admin</option>
                </select>
              </div>

              {error && <div className="login-error">{error}</div>}
              {success && <div style={{ color: 'green', background: '#e6ffe6', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{success}</div>}

              <div className="form-actions">
                <Link to="/login" className="login-help-link">Already have an account?</Link>
                <button type="submit" className="btn-login" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="login-page-footer">
        <span>Copyright {new Date().getFullYear()}. Government of Tamil Nadu</span>
        <span>Version 4.0.0.0</span>
      </div>
    </div>
  );
}
