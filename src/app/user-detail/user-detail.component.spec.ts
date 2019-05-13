import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { aRandom } from '../test/aRandom';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../user';
import { MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReqresService } from '../reqres.service';
import { of } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let reqresServiceSpy: jasmine.SpyObj<ReqresService>;
  let elements: any;
  let user: User;
  let nameFormControl: AbstractControl;
  let dateFormControl: AbstractControl;

  beforeEach(async(() => {
    reqresServiceSpy = jasmine.createSpyObj('ReqresService', ['updateUser']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      declarations: [ UserDetailComponent ],
      providers: [
        FormBuilder,
        {provide: ReqresService, useValue: reqresServiceSpy}
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
    dateFormControl = component.userForm.get('date');

    elements = {
      name: (): HTMLInputElement => fixture.nativeElement.querySelector('.name'),
      avatar: (): HTMLImageElement => fixture.nativeElement.querySelector('.avatar'),
      userDetail: (): HTMLDivElement => fixture.nativeElement.querySelector('.user-detail'),
      editButton: (): HTMLButtonElement => fixture.nativeElement.querySelector('.edit'),
      cancelButton: (): HTMLButtonElement => fixture.nativeElement.querySelector('.cancel'),
      saveButton: (): HTMLButtonElement => fixture.nativeElement.querySelector('.save'),
      deleteButton: (): HTMLButtonElement => fixture.nativeElement.querySelector('.delete')
    };
  });

  it('should display the user details and is not editable', () => {
    expect(nameFormControl.value).toEqual(user.name);
    expect(dateFormControl.value).toEqual(user.date);
    expect(dateFormControl.disabled).toEqual(true);
    expect(nameFormControl.disabled).toEqual(true);
    expect(elements.avatar().src).toEqual(user.avatar);
  });

  it('should show/hide edit and delete buttons on mouse over', () => {
    expect(component.shouldShowEditDelete).toEqual(false);
    expect(component.shouldShowSaveCancel).toEqual(false);
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    expect(component.shouldShowEditDelete).toEqual(true);
    expect(component.shouldShowSaveCancel).toEqual(false);
    elements.userDetail().dispatchEvent(new Event('mouseleave'));
    expect(component.shouldShowEditDelete).toEqual(false);
    expect(component.shouldShowSaveCancel).toEqual(false);
  });

  it('should make user detail editable', () => {
    expect(nameFormControl.disabled).toEqual(true);
    expect(dateFormControl.disabled).toEqual(true);
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();
    expect(nameFormControl.disabled).toEqual(false);
    expect(dateFormControl.disabled).toEqual(false);
    expect(component.isEditMode).toEqual(true);
  });

  it('should show/hide save and cancel buttons when in edit mode', () => {
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();
    fixture.detectChanges();
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    expect(component.shouldShowSaveCancel).toEqual(true);
    expect(component.shouldShowEditDelete).toEqual(false);
    elements.userDetail().dispatchEvent(new Event('mouseleave'));
    expect(component.shouldShowEditDelete).toEqual(false);
    expect(component.shouldShowSaveCancel).toEqual(false);
  });

  it('should set the value of the name and date form controls back to the original value on cancel', () => {
    const originalName = component.user.name;
    const originalDate = component.user.date;
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();

    nameFormControl.setValue(aRandom.name());
    dateFormControl.setValue(aRandom.date());
    expect(nameFormControl.value).not.toEqual(originalName);
    expect(dateFormControl.value).not.toEqual(originalDate);

    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.cancelButton().click();
    expect(nameFormControl.value).toEqual(originalName);
    expect(dateFormControl.value).toEqual(originalDate);
  });

  it('should call update when clicking save', () => {
    reqresServiceSpy.updateUser.and.returnValue(
        of({
          name: aRandom.name(),
          avatar: component.user.avatar,
          date: aRandom.date(),
          updatedAt: new Date()
        }));
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();

    const updatedName: string = aRandom.name();
    const updatedDate: Date = aRandom.date();
    nameFormControl.setValue(updatedName);
    dateFormControl.setValue(updatedDate);
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.saveButton().click();

    expect(reqresServiceSpy.updateUser)
        .toHaveBeenCalledWith(component.user.id, {name: updatedName, avatar: component.user.avatar, date: updatedDate});
    expect(nameFormControl.disabled).toEqual(true);
    expect(dateFormControl.disabled).toEqual(true);
    expect(component.isEditMode).toEqual(false);
  });

  it('should emit a delete event if delete button is clicked', () => {
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.deleteButton().click();
    component.deleteEvent.subscribe((value: User) => {
      expect(value).toEqual(component.user);
    });
  });
});
