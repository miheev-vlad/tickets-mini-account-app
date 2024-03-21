import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ILoginData } from '../types/loginData.interface';
import { IUser } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiBaseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  userLogin(loginData: ILoginData): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      this.apiBaseUrl +
        '?username=' +
        loginData.username +
        '&password=' +
        loginData.password
    );
  }

  getUserById(id: string) {
    return this.http.get<IUser>(this.apiBaseUrl + '/' + id);
  }

  updateUser(id: string, updateData: Partial<IUser>) {
    return this.http.get<IUser>(this.apiBaseUrl + '/' + id).pipe(
      switchMap((data) => {
        const updateUser = { ...data, ...updateData };
        return this.http.put(this.apiBaseUrl + '/' + id, updateUser);
      })
    );
  }

  setUserToLocalStorage(userData: IUser) {
    localStorage.setItem('userdata', JSON.stringify(userData));
  }

  getUserDataFromStorage(): IUser | null {
    const userJsonData = localStorage.getItem('userdata');
    if (userJsonData) {
      return JSON.parse(userJsonData);
    } else {
      return null;
    }
  }
}
