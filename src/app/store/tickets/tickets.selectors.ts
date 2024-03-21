import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketsModel } from '../models/tickets.model';

const getTicketsState = createFeatureSelector<TicketsModel>('tickets');

export const getTicketsList = createSelector(getTicketsState, (state) => {
  return state.ticketsList;
});

export const getTicket = (id: string) =>
  createSelector(getTicketsState, (state) =>
    state.ticketsList.find((item) => item.id === id)
  );
