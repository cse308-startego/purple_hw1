import {Component, NgModule} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../service/api.service';

@NgModule({
  providers: [
    ApiService,
  ]})

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
})
export class LoginPageComponent {

  public username;
  public password;
  public fullName;

  constructor(private router: Router, private service: ApiService) { }
  onLogin(event) {
    event.preventDefault();

    const errors = [];
    const target = event.target;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;

    this.service.login(email, password).subscribe((data: string) => {
      // console.log(data);
    });
    this.router.navigateByUrl('/game');
  }
}
