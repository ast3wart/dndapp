import React, { useState } from "react";
import "../styles/CharacterCreation.css";

const CharacterCreation = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");

  const classes = [
    {
      name: "Fighter",
      description: "Strong and skilled in melee combat.",
      image: "/components/images/fighter.png",
    },
    {
      name: "Warlock",
      description: "Harnesses dark magic to defeat enemies.",
      image: "/components/images/warlock.png",
    },
    {
      name: "Wizard",
      description: "Masters of arcane spells and magic.",
      image: "/components/images/wizard.png",
    },
  ];

  const races = [
    {
      name: "Human",
      description: "Versatile and ambitious.",
      image: "/components/images/human.png",
    },
    {
      name: "Elf",
      description: "Graceful and wise.",
      image: "/components/images/elf.png",
    },
    {
      name: "Dwarf",
      description: "Stout and resilient.",
      image: "/components/images/dwarf.png",
    },
  ];

  const handleNext = () => {
    if (step === 3 && name && characterClass && race) {
      onCreate({
        id: Date.now(),
        name,
        class: characterClass,
        race,
        level: 1,
        image: `/components/images/${characterClass.toLowerCase()}.png`,
        raceImage: `/components/images/${race.toLowerCase()}.png`,
      });
      onClose();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="character-creation-overlay">
      <div className="character-creation-popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {step === 1 && (
          <div className="step">
            <h2>Step 1: Choose a Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter character name"
            />
            <button
              className="next-btn"
              onClick={handleNext}
              disabled={!name.trim()}
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="step">
            <h2>Step 2: Select a Class</h2>
            <div className="options-grid">
              {classes.map((c) => (
                <div
                  key={c.name}
                  className={`option ${
                    characterClass === c.name ? "selected" : ""
                  }`}
                  onClick={() => setCharacterClass(c.name)}
                >
                  <img src={c.image} alt={c.name} />
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button
              className="next-btn"
              onClick={handleNext}
              disabled={!characterClass}
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="step">
            <h2>Step 3: Select a Race</h2>
            <div className="options-grid">
              {races.map((r) => (
                <div
                  key={r.name}
                  className={`option ${
                    race === r.name ? "selected" : ""
                  }`}
                  onClick={() => setRace(r.name)}
                >
                  <img src={r.image} alt={r.name} />
                  <h3>{r.name}</h3>
                  <p>{r.description}</p>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button
              className="finish-btn"
              onClick={handleNext}
              disabled={!race}
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCreation;
