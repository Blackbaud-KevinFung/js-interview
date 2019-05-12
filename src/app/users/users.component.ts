import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AddUpdateUser, AddUserResponse, ReqresService } from '../reqres.service';
import { first } from 'rxjs/operators';

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
      const splitName: string[] = newUser.name.split(' ', 2);
      let firstName: string = '';
      let lastName: string = '';
      if (splitName.length > 1) {
          firstName = splitName[0];
          lastName = splitName[1];
      } else {
          firstName = splitName[0];
      }
      return {
          id: newUser.id,
          first_name: firstName,
          last_name: lastName,
          avatar: newUser.avatar,
          email: ''
      };
  }

}
