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
          console.log('users', this.users);
        });
  }

}
