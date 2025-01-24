import { useContext } from "react";
import { Button, Flex, Text } from "theme-ui";
import {
  ACTIVATED_QUESTIONS_TYPES,
  IQuestion,
  IQuestionData,
} from "../types/types";
import { QuestionsContext } from "../contexts/questionsContext";
import { ModalContext } from "../contexts/modalContext";

const FinalLeopardy = ({
  leopardyStageData,
}: {
  leopardyStageData: IQuestionData;
}) => {
  const [, questionsDispatch] = useContext(QuestionsContext);
  const { setIsOpen } = useContext(ModalContext);

  if (!leopardyStageData || !leopardyStageData.categories) {
    return;
  }

  const { categories } = leopardyStageData;

  const handleActivatedCategory = (questions: IQuestion[]) => {
    const question = questions[0];
    setIsOpen(true);
    questionsDispatch({
      type: ACTIVATED_QUESTIONS_TYPES.ACTIVATED_QUESTION,
      activatedQuestion: question,
    });
  };

  return (
    <Flex
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "644px",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {categories.map((category, i) => (
        <Flex
          key={i}
          sx={{
            maxWidth: "40vw",
            width: "100%",
            height: "33%",
          }}
        >
          <Button
            onClick={() => handleActivatedCategory(category.questions)}
            sx={{ width: "100%" }}
          >
            <Text sx={{ fontSize: "clamp(16px, 4vw, 24px)" }}>
              {category.name}
            </Text>
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};

export default FinalLeopardy;
