import { useState, useContext, Dispatch, useEffect } from "react";
import { Card, Text, Box, Input, Flex, Button } from "theme-ui";
import { ACTION_TYPES, IPlayer, ActionTypes, IQuestion } from "../types/types";
import { ModalContext } from "../contexts/modalContext";
import Correct from "../assets/correct.png";
import Incorrect from "../assets/incorrect.png";
import Edit from "../assets/pencil.png";
import Icon from "./Icon";

const PlayerCard = ({
  hasWager,
  player,
  currentQuestion,
  setShowQuestion,
  playersDispatch,
}: {
  hasWager: boolean;
  player: IPlayer;
  currentQuestion: IQuestion;
  setShowQuestion: Dispatch<React.SetStateAction<boolean>>;
  playersDispatch: Dispatch<ActionTypes>;
}) => {
  const [wager, setWager] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const { setIsOpen } = useContext(ModalContext);

  useEffect(() => {
    if (player) {
      setPlayerScore(player.score);
    }
  }, [player]);

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
      value: hasWager ? wager : currentQuestion.value,
    } as ActionTypes);
    if (!hasWager && type === ACTION_TYPES.ADD_SCORE) {
      setIsOpen(false);
    }
    setShowQuestion(false);
  };

  const handleSaveScore = (player: IPlayer) =>
    playersDispatch({
      type: ACTION_TYPES.EDIT_SCORE,
      player,
      value: playerScore,
    });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        border: (theme) => `1px solid ${theme.colors!.text}`,
        borderRadius: 6,
        boxShadow: "4px 4px 20px 2px darkslategray",
      }}
    >
      <Text sx={{ fontWeight: 700, fontSize: 24 }}>{player.name}</Text>
      {isEdit ? (
        <Input
          sx={{ mb: 2 }}
          placeholder={`${playerScore}`}
          onChange={(e) => setPlayerScore(+e.target.value)}
        />
      ) : (
        <Text sx={{ fontSize: 18, mb: 2 }}>${player.score}</Text>
      )}
      {hasWager && (
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
          onClick={() => (isEdit ? handleSaveScore(player) : setIsEdit(true))}
        >
          {isEdit ? "Save" : <Icon src={Edit} alt="Edit score" />}
        </Button>
        <Button
          sx={{ variant: "buttons.scoring", mr: 2 }}
          onClick={() =>
            handleButtonClick({
              type: ACTION_TYPES.ADD_SCORE,
              player,
            })
          }
        >
          <Icon src={Correct} alt="Correct" />
        </Button>
        <Button
          sx={{ variant: "buttons.scoring", mr: 2 }}
          onClick={() =>
            handleButtonClick({
              type: ACTION_TYPES.SUBTRACT_SCORE,
              player,
            })
          }
        >
          <Icon src={Incorrect} alt="Incorrect" />
        </Button>
      </Flex>
    </Card>
  );
};

export default PlayerCard;
