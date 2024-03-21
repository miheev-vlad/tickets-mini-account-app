import { createReducer, on } from '@ngrx/store';
import { loadTicketsFailure, loadTicketsSuccess } from './tickets.action';
import { ticketsState } from './tickets.state';

const _ticketsReducer = createReducer(
  ticketsState,
  on(loadTicketsSuccess, (state, action) => {
    return {
      ...state,
      ticketsList: [...action.ticketsList],
      errorMessage: '',
    };
  }),
  on(loadTicketsFailure, (state, action) => {
    return {
      ...state,
      ticketsList: [],
      errorMessage: action.errorMessage,
    };
  })
);

export function ticketsReducer(state: any, action: any) {
  return _ticketsReducer(state, action);
}
