import React, { useState, useEffect, useRef } from "react";
import { Mail, Monitor, AlertTriangle, Lock, Shield, Zap, Activity, Globe } from 'lucide-react';
import EmailForm from "../components/EmailForm";
import Terminal from "../components/Terminal";

const PhishguardPage = () => {
    const [logs, setLogs] = useState([]);
    const canvasRef = useRef(null);

    // Matrix-style digital rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|";
        const matrix = chars.split("");
        const font_size = 12;
        const columns = canvas.width / font_size;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = font_size + "px 'Courier New', monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.3 + 0.1})`;
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const handleLogUpdate = (message) => {
        setLogs((prevLogs) => [...prevLogs, message]);
    };

    const securityFeatures = [
        { icon: Activity, text: "Real-time Analysis", color: "#00f5ff" },
        { icon: Shield, text: "Threat Protection", color: "#00ff80" },
        { icon: Globe, text: "Global Intel", color: "#ff0080" }
    ];

    const styles = `
        .phishguard-container {
            position: relative;
            min-height: 100vh;
            background: #000000;
            overflow-x: hidden;
        }

        .bg-dark{
            background-color: #000000 !important;
        }
        
        .matrix-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.2;
        }
        
        .cyber-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, rgba(0,255,255,0.02) 0%, rgba(0,0,0,0.8) 70%);
            z-index: 0;
        }
        
        .content-wrapper {
            position: relative;
            z-index: 1;
        }
        
        .hero-section {
            background: linear-gradient(135deg, 
                rgba(0, 245, 255, 0.08) 0%, 
                rgba(128, 0, 255, 0.05) 50%, 
                rgba(255, 0, 128, 0.08) 100%
            );
            border: 1px solid rgba(0, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            position: relative;
            overflow: hidden;
            margin: 1rem;
            border-radius: 15px;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(0, 255, 255, 0.15), 
                transparent
            );
            animation: scan 4s infinite;
        }
        
        @keyframes scan {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .gradient-text {
            background: linear-gradient(135deg, 
                #00f5ff 0%, 
                #ffffff 25%, 
                #ff0080 50%, 
                #8000ff 75%, 
                #00f5ff 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .cyber-card {
            background: linear-gradient(135deg, 
                rgba(0, 255, 255, 0.08) 0%, 
                rgba(0, 0, 0, 0.9) 50%, 
                rgba(255, 0, 128, 0.08) 100%
            );
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 255, 255, 0.25);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }
        
        .cyber-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00f5ff, transparent);
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        
        .cyber-card:hover {
            transform: translateY(-8px);
            border-color: rgba(0, 255, 255, 0.6);
            box-shadow: 
                0 25px 50px rgba(0, 255, 255, 0.15),
                0 0 30px rgba(0, 255, 255, 0.25),
                inset 0 0 30px rgba(0, 255, 255, 0.08);
        }
        
        .cyber-card:hover::before {
            opacity: 1;
        }
        
        .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .feature-icon::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: rotate(45deg);
            transition: all 0.6s;
        }
        
        .cyber-card:hover .feature-icon::after {
            animation: shine 0.6s ease-in-out;
        }
        
        @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        .scanner-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 2rem;
            margin: 2rem;
        }
        
        @media (max-width: 991.98px) {
            .scanner-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
                margin: 1rem;
            }
            
            .hero-section {
                margin: 0.5rem;
            }
        }
        
        .security-notice {
            background: rgba(255, 193, 7, 0.08);
            border: 1px solid rgba(255, 193, 7, 0.3);
            backdrop-filter: blur(10px);
        }
        
        .setup-guide {
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(0, 255, 255, 0.2);
            backdrop-filter: blur(15px);
        }
        
        .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: pulse 2s infinite;
            box-shadow: 0 0 10px currentColor;
        }
        
        @keyframes pulse {
            0%, 100% { 
                opacity: 1; 
                transform: scale(1);
            }
            50% { 
                opacity: 0.6; 
                transform: scale(1.2);
            }
        }
        
        .cyber-badge {
            background: rgba(0, 0, 0, 0.8) !important;
            border: 1px solid rgba(0, 255, 255, 0.3) !important;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .cyber-badge:hover {
            border-color: rgba(0, 255, 255, 0.6) !important;
            box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .stat-card {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(0, 255, 255, 0.2);
            backdrop-filter: blur(15px);
            transition: all 0.3s ease;
        }
        
        .stat-card:hover {
            border-color: rgba(0, 255, 255, 0.5);
            box-shadow: 0 10px 25px rgba(0, 255, 255, 0.1);
        }
        
        .security-features {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin: 2rem 0;
        }
        
        .security-feature {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(0, 255, 255, 0.2);
            border-radius: 25px;
            backdrop-filter: blur(15px);
            transition: all 0.3s ease;
        }
        
        .security-feature:hover {
            border-color: rgba(0, 255, 255, 0.6);
            box-shadow: 0 8px 20px rgba(0, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .hacker-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 30px 30px;
            z-index: -1;
        }
        
        @media (max-width: 768px) {
            .security-features {
                flex-direction: column;
                align-items: center;
            }
            
            .security-feature {
                width: 100%;
                max-width: 280px;
                justify-content: center;
            }
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="phishguard-container">
                <canvas ref={canvasRef} className="matrix-canvas" />
                <div className="cyber-overlay"></div>
                <div className="hacker-grid"></div>
                
                <div className="content-wrapper">
                    {/* Hero Section */}
                    <div className="hero-section py-4">
                        <div className="container-fluid">
                            <div className="text-center py-4">
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <div className="feature-icon me-3" style={{
                                        background: 'linear-gradient(135deg, #00f5ff, #0080ff, #8000ff)',
                                        width: '80px',
                                        height: '80px'
                                    }}>
                                        <Shield size={36} color="white" />
                                    </div>
                                    <h1 className="display-3 fw-bold gradient-text mb-0">
                                        PhishGuard.Scanner
                                    </h1>
                                </div>
                                <p className="lead text-light mb-4" style={{
                                    maxWidth: '700px', 
                                    margin: '0 auto',
                                    textShadow: '0 0 10px rgba(255,255,255,0.3)'
                                }}>
                                    Advanced AI-powered threat detection system with real-time email security analysis
                                </p>
                                
                                <div className="security-features">
                                    {securityFeatures.map((feature, index) => {
                                        const IconComponent = feature.icon;
                                        return (
                                            <div key={index} className="security-feature">
                                                <IconComponent size={18} color={feature.color} />
                                                <span className="text-light small fw-medium">{feature.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {/* Status Indicators */}
                                <div className="d-flex flex-wrap justify-content-center gap-3">
                                    <div className="d-flex align-items-center cyber-badge px-3 py-2 rounded-pill">
                                        <div className="status-indicator me-2" style={{backgroundColor: '#00ff80'}}></div>
                                        <small className="text-light fw-medium">Scanner Online</small>
                                    </div>
                                    <div className="d-flex align-items-center cyber-badge px-3 py-2 rounded-pill">
                                        <div className="status-indicator me-2" style={{backgroundColor: '#00f5ff'}}></div>
                                        <small className="text-light fw-medium">AI Models Loaded</small>
                                    </div>
                                    <div className="d-flex align-items-center cyber-badge px-3 py-2 rounded-pill">
                                        <div className="status-indicator me-2" style={{backgroundColor: '#ff0080'}}></div>
                                        <small className="text-light fw-medium">Threat DB Updated</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Scanner Interface */}
                    <div className="scanner-grid">
                        {/* Email Connection Panel */}
                        <div>
                            <div className="cyber-card rounded-3 p-4 h-100">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="feature-icon me-3" style={{
                                        background: 'linear-gradient(135deg, #00f5ff, #0080ff)',
                                        width: '50px',
                                        height: '50px'
                                    }}>
                                        <Mail size={24} color="white" />
                                    </div>
                                    <h3 className="text-light mb-0 fw-bold">Connect Email</h3>
                                </div>
                                
                                {/* Security Notice */}
                                <div className="security-notice rounded-3 p-3 mb-4">
                                    <div className="d-flex align-items-start">
                                        <AlertTriangle size={20} className="text-warning me-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <h6 className="text-warning mb-2 fw-bold">Security Protocol</h6>
                                            <p className="small text-light mb-0" style={{opacity: '0.9'}}>
                                                Military-grade encryption ensures your credentials remain secure. 
                                                All scanning operations are performed in isolated environments with zero data retention.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Email Form */}
                                <EmailForm onLogUpdate={handleLogUpdate} />
                                
                                {/* Setup Guide */}
                                <div className="setup-guide rounded-3 p-3 mt-4">
                                    <h6 className="text-light mb-3 d-flex align-items-center">
                                        <Lock size={16} className="me-2 text-cyber" />
                                        App Password Setup Protocol
                                    </h6>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="small text-light" style={{opacity: '0.8'}}>
                                                <div className="d-flex align-items-start mb-2">
                                                    <span className="badge me-2 mt-1" style={{
                                                        background: 'linear-gradient(135deg, #00f5ff, #0080ff)',
                                                        color: '#000'
                                                    }}>01</span>
                                                    <span>Enable 2-Factor Authentication on your email account</span>
                                                </div>
                                                <div className="d-flex align-items-start mb-2">
                                                    <span className="badge me-2 mt-1" style={{
                                                        background: 'linear-gradient(135deg, #00f5ff, #0080ff)',
                                                        color: '#000'
                                                    }}>02</span>
                                                    <span>Navigate to your account's security settings</span>
                                                </div>
                                                <div className="d-flex align-items-start">
                                                    <span className="badge me-2 mt-1" style={{
                                                        background: 'linear-gradient(135deg, #00f5ff, #0080ff)',
                                                        color: '#000'
                                                    }}>03</span>
                                                    <span>Generate a new app password specifically for PhishGuard</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Supported Providers */}
                                <div className="mt-4">
                                    <h6 className="text-light mb-3">✅ Supported Email Providers</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {['Gmail', 'Outlook', 'Yahoo', 'ProtonMail', 'iCloud', 'Others'].map((provider, index) => (
                                            <span key={index} className="badge px-3 py-2" style={{
                                                background: 'rgba(0, 255, 255, 0.1)',
                                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                                color: '#00f5ff'
                                            }}>{provider}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Terminal Results Panel */}
                        <div>
                            <div className="d-flex align-items-center mb-3">
                                <div className="feature-icon me-3" style={{
                                    background: 'linear-gradient(135deg, #00ff80, #00ff00)',
                                    width: '50px',
                                    height: '50px'
                                }}>
                                    <Monitor size={24} color="white" />
                                </div>
                                <h3 className="text-light mb-0 fw-bold">Scan Results</h3>
                                {logs.length > 0 && (
                                    <div className="ms-auto d-flex align-items-center">
                                        <div className="status-indicator me-2" style={{backgroundColor: '#00ff80'}}></div>
                                        <small className="text-light fw-medium">Active Scan</small>
                                    </div>
                                )}
                            </div>
                            
                            <Terminal logs={logs} />
                            
                            {/* Scan Statistics */}
                            {logs.length > 0 && (
                                <div className="stats-grid mt-3">
                                    <div className="stat-card rounded-3 p-3 text-center">
                                        <div className="h4 mb-1 fw-bold text-cyber">0</div>
                                        <small className="text-light" style={{opacity: '0.8'}}>Threats Found</small>
                                    </div>
                                    <div className="stat-card rounded-3 p-3 text-center">
                                        <div className="h4 mb-1 fw-bold text-cyber-pink">0</div>
                                        <small className="text-light" style={{opacity: '0.8'}}>Emails Scanned</small>
                                    </div>
                                    <div className="stat-card rounded-3 p-3 text-center">
                                        <div className="h4 mb-1 fw-bold text-cyber-green">0</div>
                                        <small className="text-light" style={{opacity: '0.8'}}>Suspicious Links</small>
                                    </div>
                                    <div className="stat-card rounded-3 p-3 text-center">
                                        <div className="h4 mb-1 fw-bold" style={{color: '#8000ff'}}>0</div>
                                        <small className="text-light" style={{opacity: '0.8'}}>Quarantined</small>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhishguardPage;