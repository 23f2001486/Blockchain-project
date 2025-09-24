import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LowerAdmin from "./components/LowerAdmin";
import HigherAdmin from "./components/HigherAdmin";
import OAuthRedirect from "./components/OAuthRedirect";
import { AuthContext } from "./context/AuthContext";
import AddComplaintForm from "./components/AddComplaint";

function App() {
  const { token, user, loading } = useContext(AuthContext);

  // ✅ MetaMask state lifted to App.js and persisted
  const [account, setAccount] = useState(localStorage.getItem("metamaskAccount") || null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        localStorage.setItem("metamaskAccount", accounts[0]); // ✅ persist
      } catch (err) {
        console.error("MetaMask connection error:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectMetaMask = () => {
    setAccount(null);
    localStorage.removeItem("metamaskAccount"); // ✅ clear persistence
  };

  // ✅ Restore connection & listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem("metamaskAccount", accounts[0]);
        }
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        const acc = accounts[0] || null;
        setAccount(acc);
        if (acc) {
          localStorage.setItem("metamaskAccount", acc);
        } else {
          localStorage.removeItem("metamaskAccount");
        }
      });
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ Pass connect & disconnect to both */}
        <Route
          path="/add-complaint"
          element={
            <AddComplaintForm
              account={account}
              connectMetaMask={connectMetaMask}
              disconnectMetaMask={disconnectMetaMask}
            />
          }
        />

        <Route path="/oauth-redirect" element={<OAuthRedirect />} />

        <Route
          path="/dashboard"
          element={
            token && user?.role === "student" ? (
              <Dashboard
                account={account}
                connectMetaMask={connectMetaMask}
                disconnectMetaMask={disconnectMetaMask}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
  path="/lower-admin"
  element={
    token && user?.role === "lowerAdmin" ? (
      <LowerAdmin
        account={account}
        connectMetaMask={connectMetaMask}
        disconnectMetaMask={disconnectMetaMask}
      />
    ) : (
      <Navigate to="/" />
    )
  }
/>


        <Route
  path="/higher-admin"
  element={
    token && user?.role === "higherAdmin" ? (
      <HigherAdmin
        account={account}
        connectMetaMask={connectMetaMask}
        disconnectMetaMask={disconnectMetaMask}
      />
    ) : (
      <Navigate to="/" />
    )
  }
/>
  </Routes>
    </Router>
  );
}

export default App;
