import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from "rxjs/operators";
import { throwError, Observable, of, pipe } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpClientService {
  private externalHttpClient: HttpClient;
  constructor(private _httpClient: HttpClient,
    handler: HttpBackend
  ) {
    this.externalHttpClient = new HttpClient(handler);
  }
  private retryLimit = 1;
  /** To process get request */
  getData<T>(url: string) {
    url = url;
    return this._httpClient.get<T>(url, this.prepareHeader(null))
    .pipe(
    catchError(this.handleError)
    );
  }

  /** To process post request */
  postData<T>(url: string, data) {
    url =  url;
    return this._httpClient.post<T>(url, JSON.stringify(data), this.prepareHeader(null))
    .pipe(
    catchError(this.handleError));
  }

   /** To process post formdata */
   postFormData<T>(url: string, formdata) {
    url =  url;
    return this._httpClient.post<T>(url, formdata)
    .pipe(
    catchError(this.handleError));
  }

  /** To process delete request */
  delData<T>(url: string) {
    url = url;
    return this._httpClient.delete<T>(url, this.prepareHeader(null))
    .pipe(catchError((err: any) => {
    return throwError(err);
    }));
  }
  /**

  /** To process put request */
  putData<T>(url: string, data) {
    url = url;
    return this._httpClient.put<T>(url, JSON.stringify(data), this.prepareHeader(null))
    .pipe(catchError((err: any) => {
    return throwError(err);
    }));
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error); 
  //     return of(result as T);
  //   };
  // }

  private handleError<T>(error: HttpErrorResponse) {
    return throwError(error);
  }

  
  // handleError(error : HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   // window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
 



  private prepareHeaderFormData(headers: HttpHeaders | null): object {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.set('Accept', 'multipart/form-data');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return {
      headers: headers
    }
  }


  


  private prepareHeader(headers: HttpHeaders | null): object {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    // headers = headers.set('Access-Control-Allow-Origin', '*');
    // headers = headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return {
      headers: headers
    }
  }
}
