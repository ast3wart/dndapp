import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <section className="hero">
      <h2>Host Your Next DnD Campaign Online</h2>
      <p>Interactive maps, character sheets, live chat, and more.</p>
      <button onClick={handleGetStarted}>Get Started</button>
    </section>
  );
};

export default Hero;
