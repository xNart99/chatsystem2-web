import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = {
    type: '',
    text: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.initLoginForm();
  }

  ngOnInit(): void {
  }

  initLoginForm(): FormGroup {
    return new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.message = {
        type: 'success',
        text: 'Login successful'
      };
      this.router.navigate(['/home'])
    }  else {
      this.message = {
        type: 'danger',
        text: 'Login failed'
      }
    }
  }
}
