import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/types/user.interface';
import { getUser, updateUser } from 'src/app/store/user/user.action';
import { getProfileData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  breadcrumbs = [{ label: '/', url: '/' }];

  userId: string | null = null;
  editData!: Omit<IUser, 'password'>;
  cities: string[] = [
    'Moscow',
    'Saint Petersburg',
    'Novosibirsk',
    'Yekaterinburg',
    'Nizhny Novgorod',
    'Kazan',
    'Chelyabinsk',
    'Omsk',
    'Samara',
    'Rostov-on-Don',
  ];

  profileForm = this.builder.group({
    id: this.builder.control(''),
    username: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    surname: this.builder.control('', Validators.required),
    city: this.builder.control('', Validators.required),
    birthDay: this.builder.control(new Date(), Validators.required),
  });

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];

      if (this.userId) {
        this.store.dispatch(getUser({ id: this.userId }));
        this.store.select(getProfileData).subscribe((item) => {
          this.editData = item as Omit<IUser, 'password'>;
          if (this.editData) {
            this.profileForm.setValue({
              id: this.editData.id,
              username: this.editData.username,
              name: this.editData.name,
              surname: this.editData.surname,
              city: this.editData.city,
              birthDay: this.editData.birthDay,
            });
          } else {
            this.router.navigateByUrl('/');
          }
        });
      }
    });
  }

  save() {
    if (this.profileForm.valid) {
      const updateData: Omit<IUser, 'password'> = {
        id: this.profileForm.value.id as string,
        username: this.profileForm.value.username as string,
        name: this.profileForm.value.name as string,
        surname: this.profileForm.value.surname as string,
        city: this.profileForm.value.city as string,
        birthDay: this.profileForm.value.birthDay as Date,
      };
      this.store.dispatch(updateUser({ id: this.userId!, updateData }));
    }
  }
}
