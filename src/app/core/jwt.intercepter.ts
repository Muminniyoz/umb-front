import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtUtil } from "./jwt.util";
import { MessageTexts } from "./message-texts";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  

  constructor(public jwtUtil: JwtUtil, private _snackBar: MatSnackBar,
    ) {
     
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.jwtUtil.getToken();
    let boshqaReq;
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      boshqaReq = next.handle(authReq);
    }
    else {
      boshqaReq = next.handle(req)
    }
    let message = MessageTexts.errorMessage;
    return boshqaReq.pipe(
      catchError((error) => {
        if (error && error.error && error.error.message) {
          message = error.error.message;
        }
        this._snackBar.open(message, 'X', {
          duration: 4000,
          verticalPosition: 'bottom',
        });
        return throwError(error.message);
      }));
  }

}