import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ReqresService, AddUpdateUser, UpdateUserResponse } from '../reqres.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input()
  public user: User;

  @Output()
  public deleteEvent: EventEmitter<User> = new EventEmitter();

  public userForm: FormGroup;
  public shouldShowEditDelete: boolean = false;
  public shouldShowSaveCancel: boolean = false;
  public isEditMode: boolean = false;
  private originalName: string;
  private originalDate: Date;

  constructor(private formBuilder: FormBuilder, private reqresService: ReqresService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [this.user.first_name + ' ' + this.user.last_name, []],
      date: [this.user.date, []]
    });
    this.nameFormControl().disable();
    this.dateFormControl.disable();
  }

  public onSubmit() {
    const updateUser: AddUpdateUser = {name: this.nameFormControl().value, avatar: this.user.avatar, date: this.dateFormControl.value};
    this.reqresService.updateUser(this.user.id, updateUser).subscribe(
        (res: UpdateUserResponse) => {
          this.nameFormControl().disable();
          this.dateFormControl.disable();
          this.isEditMode = false;
          console.log('updated user:', res);
        },
        () => {}
    );
  }

  public showButtons(): void {
    if (this.isEditMode) {
      this.shouldShowSaveCancel = true;
      this.shouldShowEditDelete = false;
    } else {
      this.shouldShowEditDelete = true;
      this.shouldShowSaveCancel = false;
    }
  }

  public hideButtons(): void {
    this.shouldShowEditDelete = false;
    this.shouldShowSaveCancel = false;
  }

  public makeEditable(): void {
    this.originalName = this.nameFormControl().value;
    this.originalDate = this.dateFormControl.value;
    this.nameFormControl().enable();
    this.dateFormControl.enable();
    this.isEditMode = true;
  }

  public cancel(): void {
    this.nameFormControl().setValue(this.originalName);
    this.dateFormControl.setValue(this.originalDate);
    this.nameFormControl().disable();
    this.dateFormControl.disable();
    this.isEditMode = false;
  }

  public delete(): void {
    this.deleteEvent.emit(this.user);
  }

  private nameFormControl(): AbstractControl {
    return this.userForm.get('name');
  }

  private get dateFormControl(): AbstractControl {
    return this.userForm.get('date');
  }

}
