import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errMsg: any;

  constructor(private _userService: UsersService, private _router: Router) { }

  ngOnInit() {
    this.userSubmit();
  }

  userForm = new FormGroup({
    'fullnames':new FormControl('',[Validators.required, Validators.minLength(3)]),
    'username':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required),
    'password':new FormControl('',[Validators.required,Validators.minLength(8)] ),
  })
  
  userSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this._userService.createUser(this.userForm.value).subscribe((res) => {
        
       
      })
    } else {
      this.errMsg = 'All fields are required'
    }

  }

  moveToHome(){
    this._router.navigate(['/login']);
  }

}
