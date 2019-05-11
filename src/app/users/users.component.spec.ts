import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ReqresService } from '../reqres.service';
import { aRandom } from '../test/aRandom';
import { of } from 'rxjs';
import { User } from '../user';
import { MatGridList, MatGridListModule } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let reqresServiceSpy: jasmine.SpyObj<ReqresService>;
  let elements: any;
  let users: User[];

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
    elements = {
      matGridList: (): MatGridList => fixture.debugElement.query(By.directive(MatGridList)).componentInstance
    };
    users = aRandom.users();
    reqresServiceSpy.getUsers.and.returnValue(of(users));
    fixture.detectChanges();
  });

  it('OnNgInit it should fetch users', () => {
    expect(reqresServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(users);
  });

  it('should have a grid size of 2', () => {
    expect(elements.matGridList().cols).toEqual(2);
  });
});
