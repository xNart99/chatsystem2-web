import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberComponent } from 'src/app/components/add-member/add-member.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-conversation-info',
  templateUrl: './conversation-info.component.html',
  styleUrls: ['./conversation-info.component.scss']
})
export class ConversationInfoComponent implements OnInit {
  @Input() conversation: any;
  @Input() parentMembers: User[] = [];
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
    return ['super', 'groupadmin'].includes(this.user.role);
  }

  openCreateAddUser(): void {
    const modal = this.modalService.open(
      AddMemberComponent,
      {
        centered: true,
      }
    );
    modal.componentInstance.members = this.parentMembers;
    if (this.conversation.members) {
      modal.componentInstance.group = this.conversation;
      modal.componentInstance.existingMembers = this.conversation.members;
    } else {
      modal.componentInstance.channel = this.conversation;
      modal.componentInstance.existingMembers = this.conversation.accessingUsers;
    }
  }
}
