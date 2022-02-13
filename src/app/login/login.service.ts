import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountService } from '../core/account.service';
import { JwtUtil } from '../core/jwt.util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  api = environment.baseUrl+"/api/account" ;

  constructor(public jwtUtil: JwtUtil, public http: HttpClient, public accountService: AccountService) { }



  login(loginParol: any): Observable<any> {
    return this.http.post<any>(this.api + "/authenticate", loginParol)
    .pipe( map((token)=>{     
        this.jwtUtil.save(token.token, loginParol.rememberMe);
        this.accountService.identity(true)
      })
    );
  }

  logout(): void {
    this.jwtUtil.clear();
    this.accountService.authenticate(null);
  }
  register(register: any):  Observable<any> {
    return this.http.post<any>(this.api + "/register", register)
    .pipe( map((token)=>{     
        this.jwtUtil.save(token.token, register.rememberMe);
        this.accountService.identity(true);
      })
    );
  }
}
