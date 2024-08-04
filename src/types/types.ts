import { Dispatch, SetStateAction } from "react";

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
  TRIPLE_LEOPARDY = "TRIPLE_LEOPARDY",
  QUADRUPLE_LEOPARDY = "QUADRUPLE_LEOPARDY",
  FINAL_LEOPARDY = "FINAL_LEOPARDY",
  RESULTS = "RESULTS",
}

export enum ACTIVATED_QUESTIONS_TYPES {
  ACTIVATED_QUESTION = "ACTIVATED_QUESTION",
  CLEAR_ALL = "CLEAR_ALL",
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

export type TripleLeopardyGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.TRIPLE_LEOPARDY;
};

export type QuadrupleLeopardyGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.QUADRUPLE_LEOPARDY;
};

export type FinalLeopardyGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.FINAL_LEOPARDY;
};

export type ResultsGameAction = {
  type: typeof GAME_STATE_ACTION_TYPES.RESULTS;
};

export type ActivatedQuestionAction = {
  type: typeof ACTIVATED_QUESTIONS_TYPES.ACTIVATED_QUESTION;
  activatedQuestion: IQuestion;
};

export type ClearActivatedQuestionAction = {
  type: typeof ACTIVATED_QUESTIONS_TYPES.CLEAR_ALL;
};

export type IPlayersState = {
  players: IPlayer[];
};

export type IGameState = {
  gameState: keyof typeof GAME_STATE_ACTION_TYPES;
};

export type IQuestionsState = {
  activatedQuestions: IQuestion[];
  currentQuestion: IQuestion;
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
  value: number;
};

export type SubtractScorePlayerAction = {
  type: typeof ACTION_TYPES.SUBTRACT_SCORE;
  player: IPlayer;
  value: number;
};

export type ResetPlayersAction = {
  type: typeof ACTION_TYPES.RESET;
  player: IPlayer;
};

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
  isDailyDouble: boolean;
};

export type GameStateActionTypes =
  | StartGameAction
  | SingleLeopardyGameAction
  | DoubleLeopardyGameAction
  | TripleLeopardyGameAction
  | QuadrupleLeopardyGameAction
  | FinalLeopardyGameAction
  | ResultsGameAction;

export type ActionTypes =
  | AddPlayerAction
  | DeletePlayerAction
  | EditPlayerAction
  | AddScorePlayerAction
  | SubtractScorePlayerAction
  | ResetPlayersAction;

export type QuestionsActionsTypes =
  | ActivatedQuestionAction
  | ClearActivatedQuestionAction;

export type IModal = {
  isOpen: boolean;
  toggleModal: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type IQuestionData = {
  stage: string;
  categories: ICategory[];
};
