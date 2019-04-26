import { Action } from '@ngrx/store';
export const START_LOADING = ' [UI] Start Loading';
export const STOP_LOADING = ' [UI] Stop Loading';
export const SHOW_WALL = ' [UI]Start WALL';
export const HIDE_WALL = ' [UI]Stop WALL';
export const EDIT_ABLE = ' [UI]Start Editing';
export const EDIT_CANCEL = ' [UI] Stop Editing';
export const MOBILE_DETECTED = ' [UI] Mobile';
export const TABLET_DETECTED = ' [UI] Tablet';
export const DESKTOP_DETECTED = ' [UI] Desktop';


export class StartLoading implements Action {

  readonly type = START_LOADING;
}

export class StopLoading implements Action {

  readonly type = STOP_LOADING;
}

export class ShowTheWall implements Action {

  readonly type = SHOW_WALL;
}

export class HideTheWall implements Action {

  readonly type = HIDE_WALL;
}

export class EditAble implements Action {

  readonly type = EDIT_ABLE;
}

export class CancelEdit implements Action {

  readonly type = EDIT_CANCEL;
}

export class Mobile implements Action {

  readonly type = MOBILE_DETECTED;
}

export class Tablet implements Action {

  readonly type = TABLET_DETECTED;
}

export class Desktop implements Action {

  readonly type = DESKTOP_DETECTED;
}

export type UIActions = StartLoading | StopLoading | ShowTheWall | HideTheWall |
 EditAble | CancelEdit | Mobile | Tablet | Desktop;
