import React from "react";
import Reco from "./components/Reco";

function App() {
  return (
    <div style={{ background: "#0f0f1a", minHeight: "100vh", padding: "24px" }}>
      <h2
        style={{ color: "#6c5ce7", marginBottom: "16px", textAlign: "center" }}
      >
        Reco
      </h2>
      <Reco />
    </div>
  );
}

export default App;
