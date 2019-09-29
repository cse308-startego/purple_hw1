import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public password;
  public confirm_password;
  ngOnInit() {
  }
  constructor(private router: Router, private service: ApiService) { }

  registerUser(event) {
    event.preventDefault();

    const errors = [];
    const target = event.target;
    const fullname = target.querySelector('#fullname').value;
    console.log(fullname);
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#confirm_password').value;

    if(password != cpassword) {
      confirm("Passwords do not match. Try Again.")
      errors.push("Passwords do not match")
    }


    // if(errors.length > 0) {
    //   this.service.login().subscribe((data: string) => {
    //     console.log(data);
    //     if(data.success) {
    //       this.router.navigateByUrl('/game');
    //     }
    //   });
    // }
    
    console.log(email, password)
  }
}
