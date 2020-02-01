import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  name:string
  password:string

  user: User;
  status: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = new User();
  }

  onSubmit() {
    this.userService.login(this.user).subscribe()
      this.router.navigate(['/users']);
    
    
      
    
   // .subscribe(result => this.gotoUserList());
  }

  public validate(formValue) {
    this.userService.login(formValue).subscribe(res => {
      const { token } = <any>res;
     this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/users']);
    }, (err) => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      console.log(err)
    });
  }

  handleLogin(formValue) {
    this.userService.authenticationService(formValue).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/users']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

}
