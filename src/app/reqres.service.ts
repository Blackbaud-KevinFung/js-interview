import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { aRandom } from './test/aRandom';

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
            map((res: UserResponse) => res.data),
            map((apiUsers: ApiUser[]) => apiUsers.map((apiUser: ApiUser) => this.convertToUser(apiUser)))
        );
  }

  public updateUser(id: number, user: AddUpdateUser): Observable<UpdateUserResponse> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<UpdateUserResponse>(url, user, httpOptions);
  }

  public deleteUser(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  public addUser(user: AddUpdateUser): Observable<AddUserResponse> {
    return this.http.post<AddUserResponse>(apiUrl, user, httpOptions);
  }

  private convertToUser(apiUser: ApiUser): User {
    const randomDate: Date = aRandom.date();
    return {
      id: apiUser.id,
      first_name: apiUser.first_name,
      last_name: apiUser.last_name,
      avatar: apiUser.avatar,
      date: randomDate
    };
  }
}

export class AddUpdateUser {
  name: string;
  avatar: string;
  date: Date;
}

export class UpdateUserResponse {
  name: string;
  avatar: string;
  date: Date;
  updatedAt: Date;
}

export class AddUserResponse {
  id: number;
  name: string;
  avatar: string;
  date: Date;
  createdAt: Date;
}

export class UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ApiUser[];
}

export class ApiUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
