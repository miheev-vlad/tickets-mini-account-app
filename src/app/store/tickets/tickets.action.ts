import { createAction, props } from '@ngrx/store';
import { ITicket } from 'src/app/types/ticket.interface';

export const LOAD_TICKETS_START = '[tickets] load tickets';
export const LOAD_TICKETS_SUCCESS = '[tickets] load tickets success';
export const LOAD_TICKETS_FAILURE = '[tickets] load tickets failure';

export const UPDATE_TICKET = '[ticket] update ticket';

export const loadTicketsStart = createAction(LOAD_TICKETS_START);

export const loadTicketsSuccess = createAction(
  LOAD_TICKETS_SUCCESS,
  props<{ ticketsList: ITicket[] }>()
);

export const loadTicketsFailure = createAction(
  LOAD_TICKETS_FAILURE,
  props<{ errorMessage: string }>()
);

export const updateTicket = createAction(
  UPDATE_TICKET,
  props<{ id: string; updateData: Partial<ITicket> }>()
);
