import { useContext } from "react";
import { Box, Flex } from "theme-ui";
import DataTable from "./DataTable";
import { GameContext } from "../contexts/gameContext";
import AnswerModal from "./AnswerModal";
import ScoreBoard from "./ScoreBoard";
import { GAME_STATE_ACTION_TYPES } from "../types/types";
import FinalLeopardy from "./FinalLeopardy";
import useLoadData from "../hooks/useLoadData";

const GameBoard = () => {
  const [gameState] = useContext(GameContext);
  const { loadedQuestions } = useLoadData(gameState.gameState);

  return (
    <Box>
      <Flex sx={{ flexDirection: ["column", "column", "row"] }}>
        {gameState.gameState === GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY ? (
          <FinalLeopardy leopardyStageData={loadedQuestions} />
        ) : (
          <DataTable leopardyStageData={loadedQuestions} />
        )}
        <ScoreBoard />
      </Flex>
      <AnswerModal />
    </Box>
  );
};

export default GameBoard;
