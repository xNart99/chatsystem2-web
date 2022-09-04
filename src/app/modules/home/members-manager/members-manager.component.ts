import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAddMemberComponent } from 'src/app/components/create-add-member/create-add-member.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-members-manager',
  templateUrl: './members-manager.component.html',
  styleUrls: ['./members-manager.component.scss']
})
export class MembersManagerComponent implements OnInit {
  users!: User[];

  constructor(
    private authService: AuthService,
    private modalController: NgbModal
  ) { }

  ngOnInit(): void {
    this.users = this.authService.getAllUsers();
  }

  openAddMemberModal(): void {
    const modal = this.modalController.open(
      CreateAddMemberComponent,
      {
        centered: true,
      }
    );
  }
}
