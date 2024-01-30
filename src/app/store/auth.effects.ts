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
                        console.log('탭호출');
                        const user = this.jwtHelper.decodeToken(result.result);
                        this.store.dispatch(AuthActions.storeUserData({ user }));
                    }),
                    map((result) => {
                        console.log('맵호출');
                        return AuthActions.loginSuccess({ accessToken: result.result });
                    }),
                    catchError(( error ) => {
                        console.log('에러 호출', error);
                        
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
                    tap((accessToken) => {
                        const user = this.jwtHelper.decodeToken(accessToken);
                        this.store.dispatch(AuthActions.storeUserData({ user }));
                    }),
                    map((accessToken) => {
                        const user = this.jwtHelper.decodeToken(accessToken);
                        return AuthActions.signupSuccess({accessToken})
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