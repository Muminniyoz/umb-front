import { Component, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component(
    {
        
      templateUrl: './user-activate-dialog.component.html'
  
    }
  )
  export class UserActivateDialogComponent{
    activateForm: any;

    
    oshpaz= false;
    ofitsant= false;
    omborxonachi= false;
  
  
    constructor(public dialogRef: MatDialogRef<UserActivateDialogComponent>,
                private formBuilder: FormBuilder,
                ) {
    }
  
    ngOnInit() {
      this.activateForm = this.formBuilder.group({
        oshpaz : [null],
        ofitsant: [null],
        bugalter: [null]
      })
    }
    
  
    onConfirm(): void {
      let lavozimlar = this.activateForm.getRawValue()
      // Close the dialog, return true
      this.dialogRef.close(lavozimlar);
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