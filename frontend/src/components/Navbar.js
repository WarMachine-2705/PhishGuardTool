import React from "react";
import { Shield } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "phishguard", label: "PhishGuard" },
    { id: "about", label: "About" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center">
          <Shield className="text-light me-2" size={28} />
          <span className="fw-bold">PhishGuard</span>
        </div>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map(item => (
              <li className="nav-item" key={item.id}>
                <button
                  data-page={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;