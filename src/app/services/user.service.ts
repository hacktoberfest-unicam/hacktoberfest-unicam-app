import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { USER_MOCK } from './user.mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.baseUrl}/api/user`;

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public getUsersMOCK(): Observable<User[]> {
    return of(USER_MOCK);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  public createUserMOCK(user: User): Observable<User> {
    return of(user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.nickname}`, user);
  }

  public updateUserMOCK(user: User): Observable<User> {
    return of(user);
  }

  public deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.url}/${user.nickname}`);
  }

  public deleteUserMOCK(user: User): Observable<User> {
    return of(user);
  }
}
