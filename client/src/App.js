import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'


import Header from "./components/common/common-user/Header";

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
          </Routes>
        </div>
      </Router>
  );
}

export default App;