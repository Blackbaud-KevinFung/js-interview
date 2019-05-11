import { TestBed } from '@angular/core/testing';

import { ReqresService } from './reqres.service';
import { HttpClient } from '@angular/common/http';

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
});
