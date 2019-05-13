import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { ReqresService } from './reqres.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAddComponent } from './user-add/user-add.component';

describe('AppComponent', () => {
  let reqresService: jasmine.SpyObj<ReqresService>;

  beforeEach(() => {
    reqresService = jasmine.createSpyObj('ReqresService', ['getUsers']);

    TestBed.configureTestingModule({
      imports: [
        MatGridListModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        FormsModule,
        MatDatepickerModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        UsersComponent,
        UserDetailComponent,
        UserAddComponent
      ],
      providers: [
        {provide: ReqresService, useValue: reqresService},
        FormBuilder
      ]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
