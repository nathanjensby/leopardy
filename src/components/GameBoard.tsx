import { useContext } from "react";
import { Box, Button, Grid } from "theme-ui";
import {
  ACTIVATED_QUESTIONS_TYPES,
  GAME_STATE_ACTION_TYPES,
} from "../types/types";
import DataTable from "./DataTable";
import { GameContext } from "../contexts/gameContext";
import AnswerModal from "./AnswerModal";
import { QuestionsContext } from "../contexts/questionsContext";

const GameBoard = () => {
  const [gameState, gameDispatch] = useContext(GameContext);
  const [, questionsDispatch] = useContext(QuestionsContext);

  const handleAdvance = ({ stage }: { stage: GAME_STATE_ACTION_TYPES }) => {
    gameDispatch({ type: stage });
    questionsDispatch({ type: ACTIVATED_QUESTIONS_TYPES.CLEAR_ALL });
  };

  return (
    <Box>
      <Box>{gameState.gameState}</Box>
      <Grid sx={{ gridTemplateColumns: "5fr 1fr" }}>
        <DataTable />
        <Box>
          <Button
            onClick={() =>
              handleAdvance({ stage: GAME_STATE_ACTION_TYPES.DOUBLE_LEOPARDY })
            }
          >
            Double
          </Button>
          <Button
            onClick={() =>
              handleAdvance({ stage: GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY })
            }
          >
            Final
          </Button>
          <Button
            onClick={() =>
              handleAdvance({ stage: GAME_STATE_ACTION_TYPES.RESULTS })
            }
          >
            Results
          </Button>
          <Button
            onClick={() =>
              handleAdvance({ stage: GAME_STATE_ACTION_TYPES.START })
            }
          >
            Quit
          </Button>
        </Box>
      </Grid>
      <AnswerModal />
    </Box>
  );
};

export default GameBoard;
