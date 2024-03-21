import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, map } from 'rxjs';
import { emptyAction, showAlert } from './common.action';

@Injectable()
export class CommonEffects {
  constructor(private $action: Actions, private snackBar: MatSnackBar) {}

  showAlert = createEffect(() =>
    this.$action.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  showSnackBarAlert(message: string, resultType: string = 'fail') {
    let _class = resultType === 'pass' ? 'green-snackbar' : 'red-snackbar';
    return this.snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class],
    });
  }
}
