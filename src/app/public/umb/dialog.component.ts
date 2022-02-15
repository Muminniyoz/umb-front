// dialog.component.ts

import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    template: `
     <h1 mat-dialog-title style="color: red; text-align: center;">Quyidagi {{data.length}} ta xatolarni bartaraf eting</h1>
        <div mat-dialog-content>
           
        <mat-list role="list">
            <ng-container *ngFor="let m of data; let i = index"><mat-list-item role="listitem" >{{m}} </mat-list-item>
        <mat-divider></mat-divider>
        </ng-container>
            
        </mat-list>
       

        </div>
        <div mat-dialog-actions>
        <button color="primary" mat-raised-button (click)="tasdiqlash()">Ok</button>
   
        </div>
  `,
    styles: [`
    mat-list{
        max-height: 50vh;
    }
        mat-list-item  {
          color: red;
        }
  `]
})
export class Dialog {
    constructor(public dialogRef: MatDialogRef<Dialog>,
        @Inject(MAT_DIALOG_DATA) public data: string[]) { }

    tasdiqlash() {
        this.dialogRef.close(true);
    }
}

