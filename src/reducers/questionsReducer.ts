import {
  ACTIVATED_QUESTIONS_TYPES,
  IQuestion,
  IQuestionsState,
} from "../types/types";

export function questionsReducer(
  state: IQuestionsState,
  action: { type: string; activatedQuestion?: IQuestion }
): IQuestionsState {
  switch (action.type) {
    case ACTIVATED_QUESTIONS_TYPES.ACTIVATED_QUESTION: {
      return action.activatedQuestion
        ? {
            ...state,
            currentQuestion: action.activatedQuestion,
            activatedQuestions: [
              ...state.activatedQuestions,
              action.activatedQuestion,
            ],
          }
        : { ...state };
    }

    case ACTIVATED_QUESTIONS_TYPES.CLEAR_ALL: {
      return {
        ...state,
        currentQuestion: {} as IQuestion,
        activatedQuestions: [],
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
