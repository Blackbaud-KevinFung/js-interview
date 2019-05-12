import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';

const apiUrl = 'https://reqres.in/api/users';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<UserResponse>(`${apiUrl}?per_page=50`)
        .pipe(
            map((res) => res.data)
        );
  }
}

class UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
