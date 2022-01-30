import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component(
    {
        selector: 'app-delete-dialog',
      template: `
      <h1 mat-dialog-title>
      {{title}}
    </h1>
    
    <div mat-dialog-content>
      <p>{{message}}</p>
    </div>
    
    <div mat-dialog-actions>
      <button mat-button (click)="onDismiss()">Bekor qilish</button>
   
      <button mat-button color="accent" (click)="onConfirm()" >
    Ha
    </button>
    </div>
      `
  
    }
  )
  export class DeleteDialogComponent{
    title=`o'chirish`;
    message="Sir rostdan ham  o'chirmoqchimisiz?"
  
  
    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
      // Update view with given values
      if(data && data.title)
      this.title = data.title;
      if(data && data.message)
      this.message = data.message;
    }
  
    ngOnInit() {
    }
  
    onConfirm(): void {
      // Close the dialog, return true
      this.dialogRef.close(true);
    }
  
    onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(false);
    }
  }
  
  /**
   * Class to represent confirm dialog model.
   *
   * It has been kept here to keep it as part of shared component.
   */
  export class ConfirmDialogModel {
  
    constructor(public title: string, public message: string) {
    }
  }