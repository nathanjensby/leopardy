import { useEffect, useState } from "react";
import { GAME_STATE_ACTION_TYPES, IQuestionData } from "../types/types";

import testData from "../assets/questions.json";

export default (gameState: keyof typeof GAME_STATE_ACTION_TYPES) => {
  const [loadedQuestions, setLoadedQuestions] = useState({} as IQuestionData);
  const { data } = testData;

  useEffect(() => {
    const stageToLoad = data.filter(
      (questionSet) => questionSet.stage === gameState
    );
    setLoadedQuestions(stageToLoad[0]);
  }, [data, gameState]);

  return { loadedQuestions, setLoadedQuestions };
};
