import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../core/user-route-access.service';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: "tranzaksiya",
    //     pathMatch: 'full'
    //   },
      
   
    // ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
