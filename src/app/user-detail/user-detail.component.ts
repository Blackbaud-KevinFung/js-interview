import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input()
  public user: User;

  public userForm: FormGroup;
  public shouldShowEditDelete: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [this.user.first_name + ' ' + this.user.last_name, []]
    });
    this.userForm.get('name').disable();
  }

  public showButtons(): void {
    this.shouldShowEditDelete = true;
  }

  public hideButtons(): void {
    this.shouldShowEditDelete = false;
  }

  public makeEditable(): void {
    this.userForm.get('name').enable();
  }

}
