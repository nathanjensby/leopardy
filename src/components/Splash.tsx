import { useReducer, useState } from "react";
import { Box, Button, Input, Label } from "theme-ui";
import { playersReducer, IPlayer } from "../reducers/playersReducer";
import PlayerList from "./PlayerList";

const Splash = ({
  setIsPlaying,
}: {
  setIsPlaying: (isPlaying: boolean) => void;
}) => {
  const [players, dispatch] = useReducer(playersReducer, []);
  const [playerName, setPlayerName] = useState("");

  const handleAddPlayer = () => {
    dispatch({
      type: "addPlayer",
      player: { name: playerName, score: 0, id: playerName },
    });
    setPlayerName("");
  };

  const handleDeletePlayer = (player: IPlayer) => {
    dispatch({
      type: "deletePlayer",
      player: player,
    });
  };

  const handleEditPlayer = (player: IPlayer) => {
    dispatch({
      type: "editPlayer",
      player: player,
    });
  };

  return (
    <Box>
      <h1>Leopardy</h1>
      <Box>
        <h2>Players</h2>
        <Label htmlFor="addPlayer">Add player</Label>
        <Input
          name="addPlayer"
          id="addPlayer"
          mb={3}
          placeholder="Player 1"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <Button onClick={handleAddPlayer}>Add Player</Button>
      </Box>
      <PlayerList
        players={players}
        onDeletePlayer={handleDeletePlayer}
        onEditPlayer={handleEditPlayer}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsPlaying(true);
        }}
      >
        Let's go
      </Button>
    </Box>
  );
};

export default Splash;
