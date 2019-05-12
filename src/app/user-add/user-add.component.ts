import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';
import { AddUpdateUser } from '../reqres.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  @Output()
  public addUserEvent: EventEmitter<AddUpdateUser> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public createNewUser(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUserEvent.emit(result);
      }
    });
  }

}
