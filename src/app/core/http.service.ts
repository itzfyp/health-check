import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpSerivice {

  constructor(private http: HttpClient) { }

  // Get Api call
  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(url, {
      headers: {

      }, params
    });
  }
}