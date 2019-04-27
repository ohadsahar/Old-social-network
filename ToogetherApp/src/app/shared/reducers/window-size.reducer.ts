import { UIActions, MOBILE_DETECTED, TABLET_DETECTED, DESKTOP_DETECTED } from '../actions/ui.actions';

export interface State {

  mobile: boolean;
}

const initialState: State = {

    mobile: false
};

export function WindowSizeReducer(state = initialState, action: UIActions) {

  switch (action.type) {

    case MOBILE_DETECTED:
      return {
        mobile: true
      };
    case TABLET_DETECTED:
      return {
        mobile: false
      };
    case DESKTOP_DETECTED:
      return {
        mobile: false
      };
      default: {
        return state;
      }
    }
}

export const GetMobileOrDesktop = (state: State) => state.mobile;
