import { TestBed } from '@angular/core/testing';

import { ApiUser, ReqresService, UserResponse } from './reqres.service';
import { HttpClient } from '@angular/common/http';
import { aRandom } from './test/aRandom';
import { User } from './user';
import { of } from 'rxjs';

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
    const apiUser: ApiUser = aRandom.apiUser();
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
      expect(returnedUser.id).toEqual(apiUser.id);
      expect(returnedUser.name).toEqual(apiUser.first_name + ' ' + apiUser.last_name);
      expect(returnedUser.avatar).toEqual(apiUser.avatar);
    });
  });
});
