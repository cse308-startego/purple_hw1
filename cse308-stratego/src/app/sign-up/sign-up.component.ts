import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ngOnInit() {
  }

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
      errors.push("Passwords do not match")
    }

    if(errors.length > 0) {

    }

    console.log(email, password)
  }
}
