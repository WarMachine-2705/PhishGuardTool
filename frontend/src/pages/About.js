import React, { useEffect, useRef } from "react";
import { Lock, Users, Cpu, Shield, Zap, Globe, Activity, Brain } from 'lucide-react';

const About = () => {
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
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = font_size + "px 'Courier New', monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.4 + 0.1})`;
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 40);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const features = [
        {
            title: "Neural AI Detection",
            description: "Advanced machine learning algorithms trained on millions of phishing attempts to identify sophisticated threats, zero-day attacks, and emerging attack vectors in real-time.",
            icon: Brain,
            stats: "99.7% Accuracy",
            color: "linear-gradient(135deg, #00f5ff, #0080ff)"
        },
        {
            title: "Quantum Encryption",
            description: "Military-grade end-to-end encryption ensures your email content remains completely private and secure throughout the entire scanning process.",
            icon: Lock,
            stats: "Zero Data Storage",
            color: "linear-gradient(135deg, #ff0080, #8000ff)"
        },
        {
            title: "Global Intelligence",
            description: "Real-time threat intelligence from a worldwide network of security researchers, cybersecurity analysts, and ethical hackers.",
            icon: Globe,
            stats: "1M+ Users Protected",
            color: "linear-gradient(135deg, #00ff80, #00ff00)"
        }
    ];

    const stats = [
        { icon: Activity, value: "24/7", label: "Active Monitoring", color: "#00f5ff" },
        { icon: Shield, value: "10M+", label: "Threats Blocked", color: "#ff0080" },
        { icon: Globe, value: "150+", label: "Countries Served", color: "#00ff80" },
        { icon: Zap, value: "99.9%", label: "System Uptime", color: "#8000ff" }
    ];

    const styles = `
        .about-container {
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
            opacity: 0.25;
        }
        
        .cyber-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, rgba(0,255,255,0.03) 0%, rgba(0,0,0,0.8) 70%);
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
            backdrop-filter: blur(20px);
            position: relative;
            overflow: hidden;
            margin: 1rem;
            border-radius: 20px;
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
                rgba(0, 255, 255, 0.12), 
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
            transform: translateY(-10px);
            border-color: rgba(0, 255, 255, 0.6);
            box-shadow: 
                0 30px 60px rgba(0, 255, 255, 0.15),
                0 0 40px rgba(0, 255, 255, 0.25),
                inset 0 0 40px rgba(0, 255, 255, 0.08);
        }
        
        .cyber-card:hover::before {
            opacity: 1;
        }
        
        .feature-icon {
            width: 70px;
            height: 70px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
            margin-bottom: 1.5rem;
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
        
        .stats-card {
            background: linear-gradient(135deg, 
                rgba(0, 255, 255, 0.05) 0%, 
                rgba(0, 0, 0, 0.9) 100%
            );
            border: 1px solid rgba(0, 255, 255, 0.2);
            backdrop-filter: blur(15px);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .stats-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, transparent, rgba(0, 255, 255, 0.05), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .stats-card:hover {
            border-color: rgba(0, 255, 255, 0.5);
            box-shadow: 0 15px 35px rgba(0, 255, 255, 0.1);
            transform: translateY(-5px);
        }
        
        .stats-card:hover::before {
            opacity: 1;
        }
        
        .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            text-shadow: 0 0 20px currentColor;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .mission-card {
            background: linear-gradient(135deg, 
                rgba(0, 255, 255, 0.06) 0%, 
                rgba(0, 0, 0, 0.95) 50%, 
                rgba(255, 0, 128, 0.06) 100%
            );
            border: 1px solid rgba(0, 255, 255, 0.3);
            backdrop-filter: blur(25px);
            position: relative;
            overflow: hidden;
        }
        
        .mission-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #00f5ff, #ff0080, #8000ff, #00f5ff);
            background-size: 200% 200%;
            animation: gradientFlow 3s linear infinite;
        }
        
        @keyframes gradientFlow {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin: 3rem 1rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 2rem 1rem;
        }
        
        .mission-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .feature-item {
            padding: 1.5rem;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(0, 255, 255, 0.15);
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .feature-item:hover {
            border-color: rgba(0, 255, 255, 0.4);
            background: rgba(0, 0, 0, 0.8);
        }
        
        .feature-emoji {
            font-size: 1.5rem;
            margin-right: 0.75rem;
            filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.3));
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
            background-size: 40px 40px;
            z-index: -1;
        }
        
        @media (max-width: 768px) {
            .feature-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
                margin: 2rem 0.5rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin: 1.5rem 0.5rem;
            }
            
            .hero-section {
                margin: 0.5rem;
                border-radius: 15px;
            }
            
            .stat-value {
                font-size: 2rem;
            }
            
            .mission-features {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }
        
        @media (max-width: 576px) {
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .stat-value {
                font-size: 1.8rem;
            }
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="about-container">
                <canvas ref={canvasRef} className="matrix-canvas" />
                <div className="cyber-overlay"></div>
                <div className="hacker-grid"></div>
                
                <div className="content-wrapper">
                    {/* Hero Section */}
                    <div className="hero-section py-5">
                        <div className="container-fluid py-4">
                            <div className="row justify-content-center text-center">
                                <div className="col-lg-10">
                                    <h1 className="display-2 fw-bold gradient-text mb-4">
                                        About PhishGuard.exe
                                    </h1>
                                    <p className="lead text-light mb-5" style={{
                                        maxWidth: '800px', 
                                        margin: '0 auto',
                                        textShadow: '0 0 10px rgba(255,255,255,0.3)',
                                        fontSize: '1.3rem'
                                    }}>
                                        Advanced AI-powered email security platform protecting organizations and individuals from sophisticated phishing attacks using cutting-edge quantum-resistant encryption and neural threat detection
                                    </p>
                                    
                                    {/* Stats Section */}
                                    <div className="stats-grid">
                                        {stats.map((stat, index) => {
                                            const IconComponent = stat.icon;
                                            return (
                                                <div key={index} className="stats-card rounded-3 p-4">
                                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                                        <IconComponent size={24} color={stat.color} />
                                                    </div>
                                                    <div className="stat-value" style={{color: stat.color}}>
                                                        {stat.value}
                                                    </div>
                                                    <div className="stat-label">{stat.label}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="container-fluid">
                        <div className="text-center mb-5">
                            <h2 className="display-4 fw-bold text-light mb-3">
                                <span className="text-cyber">CORE</span> SYSTEMS
                            </h2>
                            <p className="text-light" style={{
                                maxWidth: '700px', 
                                margin: '0 auto',
                                opacity: '0.8',
                                fontSize: '1.1rem'
                            }}>
                                Comprehensive email security powered by advanced machine learning, quantum encryption, and real-time global threat intelligence
                            </p>
                        </div>

                        <div className="feature-grid">
                            {features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div key={index} className="cyber-card rounded-3 p-4 h-100">
                                        <div className="d-flex justify-content-between align-items-start mb-4">
                                            <div className="feature-icon" style={{background: feature.color}}>
                                                <IconComponent size={32} color="white" />
                                            </div>
                                            <span className="badge rounded-pill px-3 py-2" style={{
                                                background: 'rgba(0, 255, 255, 0.15)', 
                                                color: '#00f5ff',
                                                fontSize: '0.8rem',
                                                border: '1px solid rgba(0, 255, 255, 0.3)'
                                            }}>
                                                {feature.stats}
                                            </span>
                                        </div>
                                        <h4 className="text-light mb-3 fw-bold" style={{fontSize: '1.4rem'}}>
                                            {feature.title}
                                        </h4>
                                        <p className="text-light mb-0" style={{
                                            opacity: '0.85',
                                            lineHeight: '1.6',
                                            fontSize: '0.95rem'
                                        }}>
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mission Statement */}
                        <div className="row justify-content-center" style={{margin: '4rem 1rem 2rem'}}>
                            <div className="col-lg-11">
                                <div className="mission-card rounded-3 p-5 text-center">
                                    <h3 className="text-light mb-4 fw-bold" style={{fontSize: '2rem'}}>
                                        Our <span className="text-cyber">Mission</span>
                                    </h3>
                                    <p className="lead text-light mb-5" style={{
                                        maxWidth: '900px',
                                        margin: '0 auto',
                                        fontSize: '1.2rem',
                                        opacity: '0.9'
                                    }}>
                                        To democratize enterprise-grade email security by making advanced phishing detection accessible to everyone, from individual users to large organizations, while maintaining absolute privacy and security standards.
                                    </p>
                                    
                                    <div className="mission-features">
                                        <div className="feature-item">
                                            <h5 className="text-light mb-3 d-flex align-items-center">
                                                <span className="feature-emoji">🛡️</span>
                                                Advanced Protection
                                            </h5>
                                            <p className="text-light small mb-0" style={{opacity: '0.8'}}>
                                                Our AI models are trained on the latest phishing techniques, including spear phishing, business email compromise, and sophisticated social engineering attacks using quantum-resistant algorithms.
                                            </p>
                                        </div>
                                        <div className="feature-item">
                                            <h5 className="text-light mb-3 d-flex align-items-center">
                                                <span className="feature-emoji">🔒</span>
                                                Privacy Guaranteed
                                            </h5>
                                            <p className="text-light small mb-0" style={{opacity: '0.8'}}>
                                                We believe security shouldn't come at the cost of privacy. All scanning happens in real-time using encrypted channels without storing or logging your email content on our servers.
                                            </p>
                                        </div>
                                        <div className="feature-item">
                                            <h5 className="text-light mb-3 d-flex align-items-center">
                                                <span className="feature-emoji">⚡</span>
                                                Real-time Analysis
                                            </h5>
                                            <p className="text-light small mb-0" style={{opacity: '0.8'}}>
                                                Instant threat detection with sub-second response times using distributed computing, ensuring you're protected the moment a malicious email arrives in your inbox.
                                            </p>
                                        </div>
                                        <div className="feature-item">
                                            <h5 className="text-light mb-3 d-flex align-items-center">
                                                <span className="feature-emoji">🌍</span>
                                                Global Intelligence
                                            </h5>
                                            <p className="text-light small mb-0" style={{opacity: '0.8'}}>
                                                Benefit from crowd-sourced threat intelligence gathered from security researchers, ethical hackers, and cybersecurity professionals worldwide through our encrypted threat-sharing network.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;