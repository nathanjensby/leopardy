import { createContext } from "react";
import { ActionTypes, IPlayer } from "../types/types";
export const PlayersContext = createContext<
  [{ players: IPlayer[] }, React.Dispatch<ActionTypes>]
>([{ players: [] }, () => {}]);
