import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {

  user: User;
  status: boolean =true;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = new User();
  }

  onSubmit() {
    this.userService.registerUser(this.user).subscribe();
    
      this.router.navigate(['/login']);
    
   // .subscribe(result => this.gotoUserList());
  }
 /** gotoUserList() {
    this.router.navigate(['/users']);
  }
**/
}
