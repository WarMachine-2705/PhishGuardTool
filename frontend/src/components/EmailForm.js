import React, { useState } from "react";
import axios from "axios";

const EmailForm = ({ onLogUpdate }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogUpdate("Starting phishing detection...");

        try {
            const response = await axios.post("http://localhost:5000/api/email/start", { email, password });
            onLogUpdate(response.data.message);
        } catch (error) {
            onLogUpdate("Error starting detection.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="App Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Run</button>
        </form>
    );
};

export default EmailForm;
