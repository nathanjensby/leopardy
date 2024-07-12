export enum ACTION_TYPES {
    ADD = 'ADD_PLAYER',
    EDIT = 'EDIT_PLAYER',
    DELETE = 'DELETE_PLAYER',
    ADD_SCORE = "ADD_SCORE",
    SUBTRACT_SCORE = "SUBTRACT_SCORE"
}

export type IState = {
    players: IPlayer[]
}

export type IPlayer = {
    id: string;
    name: string;
    score: number;
}

export type AddPlayerAction = {
    type: typeof ACTION_TYPES.ADD,
    player: IPlayer
}

export type DeletePlayerAction = {
    type: typeof ACTION_TYPES.DELETE,
    player: IPlayer
}

export type EditPlayerAction = {
    type: typeof ACTION_TYPES.EDIT,
    player: IPlayer
}

export type AddScorePlayerAction = {
    type: typeof ACTION_TYPES.ADD_SCORE,
    player: IPlayer,
    scoreToAdd: number
}

export type SubtractScorePlayerAction = {
    type: typeof ACTION_TYPES.SUBTRACT_SCORE,
    player: IPlayer
    scoreToSubtract: number
}

export type ActionTypes = 
    AddPlayerAction | DeletePlayerAction | EditPlayerAction | AddScorePlayerAction| SubtractScorePlayerAction

export type IPlayerList = {
        players: IPlayer[];
      };

export type IData = {
    categories: ICategory[]
}

export type ICategory = {
    name: string,
    id: number,
    questions: IQuestion[]
}

export type IQuestion = {
    id: number,
    answer: string,
    question: string,
    value: number
}