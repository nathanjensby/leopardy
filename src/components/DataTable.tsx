import { Grid, Button, Text, Flex } from "theme-ui";
import {
  ICategory,
  IQuestion,
  ACTIVATED_QUESTIONS_TYPES,
  IQuestionData,
} from "../types/types";
import { useContext } from "react";
import { ModalContext } from "../contexts/modalContext";
import { QuestionsContext } from "../contexts/questionsContext";

const DataTable = ({
  leopardyStageData,
}: {
  leopardyStageData: IQuestionData;
}) => {
  const [questionsState, questionsDispatch] = useContext(QuestionsContext);
  const { setIsOpen } = useContext(ModalContext);

  if (!leopardyStageData || !leopardyStageData.categories) {
    return;
  }

  const { categories } = leopardyStageData;

  const columnNamesArr = categories.map((category) => category.name);

  const values = categories[0].questions.map((question) => question.value);

  const getDataByValue = (value: number): IQuestion[] =>
    categories.flatMap((category: ICategory) =>
      category.questions.filter(
        (question: IQuestion) => question.value === value
      )
    );

  const handleActivatedQuestion = (question: IQuestion) => {
    setIsOpen(true);
    questionsDispatch({
      type: ACTIVATED_QUESTIONS_TYPES.ACTIVATED_QUESTION,
      activatedQuestion: question,
    });
  };

  return (
    <Grid
      sx={{
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
        gap: 2,
      }}
    >
      {columnNamesArr.map((name, index) => (
        <Flex
          sx={{
            flexWrap: "wrap",
            p: 2,
            wordBreak: "break-word",
            bg: "primary",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={index}
        >
          <Text
            sx={{
              fontSize: "clamp(16px, 2vw, 16px)",
              color: "text",
              fontWeight: 700,
            }}
          >
            {name}
          </Text>
        </Flex>
      ))}
      {values.map((value) =>
        getDataByValue(value).map((question, index) => (
          <Flex key={index}>
            {questionsState.activatedQuestions.indexOf(question) === -1 && (
              <Button
                sx={{
                  variant: "buttons.dataTable",
                }}
                onClick={() => handleActivatedQuestion(question)}
              >
                ${question.value}
              </Button>
            )}
          </Flex>
        ))
      )}
    </Grid>
  );
};

export default DataTable;
