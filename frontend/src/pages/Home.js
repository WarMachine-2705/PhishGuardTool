import React, { useEffect, useRef } from "react";
import { Shield, Mail, Eye, CheckCircle, Lock, Zap, Globe } from 'lucide-react';

const Home = ({ setCurrentPage }) => {
    const canvasRef = useRef(null);

    // Matrix-style digital rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|";
        const matrix = chars.split("");

        const font_size = 14;
        const columns = canvas.width / font_size;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            // Black BG with slight transparency for fade effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0ff"; // Cyan color
            ctx.font = font_size + "px 'Courier New', monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.2})`;
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 35);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const steps = [
        {
            id: 1,
            title: "Connect Your Email",
            description: "Securely scan your inbox using advanced encryption protocols to detect potential threats.",
            icon: Mail,
            color: "linear-gradient(135deg, #00f5ff, #0080ff)"
        },
        {
            id: 2,
            title: "AI Threat Analysis",
            description: "Neural networks analyze email patterns, malicious payloads, and suspicious behaviors in real-time.",
            icon: Eye,
            color: "linear-gradient(135deg, #ff0080, #8000ff)"
        },
        {
            id: 3,
            title: "Secure & Protected",
            description: "Get comprehensive security reports with actionable intelligence to fortify your digital perimeter.",
            icon: CheckCircle,
            color: "linear-gradient(135deg, #00ff80, #00ff00)"
        }
    ];

    const securityFeatures = [
        { icon: Lock, text: "256-bit Encryption", color: "#00f5ff" },
        { icon: Zap, text: "Real-time Monitoring", color: "#ff0080" },
        { icon: Globe, text: "Global Threat Intel", color: "#00ff80" }
    ];

    // Custom styles for cyber theme
    const styles = `
        .cyber-home-container {
            position: relative;
            min-height: 100vh;
            background: #000;
            overflow-x: hidden;
        }
        
        .matrix-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.3;
        }
        
        .cyber-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, rgba(0,255,255,0.03) 0%, rgba(0,0,0,0.7) 70%);
            z-index: 0;
        }
        
        .content-wrapper {
            position: relative;
            z-index: 1;
        }
        
        .hero-section {
            background: linear-gradient(135deg, 
                rgba(0, 245, 255, 0.05) 0%, 
                rgba(128, 0, 255, 0.05) 50%, 
                rgba(255, 0, 128, 0.05) 100%
            );
            border: 1px solid rgba(0, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
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
                rgba(0, 255, 255, 0.1), 
                transparent
            );
            animation: scan 3s infinite;
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
                rgba(0, 255, 255, 0.05) 0%, 
                rgba(0, 0, 0, 0.8) 50%, 
                rgba(255, 0, 128, 0.05) 100%
            );
            backdrop-filter: blur(15px);
            border: 1px solid rgba(0, 255, 255, 0.2);
            transition: all 0.3s ease;
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
            transition: opacity 0.3s ease;
        }
        
        .cyber-card:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 255, 0.6);
            box-shadow: 
                0 20px 40px rgba(0, 255, 255, 0.1),
                0 0 20px rgba(0, 255, 255, 0.2),
                inset 0 0 20px rgba(0, 255, 255, 0.05);
        }
        
        .cyber-card:hover::before {
            opacity: 1;
        }
        
        .feature-icon {
            width: 70px;
            height: 70px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
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
        
        .shield-glow {
            filter: drop-shadow(0 0 30px #00f5ff);
            animation: shieldPulse 2s ease-in-out infinite;
        }
        
        @keyframes shieldPulse {
            0%, 100% { filter: drop-shadow(0 0 30px #00f5ff); }
            50% { filter: drop-shadow(0 0 50px #00f5ff) drop-shadow(0 0 70px #0080ff); }
        }
        
        .text-cyber {
            color: #00f5ff !important;
            text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
        }
        
        .text-cyber-pink {
            color: #ff0080 !important;
            text-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
        }
        
        .text-cyber-green {
            color: #00ff80 !important;
            text-shadow: 0 0 10px rgba(0, 255, 128, 0.5);
        }
        
        .cyber-badge {
            background: rgba(0, 0, 0, 0.6) !important;
            border: 1px solid rgba(0, 255, 255, 0.3) !important;
            backdrop-filter: blur(10px);
        }
        
        .cyber-number {
            color: #00f5ff;
            text-shadow: 0 0 15px #00f5ff;
            font-family: 'Courier New', monospace;
        }
        
        .glitch-text {
            position: relative;
            display: inline-block;
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
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(0, 255, 255, 0.2);
            border-radius: 25px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .security-feature:hover {
            border-color: rgba(0, 255, 255, 0.6);
            box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
        }
        
        .hacker-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: -1;
        }

        .bg-dark{
            background-color: #000000 !important;
        }
        
        .cyber-btn {
            background: linear-gradient(135deg, #00f5ff, #0080ff, #8000ff);
            border: 2px solid rgba(0, 255, 255, 0.3);
            color: white;
            font-weight: bold;
            font-family: 'Courier New', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 
                0 0 20px rgba(0, 255, 255, 0.3),
                inset 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .cyber-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.3), 
                transparent
            );
            transition: left 0.5s;
        }
        
        .cyber-btn:hover {
            transform: translateY(-2px);
            border-color: rgba(0, 255, 255, 0.8);
            box-shadow: 
                0 10px 30px rgba(0, 255, 255, 0.4),
                0 0 30px rgba(0, 255, 255, 0.6),
                inset 0 0 30px rgba(255, 255, 255, 0.2);
            color: white;
        }
        
        .cyber-btn:hover::before {
            left: 100%;
        }
        
        .cyber-btn:active {
            transform: translateY(0);
            box-shadow: 
                0 5px 15px rgba(0, 255, 255, 0.3),
                0 0 20px rgba(0, 255, 255, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.1);
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="cyber-home-container">
                <canvas ref={canvasRef} className="matrix-canvas" />
                <div className="cyber-overlay"></div>
                <div className="hacker-grid"></div>
                
                <div className="content-wrapper">
                    {/* Hero Section */}
                    <div className="hero-section py-5 mb-5 rounded-3 mx-3">
                        <div className="container py-5">
                            <div className="row justify-content-center text-center">
                                <div className="col-lg-10">
                                    <div className="mb-5 position-relative">
                                        <div className="feature-icon mx-auto mb-4" style={{
                                            width: '120px', 
                                            height: '120px',
                                            background: 'linear-gradient(135deg, #00f5ff, #0080ff, #8000ff)'
                                        }}>
                                            <Shield size={60} color="white" className="shield-glow" />
                                        </div>
                                    </div>
                                    <h1 className="display-2 fw-bold gradient-text mb-4 glitch-text">
                                        PhishGuard.exe
                                    </h1>
                                    <p className="lead text-light mb-4" style={{
                                        maxWidth: '700px', 
                                        margin: '0 auto',
                                        textShadow: '0 0 10px rgba(255,255,255,0.3)'
                                    }}>
                                        Advanced AI-powered email security system with quantum-encrypted threat detection protocols
                                    </p>
                                    
                                    <div className="security-features">
                                        {securityFeatures.map((feature, index) => {
                                            const IconComponent = feature.icon;
                                            return (
                                                <div key={index} className="security-feature">
                                                    <IconComponent size={20} color={feature.color} />
                                                    <span className="text-light small">{feature.text}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                                        <div className="d-flex align-items-center cyber-badge px-3 py-2 rounded-pill">
                                            <div className="status-indicator me-2" style={{backgroundColor: '#00ff80'}}></div>
                                            <small className="text-light">System Online</small>
                                        </div>
                                        <div className="d-flex align-items-center cyber-badge px-3 py-2 rounded-pill">
                                            <div className="status-indicator me-2" style={{backgroundColor: '#00f5ff'}}></div>
                                            <small className="text-light">Neural Network Active</small>
                                        </div>
                                        <div className="d-flex align-items-center cyber-badge px-3 py-2 rounded-pill">
                                            <div className="status-indicator me-2" style={{backgroundColor: '#ff0080'}}></div>
                                            <small className="text-light">Threat Detection: ON</small>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <button 
                                            className="cyber-btn btn-lg px-5 py-3 me-3 mb-3"
                                            onClick={() => setCurrentPage('phishguard')}
                                        >
                                            <Shield size={24} className="me-2" />
                                            ACTIVATE PHISHGUARD
                                        </button>
                                        <div className="d-block">
                                            <small className="text-light" style={{opacity: '0.7'}}>
                                                Initialize secure email scanning protocol
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="container py-5">
                        <div className="text-center mb-5">
                            <h2 className="display-4 fw-bold text-light mb-3">
                                <span className="text-cyber">SECURITY</span> PROTOCOL
                            </h2>
                            <p className="text-light" style={{
                                maxWidth: '600px', 
                                margin: '0 auto',
                                opacity: '0.8'
                            }}>
                                Three-layer defense system for comprehensive email threat neutralization
                            </p>
                        </div>
                        
                        <div className="row g-4">
                            {steps.map((step, index) => {
                                const IconComponent = step.icon;
                                return (
                                    <div key={step.id} className="col-md-4">
                                        <div className="cyber-card rounded-3 p-4 h-100">
                                            <div className="text-center">
                                                <div className="feature-icon" style={{background: step.color}}>
                                                    <IconComponent size={32} color="white" />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center mb-3">
                                                    <span className="display-5 fw-bold me-3 cyber-number">
                                                        {String(step.id).padStart(2, '0')}
                                                    </span>
                                                    <h4 className="text-light mb-0">
                                                        {step.title}
                                                    </h4>
                                                </div>
                                                <p className="text-light" style={{opacity: '0.8'}}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;