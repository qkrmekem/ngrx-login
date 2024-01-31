import { createSelector } from "@ngrx/store";
import { State } from "./state.interface";

export interface AppState {
    auth: State;
}

export const selectAuthState = (state: AppState) => state.auth;
export const selectAccessTokentState = (state: AppState) => state.auth.accessToken;
export const selectAccessError = (state: AppState) => state.auth.error;

export const selectAccessToken = createSelector(
    selectAccessTokentState,
    (accessToken) => {
        console.log('토큰 셀렉터 ', accessToken);
        
        return accessToken
    }
);

export const selectError = createSelector(
    selectAccessError,
    (error) => {
        console.log('selectError 호출 ', error);
        return error;
    }
);