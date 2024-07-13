import { useContext } from "react";
import { Box, Button, Grid } from "theme-ui";
import { PlayersContext } from "../contexts/playersContext";
import { ACTION_TYPES, GAME_STATE_ACTION_TYPES } from "../types/types";
import DataTable from "./DataTable";
import { GameContext } from "../contexts/gameContext";

const GameBoard = () => {
  const [playersState, playersDispatch] = useContext(PlayersContext);
  const [gameState, gameDispatch] = useContext(GameContext);
  const { players } = playersState;

  return (
    <Box>
      <Box>{gameState.gameState}</Box>
      <Grid sx={{ gridTemplateColumns: "5fr 1fr" }}>
        <DataTable />
        <Box>
          {players.map((player, index) => (
            <Box key={index}>
              <p>{player.name}</p>
              <p>${player.score}</p>
              <Button
                onClick={() => {
                  playersDispatch({
                    type: ACTION_TYPES.ADD_SCORE,
                    player,
                    scoreToAdd: 100,
                  });
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  playersDispatch({
                    type: ACTION_TYPES.SUBTRACT_SCORE,
                    player,
                    scoreToSubtract: 100,
                  });
                }}
              >
                Sub
              </Button>
            </Box>
          ))}
          <Button
            onClick={(e) => {
              e.preventDefault();
              gameDispatch({
                type: GAME_STATE_ACTION_TYPES.DOUBLE_LEOPARDY,
              });
            }}
          >
            Double
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              gameDispatch({
                type: GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY,
              });
            }}
          >
            Final
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              gameDispatch({
                type: GAME_STATE_ACTION_TYPES.RESULTS,
              });
            }}
          >
            Results
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              gameDispatch({
                type: GAME_STATE_ACTION_TYPES.START,
              });
            }}
          >
            Quit
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default GameBoard;
