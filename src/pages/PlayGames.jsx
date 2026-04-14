import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OurTeamOne from "../components/OurTeamOne";
import GameImg1 from "../assets/images/GameImg1.png";

const PlayGames = () => {
  const heading =
    "Interactive Learning: Games That Make Menstrual Education Fun!";
  const description =
    "Learning about menstrual health doesn’t have to be boring! Dive into our interactive games designed to educate, engage, and empower young girls and communities. Through fun quizzes, animated challenges, and immersive storytelling, we turn knowledge into action. Let’s play and break the taboos together!";

  const [selectedGame, setSelectedGame] = useState(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to open the game in the modal
  const startGame = (gameIndex) => {
    if (gameIndex === 0) {
      setSelectedGame("/unity/game1/index.html"); // Path to Unity game
      lockOrientation();
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedGame(null);
    unlockOrientation();
  };

  // Force Landscape Mode
  const lockOrientation = async () => {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock("landscape");
      } catch (error) {
        console.warn("Orientation lock failed:", error);
      }
    }
  };

  // Unlock Orientation on Exit
  const unlockOrientation = async () => {
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  };

  return (
    <PlayGamesComp>
      <OurTeamOne heading={heading} description={description} />
      <div className="Game-Box">
        <div className="game-card">
          <img
            src={GameImg1}
            className="Game-image"
            alt="Game 1"
          />
          <button
            className="game-start-button"
            onClick={() => startGame(0)}
          >
            Start Game
          </button>
        </div>
      </div>

      {/* Show Rotate Screen Message if in Portrait */}
      {isPortrait && selectedGame && (
        <RotateMessage>
          <p>🔄 Please rotate your device to landscape mode</p>
        </RotateMessage>
      )}

      {/* Custom Modal for Unity Game */}
      {selectedGame && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <iframe src={selectedGame} title="Unity Game" />
          </ModalContent>
        </ModalOverlay>
      )}
    </PlayGamesComp>
  );
};

// Styled Components
const PlayGamesComp = styled.div`
  padding: 1rem 2rem 0rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .Game-Box {
    display: flex;
    justify-content: center;
    padding: 10px;
    gap: 1rem;
  }

  .game-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f4f4f4;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #ccc, -3px -3px 6px #fff;
    transition: 0.3s;
    max-width: 400px;
    width: 100%;
  }

  .game-card:hover {
    transform: scale(1.05);
    box-shadow: inset 3px 3px 6px #ccc, inset -3px -3px 6px #fff;
  }

  .Game-image {
    height: auto;
    width: 100%;
    border-radius: 10px;
  }

  .game-start-button {
    background: linear-gradient(145deg, #20237b, #151a60);
    color: #ffffff;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin-top: 0.8rem;
    transition: 0.3s;
    font-weight: bold;
    text-transform: uppercase;
  }

  .game-start-button:hover {
    background: linear-gradient(145deg, #151a60, #20237b);
    transform: scale(1.05);
  }
`;

// Modal Styling
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 95%;
  max-width: 1200px;
  height: calc(100vh - 100px);
  max-height: 90vh;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 999;
  margin-top: 100px; /* Add top margin to account for header */

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

// Rotate Screen Message
const RotateMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none; /* Hide on larger screens */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: 0.3s;

  &:hover {
    color: red;
  }
`;

export default PlayGames;
