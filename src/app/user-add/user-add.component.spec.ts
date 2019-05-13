import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddComponent } from './user-add.component';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';
import {
  MatDatepickerModule,
  MatDialog,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { of } from 'rxjs';
import { aRandom } from '../test/aRandom';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const newUser = {name: aRandom.name(), avatar: aRandom.user().avatar};

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(newUser)
    };
  }
};

describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;
  let matDialog: MatDialogMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      declarations: [
        UserAddComponent,
        UserAddDialogComponent
      ],
      providers: [
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should emit add event on new', () => {
    spyOn(matDialog, 'open').and.callThrough();
    component.addUserEvent.subscribe((result) => {
      expect(result).toEqual(newUser);
    });
  });
});
