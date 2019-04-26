import { UIActions, MOBILE_DETECTED, TABLET_DETECTED, DESKTOP_DETECTED } from '../actions/ui.actions';

export interface State {

  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

const initialState: State = {

  mobile: false,
  tablet: false,
  desktop: false
}

export function WindowTrackerReducer(state = initialState, action: UIActions) {

  switch(action.type) {

    case MOBILE_DETECTED:
      return {
        mobile: true
      };
    case TABLET_DETECTED:
      return {
        tablet: true
      };
    case DESKTOP_DETECTED:
    return {
      desktop: true
    }
  }
}



