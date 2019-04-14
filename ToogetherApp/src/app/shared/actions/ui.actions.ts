import { Action } from '@ngrx/store';
export const START_LOADING = 'Start Loading';
export const STOP_LOADING = 'Stop Loading';
export const SHOW_WALL = 'Start WALL';
export const HIDE_WALL = 'Stop WALL';
export const EDIT_ABLE = 'Start Editing';
export const EDIT_CANCEL = 'Stop Editing';

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

export type UIActions = StartLoading | StopLoading | ShowTheWall | HideTheWall | EditAble | CancelEdit;

