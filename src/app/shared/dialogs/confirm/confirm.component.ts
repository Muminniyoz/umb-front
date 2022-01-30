import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/core/account.service';

@Component({
  template: `
  <mat-card>
    <mat-card-header>
        <mat-card-title>Tasdiqlash uchun parolingizni tering</mat-card-title>

    </mat-card-header>
    <mat-card-content>
        <form>
            <mat-form-field appearance="outline">
                <mat-label>Parol</mat-label>
                <input required [formControl]="parol" type="password" class="form-control" matInput
                    placeholder="Parolni kiriting">
                <mat-hint>O'tkazmalar uchun maksimal qiymat</mat-hint>
            </mat-form-field>
            <br>
            <button type="button" [disabled]="parol.invalid" mat-raised-button (click)="tasdiqlash()"
                color="primary">Tasdiqlash</button>
            <button type="reset" mat-raised-button (click)="bekorQilish()" color="accent">Bekor qilish</button>
        </form>
    </mat-card-content>
</mat-card>`,
})
export class ConfirmComponent implements OnInit {
  parol = new FormControl('', [Validators.required, Validators.minLength(4)]);
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,private accountService: AccountService) { }

  ngOnInit(): void {
  }
  tasdiqlash(){
    console.log(this.parol.value);
    
    this.accountService.confirm(this.parol.value).subscribe(data=>{
      if(data){
        this.dialogRef.close(true)
      }
      
    }, 
    (error)=>{
      console.log(error);
      
      
    })
  }
  bekorQilish(){
    this.dialogRef.close(false);
  }

}
