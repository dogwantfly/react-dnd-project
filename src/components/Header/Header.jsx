import { NavLink, Link } from "react-router-dom";
import { useState } from 'react';
import './index.css';
import logo from '../../images/Logo.svg';


function Header({ item }) {
  const activeClassName = "text-xl text-dark-light bg-light p-4 lg:rounded-2xl font-bold before:translate-x-0 lg:before:content-[''] lg:before:block lg:before:absolute before:bg-light lg:before:p-4 lg:before:rounded-3xl lg:before:-z-[1] before:inset-0 relative  lg:before:transition-all active";
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // https://codepen.io/gcmznt/pen/KBegXZ?editors=0100
  return (

      <header className="z-10 sticky top-0  mb-[60px] pt-9 pb-2 items-center bg-dark/50">
        <div className="container flex justify-between">
          <Link to="/" className="lg:hidden">
            <img src={logo} alt="logo" />
          </Link>
          <button type="button" className="lg:hidden items-center justify-center p-2 rounded-lg text-white focus:outline-none" aria-controls="mobile-menu" aria-expanded="false" onClick={() => { setIsMenuOpen(true) }}>
            <span className="sr-only">Open main menu</span>
            <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className={`lg:w-full lg:flex lg:justify-between lg:items-center fixed right-0 top-0 lg:max-w-none lg:static transition-all ease-in-out bg-dark lg:bg-transparent overflow-hidden ${isMenuOpen ? 'max-w-full' : 'max-w-0'}`}data-menu>
            <button type="button" className="material-icons text-white absolute left-0 top-0 lg:hidden p-2" onClick={()=> { setIsMenuOpen(false) }}>
              close
            </button>
            <Link to="/" className="hidden lg:block">
              <img src={logo} alt="logo" />
            </Link>
            <div className="text-white font-bold flex lg:items-center lg:order-last flex-col lg:flex-row items-end p-4 lg:gap-x-6">
              <div className="bg-gradient-linear-custom material-icons rounded-full p-1 lg:px-2 lg:py-1 lg:text-3xl lg:leading-tight">
                credit_card
              </div>
              <div className="lg:text-xl">
                10,279 USD
                <div className="hidden lg:block opacity-70 font-light lg:text-base">i2j`mn2`21</div>
              </div>
              
            </div>
            <nav className="bg-dark rounded-none lg:rounded-2xl relative z-10">
              
              <ul className="lg:flex    overflow-hidden p-1">
                <li>
                  <NavLink exact="true" to="/" className={({ isActive }) =>
                  isActive ? activeClassName : "tab text-light p-4 font-bold before:content-[''] before:block before:absolute before:p-4 before:rounded-3xl before:-z-[1] before:inset-0 relative before:translate-x-full before:transition-all before:ease-in-out overflow-hidden text-xl"}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/stacking" className={({ isActive }) =>
                  isActive ? activeClassName : "tab text-light p-4 font-bold before:content-[''] before:block before:absolute before:p-4 before:rounded-3xl before:-z-[1] before:inset-0 relative before:translate-x-full before:transition-all before:ease-in-out overflow-hidden text-xl"}>
                    Stacking 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/marketplace" className={({ isActive }) =>
                  isActive ? activeClassName : "tab text-light p-4 font-bold before:content-[''] before:block before:absolute before:p-4 before:rounded-3xl before:-z-[1] before:inset-0 relative before:translate-x-full before:transition-all  before:ease-in-out overflow-hidden text-xl"}>
                    Marketplace
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  );
}

export default Header;
