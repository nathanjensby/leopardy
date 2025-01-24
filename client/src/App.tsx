import "./App.css";
import Splash from "./components/Splash";
import { useReducer } from "react";
import GameBoard from "./components/GameBoard";
import { PlayersContext } from "./contexts/playersContext";
import { playersReducer } from "./reducers/playersReducer";
import {
  GAME_STATE_ACTION_TYPES,
  IGameState,
  IPlayersState,
  IQuestion,
  IQuestionsState,
} from "./types/types";
import { gameStateReducer } from "./reducers/gameStateReducer";
import { GameContext } from "./contexts/gameContext";
import Results from "./components/Results";
import { ModalContext } from "./contexts/modalContext";
import Modal from "react-modal";
import useModal from "./hooks/useModal";
import { QuestionsContext } from "./contexts/questionsContext";
import { questionsReducer } from "./reducers/questionsReducer";

function App() {
  Modal.setAppElement("#root");

  const playersInitialState: IPlayersState = { players: [] };
  const gameInitialState: IGameState = {
    gameState: GAME_STATE_ACTION_TYPES.START,
  };
  const questionsInitialState: IQuestionsState = {
    activatedQuestions: [],
    currentQuestion: {} as IQuestion,
  };

  const [playersState, playersDispatch] = useReducer(
    playersReducer,
    playersInitialState
  );

  const [gameState, gameDispatch] = useReducer(
    gameStateReducer,
    gameInitialState
  );

  const [questionsState, quesitonsDispatch] = useReducer(
    questionsReducer,
    questionsInitialState
  );

  const { isOpen, toggleModal, setIsOpen } = useModal();

  const GameBoardComponent = () => {
    switch (gameState.gameState) {
      case GAME_STATE_ACTION_TYPES.START: {
        return <Splash />;
      }
      case GAME_STATE_ACTION_TYPES.RESULTS: {
        return <Results />;
      }
      default: {
        return <GameBoard />;
      }
    }
  };

  return (
    <GameContext.Provider value={[gameState, gameDispatch]}>
      <PlayersContext.Provider value={[playersState, playersDispatch]}>
        <ModalContext.Provider value={{ isOpen, toggleModal, setIsOpen }}>
          <QuestionsContext.Provider
            value={[questionsState, quesitonsDispatch]}
          >
            <GameBoardComponent />
          </QuestionsContext.Provider>
        </ModalContext.Provider>
      </PlayersContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
