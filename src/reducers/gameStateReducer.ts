import { GAME_STATE_ACTION_TYPES, IGameState } from "../types/types";

export function gameStateReducer(
  state: IGameState,
  action: { type: string }
): IGameState {
  switch (action.type) {
    case GAME_STATE_ACTION_TYPES.START: {
      return {
        ...state,
        gameState: action.type,
      };
    }
    case GAME_STATE_ACTION_TYPES.SINGLE_LEOPARDY: {
      return {
        ...state,
        gameState: action.type,
      };
    }
    case GAME_STATE_ACTION_TYPES.DOUBLE_LEOPARDY: {
      return {
        ...state,
        gameState: action.type,
      };
    }
    case GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY: {
      return {
        ...state,
        gameState: action.type,
      };
    }
    case GAME_STATE_ACTION_TYPES.RESULTS: {
      return {
        ...state,
        gameState: action.type,
      };
    }
    // case GAME_STATE_ACTION_TYPES.ACTIVATED_QUESTION: {
    //   return {
    //     ...state,
    //     activatedQuestions: [
    //       ...state.activatedQuestions,
    //       action.activatedQuestion,
    //     ],
    //   };
    // }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
