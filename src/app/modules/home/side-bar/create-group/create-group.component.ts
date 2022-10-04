import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  currentUser!: User;
  message = '';
  constructor(
    public activeModal: NgbActiveModal,
    private groupService: GroupService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {
        this.currentUser = res;
      },error => {
        console.log(error);
        
      }
    );
  }

  createNewGroup(groupName: string): void {
    const newGroup: Group = {
      id: Math.round(Math.random() * 1000000).toString(),
      name: groupName,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      members: [
        this.currentUser.username
      ],
      channels: [],
      read: []
    }
    if (this.groupService.createGroup(newGroup)) {
      this.activeModal.close();
      this.message = '';
    } else {
      this.message = 'Group name is taken';
    }
  }
}
