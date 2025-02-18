import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./components/ChatRoom";
import "./styles.css"; // Import the global styles

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
