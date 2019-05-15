import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AddUpdateUser, AddUserResponse, ReqresService } from '../reqres.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public static readonly rowHeightXSmall = '2:1';
  public static readonly rowHeightSmall = '3:1';
  public static readonly rowHeightMedium = '5:1';
  public users: User[];
  public columns = 2;
  public rowHeight = UsersComponent.rowHeightMedium;

  constructor(private reqresService: ReqresService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.reqresService.getUsers().subscribe(
        (users) => {
          this.users = users;
        });
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
          this.columns = 1;
          this.rowHeight = UsersComponent.rowHeightXSmall;
      }
      if (result.breakpoints[Breakpoints.Small]) {
          this.columns = 2;
          this.rowHeight = UsersComponent.rowHeightSmall;
      }
      if (result.breakpoints[Breakpoints.Medium]) {
          this.columns = 2;
          this.rowHeight = UsersComponent.rowHeightMedium;
      }
    });
  }

  public handleDelete(deleteUser: User) {
    this.reqresService.deleteUser(deleteUser.id).subscribe(
        () => {
          this.users = this.users.filter((user: User) => user.id !== deleteUser.id);
          console.log('deleted user: ', deleteUser);
        }
    );
  }

  public handleAddUser(addUser: AddUpdateUser) {
    this.reqresService.addUser(addUser).subscribe(
        (newUser: AddUserResponse) => {
            const user: User = this.buildNewUser(newUser);
            this.users.push(user);
            console.log('added a new user', user);
        }
    );
  }

  private buildNewUser(newUser: AddUserResponse): User {
      return {
          id: newUser.id,
          name: newUser.name,
          avatar: newUser.avatar,
          date: newUser.date
      };
  }

}
