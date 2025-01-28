import React, { useState, useEffect } from "react";
import { socket } from "../utils/utils";
import { SOCKET_ACTIONS } from "../utils/enums";
import { useToast } from "../hooks/useToast";

const BuzzerPage: React.FC = () => {
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState(false);
  const [buzzerLocked, setBuzzerLocked] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    socket.on(SOCKET_ACTIONS.CONNECT_ERROR, (err) => {
      // the reason of the error, for example "xhr poll error"
      addToast(`Connection error: ${err.message}`, "error");
    });
    socket.on(SOCKET_ACTIONS.CONNECT, () => {
      addToast(`Connected`, "success");
    });
    // Listen for the 'reset' event and unlock the buzzer
    socket.on(SOCKET_ACTIONS.BUZZER_OPEN, () => {
      setBuzzerLocked(false); // Unlock the buzzer when reset is triggered
    });

    socket.on(SOCKET_ACTIONS.BUZZER_CLOSED, () => {
      setBuzzerLocked(true);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.off(SOCKET_ACTIONS.CONNECT);
      socket.off(SOCKET_ACTIONS.CONNECT_ERROR);
      socket.off(SOCKET_ACTIONS.BUZZER_OPEN);
      socket.off(SOCKET_ACTIONS.BUZZER_CLOSED);
    };
  }, []);

  const handleBuzz = () => {
    if (!buzzerLocked && playerName) {
      socket.emit(SOCKET_ACTIONS.BUZZ, { playerName });
      setBuzzerLocked(true); // Lock buzzer after buzzing
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Player Buzzer</h1>
      {!joined ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          />
          <button
            onClick={() => setJoined(true)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Join Game
          </button>
        </div>
      ) : (
        <button
          onClick={handleBuzz}
          disabled={buzzerLocked}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.5rem",
            backgroundColor: buzzerLocked ? "gray" : "blue",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: buzzerLocked ? "not-allowed" : "pointer",
          }}
        >
          {buzzerLocked ? "Buzz Locked" : "Buzz!"}
        </button>
      )}
    </div>
  );
};

export default BuzzerPage;
