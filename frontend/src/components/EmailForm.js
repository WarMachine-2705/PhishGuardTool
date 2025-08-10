import React, { useState } from "react";
import { Mail, Key, Shield, Loader, Lock, Zap } from 'lucide-react';

const EmailForm = ({ onLogUpdate }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const styles = `
        .cyber-form-container {
            position: relative;
        }
        
        .form-group-cyber {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .form-label-cyber {
            color: #00f5ff !important;
            font-weight: 600;
            font-size: 0.9rem;
            text-shadow: 0 0 8px rgba(0, 245, 255, 0.4);
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
        }
        
        .input-group-cyber {
            position: relative;
            display: flex;
            border-radius: 8px;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(0, 255, 255, 0.3);
            transition: all 0.3s ease;
        }
        
        .input-group-cyber:hover {
            border-color: rgba(0, 255, 255, 0.5);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }
        
        .input-group-cyber:focus-within {
            border-color: #00f5ff;
            box-shadow: 
                0 0 0 0.25rem rgba(0, 245, 255, 0.15),
                0 0 20px rgba(0, 245, 255, 0.3);
        }
        
        .input-group-text-cyber {
            background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 0, 0, 0.8));
            border: none;
            color: #00f5ff;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 50px;
            border-right: 1px solid rgba(0, 255, 255, 0.2);
        }
        
        .form-control-cyber {
            background: rgba(0, 0, 0, 0.6) !important;
            border: none !important;
            color: #ffffff !important;
            padding: 1rem 1.25rem;
            font-size: 0.9rem;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            transition: all 0.3s ease;
        }
        
        .form-control-cyber:focus {
            background: rgba(0, 0, 0, 0.8) !important;
            color: #ffffff !important;
            box-shadow: none !important;
            outline: none !important;
        }
        
        .form-control-cyber::placeholder {
            color: rgba(255, 255, 255, 0.4) !important;
            font-style: italic;
        }
        
        .btn-cyber {
            background: linear-gradient(135deg, #00f5ff, #0080ff, #8000ff) !important;
            border: none !important;
            color: #000000 !important;
            font-weight: 700;
            font-size: 1rem;
            padding: 1rem 2rem;
            border-radius: 8px;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
        }
        
        .btn-cyber::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
        }
        
        .btn-cyber:hover {
            background: linear-gradient(135deg, #0080ff, #8000ff, #ff0080) !important;
            color: #ffffff !important;
            transform: translateY(-3px);
            box-shadow: 
                0 15px 35px rgba(0, 245, 255, 0.4),
                0 0 30px rgba(0, 245, 255, 0.3);
        }
        
        .btn-cyber:hover::before {
            left: 100%;
        }
        
        .btn-cyber:active {
            transform: translateY(-1px);
        }
        
        .btn-cyber:disabled {
            background: rgba(108, 117, 125, 0.8) !important;
            color: rgba(255, 255, 255, 0.6) !important;
            transform: none !important;
            box-shadow: none !important;
            cursor: not-allowed;
        }
        
        .btn-cyber:disabled::before {
            display: none;
        }
        
        .loading-spinner {
            animation: spin 1s linear infinite;
            filter: drop-shadow(0 0 8px currentColor);
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .form-floating-cyber {
            position: relative;
        }
        
        .form-floating-cyber .form-control-cyber:focus ~ .floating-label,
        .form-floating-cyber .form-control-cyber:not(:placeholder-shown) ~ .floating-label {
            transform: translateY(-1.5rem) scale(0.8);
            color: #00f5ff;
        }
        
        .floating-label {
            position: absolute;
            top: 50%;
            left: 3.5rem;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.9rem;
            pointer-events: none;
            transition: all 0.3s ease;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .security-indicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .security-level {
            padding: 0.25rem 0.75rem;
            background: rgba(0, 255, 128, 0.1);
            border: 1px solid rgba(0, 255, 128, 0.3);
            border-radius: 20px;
            color: #00ff80;
            font-weight: 600;
        }
        
        .scan-progress {
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(0, 255, 255, 0.2);
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        
        .progress-bar-cyber {
            height: 4px;
            background: rgba(0, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            position: relative;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00f5ff, #0080ff, #8000ff);
            border-radius: 2px;
            position: relative;
            animation: progressGlow 2s ease-in-out infinite;
        }
        
        @keyframes progressGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(0, 245, 255, 0.5); }
            50% { box-shadow: 0 0 20px rgba(0, 245, 255, 0.8); }
        }
        
        .form-hint {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .btn-cyber {
                font-size: 0.9rem;
                padding: 0.875rem 1.5rem;
            }
            
            .form-control-cyber {
                padding: 0.875rem 1rem;
                font-size: 0.85rem;
            }
            
            .input-group-text-cyber {
                padding: 0.875rem;
                min-width: 45px;
            }
        }
    `;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Enhanced logging sequence
        onLogUpdate("🚀 Initializing PhishGuard security protocols...");
        await new Promise(resolve => setTimeout(resolve, 800));
        
        onLogUpdate("🔐 Establishing encrypted connection tunnel...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onLogUpdate("🛡️ Verifying authentication credentials...");
        await new Promise(resolve => setTimeout(resolve, 700));

        try {
            onLogUpdate("✅ Secure connection established");
            await new Promise(resolve => setTimeout(resolve, 500));
            
            onLogUpdate("🔍 Scanning inbox for malicious patterns...");
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            onLogUpdate("🧠 AI neural network analyzing email structures...");
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            onLogUpdate("🔬 Deep content analysis in progress...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            onLogUpdate("📊 Generating comprehensive threat assessment...");
            await new Promise(resolve => setTimeout(resolve, 800));
            
            onLogUpdate("🎯 Cross-referencing global threat database...");
            await new Promise(resolve => setTimeout(resolve, 900));
            
            onLogUpdate("✅ Security scan completed successfully");
            onLogUpdate("📋 Report generated - No threats detected");
            
        } catch (error) {
            onLogUpdate("❌ Connection failed - Please verify credentials");
            onLogUpdate("💡 Tip: Ensure app password is correctly generated");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>{styles}</style>
            <div className="cyber-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group-cyber">
                        <label className="form-label-cyber">
                            <Mail size={16} className="me-2" />
                            Email Address
                        </label>
                        <div className="input-group-cyber">
                            <span className="input-group-text-cyber">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                className="form-control-cyber flex-fill"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-hint">
                            <Lock size={12} />
                            <span>Encrypted with AES-256 protocol</span>
                        </div>
                    </div>
                    
                    <div className="form-group-cyber">
                        <label className="form-label-cyber">
                            <Key size={16} className="me-2" />
                            App Password
                        </label>
                        <div className="input-group-cyber">
                            <span className="input-group-text-cyber">
                                <Key size={18} />
                            </span>
                            <input
                                type="password"
                                className="form-control-cyber flex-fill"
                                placeholder="Enter your app-specific password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="security-indicator">
                            <div className="security-level">
                                <Shield size={12} className="me-1" />
                                Military Grade Security
                            </div>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn btn-cyber w-100 d-flex align-items-center justify-content-center ${
                            isLoading ? 'btn-secondary' : ''
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader size={20} className="me-2 loading-spinner" />
                                <span>Executing Scan...</span>
                            </>
                        ) : (
                            <>
                                <Zap size={20} className="me-2" />
                                <span>Initialize Security Scan</span>
                            </>
                        )}
                    </button>
                    
                    {isLoading && (
                        <div className="scan-progress">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <small className="text-light fw-medium">Scanning Progress</small>
                                <small className="text-cyber">Active</small>
                            </div>
                            <div className="progress-bar-cyber">
                                <div className="progress-fill" style={{width: '100%', animation: 'progressGlow 2s ease-in-out infinite'}}></div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default EmailForm;