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

     this.router.navigateByUrl('/game');

    // const errors = [];
    // const target = event.target;
    // const email = target.querySelector('#email').value;
    // const password = target.querySelector('#password').value;
    // let Data: boolean = false;
    //
    // this.service.login(email, password).subscribe((data: string) => {
    //   if(data=="true") {
    //     Data = true;
    //   }
    //   if(Data==false) {
    //     confirm("Email and Password combination is wrong. Try Again.")
    //   }
    //   else {
    //     this.router.navigateByUrl('/game');
    //   }
    // });

  }
}
