import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contaxt/AuthProvider";

function DashBoard() {
  const navigate = useNavigate();
  const { isAuthenticated, loading, LogoutAuth } = useAuth();

  const [queue, setQueue] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: ""
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPatient = (e) => {
    e.preventDefault();

    const newPatient = {
      token: queue.length + 1,
      name: form.name,
      phone: form.phone || "—",
      time: form.time,
      status: "waiting"
    };

    setQueue([...queue, newPatient]);

    setForm({ name: "", phone: "", time: "" });
  };

  const updateStatus = (index, newStatus) => {
    const updated = [...queue];
    updated[index].status = newStatus;
    setQueue(updated);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-success px-4">
        <span className="navbar-brand fw-bold">Clinic Queue</span>

        <div className="d-flex gap-3 align-items-center">
          <span className="text-white small">Queue (manage)</span>
          <button className="btn btn-light btn-sm" onClick={LogoutAuth}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">

        <h4 className="fw-bold mb-3">Queue (manage)</h4>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <form onSubmit={addPatient} className="row g-3">

              <div className="col-md-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Patient Name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="time"
                  name="time"
                  className="form-control"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-2">
                <button className="btn btn-success w-100">
                  Add
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Token</th>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {queue.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-3">
                      No patients added
                    </td>
                  </tr>
                ) : (
                  queue.map((q, index) => (
                    <tr key={index}>
                      <td>{q.token}</td>
                      <td>{q.name}</td>
                      <td>{q.phone}</td>
                      <td>{q.time}</td>

                      <td>
                        <span className={`badge ${
                          q.status === "waiting"
                            ? "bg-warning text-dark"
                            : q.status === "in-progress"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}>
                          {q.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => updateStatus(index, "in-progress")}
                        >
                          In Progress
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => updateStatus(index, "skipped")}
                        >
                          Skip
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </>
  );
}

export default DashBoard;