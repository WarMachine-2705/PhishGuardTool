import React, { useState } from 'react';
import { Shield, Menu, X, Zap } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', active: currentPage === 'home' },
        { id: 'phishguard', label: 'PhishGuard', active: currentPage === 'phishguard' },
        { id: 'about', label: 'About', active: currentPage === 'about' }
    ];

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const styles = `
        .cyber-navbar {
            background: rgba(0, 0, 0, 0.95) !important;
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(0, 255, 255, 0.3);
            box-shadow: 0 4px 30px rgba(0, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }

        .cyber-navbar::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00f5ff, transparent);
            animation: scanLine 4s infinite linear;
        }

        @keyframes scanLine {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .navbar-brand-cyber {
            color: #00f5ff !important;
            font-weight: 700;
            font-size: 1.5rem;
            text-shadow: 0 0 20px rgba(0, 245, 255, 0.8);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
        }

        .navbar-brand-cyber:hover {
            color: #ff0080 !important;
            text-shadow: 0 0 25px rgba(255, 0, 128, 0.8);
            transform: scale(1.05);
        }

        .brand-icon {
            filter: drop-shadow(0 0 15px #00f5ff);
            animation: shieldRotate 6s linear infinite;
        }

        @keyframes shieldRotate {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.1); }
            50% { transform: rotate(180deg) scale(1); }
            75% { transform: rotate(270deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }

        .cyber-nav-item {
            color: rgba(255, 255, 255, 0.8) !important;
            font-weight: 500;
            position: relative;
            transition: all 0.3s ease;
            margin: 0 1rem;
            text-decoration: none;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
        }

        .cyber-nav-item::before {
            content: '> ';
            opacity: 0;
            transition: opacity 0.3s ease;
            color: #00f5ff;
        }

        .cyber-nav-item:hover::before,
        .cyber-nav-item.active::before {
            opacity: 1;
        }

        .cyber-nav-item:hover {
            color: #00f5ff !important;
            text-shadow: 0 0 15px rgba(0, 245, 255, 0.8);
            transform: translateX(10px);
        }

        .cyber-nav-item.active {
            color: #00f5ff !important;
            text-shadow: 0 0 20px rgba(0, 245, 255, 1);
        }

        .cyber-nav-item::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #00f5ff, #ff0080);
            transition: width 0.3s ease;
        }

        .cyber-nav-item:hover::after,
        .cyber-nav-item.active::after {
            width: 100%;
        }

        .mobile-menu-toggle {
            background: transparent;
            border: 2px solid rgba(0, 255, 255, 0.3);
            color: #00f5ff;
            border-radius: 8px;
            padding: 0.5rem;
            transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
            border-color: #00f5ff;
            background: rgba(0, 255, 255, 0.1);
            box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
        }

        .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 255, 255, 0.2);
            border-top: none;
            transform: translateY(-10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .mobile-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .mobile-nav-item {
            display: block;
            color: rgba(255, 255, 255, 0.8) !important;
            padding: 1rem 2rem;
            border-bottom: 1px solid rgba(0, 255, 255, 0.1);
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .mobile-nav-item:hover,
        .mobile-nav-item.active {
            color: #00f5ff !important;
            background: rgba(0, 255, 255, 0.05);
            text-shadow: 0 0 10px rgba(0, 245, 255, 0.8);
            padding-left: 2.5rem;
        }

        .mobile-nav-item:hover::before,
        .mobile-nav-item.active::before {
            content: '>> ';
            color: #00f5ff;
        }

        .status-display {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            color: #00f5ff;
            font-family: 'JetBrains Mono', monospace;
            margin-left: 2rem;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #00ff80;
            box-shadow: 0 0 10px #00ff80;
            animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
        }

        @media (max-width: 768px) {
            .navbar-brand-cyber {
                font-size: 1.2rem;
            }
            
            .status-display {
                display: none;
            }
            
            .cyber-nav-item {
                margin: 0 0.5rem;
                font-size: 0.8rem;
            }
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <nav className="navbar navbar-expand-lg navbar-dark cyber-navbar sticky-top">
                <div className="container-fluid">
                    <a
                        href="#"
                        className="navbar-brand-cyber"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('home');
                        }}
                    >
                        <Shield size={24} className="brand-icon" />
                        PhishGuard.exe
                    </a>

                    {/* Status Display - Desktop Only */}
                    <div className="status-display d-none d-xl-flex">
                        <div className="status-dot"></div>
                        <span>SYSTEM ONLINE</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="d-none d-lg-flex align-items-center ms-auto">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href="#"
                                className={`cyber-nav-item ${item.active ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.id);
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle d-lg-none"
                        onClick={toggleMenu}
                        aria-label="Toggle navigation"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {/* Mobile Menu */}
                    <div className={`mobile-menu d-lg-none ${isMenuOpen ? 'active' : ''}`}>
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href="#"
                                className={`mobile-nav-item ${item.active ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.id);
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="mobile-nav-item" style={{ 
                            borderBottom: 'none', 
                            padding: '0.5rem 2rem',
                            fontSize: '0.7rem',
                            opacity: '0.7'
                        }}>
                            <div className="d-flex align-items-center gap-2">
                                <div className="status-dot" style={{ width: '6px', height: '6px' }}></div>
                                <span>SYSTEM ONLINE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;