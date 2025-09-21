import React, { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";

export default function AddComplaintForm({ account, connectMetaMask, disconnectMetaMask }) {
  const [contract, setContract] = useState(null);

  const [form, setForm] = useState({
    image: "",
    text: "",
    blockName: "",
    floorNo: "",
    roomNo: "",
    category: ""
  });

  // Load ABI + Contract once
  useEffect(() => {
    const loadContract = async () => {
      if (!window.ethereum) return;
      try {
        const res = await axios.get("/api/contract/abi");
        const { abi } = res.data;

        const web3 = new Web3(window.ethereum);
        const contractAddress = "0x94fa2f8CDBe1Ea95F11B5c872b4A448D8033e2E6";
        const c = new web3.eth.Contract(abi, contractAddress);
        setContract(c);
      } catch (err) {
        console.error("Error loading contract:", err);
      }
    };

    loadContract();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) return alert("⚠️ Please connect MetaMask first!");
    if (!contract) return alert("Contract not loaded yet.");

    const floorNo = Number(form.floorNo);
    if (isNaN(floorNo)) return alert("Floor No must be a number!");

    try {
      await contract.methods
        .raiseComplaint(
          form.image,
          form.text,
          form.blockName,
          floorNo,
          form.roomNo,
          form.category
        )
        .send({ from: account });

      alert("✅ Complaint submitted successfully!");
      setForm({ image: "", text: "", blockName: "", floorNo: "", roomNo: "", category: "" });
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("❌ Transaction failed.");
    }
  };

  return (
    <div style={{ background: "#fdfcfb", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg shadow-sm" style={{ background: "#4e342e" }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-white" href="/">
            Hostel Complaint System
            <div style={{ fontSize: "0.8rem", color: "#d7ccc8" }}>
              Voice your issues, get them resolved ✨
            </div>
          </a>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link text-white" href="/dashboard">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link active fw-bold text-warning" href="/add-complaint">Add Complaint</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="/my-complaints">My Complaints</a></li>
            </ul>
            <div className="ms-3">
              {account ? (
                <div className="d-flex align-items-center">
                  <span className="badge bg-light text-dark me-2">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <button className="btn btn-outline-light btn-sm" onClick={disconnectMetaMask}>
                    Disconnect
                  </button>
                </div>
              ) : (
                <button className="btn btn-warning btn-sm" onClick={connectMetaMask}>
                  Connect MetaMask
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Complaint Form Section */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Left: Form */}
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4" style={{ background: "#fffaf5" }}>
                <h3 className="mb-3 text-center text-brown fw-bold">📝 Submit a Complaint</h3>
                <p className="text-muted text-center">Fill in the details below to raise a complaint</p>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Image URL (optional)</label>
                      <input type="text" name="image" value={form.image} onChange={handleChange} className="form-control rounded-3" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Category</label>
                      <select name="category" value={form.category} onChange={handleChange} className="form-select rounded-3" required>
                        <option value="">Select Category</option>
                        <option value="Water">🚰 Water</option>
                        <option value="Electricity">💡 Electricity</option>
                        <option value="Cleanliness">🧹 Cleanliness</option>
                        <option value="Internet">🌐 Internet</option>
                        <option value="Other">📌 Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Complaint Text</label>
                    <textarea name="text" value={form.text} onChange={handleChange} className="form-control rounded-3" rows="3" placeholder="Describe your issue..." required />
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">Block Name</label>
                      <input type="text" name="blockName" value={form.blockName} onChange={handleChange} className="form-control rounded-3" required />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">Floor No</label>
                      <input type="number" name="floorNo" value={form.floorNo} onChange={handleChange} className="form-control rounded-3" required />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">Room No (optional)</label>
                      <input type="text" name="roomNo" value={form.roomNo} onChange={handleChange} className="form-control rounded-3" />
                    </div>
                  </div>

                  <button type="submit" className="btn w-100 mt-3 py-2 rounded-3 fw-semibold" style={{ background: "#4e342e", color: "white" }}>
                    🚀 Submit Complaint
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-4 h-100">
              <div className="card-body p-4 text-center" style={{ background: "#fbe9e7" }}>
                <h5 className="fw-bold mb-3">📸 Live Preview</h5>
                {form.image ? (
                  <img src={form.image} alt="Preview" className="img-fluid rounded-3 shadow-sm mb-3" style={{ maxHeight: "200px", objectFit: "cover" }} />
                ) : (
                  <div className="p-4 bg-light rounded-3 border border-dashed text-muted">
                    No image uploaded
                  </div>
                )}
                <p className="mb-1"><strong>Category:</strong> {form.category || "N/A"}</p>
                <p className="mb-1"><strong>Block:</strong> {form.blockName || "N/A"}</p>
                <p className="mb-1"><strong>Floor:</strong> {form.floorNo || "N/A"}</p>
                <p className="mb-1"><strong>Room:</strong> {form.roomNo || "N/A"}</p>
                <p className="text-muted mt-3">{form.text || "Your complaint will appear here..."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto text-center py-3" style={{ background: "#4e342e", color: "white" }}>
        <small>© {new Date().getFullYear()} Hostel Complaint System · Made with 🤎</small>
      </footer>
    </div>
  );
}
