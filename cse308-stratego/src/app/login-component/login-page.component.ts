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

  constructor(private router: Router, private service: ApiService) { }
  onLogin() {
    this.service.login().subscribe((data: string) => {
      console.log(data)
    });
    this.router.navigateByUrl('/game');
  }

}
