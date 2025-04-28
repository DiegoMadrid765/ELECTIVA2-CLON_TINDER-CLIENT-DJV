import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatchsComponent } from './pages/matchs/matchs.component';
import { ChatsComponent } from './pages/chats/chats.component';






const routes: Routes = [
    {
        path: "", component: HomeComponent, children: [
            {path:"",component:MatchsComponent},
            {path:"chats",component:ChatsComponent},
            // { path: "login", component: LoginComponent },
            // { path: "register", component: RegisterComponent },
            // { path: "**", redirectTo: "login" }
        ]
    },
    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
