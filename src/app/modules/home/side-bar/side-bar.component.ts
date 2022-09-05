import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() onChannelSelected = new EventEmitter<Channel>();
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
    this.user = this.authService.getUser();
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
    }
  }

  selectGroup(group: Group): void {
    this.selectedGroup = group;
    this.onGroupSelected.emit(group);
    this.type = 'channel';
  }

  selectChannel(channel: Channel): void {
    this.selectedChannel = channel;
    this.onChannelSelected.emit(channel);
  }

  checkPermisstion(): boolean {
    return ['super', 'groupadmin'].includes(this.user.role);
  }

  onMemberManagerClick(): void {
    this.onMemberManager.emit();
  }
}
