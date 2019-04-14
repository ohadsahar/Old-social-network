import {EDIT_ABLE, EDIT_CANCEL, UIActions} from '../actions/ui.actions';

export interface State {
  editAble: boolean;
}

const initialStateEdit: State = {
  editAble: false
};

export function EditProfileAbleReducer(state = initialStateEdit, action: UIActions) {
  switch (action.type) {
    case EDIT_ABLE:
      return {
        editAble: true
      };
    case EDIT_CANCEL:
      return {
        editAble: false
      };
    default:
      return state;
  }
}

export const getIsEditAble = (state: State) => state.editAble;
