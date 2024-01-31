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
    // 로그인
    on(AuthActions.loginSuccess, (state:State, { accessToken }) => {
        return { ...state, accessToken }
    }),
    on(AuthActions.loginFailure, (state: State, { error }) => ({ ...state, error })),
    // 회원가입
    on(AuthActions.signupSuccess, (state: State, { accessToken }) => ({ ...state, accessToken })),
    on(AuthActions.signupFailure, (state: State, { error }) => ({ ...state, error })),
    // 회원정보 저장
    on(AuthActions.storeUserData, (state: State, { user }) => ({ ...state, user })),
)