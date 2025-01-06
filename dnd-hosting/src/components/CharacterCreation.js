import React, { useState } from "react";
import "../styles/CharacterCreation.css";
import BarbarianImage from "../components/images/barbarian.png";
import BardImage from "../components/images/bard.png";
import ClericImage from "../components/images/cleric.png";
import DruidImage from "../components/images/druid.png";
import FighterImage from "../components/images/fighter.png";
import MonkImage from "../components/images/monk.png";
import PaladinImage from "../components/images/paladin.png";
import RangerImage from "../components/images/ranger.png";
import RogueImage from "../components/images/rogue.png";
import SorcererImage from "../components/images/sorcerer.png";
import WarlockImage from "../components/images/warlock.png";
import WizardImage from "../components/images/wizard.png";
import HumanImage from "../components/images/human.png";
import ElfImage from "../components/images/elf.png";
import DwarfImage from "../components/images/dwarf.png";
import HalflingImage from "../components/images/halfling.png";
import GnomeImage from "../components/images/gnome.png";
import HalfOrcImage from "../components/images/halforc.png";
import TieflingImage from "../components/images/tiefling.png";
import DragonbornImage from "../components/images/dragonborn.png";
import HalfElfImage from "../components/images/halfelf.png";

const CharacterCreation = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [background, setBackground] = useState("");
  const [attributes, setAttributes] = useState({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });
  const [pointsRemaining, setPointsRemaining] = useState(27);

  const classes = [
    { name: "Barbarian", description: "A fierce warrior of primitive background.", image: BarbarianImage },
    { name: "Bard", description: "An inspiring magician whose power echoes through music.", image: BardImage },
    { name: "Cleric", description: "A priestly champion who wields divine magic.", image: ClericImage },
    { name: "Druid", description: "A priest of the Old Faith, wielding the powers of nature.", image: DruidImage },
    { name: "Fighter", description: "A master of martial combat, skilled with a variety of weapons.", image: FighterImage },
    { name: "Monk", description: "A master of martial arts, harnessing the power of the body.", image: MonkImage },
    { name: "Paladin", description: "A holy warrior bound to a sacred oath.", image: PaladinImage },
    { name: "Ranger", description: "A warrior who combats threats on the edges of civilization.", image: RangerImage },
    { name: "Rogue", description: "A scoundrel who uses stealth and trickery to overcome obstacles.", image: RogueImage },
    { name: "Sorcerer", description: "A spellcaster who draws on inherent magic from a gift or bloodline.", image: SorcererImage },
    { name: "Warlock", description: "A wielder of magic derived from a bargain with an extraplanar entity.", image: WarlockImage },
    { name: "Wizard", description: "A scholarly magic-user capable of manipulating the structure of reality.", image: WizardImage },
  ];

  const races = [
    { name: "Human", description: "Versatile and ambitious.", image: HumanImage },
    { name: "Elf", description: "Graceful and wise.", image: ElfImage },
    { name: "Dwarf", description: "Stout and resilient.", image: DwarfImage },
    { name: "Halfling", description: "Small and resourceful.", image: HalflingImage },
    { name: "Gnome", description: "Inventive and cunning.", image: GnomeImage },
    { name: "Half-Orc", description: "A powerful blend of human and orc heritage.", image: HalfOrcImage },
    { name: "Tiefling", description: "Cunning and infernal lineage.", image: TieflingImage },
    { name: "Dragonborn", description: "Proud and strong with draconic ancestry.", image: DragonbornImage },
    { name: "Half-Elf", description: "A blend of human versatility and elven grace.", image: HalfElfImage },
  ];

  const backgrounds = [
    { name: "Acolyte", description: "A servant of a higher power, knowledgeable in religion and ritual." },
    { name: "Criminal", description: "An underworld operative, skilled in deception and stealth." },
    { name: "Folk Hero", description: "A local hero who has risen from humble beginnings." },
    { name: "Noble", description: "A member of the upper class, accustomed to wealth and privilege." },
    { name: "Sage", description: "A scholar who is knowledgeable in history and arcana." },
    { name: "Soldier", description: "A trained warrior with experience in combat and tactics." },
    { name: "Entertainer", description: "A performer skilled in captivating an audience." },
    { name: "Guild Artisan", description: "A master of craft, working as part of a merchant guild." },
    { name: "Hermit", description: "A recluse who has spent time in isolation, seeking enlightenment." },
  ];

  const handleAttributeChange = (attribute, change) => {
    if (pointsRemaining - change < 0 || attributes[attribute] + change < 8 || attributes[attribute] + change > 15) {
      return;
    }

    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + change,
    }));
    setPointsRemaining((prev) => prev - change);
  };

  const handleNext = () => {
    if (step === 5 && name && characterClass && race && background) {
      onCreate({
        id: Date.now(),
        name,
        class: characterClass,
        race,
        background,
        attributes,
        level: 1,
      });
      onClose();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const getPopupClassName = () => {
    if (step === 1 || step === 5) {
      return "character-creation-popup compact";
    }
    return "character-creation-popup";
  };

  return (
    <div className="character-creation-overlay">
      <div className={getPopupClassName()}>
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
                  className={`option ${characterClass === c.name ? "selected" : ""}`}
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
                  className={`option ${race === r.name ? "selected" : ""}`}
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
              className="next-btn"
              onClick={handleNext}
              disabled={!race}
            >
              Next
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="step">
            <h2>Step 4: Select a Background</h2>
            <div className="options-grid">
              {backgrounds.map((bg) => (
                <div
                  key={bg.name}
                  className={`option ${background === bg.name ? "selected" : ""}`}
                  onClick={() => setBackground(bg.name)}
                >
                  <h3>{bg.name}</h3>
                  <p>{bg.description}</p>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button
              className="next-btn"
              onClick={handleNext}
              disabled={!background}
            >
              Next
            </button>
          </div>
        )}
        {step === 5 && (
          <div className="step">
            <h2>Step 5: Assign Attributes</h2>
            <p>Distribute points among your character's attributes. Points remaining: {pointsRemaining}</p>
            <div className="attribute-grid">
              {Object.keys(attributes).map((attr) => (
                <div key={attr} className="attribute-row">
                  <span>{attr}</span>
                  <button
                    onClick={() => handleAttributeChange(attr, -1)}
                    disabled={attributes[attr] <= 8}
                  >
                    -
                  </button>
                  <span>{attributes[attr]}</span>
                  <button
                    onClick={() => handleAttributeChange(attr, 1)}
                    disabled={pointsRemaining <= 0 || attributes[attr] >= 15}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button
              className="finish-btn"
              onClick={handleNext}
              disabled={pointsRemaining > 0}
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
