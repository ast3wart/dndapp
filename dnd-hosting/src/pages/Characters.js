import React, { useState, useEffect } from "react";
import "../styles/CharacterManagement.css";
import FighterImage from "../components/images/fighter.png";
import WarlockImage from "../components/images/warlock.png";
import WizardImage from "../components/images/wizard.png";
import HumanImage from "../components/images/human.png";
import ElfImage from "../components/images/elf.png";
import DwarfImage from "../components/images/dwarf.png";
import BarbarianImage from "../components/images/barbarian.png";
import BardImage from "../components/images/bard.png";
import ClericImage from "../components/images/cleric.png";
import DruidImage from "../components/images/druid.png";
import MonkImage from "../components/images/monk.png";
import PaladinImage from "../components/images/paladin.png";
import RangerImage from "../components/images/ranger.png";
import RogueImage from "../components/images/rogue.png";
import SorcererImage from "../components/images/sorcerer.png";
import HalflingImage from "../components/images/halfling.png";
import GnomeImage from "../components/images/gnome.png";
import HalfOrcImage from "../components/images/halforc.png";
import TieflingImage from "../components/images/tiefling.png";
import DragonbornImage from "../components/images/dragonborn.png";
import HalfElfImage from "../components/images/halfelf.png";
import CharacterCreation from "../components/CharacterCreation.js";
import { getCharacters, saveCharacters } from "../utils/auths.js";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [showCreationPopup, setShowCreationPopup] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const imagesMap = {
    Barbarian: BarbarianImage,
    Bard: BardImage,
    Cleric: ClericImage,
    Druid: DruidImage,
    Fighter: FighterImage,
    Monk: MonkImage,
    Paladin: PaladinImage,
    Ranger: RangerImage,
    Rogue: RogueImage,
    Sorcerer: SorcererImage,
    Wizard: WizardImage,
    Warlock: WarlockImage,
    Human: HumanImage,
    Elf: ElfImage,
    Dwarf: DwarfImage,
    Halfling: HalflingImage,
    Gnome: GnomeImage,
    "Half-Orc": HalfOrcImage,
    Tiefling: TieflingImage,
    Dragonborn: DragonbornImage,
    "Half-Elf": HalfElfImage,
  };

  useEffect(() => {
    const storedCharacters = getCharacters();
    const charactersWithImages = storedCharacters.map((character) => ({
      ...character,
      image: imagesMap[character.class],
      raceImage: imagesMap[character.race],
    }));
    setCharacters(charactersWithImages);
  }, []);

  const handleCreateCharacter = (newCharacter) => {
    const updatedCharacters = [...characters, newCharacter];
    saveCharacters(updatedCharacters);
    setCharacters(updatedCharacters);
  };

  const handleDeleteCharacter = (characterId) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      const updatedCharacters = characters.filter(
        (character) => character.id !== characterId
      );
      saveCharacters(updatedCharacters);
      setCharacters(updatedCharacters);
    }
  };

  const handleViewDetails = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="character-management">
      <h1>Your Characters</h1>
      {characters.length === 0 && (
        <p>No characters yet. Click "Create Character" to get started!</p>
      )}
      <div className="character-grid">
        {characters.map((character) => (
          <div className="character-box" key={character.id}>
            <button
              className="delete-icon"
              onClick={() => handleDeleteCharacter(character.id)}
            >
              🗑️
            </button>
            <h2>{character.name}</h2>
            <p>Level: {character.level}</p>
            <div>
              <img src={character.image} alt={character.class} />
              <img src={character.raceImage} alt={character.race} />
            </div>
            <p>Class: {character.class}</p>
            <p>Race: {character.race}</p>
            <button
              className="details-button"
              onClick={() => handleViewDetails(character)}
            >
              More Details
            </button>
          </div>
        ))}
        <div
          className="create-character-box"
          onClick={() => setShowCreationPopup(true)}
        >
          <span className="plus-icon">+</span>
          <h2>Create Character</h2>
        </div>
      </div>
      {showCreationPopup && (
        <CharacterCreation
          onClose={() => setShowCreationPopup(false)}
          onCreate={handleCreateCharacter}
        />
      )}
      {selectedCharacter && (
        <div className="character-details-overlay">
          <div className="character-details-popup">
            <button className="close-btn" onClick={handleCloseDetails}>
              &times;
            </button>
            <h2>{selectedCharacter.name}</h2>
            <p>Level: {selectedCharacter.level}</p>
            <p>Class: {selectedCharacter.class}</p>
            <p>Background: {selectedCharacter.background}</p>
            <table className="attributes-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedCharacter.attributes).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
