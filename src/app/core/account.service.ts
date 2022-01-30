import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private userIdentity: any | null = null;
  private authenticationState = new ReplaySubject<any | null>(1);
  private userCache$?: Observable<any | null>;
  private baseApi = environment.baseUrl + "/api/account";
  constructor(
    private http: HttpClient
  ) { }

  save(user: any): Observable<{}> {
    return this.http.post(this.baseApi, user);
  }

  authenticate(identity: any | null): void {

    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }
  confirm(password: any) {
    return this.http.post(this.baseApi + "/confirm", password);
  }
  hasAnyAuthority(lavozimlar: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(lavozimlar)) {
      lavozimlar = [lavozimlar];
    }
    return this.userIdentity.lavozimlar.some((lavozim: string) => lavozimlar.includes(lavozim));
  }

  identity(force?: boolean): Observable<any | null> {

    if (!this.userCache$ || force || !this.isAuthenticated()) {
      this.userCache$ = this.fetch().pipe(
        catchError((e) => {
      
          return of(null)
        }),
        (res) => {
          console.log(res);
          res.subscribe(u => {
            this.authenticate(u);
          })
          return res;

        }
      );
    }
    return this.userCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<any | null> {
    return this.authenticationState.asObservable();
  }
  private fetch(): Observable<any> {
    return this.http.get<any>(this.baseApi);
  }
  update(user: any){
    return this.http.put(this.baseApi + "/change", user);
  }

}
