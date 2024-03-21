import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/types/user.interface';
import {
  getUser,
  loginStart,
  loginSuccess,
  setProfileData,
  updateUser,
} from './user.action';
import { showAlert } from '../common/common.action';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private route: Router
  ) {}

  userLogin = createEffect(() =>
    this.action$.pipe(
      ofType(loginStart),
      switchMap((action) => {
        return this.userService.userLogin(action.loginData).pipe(
          switchMap((data: IUser[]) => {
            if (data.length > 0) {
              const userData = data[0];
              this.userService.setUserToLocalStorage(userData);
              this.route.navigate(['']);
              return of(
                loginSuccess({
                  userInfo: userData,
                }),
                showAlert({ message: 'Login success!', resultType: 'pass' })
              );
            } else {
              return of(
                showAlert({
                  message: 'Login Failed: Invalid credentials.',
                  resultType: 'fail',
                })
              );
            }
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Error occurred: ' + error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  getUser = createEffect(() =>
    this.action$.pipe(
      ofType(getUser),
      exhaustMap((action) => {
        return this.userService.getUserById(action.id).pipe(
          switchMap((data) => {
            const profileData = { ...data, password: undefined };
            return of(setProfileData({ profileData }));
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to fetch data :' + error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  updateUser = createEffect(() =>
    this.action$.pipe(
      ofType(updateUser),
      exhaustMap((action) => {
        return this.userService.updateUser(action.id, action.updateData).pipe(
          switchMap(() => {
            return of(
              showAlert({
                message: 'Update Success!',
                resultType: 'pass',
              })
            );
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to fetch data :' + error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
