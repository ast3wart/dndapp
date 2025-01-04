import React, { useState, useEffect } from "react";
import "../styles/CharacterManagement.css";
import CharacterCreation from "../components/CharacterCreation.js";
import { getCharacters, saveCharacters } from "../utils/auths.js";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const savedCharacters = getCharacters();
    setCharacters(savedCharacters);
  }, []);

  const handleCreateCharacter = () => {
    setIsCreating(true);
  };

  const handleCloseCreation = () => {
    setIsCreating(false);
  };

  const handleAddCharacter = (newCharacter) => {
    const updatedCharacters = [...characters, newCharacter];
    setCharacters(updatedCharacters);
    saveCharacters(updatedCharacters); // Save to database/localStorage
    setIsCreating(false);
  };

  return (
    <div className="character-management">
      <h1>Your Characters</h1>
      {characters.length === 0 ? (
        <p>No characters yet. Click "Create Character" to get started!</p>
      ) : null}
      <div className="character-grid">
        {characters.map((character, index) => (
          <div className="character-box" key={index}>
            <h2>{character.name}</h2>
            <p>Level: {character.level}</p>
            <div>
              <img src={character.image} alt={character.class} />
              <img src={`/components/images/${character.race.toLowerCase()}.png`} alt={character.race} />
            </div>
            <p>Class: {character.class}</p>
            <p>Race: {character.race}</p>
            <button className="details-button">More Details</button>
          </div>
        ))}
        <div className="create-character-box" onClick={handleCreateCharacter}>
          <span className="plus-icon">+</span>
          <h2>Create Character</h2>
        </div>
      </div>
      {isCreating && (
        <CharacterCreation
          onClose={handleCloseCreation}
          onCreate={handleAddCharacter}
        />
      )}
    </div>
  );
};

export default Characters;
