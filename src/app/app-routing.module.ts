import { Route } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserRouteAccessService } from "./core/user-route-access.service";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";


const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./public/public.module').then((m) => m.PublicModule),
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginModule),
    },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled' //scroll to the top
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
