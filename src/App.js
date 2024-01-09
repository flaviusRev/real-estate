/** @format */

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PropertyDetail from "./pages/PropertyDetail";
import Layout from "./components/Layout";
import ChatWindow from "./components/ChatWindow";
import { BookedPropertiesProvider } from "./context/BookedPropertiesContext";

function App() {
  return (
    <Router>
      <BookedPropertiesProvider>
        <Layout>
          <div className="z-10">
            <ChatWindow />
          </div>
          <div className="z-0">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
            </Routes>
          </div>
        </Layout>
      </BookedPropertiesProvider>
    </Router>
  );
}

export default App;
