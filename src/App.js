import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import About from './Components/About';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('dark');

  // ✔ Fix incorrect background on first load
  useEffect(() => {
    if (mode === 'dark') {
      document.body.style.backgroundColor = '#83878bff';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, []);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#83878bff';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  return (
    <BrowserRouter>
      <Navbar title="Text Pilot" about="About" mode={mode} toggleMode={toggleMode} />
      
      <div className="container my-3">
        <Routes>
          <Route path="/" element={<TextForm heading="Enter text to explore Magic." mode={mode} />} />
          <Route path="/about" element={<About mode={mode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
