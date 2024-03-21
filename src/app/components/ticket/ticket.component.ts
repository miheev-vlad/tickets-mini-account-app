import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { updateUser } from 'src/app/store/user/user.action';
import { ITicket } from 'src/app/types/ticket.interface';
import { getTicket } from 'src/app/store/tickets/tickets.selectors';
import { updateTicket } from 'src/app/store/tickets/tickets.action';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  breadcrumbs = [
    { label: '/', url: '/' },
    { label: 'tickets', url: '/tickets' },
  ];

  ticketId: string | null = null;
  editData!: ITicket;

  ticketForm = this.builder.group({
    id: this.builder.control(''),
    title: this.builder.control('', Validators.required),
    dateCreation: this.builder.control(new Date(), Validators.required),
  });

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ticketId = params['id'];

      if (this.ticketId) {
        this.store.select(getTicket(this.ticketId)).subscribe((item) => {
          this.editData = item as ITicket;
          if (this.editData) {
            this.ticketForm.setValue({
              id: this.editData.id,
              title: this.editData.title,
              dateCreation: this.editData.dateCreation,
            });
          } else {
            this.router.navigateByUrl('/');
          }
        });
      }
    });
  }

  save() {
    if (this.ticketForm.valid) {
      const updateData: ITicket = {
        id: this.ticketForm.value.id as string,
        title: this.ticketForm.value.title as string,
        dateCreation: this.ticketForm.value.dateCreation as Date,
      };
      this.store.dispatch(updateTicket({ id: this.ticketId!, updateData }));
      this.router.navigateByUrl('/');
    }
  }
}
