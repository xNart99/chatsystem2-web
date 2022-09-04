import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordMatch } from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-create-add-member',
  templateUrl: './create-add-member.component.html',
  styleUrls: ['./create-add-member.component.scss']
})
export class CreateAddMemberComponent implements OnInit {
  registerForm!: FormGroup;
  message = {
    type: '',
    text: ''
  };

  constructor(
    public modal: NgbActiveModal,
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
