import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  message = '';
  constructor(
    public activeModal: NgbActiveModal,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
  }

  createNewGroup(groupName: string): void {
    const newGroup: Group = {
      id: Math.round(Math.random() * 1000000).toString(),
      name: groupName,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      members: [],
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
