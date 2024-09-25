import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,Routes,
  Route,
  Link
} from "react-router-dom";

import MainDash from './pages/MainDash';
import LandingPage from './components/LandingPage'
import InteractiveMap from './components/InterativeMap';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<MainDash />} path="/dashboard/*" />
        </Routes>
      </Router>
    </>
  );
}

export default App
