import { createContext } from "react";
import { QuestionsActionsTypes, IQuestion } from "../types/types";
export const QuestionsContext = createContext<
  [
    {
      activatedQuestions: IQuestion[];
      currentQuestion: IQuestion;
    },
    React.Dispatch<QuestionsActionsTypes>
  ]
>([
  {
    activatedQuestions: [],
    currentQuestion: {} as IQuestion,
  },
  () => {},
]);
