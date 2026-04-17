import { Grid, Button, Text, Flex, Box } from "theme-ui";
import {
  ICategory,
  IQuestion,
  ACTIVATED_QUESTIONS_TYPES,
  IQuestionData,
} from "../types/types";
import { useContext } from "react";
import { ModalContext } from "../contexts/modalContext";
import { QuestionsContext } from "../contexts/questionsContext";
import { socket } from "../utils/utils";
import { SOCKET_ACTIONS } from "../utils/enums";

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
    socket.emit(SOCKET_ACTIONS.CLOSE_BUZZERS);
    setIsOpen(true);
    questionsDispatch({
      type: ACTIVATED_QUESTIONS_TYPES.ACTIVATED_QUESTION,
      activatedQuestion: question,
    });
  };

  const categoryHeaderSx = {
    flexWrap: "wrap",
    p: 2,
    wordBreak: "break-word",
    bg: "primary",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  } as const;

  const renderCategoryColumn = (category: ICategory) => (
    <Box
      key={category.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Flex sx={categoryHeaderSx}>
        <Text
          sx={{
            fontSize: "clamp(20px, 6vw, 28px)",
            color: "text",
            fontFamily: "card",
          }}
        >
          {category.name}
        </Text>
      </Flex>
      {category.questions.map((question) => (
        <Box key={question.id}>
          {questionsState.activatedQuestions.indexOf(question) === -1 && (
            <Button
              sx={{
                variant: "buttons.dataTable",
                minHeight: "84px",
                fontSize: "clamp(28px, 10vw, 48px)",
              }}
              onClick={() => handleActivatedQuestion(question)}
            >
              ${question.value}
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Grid
        sx={{
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: 2,
          maxHeight: "85vh",
          "@media screen and (max-width: 1100px)": {
            display: "none",
          },
        }}
      >
        {columnNamesArr.map((name, index) => (
          <Flex sx={categoryHeaderSx} key={index}>
            <Text
              sx={{
                fontSize: "clamp(16px, 4vw, 24px)",
                color: "text",
                fontFamily: "card",
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
      <Box
        sx={{
          display: "none",
          "@media screen and (min-width: 721px) and (max-width: 1100px)": {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 3,
            alignItems: "start",
          },
        }}
      >
        {categories.map(renderCategoryColumn)}
      </Box>
      <Box
        sx={{
          display: "none",
          "@media screen and (max-width: 720px)": {
            display: "flex",
            flexDirection: "column",
            gap: 3,
          },
        }}
      >
        {categories.map(renderCategoryColumn)}
      </Box>
    </>
  );
};

export default DataTable;
