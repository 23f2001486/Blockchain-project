import React from "react";

const Home = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Home;
