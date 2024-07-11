import { useState } from "react";
import { Box, Button, Flex, Input } from "theme-ui";
import { IPlayer } from "../reducers/playersReducer";

type IPlayerList = {
  players: IPlayer[];
  onEditPlayer: (player: IPlayer) => void;
  onDeletePlayer: (player: IPlayer) => void;
};

export default function PlayerList({
  players,
  onEditPlayer,
  onDeletePlayer,
}: IPlayerList) {
  return (
    <ul>
      {players.map((player: IPlayer) => (
        <Box as="li" sx={{ listStyleType: "none" }} key={player.id}>
          <Player
            player={player}
            onChange={onEditPlayer}
            onDelete={onDeletePlayer}
          />
        </Box>
      ))}
    </ul>
  );
}

function Player({
  player,
  onChange,
  onDelete,
}: {
  player: IPlayer;
  onChange: (player: IPlayer) => void;
  onDelete: (player: IPlayer) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  let playerName;
  if (isEditing) {
    playerName = (
      <>
        <Input
          value={player.name}
          onChange={(e) => {
            onChange({
              ...player,
              name: e.target.value,
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
      <Button onClick={() => onDelete(player)}>Delete</Button>
    </Flex>
  );
}
