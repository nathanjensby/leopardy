import { useContext } from "react";
import { Box, Button, Grid } from "theme-ui";
import { PlayersContext } from "../contexts/playersContext";
import { ACTION_TYPES } from "../types/types";
import DataTable from "./DataTable";

const GameBoard = ({
  setIsPlaying,
}: {
  setIsPlaying: (isPlaying: boolean) => void;
}) => {
  const [state, dispatch] = useContext(PlayersContext);
  const { players } = state;

  return (
    <Grid sx={{ gridTemplateColumns: "5fr 1fr" }}>
      <DataTable />
      <Box>
        {players.map((player, index) => (
          <Box key={index}>
            <p>{player.name}</p>
            <p>${player.score}</p>
            <Button
              onClick={() => {
                dispatch({
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
                dispatch({
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
            setIsPlaying(false);
          }}
        >
          Quit
        </Button>
      </Box>
    </Grid>
  );
};

export default GameBoard;
