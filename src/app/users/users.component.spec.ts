import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ReqresService } from '../reqres.service';
import { aRandom } from '../test/aRandom';
import { of } from 'rxjs';
import { User } from '../user';
import {
  MatCardModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridList,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let reqresServiceSpy: jasmine.SpyObj<ReqresService>;
  let elements: any;
  let users: User[];

  beforeEach(() => {
    reqresServiceSpy = jasmine.createSpyObj('ReqresService', ['getUsers', 'deleteUser', 'addUser']);

    TestBed.configureTestingModule({
      imports: [
        MatGridListModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        UsersComponent,
        UserDetailComponent,
        UserAddComponent,
        UserAddDialogComponent
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
    const length = users.length;
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.deleteButton().click();
    expect(reqresServiceSpy.deleteUser).toHaveBeenCalled();
    expect(component.users.length).toEqual(length - 1);
  });

  it('should call add user endpoint and add user to the list on add user event', () => {
    const newUser = {
      id: aRandom.id(),
      name: aRandom.name(),
      avatar: aRandom.user().avatar,
      date: aRandom.date(),
      createdAt: new Date()
    };
    const length = users.length;
    reqresServiceSpy.addUser.and.returnValue(of(newUser));
    component.handleAddUser({name: newUser.name, avatar: newUser.avatar, date: newUser.date});
    expect(reqresServiceSpy.addUser).toHaveBeenCalledWith({name: newUser.name, avatar: newUser.avatar, date: newUser.date});
    expect(component.users.length).toEqual(length + 1);
  });
});
