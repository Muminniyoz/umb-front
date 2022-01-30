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

// register Handsontable's modules
registerAllModules();

@NgModule({
  declarations: [
    HomeComponent,
    UmbComponent
 
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    CoreModule,
    SharedModule,
    HotTableModule,

    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('lang') ?? 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [HomeComponent]
})
export class PublicModule { }
