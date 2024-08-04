import { useContext } from "react";
import {
  ACTIVATED_QUESTIONS_TYPES,
  GAME_STATE_ACTION_TYPES,
} from "../types/types";
import { GameContext } from "../contexts/gameContext";
import { QuestionsContext } from "../contexts/questionsContext";
import { PlayersContext } from "../contexts/playersContext";
import { Box, Button, Flex, Text } from "theme-ui";

const ScoreBoard = () => {
  const [playersState] = useContext(PlayersContext);
  const [, questionsDispatch] = useContext(QuestionsContext);
  const [, gameDispatch] = useContext(GameContext);

  const { players } = playersState;

  const handleAdvance = ({ stage }: { stage: GAME_STATE_ACTION_TYPES }) => {
    gameDispatch({ type: stage });
    questionsDispatch({ type: ACTIVATED_QUESTIONS_TYPES.CLEAR_ALL });
  };

  return (
    <Flex
      sx={{ flexDirection: "column", justifyContent: "space-between", ml: 2 }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {players.map((player, index) => (
          <Box key={index} sx={{ pl: 4 }}>
            <Box>
              <Text sx={{ fontWeight: "700", fontSize: 24 }}>
                {player.name}
              </Text>
            </Box>
            <Box>
              <Text
                sx={{ fontWeight: "700", fontSize: 18, color: "secondary" }}
              >
                ${player.score}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
      <Flex
        sx={{
          justifyContent: "space-evenly",
          alignSelf: "end",
          flexWrap: "wrap",
        }}
      >
        <Button
          sx={{ m: 2 }}
          onClick={() =>
            handleAdvance({
              stage: GAME_STATE_ACTION_TYPES.DOUBLE_LEOPARDY,
            })
          }
        >
          Double
        </Button>
        <Button
          sx={{ m: 2 }}
          onClick={() =>
            handleAdvance({
              stage: GAME_STATE_ACTION_TYPES.TRIPLE_LEOPARDY,
            })
          }
        >
          Triple
        </Button>
        <Button
          sx={{ m: 2 }}
          onClick={() =>
            handleAdvance({
              stage: GAME_STATE_ACTION_TYPES.QUADRUPLE_LEOPARDY,
            })
          }
        >
          Quadruple
        </Button>
        <Button
          sx={{ m: 2 }}
          onClick={() =>
            handleAdvance({ stage: GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY })
          }
        >
          Final
        </Button>
        <Button
          sx={{ m: 2 }}
          onClick={() =>
            handleAdvance({ stage: GAME_STATE_ACTION_TYPES.RESULTS })
          }
        >
          Results
        </Button>
        <Button
          sx={{ m: 2 }}
          onClick={() =>
            handleAdvance({ stage: GAME_STATE_ACTION_TYPES.START })
          }
        >
          Quit
        </Button>
      </Flex>
    </Flex>
  );
};

export default ScoreBoard;
