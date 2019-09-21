import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './login-component/login-page.component';
import {GameComponent} from './game/game.component';


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'game', component: GameComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
