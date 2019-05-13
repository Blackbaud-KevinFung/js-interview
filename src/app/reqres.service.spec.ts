import { TestBed } from '@angular/core/testing';

import { ApiUser, ReqresService, UserResponse } from './reqres.service';
import { HttpClient } from '@angular/common/http';
import { aRandom } from './test/aRandom';
import { User } from './user';
import { of } from 'rxjs';
import { type } from 'os';

describe('ReqresService', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClient}
      ]
    });
  });

  it('should be created', () => {
    const service: ReqresService = TestBed.get(ReqresService);
    expect(service).toBeTruthy();
  });

  it('should map get user response to a user', () => {
    const user: User = aRandom.user();
    const apiUser: ApiUser = {
      id: user.id,
      email: '',
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar
    };
    const userResponse: UserResponse = {
      page: 1,
      per_page: 1,
      total: 1,
      total_pages: 1,
      data: [apiUser]
    };
    httpClient.get.and.returnValue(of(userResponse));
    const service: ReqresService = TestBed.get(ReqresService);
    service.getUsers().subscribe((value: User[]) => {
      const returnedUser: User = value[0];
      expect(returnedUser.first_name).toEqual(user.first_name);
      expect(returnedUser.last_name).toEqual(user.last_name);
      expect(returnedUser.avatar).toEqual(user.avatar);
    });
  });
});
