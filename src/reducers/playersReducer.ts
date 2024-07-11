export type IPlayer = {
    id: string;
    name: string;
    score: number;
}
export function playersReducer(players: IPlayer[], action: {type:string, player: IPlayer }) {
    switch (action.type) {
      case 'addPlayer': {
        return [
          ...players,
          action.player
        ];
      }
      case 'editPlayer': {
        return players.map((player) => {
          if (player.id === action.player.id) {
            return action.player;
          } else {
            return player;
          }
        });
      }
      case 'deletePlayer': {
        return players.filter((player) => player.id !== action.player.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  