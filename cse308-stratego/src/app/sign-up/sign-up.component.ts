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
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#confirm_password').value;

    if(password != cpassword) {
      confirm("Passwords do not match. Try Again.")
      errors.push("Passwords do not match")
    }
    else if(fullname == "") {
      confirm("Full Name cannot be empty.")
    }
    else if(email == "") {
      confirm("Email cannot be empty.")
    }
    else if(password == "") {
      confirm("Password cannot be empty.")
    }
    else {
      this.service.signUp(fullname, email, password).subscribe((data: string) => {
        this.router.navigateByUrl('/game');
      })
    }
  }
}
