import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ReqresService } from '../reqres.service';
import { aRandom } from '../test/aRandom';
import { of } from 'rxjs';
import { User } from '../user';
import { MatCardModule, MatFormFieldModule, MatGridList, MatGridListModule, MatInputModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let reqresServiceSpy: jasmine.SpyObj<ReqresService>;
  let elements: any;
  let users: User[];

  beforeEach(() => {
    reqresServiceSpy = jasmine.createSpyObj('ReqresService', ['getUsers', 'deleteUser']);

    TestBed.configureTestingModule({
      imports: [
        MatGridListModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [
        UsersComponent,
        UserDetailComponent
      ],
      providers: [
        { provide: ReqresService, useValue: reqresServiceSpy },
        FormBuilder
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    elements = {
      matGridList: (): MatGridList => fixture.debugElement.query(By.directive(MatGridList)).componentInstance,
      userDetail: (): HTMLDivElement => fixture.nativeElement.querySelector('.user-detail'),
      deleteButton: (): HTMLButtonElement => fixture.nativeElement.querySelector('.delete')
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

  it('should call delete endpoint and remove from the user list on delete event', () => {
    reqresServiceSpy.deleteUser.and.returnValue(of({}));
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.deleteButton().click();
    expect(reqresServiceSpy.deleteUser).toHaveBeenCalled();
    expect(component.users.length).toEqual(users.length - 1);
  });
});
