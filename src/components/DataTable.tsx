import { Grid, Box, Button, Text, Flex } from "theme-ui";
import testData from "../assets/questions.json";
import {
  ICategory,
  IQuestion,
  ACTIVATED_QUESTIONS_TYPES,
} from "../types/types";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { QuestionsContext } from "../contexts/questionsContext";

const DataTable = () => {
  const [questionsState, questionsDispatch] = useContext(QuestionsContext);
  const { categories } = testData.data;
  const pointValues = [100, 200, 300, 400, 500];
  const { setIsOpen } = useContext(ModalContext);

  const columnNamesArr = categories.map((category) => category.name);

  const getDataByValue = (value: number): IQuestion[] =>
    categories
      .map((category: ICategory) =>
        category.questions.filter(
          (question: IQuestion) => question.value === value
        )
      )
      .flat();

  const handleAnsweredQuestion = (question: IQuestion) => {
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
        gap: "4 4",
      }}
    >
      {columnNamesArr.map((name, index) => (
        <Flex
          sx={{ bg: "primary", justifyContent: "center", alignItems: "center" }}
          key={index}
        >
          <Text sx={{ fontSize: [28], color: "text", fontWeight: 700 }}>
            {name}
          </Text>
        </Flex>
      ))}
      {pointValues.map((value) =>
        getDataByValue(value).map((question, index) => (
          <Box key={index}>
            {questionsState.activatedQuestions.indexOf(question) === -1 && (
              <Button
                sx={{
                  variant: "buttons.dataTable",
                }}
                onClick={() => handleAnsweredQuestion(question)}
              >
                ${question.value}
              </Button>
            )}
          </Box>
        ))
      )}
    </Grid>
  );
};

export default DataTable;
