export enum ACTION_TYPES {
  ADD = "ADD_PLAYER",
  EDIT = "EDIT_PLAYER",
  DELETE = "DELETE_PLAYER",
  ADD_SCORE = "ADD_SCORE",
  SUBTRACT_SCORE = "SUBTRACT_SCORE",
  RESET = "RESET",
}

export enum GAME_STATE_ACTION_TYPES {
  START = "START",
  SINGLE_LEOPARDY = "SINGLE_LEOPARDY",
  DOUBLE_LEOPARDY = "DOUBLE_LEOPARDY",
  FINAL_LEOPARDY = "FINAL_LEOPARDY",
  RESULTS = "RESULTS",
  //   ACTIVATED_QUESTION = "ACTIVATED_QUESTION",
}

export type StartGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.START;
};

export type SingleLeopardyGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.SINGLE_LEOPARDY;
};

export type DoubleLeopardyGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.DOUBLE_LEOPARDY;
};

export type FinalLeopardyGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY;
};

export type ResultsGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.RESULTS;
};

// export type ActivatedQuestionAction = {
//   type: typeof GAME_STATE_ACTION_TYPES.ACTIVATED_QUESTION;
//   activatedQuestion: IQuestion;
// };

export type IState = {
  players: IPlayer[];
};

export type IPlayer = {
  id: string;
  name: string;
  score: number;
};

export type AddPlayerAction = {
  type: typeof ACTION_TYPES.ADD;
  player: IPlayer;
};

export type DeletePlayerAction = {
  type: typeof ACTION_TYPES.DELETE;
  player: IPlayer;
};

export type EditPlayerAction = {
  type: typeof ACTION_TYPES.EDIT;
  player: IPlayer;
};

export type AddScorePlayerAction = {
  type: typeof ACTION_TYPES.ADD_SCORE;
  player: IPlayer;
  scoreToAdd: number;
};

export type SubtractScorePlayerAction = {
  type: typeof ACTION_TYPES.SUBTRACT_SCORE;
  player: IPlayer;
  scoreToSubtract: number;
};

export type ResetPlayersAction = {
  type: typeof ACTION_TYPES.RESET;
  player: IPlayer;
};

export type ActionTypes =
  | AddPlayerAction
  | DeletePlayerAction
  | EditPlayerAction
  | AddScorePlayerAction
  | SubtractScorePlayerAction
  | ResetPlayersAction;

export type IPlayerList = {
  players: IPlayer[];
};

export type IData = {
  categories: ICategory[];
};

export type ICategory = {
  name: string;
  id: number;
  questions: IQuestion[];
};

export type IQuestion = {
  id: number;
  answer: string;
  question: string;
  value: number;
};

export type IGameState = {
  gameState: keyof typeof GAME_STATE_ACTION_TYPES;
};

export type GameStateActionTypes =
  | StartGameAction
  | SingleLeopardyGameAction
  | DoubleLeopardyGameAction
  | FinalLeopardyGameAction
  | ResultsGameAction;
