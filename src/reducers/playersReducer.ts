import { ACTION_TYPES, IPlayer, IState } from "../types/types";

export function playersReducer(
  state: IState,
  action: {
    type: string;
    player: IPlayer;
    scoreToAdd?: number;
    scoreToSubtract?: number;
  }
): IState {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return {
        players: [...state.players, action.player],
      };
    }
    case ACTION_TYPES.EDIT: {
      return {
        players: state.players.map((player) => {
          if (player.id === action.player.id) {
            return action.player;
          } else {
            return player;
          }
        }),
      };
    }
    case ACTION_TYPES.DELETE: {
      return {
        players: state.players.filter(
          (player) => player.id !== action.player.id
        ),
      };
    }
    case ACTION_TYPES.ADD_SCORE: {
      return {
        players: state.players.map((player) => {
          if (player.id === action.player.id) {
            const newScore = action.scoreToAdd
              ? action.scoreToAdd + player.score
              : player.score;
            return { ...player, score: newScore };
          } else {
            return player;
          }
        }),
      };
    }
    case ACTION_TYPES.SUBTRACT_SCORE: {
      return {
        players: state.players.map((player) => {
          if (player.id === action.player.id) {
            const newScore = action.scoreToSubtract
              ? player.score - action.scoreToSubtract
              : player.score;
            return { ...player, score: newScore };
          } else {
            return player;
          }
        }),
      };
    }
    case ACTION_TYPES.RESET: {
      return {
        players: [],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
