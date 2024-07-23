import { useState, useContext, Dispatch } from "react";
import { Card, Text, Box, Input, Flex, Button } from "theme-ui";
import { ACTION_TYPES, IPlayer, ActionTypes, IQuestion } from "../types/types";
import { ModalContext } from "../contexts/modalContext";

const PlayerCard = ({
  isFinalLeopardy,
  player,
  currentQuestion,
  setShowQuestion,
  playersDispatch,
}: {
  isFinalLeopardy: boolean;
  player: IPlayer;
  currentQuestion: IQuestion;
  setShowQuestion: Dispatch<React.SetStateAction<boolean>>;
  playersDispatch: Dispatch<ActionTypes>;
}) => {
  const [wager, setWager] = useState(0);
  const { setIsOpen } = useContext(ModalContext);

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
    if (!isFinalLeopardy && type === ACTION_TYPES.ADD_SCORE) {
      setIsOpen(false);
    }
    setShowQuestion(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        border: "1px solid background",
      }}
    >
      <Text sx={{ fontWeight: 700, fontSize: 24 }}>{player.name}</Text>
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
  );
};

export default PlayerCard;
