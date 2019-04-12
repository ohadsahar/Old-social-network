import { Action } from '@ngrx/store';

export const SHOW_WALL = '[UI] Start WALL';
export const HIDE_WALL = '[UI] Stop WALL';

export class ShowTheWall implements Action {

  readonly type = SHOW_WALL;
}

export class HideTheWall implements Action {

  readonly type = HIDE_WALL;
}

export type UIActions = ShowTheWall | HideTheWall;

