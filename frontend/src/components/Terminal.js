import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Terminal = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        socket.on("log", (message) => {
            setLogs((prevLogs) => [...prevLogs, message]);
        });

        return () => {
            socket.off("log");
        };
    }, []);

    return (
        <div style={{ backgroundColor: "black", color: "lime", padding: "10px", height: "400px", overflowY: "scroll" }}>
            {logs.map((log, index) => (
                <div key={index}>{log}</div>
            ))}
        </div>
    );
};

export default Terminal;
