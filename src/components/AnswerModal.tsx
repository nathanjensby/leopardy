import { Button, Card, useThemeUI, Text, Grid, Flex } from "theme-ui";
import Modal, { Styles } from "react-modal";
import { useContext, useState } from "react";
import { ModalContext } from "../contexts/modalContext";
import { PlayersContext } from "../contexts/playersContext";
import { GAME_STATE_ACTION_TYPES } from "../types/types";
import { QuestionsContext } from "../contexts/questionsContext";
import { GameContext } from "../contexts/gameContext";
import PlayerCard from "./PlayerCard";

const AnswerModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const [playersState, playersDispatch] = useContext(PlayersContext);
  const [questionsState] = useContext(QuestionsContext);
  const [gameContext, gameDispatch] = useContext(GameContext);
  const [showQuestion, setShowQuestion] = useState(false);
  const context = useThemeUI();
  const { theme } = context;

  const { currentQuestion } = questionsState;
  const { players } = playersState;

  const isFinalLeopardy =
    gameContext.gameState === GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY;

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
        <Card sx={{ height: "100%", p: 4 }}>
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
                <PlayerCard
                  key={index}
                  isFinalLeopardy={isFinalLeopardy}
                  player={player}
                  setShowQuestion={setShowQuestion}
                  playersDispatch={playersDispatch}
                  currentQuestion={currentQuestion}
                />
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
            <Button
              onClick={() => {
                setIsOpen(false);
                setShowQuestion(false);
              }}
            >
              X
            </Button>
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
