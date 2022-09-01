import { Component, OnInit } from '@angular/core';
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
  user!: User;
  groups: Group[] = [];
  selectedGroup!: Group;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.groupService.groups$.subscribe((groups: Group[]) => {
      this.groups = groups;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  openCreateGroupModal(): void {
    this.modalService.open(CreateGroupComponent, {
      centered: true
    })
  }

}
