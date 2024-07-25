import { useContext, useState } from "react";
import { Box, Button, Flex, Input, Text } from "theme-ui";
import { PlayersContext } from "../contexts/playersContext";

import { IPlayer, ACTION_TYPES } from "../types/types";

function Player({ player }: { player: IPlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [, dispatch] = useContext(PlayersContext);

  let playerName;
  if (isEditing) {
    playerName = (
      <Box sx={{ maxWidth: "50%" }}>
        <Input
          value={player.name}
          onChange={(e) => {
            dispatch({
              type: ACTION_TYPES.EDIT,
              player: {
                ...player,
                name: e.target.value,
              },
            });
          }}
        />
      </Box>
    );
  } else {
    playerName = <>{player.name}</>;
  }
  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        my: 2,
      }}
    >
      <Box>
        <Text sx={{ fontWeight: 900, fontSize: [24, 32] }}>{playerName}</Text>
      </Box>
      <Box>
        <Button
          sx={{ variant: "buttons.playerActions" }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>

        <Button
          sx={{ variant: "buttons.playerActions" }}
          onClick={() => {
            dispatch({
              type: ACTION_TYPES.DELETE,
              player,
            });
          }}
        >
          Delete
        </Button>
      </Box>
    </Flex>
  );
}

export default function PlayerList() {
  const [state] = useContext(PlayersContext);
  const { players } = state;

  return (
    <Flex
      as="ul"
      sx={{ height: "60vh", overflow: "auto", flexDirection: "column" }}
    >
      {players.map((player: IPlayer) => (
        <Flex
          as="li"
          sx={{ listStyleType: "none", justifyContent: "space-between" }}
          key={player.id}
        >
          <Player player={player} />
        </Flex>
      ))}
    </Flex>
  );
}
