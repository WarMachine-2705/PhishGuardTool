import React from "react";
import { Shield, Users, Code, Lock } from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Advanced Detection",
      description: "Our algorithm uses machine learning to identify phishing patterns in emails.",
      icon: <Code size={32} className="text-primary" />
    },
    {
      title: "Privacy First",
      description: "Your email content remains private and secure throughout the scanning process.",
      icon: <Lock size={32} className="text-primary" />
    },
    {
      title: "Community Driven",
      description: "Benefit from a constantly updated database of known phishing techniques.",
      icon: <Users size={32} className="text-primary" />
    }
  ];

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-4">About PhishGuard</h1>
        <div className="d-flex justify-content-center mb-4">
          <Shield size={64} className="text-primary" />
        </div>
        <p className="lead col-lg-8 mx-auto">
          PhishGuard was created with a simple mission: to protect users from increasingly sophisticated 
          phishing attacks that bypass traditional email security measures.
        </p>
      </div>

      <div className="card bg-dark border-primary mb-5">
        <div className="card-body p-4">
          <h2 className="text-center fw-bold mb-4">Our Technology</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                  <p className="text-light-emphasis">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-dark border-primary">
        <div className="card-body p-4">
          <h2 className="text-center fw-bold mb-4">Why Use PhishGuard?</h2>
          <div className="col-lg-8 mx-auto">
            <p className="text-light-emphasis">
              Phishing attacks continue to evolve and become more sophisticated each day. Traditional 
              email filters often miss these threats, putting your personal information at risk.
            </p>
            <p className="text-light-emphasis">
              PhishGuard uses advanced pattern recognition to identify suspicious emails that might 
              otherwise slip through standard security measures, providing you with an extra layer of protection.
            </p>
            <p className="text-light-emphasis">
              Our commitment is to keep your digital identity safe in an increasingly complex threat landscape.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;