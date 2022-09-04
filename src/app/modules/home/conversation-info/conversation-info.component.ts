import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAddMemberComponent } from 'src/app/components/create-add-member/create-add-member.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-conversation-info',
  templateUrl: './conversation-info.component.html',
  styleUrls: ['./conversation-info.component.scss']
})
export class ConversationInfoComponent implements OnInit {
  @Input() conversation: any;
  havePermission = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.havePermission = this.checkPermisstion();
  }

  checkPermisstion(): boolean {
    return ['superadmin', 'groupadmin'].includes(this.user.role);
  }

  openCreateAddUser(): void {
    const modal = this.modalService.open(
      CreateAddMemberComponent,
      {
        centered: true,
      }
    );
  }
}
