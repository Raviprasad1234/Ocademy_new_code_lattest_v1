import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../common/base-http-client.service';


import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { ObservableService } from '../common/Observable-service';


@Injectable({
  providedIn: 'root'
})
export class  AuthGuardService implements CanActivate  {
    
    constructor(public auth: AuthService, public router: Router , private observableservice: ObservableService) {}
    canActivate(): boolean {
      if (!this.auth.isUserLoggedIn()) {
        this.router.navigate(['/home']);
        this.sendMessage();
        return false;
      }
      return true;
    }



   sendMessage(): void {
      // send message to subscribers via observable subject
      this.observableservice.sendMessage('openloginModal');
      var currentpath = window.location.href;
      this.observableservice.sendpagenameService(currentpath);
  
    }

    




}