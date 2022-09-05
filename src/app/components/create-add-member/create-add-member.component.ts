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
      role: new FormControl('member'),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: [PasswordMatch]
    })
  }

  onSubmit(): void {
    const { username, password, email, role } = this.registerForm.value;
    if (this.authService.register(username, password, email, role)) {
      this.registerForm.reset();
      this.registerForm.controls['role'].setValue('member');
      this.message.text = 'Registration successful';
      this.message.type = 'success';
      this.modal.close();
    } else {
      this.message.text = 'Username or email is already taken';
      this.message.type = 'danger';
    }
  }

}
