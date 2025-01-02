import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="feature">
        <h3>Interactive Maps</h3>
        <p>Plan your adventures with fully interactive grid-based maps.</p>
      </div>
      <div className="feature">
        <h3>Character Management</h3>
        <p>Create and track your characters seamlessly.</p>
      </div>
      <div className="feature">
        <h3>Real-Time Chat</h3>
        <p>Communicate with your party and roll dice live.</p>
      </div>
    </section>
  );
};

export default Features;
