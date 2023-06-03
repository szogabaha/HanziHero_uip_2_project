/**
 * File: register.component.ts
 * The controller logic for the register view
 *
 * Author: Gabor Szolnok
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //Form for username, email, password, reminder
  form : FormGroup;

  //Indicate error if registration doesn't work
  loginFailed = false;

  //Inject services to view
  //
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      reminder: [false, Validators.required],
    });

  }

  //Get info from the form and register the user
  //
  register(): void {
    //Extract form
    const val = this.form.value;

    //Proceed if we have all the fields and pw1=pw2
    if (val.username && val.email && val.password1 && val.password2 && val.password1 === val.password2) {
      this.authService.register(val.username, val.password1, val.email, val.reminder).subscribe(
        user => {
          if (user) {
            //Return user to login if registration is complete
            this.router.navigateByUrl('/');
          } else {
            //Indicate error if registration didnt work
            this.loginFailed = true;
          }
        }
      )
    }
  }
}

/************
// END of register.component.ts
//************/
