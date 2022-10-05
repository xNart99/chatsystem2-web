import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateChannelComponent } from 'src/app/components/create-channel/create-channel.component';
import { Channel } from 'src/app/models/channel.model';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { CreateGroupComponent } from './create-group/create-group.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() onGroupSelected = new EventEmitter<Group>();
  @Output() onMemberManager = new EventEmitter<void>();
  @Output() onChannelSelected = new EventEmitter<{channel: Channel, groupId: string, parentMembers: string[]}>();
  @Output() onBackButtonClick = new EventEmitter<Group>();
  user!: User;
  groups: Group[] = [];
  selectedGroup!: Group;
  selectedChannel!: Channel;
  searchValue = '';
  type = 'group';
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private groupService: GroupService,
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
    this.groupService.groups$.subscribe((groups: Group[]) => {
      this.groups = groups;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  openCreateGroupModal(): void {
    if (this.type === 'group') {
      this.modalService.open(CreateGroupComponent, {
        centered: true
      })
    } else {
      const modal = this.modalService.open(CreateChannelComponent, {
        centered: true
      })
      modal.componentInstance.groupId = this.selectedGroup.id;
      modal.closed.subscribe((channel: Channel) => {
        this.selectedGroup.channels.push(channel);
      });
    }
  }

  selectGroup(group: Group): void {
    this.selectedGroup = group;
    this.onGroupSelected.emit(group);
    this.type = 'channel';
  }

  selectChannel(channel: Channel): void {
    this.selectedChannel = channel;
    this.groupService.getGroupById(this.selectedGroup.id).subscribe(
      res => {
        console.log(res.members);
        
        this.onChannelSelected.emit({
          channel,
          groupId: this.selectedGroup.id,
          parentMembers: res.members
        });
      }
    )
    
  }

  checkPermission(): boolean {
    if (this.type === 'group') {
      return ['super', 'groupadmin'].includes(this.user.role);
    } else if (this.type === 'channel') {
      return ['super', 'groupadmin', 'groupassis'].includes(this.user.role);
    } else {
      return false;
    }
  }

  checkPermissionMM(): boolean {
    return ['super', 'groupadmin'].includes(this.user.role); 
  }

  onMemberManagerClick(): void {
    this.onMemberManager.emit();
  }

  checkUserPremisstion(data: any): boolean {
    if (this.type === 'group') {
      if (this.user.role === 'super' || this.user.role === 'groupadmin') {
        return true;
      }
      return data?.members.includes(this.user.username);
    } else if (this.type === 'channel') {
      if (this.user.role === 'super' || this.user.role === 'groupadmin' || this.user.role === 'groupassis') {
        return true;
      }
      return data?.accessingUsers.includes(this.user.username);
    }
    return false;
  }
}
