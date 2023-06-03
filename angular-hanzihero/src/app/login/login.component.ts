/**
 * File: login.component.ts
 * The controller logic for the login view
 *
 * Author: Gabor Szolnok
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Form for email and password
  form : FormGroup;
  //Boolean value to indicate if the error message should be shown.
  loginFailed = false;
  //Injecting services
  //
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  //Login user or show error message
  //
  login(): void {
    //Extract value
    const val = this.form.value;

    //Only do something if both username and password is present.
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(
        user => {
          if (user) {
            //Navigate to dashboard if logged in
            this.router.navigateByUrl('/dashboard');
          } else {
            this.loginFailed = true;
          }
        }
      )
    }
  }
}


/************
// END of languagesetter.component.ts
//************/
