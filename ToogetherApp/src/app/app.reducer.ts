import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUIReducer from './shared/reducers/ui.reducer';


export interface State {
    uiRed: fromUIReducer.State;
}

export const Reducers: ActionReducerMap<State> = {
  uiRed: fromUIReducer.UiReducer
};


export const getUiRedState = createFeatureSelector<fromUIReducer.State>('uiRed');
export const getIsLoading = createSelector(getUiRedState, fromUIReducer.getIsLoading);
