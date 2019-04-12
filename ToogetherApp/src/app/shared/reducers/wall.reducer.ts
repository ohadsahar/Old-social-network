import { UIActions, SHOW_WALL, HIDE_WALL } from '../actions/ui.actions';


export interface State {

  wallAble: boolean;
  profileAble: boolean;
  editAble: boolean;
  counter: number;
}

const initialState: State = {
  wallAble: false,
  profileAble: true,
  editAble: false,
  counter: 0
};

export function WallReducer(state = initialState, action: UIActions) {

    switch (action.type) {
      case SHOW_WALL:
          return {
            wallAble: true,
            profileAble: false,
            editAble: false,
            counter: 0
          };
      case HIDE_WALL:
          return {
            wallAble: false,
            profileAble: true,
            editAble: false,
            counter: 0
          };
      default:
          return state;
    }
}


