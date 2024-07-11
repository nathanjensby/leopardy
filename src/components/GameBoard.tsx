import { Box, Button, Grid } from "theme-ui";

const GameBoard = ({
  setIsPlaying,
}: {
  setIsPlaying: (isPlaying: boolean) => void;
}) => {
  return (
    <Box>
      <Grid></Grid>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsPlaying(false);
        }}
      >
        Quit
      </Button>
    </Box>
  );
};

export default GameBoard;
