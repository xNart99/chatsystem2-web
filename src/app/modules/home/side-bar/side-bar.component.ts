import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateChannelComponent } from 'src/app/components/create-channel/create-channel.component';
import { Channel } from 'src/app/models/channel.model';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { SocketService } from 'src/app/services/socket.service';
import { StorageService } from 'src/app/services/storage.service';
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
  role!: string;
  username!: string;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private groupService: GroupService,
    private router: Router,
    private storageService: StorageService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {
        this.user = res;
      },error => {
        console.log(error);
      }
    );
    this.username = this.storageService.get('username');
    this.socketService.getUpdateToGroups().subscribe(
      res => {
        this.groupService.loadGroups();
      }, error => {
        console.log(error);
      }
    )
    this.groupService.groups$.subscribe((groups: Group[]) => {
      this.groups = groups;
    });
    this.role = this.storageService.get('role');
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
    const channelOld = this.storageService.get('channelOld');
    if(channelOld){
      this.socketService.joinChannel(channel.id, channelOld);
    }
    this.socketService.joinChannel(channel.id);
    this.storageService.set('channelOld', channel.id);
    this.groupService.getGroupById(this.selectedGroup.id).subscribe(
      res => {
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
      return ['super', 'groupadmin'].includes(this.role);
    } else if (this.type === 'channel') {
      return ['super', 'groupadmin', 'groupassis'].includes(this.role);
    } else {
      return false;
    }
  }

  checkPermissionMM(): boolean {
    return ['super', 'groupadmin'].includes(this.role); 
  }

  onMemberManagerClick(): void {
    this.onMemberManager.emit();
  }

  checkUserPremisstion(data: any): boolean {
    if (this.type === 'group') {
      if (this.role === 'super' || this.role === 'groupadmin') {
        return true;
      }
      return data?.members.includes(this.username);
    } else if (this.type === 'channel') {
      if (this.role === 'super' || this.role === 'groupadmin' || this.role === 'groupassis') {
        return true;
      }
      return data?.accessingUsers.includes(this.username);
    }
    return false;
  }
}
