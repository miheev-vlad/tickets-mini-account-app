import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { loadTicketsStart } from 'src/app/store/tickets/tickets.action';
import { getTicketsList } from 'src/app/store/tickets/tickets.selectors';
import { ITicket } from 'src/app/types/ticket.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  breadcrumbs = [{ label: '/', url: '/' }];

  ticketsList: ITicket[] = [];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'title', 'date'];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadTicketsStart());
    this.store.select(getTicketsList).subscribe((item) => {
      this.ticketsList = item;
      this.dataSource = new MatTableDataSource<ITicket>(this.ticketsList);
      this.dataSource.paginator = this.paginator;
    });
  }

  onRowClicked(id: string): void {
    this.router.navigate(['ticket', id]);
  }
}
