import {
  Button,
  Card,
  useThemeUI,
  Text,
  Grid,
  Flex,
  Input,
  Box,
} from "theme-ui";
import Modal, { Styles } from "react-modal";
import { useContext, useState } from "react";
import { ModalContext } from "../contexts/modalContext";
import { PlayersContext } from "../contexts/playersContext";
import {
  ACTION_TYPES,
  IPlayer,
  ActionTypes,
  GAME_STATE_ACTION_TYPES,
} from "../types/types";
import { QuestionsContext } from "../contexts/questionsContext";
import { GameContext } from "../contexts/gameContext";

const AnswerModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const [playersState, playersDispatch] = useContext(PlayersContext);
  const [questionsState] = useContext(QuestionsContext);
  const [gameContext, gameDispatch] = useContext(GameContext);
  const [showQuestion, setShowQuestion] = useState(false);
  const context = useThemeUI();
  const { theme } = context;

  const [wager, setWager] = useState(0);

  const { currentQuestion } = questionsState;
  const { players } = playersState;

  const isFinalLeopardy =
    gameContext.gameState === GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY;

  const handleButtonClick = ({
    type,
    player,
  }: {
    type: ACTION_TYPES.ADD_SCORE | ACTION_TYPES.SUBTRACT_SCORE;
    player: IPlayer;
  }) => {
    playersDispatch({
      type,
      player,
      value: isFinalLeopardy ? wager : currentQuestion.value,
    } as ActionTypes);
    if (!isFinalLeopardy) {
      setIsOpen(false);
    }
    setShowQuestion(false);
  };

  const handleResultsTransition = () => {
    setIsOpen(false);
    gameDispatch({
      type: GAME_STATE_ACTION_TYPES.RESULTS,
    });
  };

  const modalStyles = {
    overlay: {
      backgroundColor: theme.colors?.background,
    },
    content: {
      color: theme.colors?.secondary,
      backgroundColor: theme.colors?.primary,
    },
  };

  return (
    <Modal isOpen={isOpen} style={modalStyles as Styles}>
      {currentQuestion && (
        <Card sx={{ height: "100%" }}>
          <Grid
            sx={{
              gridTemplateColumns: "1fr",
              gridTemplateRows: "auto min-content",
              alignContent: "stretch",
              height: "100%",
              maxHeight: "100vh",
            }}
          >
            <Flex
              sx={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
              <Text
                as="h2"
                sx={{
                  fontSize: "clamp( 24px, 6vw, 128px)",
                  fontWeight: "900",
                }}
              >
                {currentQuestion.answer}
              </Text>
              {showQuestion && (
                <Text
                  sx={{
                    color: "text",
                    fontSize: "clamp( 24px, 5vw, 96px)",
                    fontWeight: "900",
                  }}
                >
                  {currentQuestion.question}
                </Text>
              )}
            </Flex>

            <Flex sx={{ justifyContent: "space-around" }}>
              {players.map((player, index) => (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    border: "1px solid background",
                  }}
                  key={index}
                >
                  <Text sx={{ fontWeight: 700, fontSize: 24 }}>
                    {player.name}
                  </Text>
                  <Text sx={{ fontSize: 18, mb: 2 }}>${player.score}</Text>
                  {isFinalLeopardy && (
                    <Box sx={{ mb: 4, color: "text" }}>
                      <Text>Wager:</Text>
                      <Input
                        onChange={(e) => setWager(+e.target.value)}
                        placeholder={`$${currentQuestion.value}`}
                      />
                    </Box>
                  )}
                  <Flex>
                    <Button
                      sx={{ variant: "buttons.scoring", mr: 2 }}
                      onClick={() =>
                        handleButtonClick({
                          type: ACTION_TYPES.ADD_SCORE,
                          player,
                        })
                      }
                    >
                      Correct
                    </Button>
                    <Button
                      sx={{ variant: "buttons.scoring" }}
                      onClick={() =>
                        handleButtonClick({
                          type: ACTION_TYPES.SUBTRACT_SCORE,
                          player,
                        })
                      }
                    >
                      Incorrect
                    </Button>
                  </Flex>
                </Card>
              ))}
              {isFinalLeopardy && (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    border: "1px solid background",
                  }}
                >
                  <Button onClick={() => handleResultsTransition()}>
                    Results
                  </Button>
                </Card>
              )}
            </Flex>
          </Grid>
          <Card sx={{ position: "absolute", right: 0, top: 0 }}>
            <Button onClick={() => setShowQuestion(!showQuestion)}>
              Question
            </Button>
          </Card>
        </Card>
      )}
    </Modal>
  );
};

export default AnswerModal;
