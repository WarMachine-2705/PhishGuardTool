import React from "react";
import { Shield, Mail, AlertTriangle, CheckCircle } from "lucide-react";

const Home = () => {
  const steps = [
    {
      id: 1,
      title: "Connect Your Email",
      description: "Enter your email and app password to securely scan your inbox.",
      icon: <Mail size={32} className="text-primary" />
    },
    {
      id: 2,
      title: "Smart Detection",
      description: "Our algorithm analyzes emails for common phishing patterns and suspicious links.",
      icon: <AlertTriangle size={32} className="text-warning" />
    },
    {
      id: 3,
      title: "Stay Protected",
      description: "Get detailed reports about potential threats in your inbox.",
      icon: <CheckCircle size={32} className="text-success" />
    }
  ];

  return (
    <div className="container pt-4">
      {/* Hero section */}
      <div className="text-center mb-5">
        <div className="d-flex justify-content-center mb-4">
          <Shield size={72} className="text-primary" />
        </div>
        <h1 className="display-4 fw-bold mb-3">Welcome to PhishGuard</h1>
        <p className="lead text-light-emphasis col-md-8 mx-auto">
          Protect your inbox from phishing attempts with our advanced detection system.
          Stay one step ahead of scammers with real-time email scanning.
        </p>
      </div>

      {/* Steps section */}
      <div className="mb-5">
        <h2 className="text-center fw-bold mb-4">How It Works</h2>
        <div className="row g-4">
          {steps.map(step => (
            <div key={step.id} className="col-md-4">
              <div className="card h-100 bg-dark border-primary shadow">
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center mb-3">
                    {step.icon}
                  </div>
                  <h3 className="card-title h5 fw-bold">{step.title}</h3>
                  <p className="card-text text-light-emphasis">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="card bg-primary text-white text-center mb-4">
        <div className="card-body py-4">
          <h2 className="card-title fw-bold mb-3">Ready to protect your inbox?</h2>
          <p className="card-text mb-4">
            Start scanning your emails for potential phishing attempts today.
          </p>
          <button 
            className="btn btn-light btn-lg fw-semibold"
            onClick={() => document.querySelector('button[data-page="phishguard"]')?.click()}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;