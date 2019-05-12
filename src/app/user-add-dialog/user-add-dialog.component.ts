import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddUpdateUser } from '../reqres.service';

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.scss']
})
export class UserAddDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<UserAddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: AddUpdateUser) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
