import { useContext, useState } from "react";
import { Box, Button, Flex, Input } from "theme-ui";
import { PlayersContext } from "../contexts/playersContext";

import { IPlayer, ACTION_TYPES } from "../types/types";

function Player({ player }: { player: IPlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [, dispatch] = useContext(PlayersContext);

  let playerName;
  if (isEditing) {
    playerName = (
      <>
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
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </>
    );
  } else {
    playerName = (
      <>
        {player.name}
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </>
    );
  }
  return (
    <Flex>
      {playerName}
      <Button
        onClick={() => {
          dispatch({
            type: ACTION_TYPES.DELETE,
            player,
          });
        }}
      >
        Delete
      </Button>
    </Flex>
  );
}

export default function PlayerList() {
  const [state] = useContext(PlayersContext);
  const { players } = state;

  return (
    <ul>
      {players.map((player: IPlayer) => (
        <Box as="li" sx={{ listStyleType: "none" }} key={player.id}>
          <Player player={player} />
        </Box>
      ))}
    </ul>
  );
}
