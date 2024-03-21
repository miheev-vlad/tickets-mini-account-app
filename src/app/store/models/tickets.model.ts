import { ITicket } from 'src/app/types/ticket.interface';

export interface TicketsModel {
  ticketsList: ITicket[];
  errorMessage: string;
}
