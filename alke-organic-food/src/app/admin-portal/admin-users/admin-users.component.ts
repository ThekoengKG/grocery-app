
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {User, UserServerResponse} from 'src/app/models/user.model'

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[]= [];
  successMsg: any;

  constructor(private _userService: UsersService) { }


  ngOnInit() {
    this.getUsers();
  }

  removeUser(id:number){
    this._userService.deleteUser(id).subscribe((res) => {
      console.log(res, 'deleteres==>');
     
    })
  }

  getUsers(){
    this._userService.getAllUsers().subscribe((res: UserServerResponse) => {
      this.users = res.users;
      console.log(res);
    }, (error) => console.log(error))
  }

}
