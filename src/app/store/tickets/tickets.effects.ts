import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, of, map, switchMap } from 'rxjs';
import { TicketsService } from 'src/app/services/tickets.service';
import {
  loadTicketsFailure,
  loadTicketsStart,
  loadTicketsSuccess,
  updateTicket,
} from './tickets.action';
import { showAlert } from '../common/common.action';

@Injectable()
export class TicketsEffects {
  constructor(
    private action$: Actions,
    private ticketsService: TicketsService
  ) {}

  loadTickets = createEffect(() =>
    this.action$.pipe(
      ofType(loadTicketsStart),
      exhaustMap(() => {
        return this.ticketsService.getTickets().pipe(
          map((data) => {
            return loadTicketsSuccess({ ticketsList: data });
          }),
          catchError((error) =>
            of(loadTicketsFailure({ errorMessage: error.message }))
          )
        );
      })
    )
  );

  updateTicket = createEffect(() =>
    this.action$.pipe(
      ofType(updateTicket),
      exhaustMap((action) => {
        return this.ticketsService
          .updateTicket(action.id, action.updateData)
          .pipe(
            switchMap(() => {
              return of(
                loadTicketsStart(),
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
