import { useContext, useState } from "react";
import { Box, Button, Flex, Input, Label, Text } from "theme-ui";
import PlayerList from "./PlayerList";
import { PlayersContext } from "../contexts/playersContext";
import { ACTION_TYPES, GAME_STATE_ACTION_TYPES } from "../types/types";
import { GameContext } from "../contexts/gameContext";

const Splash = () => {
  const [, playersDispatch] = useContext(PlayersContext);
  const [, gameDispatch] = useContext(GameContext);

  const [playerName, setPlayerName] = useState("");

  return (
    <Flex
      sx={{
        width: "100%",
        maxWidth: "1024px",
        flexDirection: "column",
      }}
    >
      <Text
        as="h1"
        sx={{
          mb: 6,
          fontSize: "clamp(36px, 12vw, 128px)",
          color: "secondary",
          fontFamily: "Geopardy",
          textAlign: "center",
        }}
      >
        Leopardy!
      </Text>
      <Box sx={{ maxWidth: ["100%", "75%", "50%"], mb: 4 }}>
        <Label sx={{ mb: 2 }} htmlFor="addPlayer">
          Add player
        </Label>
        <Flex sx={{ alignItems: "center" }}>
          <Input
            name="addPlayer"
            id="addPlayer"
            mr={2}
            placeholder="Player 1"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <Button
            sx={{ width: "240px" }}
            onClick={() => {
              setPlayerName("");
              playersDispatch({
                type: ACTION_TYPES.ADD,
                player: { name: playerName, score: 0, id: playerName },
              });
            }}
          >
            Add Player
          </Button>
        </Flex>
      </Box>
      <PlayerList />
      <Flex sx={{ justifyContent: "flex-end", mt: 4 }}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            gameDispatch({
              type: GAME_STATE_ACTION_TYPES.SINGLE_LEOPARDY,
            });
          }}
        >
          Let's go
        </Button>
      </Flex>
    </Flex>
  );
};

export default Splash;
