import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Channel } from 'src/app/models/channel.model';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  @Input() members: User[] = [];
  @Input() existingMembers: string[] = [];
  @Input() group?: Group;
  @Input() channel?: Channel;
  searchValue = '';

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  checkAddingStatus(member: User, existingMembers: string[]): boolean {
    return existingMembers.some(m => m === member.username);
  }
}
