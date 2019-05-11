import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { MatGridListModule } from '@angular/material';
import { ReqresService } from './reqres.service';
import { aRandom } from './test/aRandom';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let reqresService: jasmine.SpyObj<ReqresService>;

  beforeEach(() => {
    reqresService = jasmine.createSpyObj('ReqresService', ['getUsers']);

    TestBed.configureTestingModule({
      imports: [
          MatGridListModule
      ],
      declarations: [
        AppComponent,
        UsersComponent
      ],
      providers: [
        {provide: ReqresService, useValue: reqresService}
      ]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'js-interview'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('js-interview');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    reqresService.getUsers.and.returnValue(of(aRandom.users()));
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to js-interview!');
  });
});
