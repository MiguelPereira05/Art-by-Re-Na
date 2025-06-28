import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import About from './components/pages/About';
import Gallery from './components/pages/Gallery';
import Admin from './components/pages/Admin';
import { useState, useEffect } from "react";

function App() {
  const [appLang, setAppLang] = useState(() => {
    return localStorage.getItem("appLang") ||
      navigator.language ||
      "en-US";
  });

  useEffect(() => {
    localStorage.setItem("appLang", appLang);
  }, [appLang]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage appLang={appLang} setAppLang={setAppLang} />} />
        <Route path="/about" element={<About appLang={appLang} setAppLang={setAppLang} />} />
        <Route path="/gallery" element={<Gallery appLang={appLang} setAppLang={setAppLang} />} />
        <Route path='/adminrena' element={<Admin appLang={appLang} setAppLang={setAppLang} />} />
      </Routes>
    </Router>
  )
}

export default App;
