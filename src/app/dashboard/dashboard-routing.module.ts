import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard.component';





const routes: Routes = [
    {
        path: "", component: DashboardComponent, children: [
            { path: "login", component: LoginComponent },
            { path: "**", redirectTo: "login" }
        ]
    },
    { path: "**", redirectTo: "dashboard" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
