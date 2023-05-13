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
  form : FormGroup;
  loginFailed = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login(): void {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(
        user => {
          if (user) {
            console.log("User logged in");
            this.router.navigateByUrl('/dashboard');
          } else {
            this.loginFailed = true;
            console.log("Invalid User credentials")
          }
        }
      )
    }
  }
}
