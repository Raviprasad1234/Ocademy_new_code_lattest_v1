import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../common/base-http-client.service';


import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;

  constructor(private http: HttpClient , private basehttp: BaseHttpClientService , private router : Router) { }

  CatUrl: string = environment.api
 
  // /admin/auth/signin
 
//   http://localhost:9090/api/user/getCountByRoleName?roleName=ravi


siginUp(signUpData){
  return this.basehttp.postData(this.CatUrl + '/ocademy/auth/signup', signUpData)
};

logIn(signinData){
  return this.basehttp.postData(this.CatUrl + '/ocademy/auth/signin', signinData)
}

gettoken = sessionStorage.getItem('token');

isloggedIn(){
  return !!sessionStorage.getItem('token');
  }

  createBasicAuthToken(username: String, password: String) {
    // return 'Bearer ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.gettoken);
    sessionStorage.clear();
    this.username = null;
    this.password = null;
  }


  invalidtokenAccress(){
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.gettoken);
    sessionStorage.clear();
    this.username = null;
    this.password = null;
    this.router.navigateByUrl('/home');
  }


  isUserLoggedIn() {

    let user = sessionStorage.getItem('token'); 
    // let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }


  getforgotpassword(emailAddress){
    return this.basehttp.putData(this.CatUrl + '/ocademy/user/forgotpassword/' + emailAddress ,{})
  }

  // return this.basehttp.putData(this.CatUrl + '/ocademy/student/addToWishList/' + userId , wishlistData )
   
 
  getemailverificationService(emailAddress){
    return this.basehttp.postData(this.CatUrl + '/ocademy/user/emailVerification/' + emailAddress ,{})  
  }


  getverifymailAftermailclickService(emailAddress){
    // return this.basehttp.postData(this.CatUrl + '/ocademy/user/verifyEmailOfRegisteredUsers/' + emailAddress ,{})  
    return this.basehttp.getData(this.CatUrl + '/ocademy/user/verifyEmailOfRegisteredUsers/'+ emailAddress);
 
  }





}
