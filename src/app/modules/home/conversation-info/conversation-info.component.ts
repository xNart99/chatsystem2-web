import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberComponent } from 'src/app/components/add-member/add-member.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-conversation-info',
  templateUrl: './conversation-info.component.html',
  styleUrls: ['./conversation-info.component.scss']
})
export class ConversationInfoComponent implements OnInit {
  @Input() conversation: any;
  @Input() parentMembers: any[] = [];
  @Input() groupId!: string;
  havePermission = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private groupService: GroupService
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
    if (this.conversation.members) {
      modal.componentInstance.members = this.parentMembers;
    } else {
      modal.componentInstance.members = this.parentMembers.map((username: string) => {
        return this.authService.getUserByUsername(username);
      })
    }
    if (this.conversation.members) {
      modal.componentInstance.group = this.conversation;
      modal.componentInstance.existingMembers = this.conversation.members;
      modal.componentInstance.afterButtonClicked.subscribe(() => {
        this.conversation = this.groupService.getGroupById(this.conversation.id);
      });
    } else {
      modal.componentInstance.channel = this.conversation;
      modal.componentInstance.existingMembers = this.conversation.accessingUsers;
      modal.componentInstance.groupId = this.groupId;
      modal.componentInstance.afterButtonClicked.subscribe(() => {
        this.conversation = this.groupService.getChannelById(this.groupId,this.conversation.id);
      });
    }
  }
}
