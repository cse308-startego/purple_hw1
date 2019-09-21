import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
})
export class LoginPageComponent {

  constructor(private router: Router) { }
  onLogin() {
    this.router.navigateByUrl('/game');
  }

}
