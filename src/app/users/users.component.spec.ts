import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ReqresService } from '../reqres.service';
import { aRandom } from '../test/aRandom';
import { of } from 'rxjs';
import { User } from '../user';
import { MatGridListModule } from '@angular/material';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let reqresServiceSpy: jasmine.SpyObj<ReqresService>;

  beforeEach(() => {
    reqresServiceSpy = jasmine.createSpyObj('ReqresService', ['getUsers']);

    TestBed.configureTestingModule({
      imports: [
        MatGridListModule
      ],
      declarations: [
        UsersComponent
      ],
      providers: [
        { provide: ReqresService, useValue: reqresServiceSpy }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('OnNgInit it should fetch users', () => {
    const users: User[] = aRandom.users();
    reqresServiceSpy.getUsers.and.returnValue(of(users));

    fixture.detectChanges();

    expect(reqresServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });
});
