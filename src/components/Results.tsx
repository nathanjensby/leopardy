import { useContext } from "react";
import { Button } from "theme-ui";
import { PlayersContext } from "../contexts/playersContext";
import { GameContext } from "../contexts/gameContext";
import { ACTION_TYPES, GAME_STATE_ACTION_TYPES } from "../types/types";

const Results = () => {
  const [, playerDispatch] = useContext(PlayersContext);
  const [, gameDispatch] = useContext(GameContext);
  return (
    <div>
      <div>Results Page</div>
      <Button
        onClick={() => {
          gameDispatch({
            type: GAME_STATE_ACTION_TYPES.START,
          });
          playerDispatch({
            type: ACTION_TYPES.RESET,
            player: { name: "", id: "", score: 0 },
          });
        }}
      >
        Play again
      </Button>
    </div>
  );
};

export default Results;
