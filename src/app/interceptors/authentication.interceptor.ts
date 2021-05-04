import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
// import { ALPN_ENABLED, EROFS } from 'constants';
import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private  tostr : ToastrService) { }

   username = '';
   password = '';


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    let newHeaders = request.headers;

     newHeaders = newHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);

     var uid = sessionStorage.getItem('eId');

    //  console.log(uid);

     newHeaders = newHeaders.append('EmailId', `${sessionStorage.getItem('eId')}`);

      newHeaders = newHeaders.append('role', `${sessionStorage.getItem('ocademy_role')}`);
     
    //  headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)}

    const updatedRequest = request.clone({
      headers: newHeaders
    });
    return next.handle(updatedRequest).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
          if(error){
            // var errorMessage = `Error: ${error.error.message}`;
            // this.tostr.error(errorMessage);     
            // alert('client side error..');         
          } else{
            //  var  errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;    
            // errorMessage = `Server Error.`;    
            // this.tostr.error(errorMessage);    
            // alert('server side error..');
          }
          return throwError(error);
      })
  )
  }

  
  createBasicAuthToken(username , password) {
    return  window.btoa(username + ":" + password)
  }

}