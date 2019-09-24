import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../service/api.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
})
export class LoginPageComponent {

  constructor(private router: Router, private service: ApiService) { }
  onLogin() {
    console.log(this.service.login());
    this.router.navigateByUrl('/game');
  }
}
