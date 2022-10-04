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
  roles = [
    {
      name: 'Member',
      value: 'member'
    },
    {
      name: 'Super Admin',
      value: 'super'
    },
    {
      name: 'Group Admin',
      value: 'groupadmin'
    },
    {
      name: 'Group Assistance',
      value: 'groupassis'
    }
  ];
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
      role: new FormControl('member', Validators.required),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: [PasswordMatch]
    })
  }

  onSubmit(): void {
    const { username, password, email, role } = this.registerForm.value;
    this.authService.register(username, password, email, role).subscribe(
      res => {
        this.registerForm.reset();
        this.registerForm.controls['role'].setValue('member');
        this.message.text = 'Registration successful';
        this.message.type = 'success';
      }, error => {
        this.message.text = 'Username or email is already taken';
        this.message.type = 'danger';
      }
    );
  }
}
