import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLoadingReducer from './shared/reducers/loading.reducer';
import * as fromWallAbleReducer from './shared/reducers/wallable.reducer';
import * as fromEditProfileAbleReducer from './shared/reducers/profleedit.reducer';
export interface State {

    uiReducerLoading: fromLoadingReducer.State;
    uiReducerWall: fromWallAbleReducer.State;
    UIReducerEdit: fromEditProfileAbleReducer.State;

}

export const Reducers: ActionReducerMap<State> = {
  uiReducerLoading: fromLoadingReducer.LoadingReducer,
  uiReducerWall: fromWallAbleReducer.WallAbleReducer,
  UIReducerEdit: fromEditProfileAbleReducer.EditProfileAbleReducer
};

export const GetReducuerLoading = createFeatureSelector<fromLoadingReducer.State>('uiReducerLoading');
export const GetReducerWall = createFeatureSelector<fromWallAbleReducer.State>('uiReducerWall');
export const GetReducerEdit = createFeatureSelector<fromEditProfileAbleReducer.State>('UIReducerEdit');

export const getIsLoading = createSelector(GetReducuerLoading, fromLoadingReducer.getIsLoading);
export const getIsEditAble = createSelector(GetReducerEdit, fromEditProfileAbleReducer.getIsEditAble);
export const getIsWallAble = createSelector(GetReducerWall, fromWallAbleReducer.GetWallAble);
export const getIsProfileAble = createSelector(GetReducerWall, fromWallAbleReducer.GetProfileAble);
