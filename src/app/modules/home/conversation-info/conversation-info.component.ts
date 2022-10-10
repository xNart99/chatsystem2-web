import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMemberComponent } from 'src/app/components/add-member/add-member.component';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-conversation-info',
  templateUrl: './conversation-info.component.html',
  styleUrls: ['./conversation-info.component.scss']
})
export class ConversationInfoComponent implements OnInit {
  @Input() conversation: any;
  @Input() parentMembers: any[] = [];
  @Input() groupId!: string;
  @Output() onParentMembersChanged = new EventEmitter<void>();
  @Output() onChannelDelete = new EventEmitter<Group>();
  @Output() onGroupDelete = new EventEmitter<Group>();
  havePermission = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private groupService: GroupService,
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {
        this.user = res;
      },error => {
        console.log(error);
        
      }
    );
    this.socketService.getUsernameAdd().subscribe(
      res => {
        if (this.conversation.members) {
          this.conversation.members.push(res.username);
        }else {
          this.conversation.accessingUsers.push(res.username);
        }
      }, error => {
        console.log(error);
      }
    );
    this.socketService.getUsernameRemove().subscribe(
      res => {
        console.log(res);
        
        if (this.conversation.members) {
          this.conversation.members = this.conversation.members.filter((item: any) => item !== res.username);
        }else {
          this.conversation.accessingUsers = this.conversation.accessingUsers.filter((item: any) => item !== res.username);
        }
      }, error => {
        console.log(error);
        
      }
    )
  }

  checkPermission(): void {
    if (this.conversation?.members) {
      this.havePermission = ['super', 'groupadmin'].includes(this.user.role);
    } else if (this.conversation?.accessingUsers) {
      this.havePermission =  ['super', 'groupadmin', 'groupassis'].includes(this.user.role);
    }
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
        this.groupService.getGroupById(this.conversation.id).subscribe(
          res => {
            this.conversation = res;
          }, error => {
            console.log(error);
            
          }
        );
      });
    } else {
      modal.componentInstance.channel = this.conversation;
      modal.componentInstance.existingMembers = this.conversation.accessingUsers;
      modal.componentInstance.groupId = this.groupId;
      modal.componentInstance.afterButtonClicked.subscribe(() => {
        this.groupService.getChannelById(this.groupId,this.conversation.id).subscribe(
          res => {
            this.conversation = res;
          }, error => {
            console.log(error);
            
          }
        );
      });
    }
    modal.dismissed.subscribe(() => {
      if (this.conversation.members) {
        this.onParentMembersChanged.emit();
        console.log(this.parentMembers);
      }
    });
  }

  deleteGroupChannel(): void {
    if (this.conversation.members) {
      this.groupService.deleteGroup(this.conversation.id).subscribe(
        res => {
          this.conversation = null;
          this.onGroupDelete.emit();
        }, error => {
          console.log(error);
          
        }
      );
    } else {
      this.groupService.deleteChannel(this.groupId, this.conversation.id).subscribe(
        res => {
          this.groupService.getGroupById(this.groupId).subscribe(
            res => {
              this.onChannelDelete.emit(res);
            }, error => {
              console.log(error);
              
            }
          );
        }, error => {
          console.log(error);

        }
      )
    }
  }
}
