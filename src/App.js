import './App.css';
import "./styles/output.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Stacking from './pages/Stacking';
import Marketplace from './pages/Marketplace';
import Header from './components/Header';


function App() {
  return (
    <Router >
      <div className="min-h-screen bg-gradient-radial-custom -z-[1]">
        <div className="bg-[url('../images/background.png')] absolute inset-0  opacity-30"></div>
        <Header/>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="stacking" element={<Stacking />}/>
          <Route path="marketplace" element={<Marketplace />}/>
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
