import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';

const apiUrl = 'https://reqres.in/api/users';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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

  public updateUser(id: number, user: UpdateUser): Observable<UpdateUserResponse> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<UpdateUserResponse>(url, user, httpOptions);
  }
}

export class UpdateUser {
  name: string;
}

export class UpdateUserResponse {
  name: string;
  updatedAt: Date;
}

class UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
