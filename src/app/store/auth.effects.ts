import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => 
        this.actions.pipe(
            ofType(AuthActions.login),
            mergeMap((action) =>
                this.authService.login({ id: action.id, password: action.password}).pipe(
                    tap((result) => {
                        console.log('AuthEffects탭호출', result.result);
                        const user = this.jwtHelper.decodeToken(result.result);
                        this.store.dispatch(AuthActions.storeUserData({ user }));
                    }),
                    map((result) => {
                        console.log('AuthEffects맵호출');
                        return AuthActions.loginSuccess({ accessToken: result.result });
                    }),
                    catchError(( error ) => {
                        console.log('AuthEffects에러 호출', error);
                        
                        return of(AuthActions.loginFailure({ error }))
                    }
                )
                )
            )
        )
    )

    signup$ = createEffect(() =>
        this.actions.pipe(
            ofType(AuthActions.signUp),
            mergeMap((action) => 
                this.authService.register(action.user).pipe(
                    tap((result) => {
                        console.log('AuthEffects탭호출', result.result);
                        const user = this.jwtHelper.decodeToken(result.result);
                        this.store.dispatch(AuthActions.storeUserData({ user }));
                    }),
                    map((result) => {
                        const user = this.jwtHelper.decodeToken(result.result);
                        return AuthActions.signupSuccess({ accessToken: result.result})
                    }),
                    catchError((error) => of(AuthActions.signupFailure({ error })))
                )
            )
        )
    )

    constructor(
        private authService: AuthService,
        private actions: Actions,
        private jwtHelper: JwtHelperService,
        private store: Store
    ){}
}