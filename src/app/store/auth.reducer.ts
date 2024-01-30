import { createReducer, on } from "@ngrx/store";
import { State } from "./state.interface";
import * as AuthActions from './auth.actions'

export const initialState: State = {
    accessToken: null,
    user: null,
    error: null,
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, { accessToken }) => {
        console.log('로그인 success 호출');
        
        return { ...state, accessToken }
    })
    // on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
    // on(AuthActions.signupSuccess, (state, { accessToken }) => ({ ...state, accessToken })),
    // on(AuthActions.signupFailure, (state, { error }) => ({ ...state, error })),
    // on(AuthActions.storeUserData, (state, { user }) => ({ ...state, user })),
)