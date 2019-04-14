import {SHOW_WALL, HIDE_WALL, UIActions} from '../actions/ui.actions';



export interface State {
  profileAble: boolean;
  wallAble: boolean;
}

const initialState: State = {
  profileAble: true,
  wallAble: false
};


export function WallAbleReducer(state = initialState, action: UIActions) {

  switch (action.type) {
    case SHOW_WALL:
      return {
        wallAble: true,
        profileAble: false
      };
    case HIDE_WALL:
      return {
        wallAble: false,
        profileAble: true
      };
    default:
      return state;
  }
}


export const GetProfileAble = (state: State) => state.profileAble;
export const GetWallAble = (state: State) => state.wallAble;

