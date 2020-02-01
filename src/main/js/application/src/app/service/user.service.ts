import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';



@Injectable()
export class UserService {

  id: string;
    name: string;
    email: string;
    password: string;

    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  private usersUrl: string;
  private userRegistrationUrl: string;
  private userLoginUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.userRegistrationUrl = 'http://localhost:8080/registration';
    this.userLoginUrl = 'http://localhost:8080/login';

  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  // validateUser(loginForm) {
  //   return this.http.post(this.userLoginUrl, loginForm, {headers: this.headers})
      
  // }
  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
  public registerUser(user: User) {
    return this.http.post<User>(this.userRegistrationUrl, user);
  }
  public login(user: User) {
    return this.http.post<User>(this.userLoginUrl, user);
  }


  authenticationService(user:User) {
    return this.http.get(this.userLoginUrl,
      { headers: { authorization: this.createBasicAuthToken(user) } }).pipe(map((res) => {
        // this.name=name;
        // this.password = password;
        this.registerSuccessfulLogin(user);
      }));
  }

  createBasicAuthToken(user:User) {
    return 'Basic ' + window.btoa(this.name + ":" + this.password)
  }

  registerSuccessfulLogin(user:User) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, this.name)
  }

 

}
