import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserId } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements DoCheck, OnInit {
  userId!: string;
  isMenuVisible = false;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.select(getUserId).subscribe((userId) => {
      if (userId) {
        this.userId = userId;
      }
    });
  }

  ngDoCheck(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/login') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }
}
