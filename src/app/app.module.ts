import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './core/jwt.intercepter';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { Observable } from 'rxjs';





// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// register Handsontable's modules
registerAllModules();


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HotTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('lang') ?? 'uz-Lat',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,

    },
    TranslateService
  ],
  bootstrap: [AppComponent,],

})
export class AppModule { }
