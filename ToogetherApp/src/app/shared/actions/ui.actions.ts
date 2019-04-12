import { Action } from '@ngrx/store';

export const START_LOADING = 'Start Loading';
export const STOP_LOADING = 'Stop Loading';
export const SHOW_WALL = 'Start WALL';
export const HIDE_WALL = 'Stop WALL';

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

export type UIActions = StartLoading | StopLoading | ShowTheWall | HideTheWall;

