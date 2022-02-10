import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { CoreModule } from '@angular/flex-layout';
import { UmbComponent } from './umb/umb.component';
import { SharedModule } from '../shared/shared.module';
import { HotTableComponent, HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { Dialog } from './umb/dialog.component';

// register Handsontable's modules
registerAllModules();

@NgModule({
  declarations: [
    HomeComponent,
    UmbComponent,
    Dialog
 
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    CoreModule,
    SharedModule,
    HotTableModule,
    TranslateModule

   
  ],
  bootstrap: [HomeComponent]
})
export class PublicModule { }
