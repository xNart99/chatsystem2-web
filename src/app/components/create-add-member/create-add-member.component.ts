import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';
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
    private authService: AuthService,
    private storageServie: StorageService,
    private userService: UsersService
  ) {
    this.registerForm = this.initRegisterForm();
    if (this.storageServie.get('role') === 'super') {
      this.roles.push({
        name: 'Super Admin',
        value: 'super'
      },
      {
        name: 'Group Admin',
        value: 'groupadmin'
      });
    }
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
