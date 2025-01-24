import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { Box, Grid } from "theme-ui";
import DataTable from "./DataTable";
import { GameContext } from "../contexts/gameContext";
import AnswerModal from "./AnswerModal";
import ScoreBoard from "./ScoreBoard";
import { GAME_STATE_ACTION_TYPES } from "../types/types";
import FinalLeopardy from "./FinalLeopardy";
import useLoadData from "../hooks/useLoadData";

const socket = io("https://leopardybackend.uc.r.appspot.com");

const GameBoard = () => {
  const [gameState] = useContext(GameContext);
  const { loadedQuestions } = useLoadData(gameState.gameState);

  useEffect(() => {
    // Listen for the "buzzed" event
    socket.on("buzzed", (data: { playerName: string }) => {
      alert(`${data.playerName} buzzed in first!`);
    });

    // Clean up the socket listener on unmount
    return () => {
      socket.off("buzzed");
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
