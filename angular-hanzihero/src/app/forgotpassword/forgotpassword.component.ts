/**
 * File: forgotpassword.component.ts
 * This file contains the controller logic for the forgot-password.
 * The functionality is not implemented in the end, but the view still
 * exists
 * Author: Gabor Szolnok
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  //Username form
  form : FormGroup;
  //Boolean value to indicate if the error message should be shown
  loginFailed = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      //Email can't be empty
      email: ['', Validators.required],
    });

  }

  resetPassword(): void {
    this.router.navigateByUrl('/login');
    //TODO, could not implement it because the email sending would've been implemented in the backend.

  }
}

/************
// END of forgotpassword.component.ts
//************/
