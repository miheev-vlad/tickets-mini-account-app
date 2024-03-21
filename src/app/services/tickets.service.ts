import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ITicket } from '../types/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  apiBaseUrl = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(this.apiBaseUrl);
  }

  updateTicket(id: string, updateData: Partial<ITicket>) {
    return this.http.get<ITicket>(this.apiBaseUrl + '/' + id).pipe(
      switchMap((data) => {
        const updateTicket = { ...data, ...updateData };
        return this.http.put(this.apiBaseUrl + '/' + id, updateTicket);
      })
    );
  }
}
