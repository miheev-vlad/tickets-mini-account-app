import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from './services/user.service';
import { setProfileData } from './store/user/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUserDataFromStorage();
    if (user) {
      const profileData = {
        ...user,
        password: undefined,
      };
      this.store.dispatch(setProfileData({ profileData }));
    }
  }
}
