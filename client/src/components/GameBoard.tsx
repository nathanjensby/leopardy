import { useContext, useEffect } from "react";
import { Box, Grid } from "theme-ui";
import DataTable from "./DataTable";
import { GameContext } from "../contexts/gameContext";
import AnswerModal from "./AnswerModal";
import ScoreBoard from "./ScoreBoard";
import { GAME_STATE_ACTION_TYPES } from "../types/types";
import FinalLeopardy from "./FinalLeopardy";
import useLoadData from "../hooks/useLoadData";
import { socket } from "../utils/utils";
import { SOCKET_ACTIONS } from "../utils/enums";
import { useToast } from "../hooks/useToast";

const GameBoard = () => {
  const [gameState] = useContext(GameContext);
  const { loadedQuestions } = useLoadData(gameState.gameState);
  const { addToast } = useToast();

  useEffect(() => {
    // Listen for the SOCKET_ACTIONS.BUZZED event
    socket.on(SOCKET_ACTIONS.BUZZED, (data: { playerName: string }) => {
      addToast(`${data.playerName} buzzed in`, "success");
    });

    // Clean up the socket listener on unmount
    return () => {
      socket.off(SOCKET_ACTIONS.BUZZED);
    };
  }, []);

  return (
    <Box>
      <Grid sx={{ height: "100%", gridTemplateColumns: "5fr 1fr" }}>
        {gameState.gameState === GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY ? (
          <FinalLeopardy leopardyStageData={loadedQuestions} />
        ) : (
          <DataTable leopardyStageData={loadedQuestions} />
        )}
        <ScoreBoard />
      </Grid>
      <AnswerModal />
    </Box>
  );
};

export default GameBoard;
