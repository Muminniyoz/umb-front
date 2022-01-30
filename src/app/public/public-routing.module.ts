import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UmbComponent } from './umb/umb.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',

  },
 {
        path: 'umb',
        component: UmbComponent
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
