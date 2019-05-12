import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { aRandom } from '../test/aRandom';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let elements: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    elements = {
      name: (): HTMLSpanElement => fixture.nativeElement.querySelector('.name'),
      avatar: (): HTMLImageElement => fixture.nativeElement.querySelector('.avatar')
    };
  });

  it('should display the user details', () => {
    const user = aRandom.user();
    component.user = user;
    fixture.detectChanges();
    expect(elements.name().innerText).toEqual(user.first_name + ' ' + user.last_name);
    expect(elements.avatar().src).toEqual(user.avatar);
  });
});
