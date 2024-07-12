import { Grid, Box, Button } from "theme-ui";
import testData from "../assets/questions.json";
import { ICategory, IQuestion } from "../types/types";

const DataTable = () => {
  const { categories } = testData.data;
  const pointValues = [100, 200, 300, 400, 500];

  const columnNamesArr = categories.map((category) => category.name);

  const getDataByValue = (value: number): IQuestion[] =>
    categories
      .map((category: ICategory) =>
        category.questions.filter(
          (question: IQuestion) => question.value === value
        )
      )
      .flat();

  return (
    <Grid
      sx={{
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
      }}
    >
      {columnNamesArr.map((name) => (
        <Box>
          <Button>{name}</Button>
        </Box>
      ))}
      {pointValues.map((value) =>
        getDataByValue(value).map((question) => (
          <Box>
            <Button>${question.value}</Button>
          </Box>
        ))
      )}
    </Grid>
  );
};

export default DataTable;
