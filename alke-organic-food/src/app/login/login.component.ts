import { AuthService } from './../services/auth.service';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _authService: AuthService, private _userService: UsersService) { }

  ngOnInit() {
  }

  doLogin(){
    return !!this._authService.isAuthenticated();
  }


  userForm = new FormGroup({
    'email':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required),
  })
  
  productSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this._userService.createUser(this.userForm.value).subscribe((res) => {
        
       
      })
    } else {
      
    }

  }


}
