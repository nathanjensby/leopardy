import { Button, Card, Box } from "theme-ui";
import Modal from "react-modal";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { PlayersContext } from "../contexts/playersContext";
import { ACTION_TYPES, IPlayer, ActionTypes } from "../types/types";
import { QuestionsContext } from "../contexts/questionsContext";

const AnswerModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const [playersState, playersDispatch] = useContext(PlayersContext);
  const [questionsState] = useContext(QuestionsContext);

  const { currentQuestion } = questionsState;
  const { players } = playersState;

  const handleButtonClick = ({
    type,
    player,
  }: {
    type: ACTION_TYPES.ADD_SCORE | ACTION_TYPES.SUBTRACT_SCORE;
    player: IPlayer;
  }) => {
    setIsOpen(false);
    playersDispatch({
      type,
      player,
      value: currentQuestion.value,
    } as ActionTypes);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "black",
        },
        content: {
          color: "black",
        },
      }}
    >
      {currentQuestion && (
        <Card>
          <h2>{currentQuestion.answer}</h2>
          {players.map((player, index) => (
            <Box key={index}>
              <p>{player.name}</p>
              <p>${player.score}</p>
              <Button
                onClick={() =>
                  handleButtonClick({ type: ACTION_TYPES.ADD_SCORE, player })
                }
              >
                Correct
              </Button>
              <Button
                onClick={() =>
                  handleButtonClick({
                    type: ACTION_TYPES.SUBTRACT_SCORE,
                    player,
                  })
                }
              >
                Incorrect
              </Button>
            </Box>
          ))}
        </Card>
      )}
    </Modal>
  );
};

export default AnswerModal;
