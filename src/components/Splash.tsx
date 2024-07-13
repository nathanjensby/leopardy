import { useContext, useState } from "react";
import { Box, Button, Input, Label } from "theme-ui";
import PlayerList from "./PlayerList";
import { PlayersContext } from "../contexts/playersContext";
import { ACTION_TYPES, GAME_STATE_ACTION_TYPES } from "../types/types";
import { GameContext } from "../contexts/gameContext";

const Splash = () => {
  const [, playersDispatch] = useContext(PlayersContext);
  const [, gameDispatch] = useContext(GameContext);

  const [playerName, setPlayerName] = useState("");

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
        <Button
          onClick={() => {
            setPlayerName("");
            playersDispatch({
              type: ACTION_TYPES.ADD,
              player: { name: playerName, score: 0, id: playerName },
            });
          }}
        >
          Add Player
        </Button>
      </Box>
      <PlayerList />
      <Button
        onClick={(e) => {
          e.preventDefault();
          gameDispatch({
            type: GAME_STATE_ACTION_TYPES.SINGLE_LEOPARDY,
          });
        }}
      >
        Let's go
      </Button>
    </Box>
  );
};

export default Splash;
