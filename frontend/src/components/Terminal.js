import React, { useEffect, useRef } from "react";
import { Monitor, Terminal as TerminalIcon, Activity } from 'lucide-react';

const Terminal = ({ logs }) => {
    const terminalBodyRef = useRef(null);

    // Auto-scroll to bottom when new logs are added
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [logs]);

    const styles = `
        .terminal-window {
            background: linear-gradient(135deg, 
                rgba(0, 0, 0, 0.95) 0%, 
                rgba(15, 23, 42, 0.95) 50%, 
                rgba(0, 0, 0, 0.95) 100%
            );
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 12px;
            backdrop-filter: blur(20px);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.5),
                0 0 20px rgba(0, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .terminal-window::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00f5ff, transparent);
            animation: scanLine 3s infinite;
        }
        
        @keyframes scanLine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .terminal-header {
            background: linear-gradient(135deg, 
                rgba(0, 255, 255, 0.1) 0%, 
                rgba(0, 0, 0, 0.8) 50%, 
                rgba(255, 0, 128, 0.1) 100%
            );
            padding: 1rem;
            border-radius: 12px 12px 0 0;
            border-bottom: 1px solid rgba(0, 255, 255, 0.2);
            backdrop-filter: blur(15px);
            position: relative;
        }
        
        .terminal-controls {
            display: flex;
            gap: 0.5rem;
        }
        
        .terminal-control {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .terminal-control::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }
        
        .terminal-control:hover::after {
            width: 100%;
            height: 100%;
        }
        
        .control-close {
            background: linear-gradient(135deg, #ff4757, #c44569);
        }
        
        .control-minimize {
            background: linear-gradient(135deg, #ffa726, #ff7043);
        }
        
        .control-maximize {
            background: linear-gradient(135deg, #66bb6a, #43a047);
        }
        
        .terminal-title {
            color: #00f5ff;
            font-weight: 600;
            text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 0.9rem;
        }
        
        .terminal-body {
            padding: 1.5rem;
            height: 400px;
            overflow-y: auto;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.6;
            background: rgba(0, 0, 0, 0.3);
        }
        
        .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: pulse 2s infinite;
            box-shadow: 0 0 15px currentColor;
        }
        
        @keyframes pulse {
            0%, 100% { 
                opacity: 1; 
                transform: scale(1);
                box-shadow: 0 0 15px currentColor;
            }
            50% { 
                opacity: 0.6; 
                transform: scale(1.3);
                box-shadow: 0 0 25px currentColor;
            }
        }
        
        .terminal-body::-webkit-scrollbar {
            width: 8px;
        }
        
        .terminal-body::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 4px;
        }
        
        .terminal-body::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #00f5ff, #0080ff);
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 245, 255, 0.3);
        }
        
        .terminal-body::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #00f5ff, #ff0080);
        }
        
        .terminal-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: rgba(255, 255, 255, 0.4);
        }
        
        .terminal-empty-icon {
            margin-bottom: 1rem;
            opacity: 0.3;
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .log-line {
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.5rem;
            animation: fadeIn 0.5s ease-in;
            transition: all 0.3s ease;
        }
        
        .log-line:hover {
            background: rgba(0, 255, 255, 0.05);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            margin: 0 -0.5rem 0.5rem -0.5rem;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .log-prompt {
            color: #00f5ff;
            font-weight: bold;
            margin-right: 0.75rem;
            flex-shrink: 0;
            text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
            animation: promptBlink 2s infinite;
        }
        
        @keyframes promptBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.7; }
        }
        
        .log-content {
            color: #ffffff;
            flex: 1;
            word-break: break-word;
        }
        
        .log-content.success {
            color: #00ff80;
            text-shadow: 0 0 5px rgba(0, 255, 128, 0.3);
        }
        
        .log-content.error {
            color: #ff0080;
            text-shadow: 0 0 5px rgba(255, 0, 128, 0.3);
        }
        
        .log-content.warning {
            color: #ffff00;
            text-shadow: 0 0 5px rgba(255, 255, 0, 0.3);
        }
        
        .log-content.info {
            color: #00f5ff;
            text-shadow: 0 0 5px rgba(0, 245, 255, 0.3);
        }
        
        .terminal-stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 1rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .activity-indicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .activity-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #00ff80;
            animation: activityPulse 1s infinite;
        }
        
        @keyframes activityPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        
        @media (max-width: 768px) {
            .terminal-body {
                height: 300px;
                padding: 1rem;
                font-size: 0.8rem;
            }
            
            .terminal-header {
                padding: 0.75rem;
            }
        }
    `;

    // Determine log type based on content
    const getLogType = (logText) => {
        if (logText.includes('✅') || logText.includes('successfully')) return 'success';
        if (logText.includes('❌') || logText.includes('Error')) return 'error';
        if (logText.includes('⚠️') || logText.includes('Warning')) return 'warning';
        if (logText.includes('🔍') || logText.includes('🔐') || logText.includes('🧠')) return 'info';
        return 'default';
    };

    return (
        <>
            <style>{styles}</style>
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="terminal-controls me-3">
                                <div className="terminal-control control-close"></div>
                                <div className="terminal-control control-minimize"></div>
                                <div className="terminal-control control-maximize"></div>
                            </div>
                            <div className="terminal-title d-flex align-items-center">
                                <TerminalIcon size={16} className="me-2" />
                                PhishGuard Terminal v3.0.1
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            {logs.length > 0 && (
                                <div className="activity-indicator me-3">
                                    <div className="activity-dot"></div>
                                    <span style={{fontSize: '0.75rem'}}>Active</span>
                                </div>
                            )}
                            <div className="status-indicator" style={{backgroundColor: '#00ff80'}}></div>
                        </div>
                    </div>
                </div>
                
                <div className="terminal-body" ref={terminalBodyRef}>
                    {logs.length === 0 ? (
                        <div className="terminal-empty">
                            <Monitor size={56} className="terminal-empty-icon" />
                            <p className="mb-2 fw-bold">Awaiting Scan Initialization...</p>
                            <small>Terminal output will appear here when scanning begins</small>
                            <div className="mt-3 d-flex align-items-center">
                                <Activity size={14} className="me-2" />
                                <span style={{fontSize: '0.7rem'}}>System Ready</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {logs.map((log, index) => {
                                const logType = getLogType(log);
                                return (
                                    <div key={index} className="log-line">
                                        <span className="log-prompt">phishguard@security:~$</span>
                                        <span className={`log-content ${logType}`}>{log}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                
                {logs.length > 0 && (
                    <div className="terminal-stats">
                        <span>Lines: {logs.length}</span>
                        <span>Status: Scanning</span>
                        <span>Uptime: {Math.floor(logs.length * 0.5)}s</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Terminal;