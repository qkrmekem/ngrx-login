import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const login = createAction('[Auth] Login', props<{ id: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ accessToken: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const signUp = createAction('[Auth] Signup', props<{ user: User }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ accessToken: string}>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

export const storeUserData = createAction('[Auth] Store User Data', props<{ user: any }>());