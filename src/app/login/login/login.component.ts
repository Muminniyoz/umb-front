import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtUtil } from 'src/app/core/jwt.util';
import { MessageTexts } from 'src/app/core/message-texts';
import { StateStorageService } from 'src/app/core/state-storage.service';
import { Lavozim } from 'src/app/shared/model/lavozimlar';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  surovBajarilmoqda = false;
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private jwtUtil: JwtUtil,
    private stateStorageService: StateStorageService) {}

  ngOnInit() {
    this.loginForm =    this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(6)]],
      parol: [null, [Validators.required, Validators.minLength(6)]],
      rememberMe: [null],
    });
 
  }
  onLogin() {
    this.jwtUtil.clear();
    const loginParol = this.loginForm.getRawValue();
    this.surovBajarilmoqda = true;
    this.loginService.login(loginParol).subscribe(
      ()=>{ 
          this.surovBajarilmoqda = false;
         
          let roles = this.jwtUtil.getRoles();
          
          const prevUrl = this.stateStorageService.getUrl();
          if(prevUrl && prevUrl != "/admin/user"){
           
            this.router.navigate([prevUrl]);
          } else {
            this.router.navigate(['/admin']);
        }
      },
      (error)=>{
     
        
          let message  = MessageTexts.loginError;
          if(error && error!.error && error.error.message){
            if(error.error.message!="INVALID_CREDENTIALS"){
              message = error.error.message;
            }
          }
          this._snackBar.open(message, 'X',  {
            duration: 4000,
          verticalPosition: 'bottom',
          });  
          this.surovBajarilmoqda = false;
      },
      ()=>{
        this.surovBajarilmoqda = false;
      }
    )
    
  }
}