import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AddUpdateUser, AddUserResponse, ReqresService } from '../reqres.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(private reqresService: ReqresService) {
  }

  ngOnInit() {
    this.reqresService.getUsers().subscribe(
        (users) => {
          this.users = users;
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
