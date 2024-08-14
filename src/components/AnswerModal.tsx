import { Box, Button, Card, useThemeUI, Text, Grid, Flex } from "theme-ui";
import Modal, { Styles } from "react-modal";
import { useContext, useEffect, useState } from "react";
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
  const [showDailyDouble, setShowDailyDouble] = useState(false);
  const context = useThemeUI();
  const { theme } = context;

  const { currentQuestion } = questionsState;
  const { players } = playersState;

  const isFinalLeopardy =
    gameContext.gameState === GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY;

  const { isDailyDouble } = currentQuestion;

  useEffect(() => {
    if (isDailyDouble) {
      setShowDailyDouble(true);
    }
  }, [currentQuestion, isDailyDouble]);

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

  if (!currentQuestion) {
    return null;
  }

  return (
    <Modal
      contentLabel="Clue modal"
      isOpen={isOpen}
      style={modalStyles as Styles}
    >
      <Card sx={{ height: "100%", width: "100%", p: 4 }}>
        <Grid
          sx={{
            gridTemplateColumns: "1fr",
            gridTemplateRows: "auto min-content",
            alignContent: "stretch",
            height: "100%",
            maxHeight: "100vh",
          }}
        >
          {showDailyDouble ? (
            <Card
              sx={{
                height: "100%",
                p: 4,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button
                sx={{
                  fontWeight: 900,
                  color: "slate",
                  fontSize: "clamp(36px, 15vw, 318px)",
                  textWrap: "wrap",
                  lineHeight: "10rem",
                }}
                onClick={() => setShowDailyDouble(false)}
              >
                Daily Double
              </Button>
            </Card>
          ) : (
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
                  fontFamily: "card",
                  color: "text",
                  textShadow: "4px 4px 0 black",
                }}
              >
                {currentQuestion.answer}
              </Text>
              {showQuestion && (
                <Text
                  sx={{
                    color: "secondary",
                    fontSize: "clamp( 24px, 5vw, 96px)",
                    fontWeight: "900",
                  }}
                >
                  {currentQuestion.question}
                </Text>
              )}
            </Flex>
          )}
          <Flex sx={{ justifyContent: "space-around" }}>
            {players.map((player, index) => (
              <PlayerCard
                key={index}
                hasWager={isFinalLeopardy || isDailyDouble}
                player={player}
                setShowQuestion={setShowQuestion}
                playersDispatch={playersDispatch}
                currentQuestion={currentQuestion}
              />
            ))}
            {isFinalLeopardy && (
              <Box>
                <Button
                  sx={{
                    variant: "buttons.scoring",
                  }}
                  onClick={() => handleResultsTransition()}
                >
                  Results
                </Button>
              </Box>
            )}
          </Flex>
        </Grid>
        <Card sx={{ position: "absolute", right: 0, top: 0, p: 3 }}>
          <Button
            sx={{ variant: "buttons.scoring", mr: 4 }}
            onClick={() => setShowQuestion(!showQuestion)}
          >
            Question
          </Button>

          <Button
            sx={{ variant: "buttons.scoring" }}
            onClick={() => {
              setIsOpen(false);
              setShowQuestion(false);
            }}
          >
            X
          </Button>
        </Card>
      </Card>
    </Modal>
  );
};

export default AnswerModal;
