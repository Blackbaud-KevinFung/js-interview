import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ReqresService } from '../reqres.service';

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

}
