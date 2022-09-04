import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  user!: User;
  groups: Group[] = [];
  selectedGroup!: Group;
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
    this.modalService.open(CreateGroupComponent, {
      centered: true
    })
  }

  selectGroup(group: Group): void {
    this.selectedGroup = group;
    this.onGroupSelected.emit(group);
  }

  checkPermisstion(): boolean {
    return ['superadmin', 'groupadmin'].includes(this.user.role);
  }
}
