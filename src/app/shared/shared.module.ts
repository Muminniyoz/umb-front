import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterTabs } from './router-tab/router-tabs.directive';
import { RouterTab } from './router-tab/router-tab.directive';
import { MaterialModule } from './material/material.module';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports: [CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterialModule, RouterModule, FlexLayoutModule],
  declarations: [PageNotFoundComponent, DeleteDialogComponent, RouterTabs, RouterTab, ConfirmComponent],

  exports: [
    CommonModule,
    FlexLayoutModule,
    PageNotFoundComponent,
    RouterTabs,
    RouterTab,
    MaterialModule


  ]
})
export class SharedModule { }
