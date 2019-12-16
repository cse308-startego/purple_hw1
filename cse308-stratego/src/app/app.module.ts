import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPageComponent} from './login-component/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GameComponent} from './game/game.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
// @ts-ignore
import { AngularDraggableModule } from 'angular2-draggable';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GameComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    AngularDraggableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
