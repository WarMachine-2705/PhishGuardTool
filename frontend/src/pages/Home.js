import React, { useState } from "react";
import EmailForm from "../components/EmailForm";
import Terminal from "../components/Terminal";

const Home = () => {
    const [logs, setLogs] = useState([]);

    const handleLogUpdate = (message) => {
        setLogs((prevLogs) => [...prevLogs, message]);
    };

    return (
        <div className="container">
            <h1>Phishing Email Detector</h1>
            <EmailForm onLogUpdate={handleLogUpdate} />
            <Terminal logs={logs} />
        </div>
    );
};

export default Home;
