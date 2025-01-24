import { useContext } from "react";
import { Button, Flex, Text } from "theme-ui";
import { PlayersContext } from "../contexts/playersContext";
import { GameContext } from "../contexts/gameContext";
import {
  ACTION_TYPES,
  ACTIVATED_QUESTIONS_TYPES,
  GAME_STATE_ACTION_TYPES,
} from "../types/types";
import { QuestionsContext } from "../contexts/questionsContext";

const Results = () => {
  const [playersState, playerDispatch] = useContext(PlayersContext);
  const [, gameDispatch] = useContext(GameContext);
  const [, quesitonsDispatch] = useContext(QuestionsContext);
  const finalPlayersArr = playersState.players.sort(
    (a, b) => b.score - a.score
  );
  return (
    <div>
      <Text sx={{ fontSize: 36, fontWeight: 700, mb: 4 }} as="h2">
        Final Standings:
      </Text>
      <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
        {finalPlayersArr.map((player, index) => (
          <Flex sx={{ width: "50%", justifyContent: "space-between", mb: 4 }}>
            <Text>{`${index + 1}: ${player.name}`}</Text>
            <Text>{`$${player.score}`}</Text>
          </Flex>
        ))}
      </Flex>
      <Button
        onClick={() => {
          gameDispatch({
            type: GAME_STATE_ACTION_TYPES.START,
          });
          playerDispatch({
            type: ACTION_TYPES.RESET,
            player: { name: "", id: "", score: 0 },
          });
          quesitonsDispatch({
            type: ACTIVATED_QUESTIONS_TYPES.CLEAR_ALL,
          });
        }}
      >
        Play again
      </Button>
    </div>
  );
};

export default Results;
