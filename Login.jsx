import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authservices";
import { useAuth } from "../contaxt/AuthProvider";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { LoginAuth } = useAuth();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const response = await loginService(data);

    if (response.error) {
      setError(response.message);
    } else {
      LoginAuth(response.user);

      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-success">
      <div className="col-11 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-5 text-center">

            <h2 className="fw-bold mb-3 text-uppercase">Login</h2>

            {error && (
              <div className="alert alert-danger py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Enter email"
                value={data.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                className="form-control mb-4"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;