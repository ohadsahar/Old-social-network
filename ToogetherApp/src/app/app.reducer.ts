import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUIReducer from './shared/reducers/ui.reducer';
import * as WallReducer from './shared/reducers/wall.reducer';


export interface State {
    uiRed: fromUIReducer.State;
    wallRed: WallReducer.State;
}

export const Reducers: ActionReducerMap<State> = {
  uiRed: fromUIReducer.UiReducer,
  wallRed: WallReducer.WallReducer,
};

export const getUiRedState = createFeatureSelector<fromUIReducer.State>('uiRed');
export const getWallRedState = createFeatureSelector<WallReducer.State>('wallRed');
export const getIsLoading = createSelector(getUiRedState, fromUIReducer.getIsLoading);
