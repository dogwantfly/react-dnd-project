import './App.css';
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
    <Router>
      <Header/>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="stacking" element={<Stacking />}/>
        <Route path="marketplace" element={<Marketplace />}/>
      </Routes>
    </Router>  
  );
}

export default App;
