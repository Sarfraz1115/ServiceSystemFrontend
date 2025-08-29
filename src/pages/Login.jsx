import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn } from "lucide-react";
import AuthContext from "../context/AuthContext";
import "../CSS/Login.css"; // ✅ Import CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="header-overlay"></div>
            <h1 className="header-title">Service System</h1>
            <p className="header-subtitle">
              Welcome back! Sign in to continue 🚀
            </p>
          </div>

          {/* Form */}
          <div className="login-body">
            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              {/* Username */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="btn-icon" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="demo-creds">
              <p>
                Demo credentials: <span>admin</span> / <span>password</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;