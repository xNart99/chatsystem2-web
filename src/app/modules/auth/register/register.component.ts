import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordMatch } from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  message = {
    type: '',
    text: ''
  };

  constructor(
    private authService: AuthService
  ) {
    this.registerForm = this.initRegisterForm();
  }

  ngOnInit(): void {
  }

  initRegisterForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: [PasswordMatch]
    })
  }

  onSubmit(): void {
    const { username, password, email } = this.registerForm.value;
    if (this.authService.register(username, password, email)) {
      this.registerForm.reset();
      this.message.text = 'Registration successful';
      this.message.type = 'success';
    } else {
      this.message.text = 'Username or email is already taken';
      this.message.type = 'danger';
    }
  }
}
