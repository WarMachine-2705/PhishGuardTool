import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Terminal = ({ logs }) => {
    const terminalRef = useRef(null);
    
    useEffect(() => {
        socket.on("log", (message) => {
            if (logs && typeof logs.push === 'function') {
                logs.push(message);
            }
        });

        return () => {
            socket.off("log");
        };
    }, [logs]);
    
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div 
            ref={terminalRef}
            className="card-body bg-dark text-success p-3 font-monospace"
            style={{ height: "400px", overflowY: "auto" }}
        >
            {logs && logs.length > 0 ? (
                logs.map((log, index) => (
                    <div key={index} className="mb-1">
                        <span className="text-primary">{'>'}</span> {log}
                    </div>
                ))
            ) : (
                <div className="text-muted fst-italic">
                    Terminal ready. Connect your email to begin scanning...
                </div>
            )}
        </div>
    );
};

export default Terminal;