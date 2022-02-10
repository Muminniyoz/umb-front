import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterTabs } from './router-tab/router-tabs.directive';
import { RouterTab } from './router-tab/router-tab.directive';
import { MaterialModule } from './material/material.module';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';


@NgModule({
  imports: [CommonModule,

    MaterialModule, RouterModule, FlexLayoutModule],
  declarations: [PageNotFoundComponent, DeleteDialogComponent, RouterTabs, RouterTab, ConfirmComponent],

  exports: [
    CommonModule,
    FlexLayoutModule,
    PageNotFoundComponent,
    RouterTabs,
    RouterTab,
    MaterialModule,




  ]
})
export class SharedModule { }
