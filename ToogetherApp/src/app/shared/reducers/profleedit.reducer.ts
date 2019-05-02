import { EDIT_ABLE, EDIT_CANCEL, UIActions } from '../actions/ui.actions';

export interface State {
  editAble: boolean;
  counter: number;
}
const initialState: State = {
  editAble: false,
  counter: 0,
};

export function editProfileAbleReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case EDIT_ABLE:
      return {
        editAble: true,
        counter: 0
      };
    case EDIT_CANCEL:
      return {
        editAble: false,
        counter: 0,
      };
    default: {
      return state;
    }
  }
}
export const getIsEditAble = (state: State) => state.editAble;
