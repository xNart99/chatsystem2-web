import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editForm!: FormGroup;
  message = {
    type: '',
    text: ''
  };
  imageProfile!: any;
  imageChange: any;
  constructor( public modal: NgbActiveModal,
    private authService: AuthService,
    private storageServie: StorageService,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.editForm = this.initForm();
    this.editForm.controls['username'].disable();
    this.authService.getUser().subscribe(
      res => {
        this.editForm = this.initForm(res);
        this.imageProfile = res.profileImage;
      }, error => {
        console.log(error);
      }
    )
  }

  initForm(user?: User): FormGroup {
    return new FormGroup({
      username: new FormControl(user?.username, [Validators.required]),
      email: new FormControl(user?.email, [Validators.required, Validators.email]),
      password: new FormControl('', []),
      confirmPassword: new FormControl('', [])
    })
  }

  onSubmit() {
    const email = this.editForm.controls['email'].value;
    const username = this.editForm.controls['username'].value;
    this.userService.updateProfile(email, this.imageChange, username).subscribe(
      res => {
        this.modal.close();
      }, error => {
        this.message.type = 'danger';
        this.message.text = 'Server error!';
      }
    )
  }

  changeImageProfile(event: any) {
    const selectedFiles = event.target.files;
    this.imageChange = selectedFiles[0];
    const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageProfile = e.target.result;
    };
    reader.readAsDataURL(selectedFiles[0]);
  }
}
