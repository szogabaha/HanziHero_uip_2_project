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
  form : FormGroup;
  loginFailed = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });

  }

  register(): void {
    const val = this.form.value;

    if (val.username && val.email && val.password1 && val.password2 && val.password1 === val.password2) { //Todo more sophisticated pw1 pw2 match
      this.authService.register(val.username, val.password1, val.email).subscribe(
        user => {
          if (user) {
            console.log("User logged in");
            this.router.navigateByUrl('/');
          } else {
            this.loginFailed = true;
            console.log("Invalid User credentials")
          }
        }
      )
    }
  }
}
