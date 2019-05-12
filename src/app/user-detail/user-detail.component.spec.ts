import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { aRandom } from '../test/aRandom';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../user';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let elements: any;
  let user: User;
  let nameFormControl: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ UserDetailComponent ],
      providers: [
        FormBuilder
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    user = aRandom.user();
    component.user = user;
    fixture.detectChanges();
    nameFormControl = component.userForm.get('name');

    elements = {
      name: (): HTMLInputElement => fixture.nativeElement.querySelector('.name'),
      avatar: (): HTMLImageElement => fixture.nativeElement.querySelector('.avatar'),
      userDetail: (): HTMLDivElement => fixture.nativeElement.querySelector('.user-detail'),
      editButton: (): HTMLButtonElement => fixture.nativeElement.querySelector('.edit')
    };
  });

  it('should display the user details and is not editable', () => {
    expect(nameFormControl.value).toEqual(user.first_name + ' ' + user.last_name);
    expect(nameFormControl.disabled).toEqual(true);
    expect(elements.avatar().src).toEqual(user.avatar);
  });

  it('should show/hide edit and delete buttons on mouse over', () => {
    expect(component.shouldShowEditDelete).toEqual(false);
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    expect(component.shouldShowEditDelete).toEqual(true);
    elements.userDetail().dispatchEvent(new Event('mouseleave'));
    expect(component.shouldShowEditDelete).toEqual(false);
  });

  it('should make user detail editable', () => {
    expect(nameFormControl.disabled).toEqual(true);
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();
    expect(nameFormControl.disabled).toEqual(false);
  });
});
