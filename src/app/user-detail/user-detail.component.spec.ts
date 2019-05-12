import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { aRandom } from '../test/aRandom';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../user';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
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

  beforeEach(async(() => {
    reqresServiceSpy = jasmine.createSpyObj('ReqresService', ['updateUser']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
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
    expect(nameFormControl.value).toEqual(user.first_name + ' ' + user.last_name);
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
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();
    expect(nameFormControl.disabled).toEqual(false);
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

  it('should set the value of the name form control back to the original value on cancel', () => {
    const originalName = component.user.first_name + ' ' + component.user.last_name;
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();

    nameFormControl.setValue(aRandom.name());
    expect(nameFormControl.value).not.toEqual(originalName);

    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.cancelButton().click();
    expect(nameFormControl.value).toEqual(originalName);
  });

  it('should call update when clicking save', fakeAsync(() => {
    reqresServiceSpy.updateUser.and.returnValue(of({name: aRandom.name(), updatedAt: new Date()}));
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.editButton().click();

    const updatedName: string = aRandom.name();
    nameFormControl.setValue(updatedName);
    elements.userDetail().dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    elements.saveButton().click();
    tick();
    expect(reqresServiceSpy.updateUser).toHaveBeenCalledWith(component.user.id, {name: updatedName});
    expect(nameFormControl.disabled).toEqual(true);
    expect(component.isEditMode).toEqual(false);
  }));
});
