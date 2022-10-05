import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Channel } from 'src/app/models/channel.model';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { GroupService } from 'src/app/services/group.service';

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
  @Output() afterButtonClicked = new EventEmitter<void>();
  @Input() groupId!: string;
  searchValue = '';

  constructor(
    public activeModal: NgbActiveModal,
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
    console.log(this.members);
  }

  checkAddingStatus(member: User, existingMembers: string[]): boolean {
    return existingMembers.some(m => m === member.username);
  }

  onButtonClickHandle(member: User, addingStatus: boolean): void {
    if (this.group) {
      if (addingStatus) {
        this.groupService.addMemberToGroup(this.group.id, member.username).subscribe(
          res => {

          }, error => {
            console.log(error);
          }
        );
      } else {
        this.groupService.removeMemberFromGroup(this.group.id, member.username).subscribe(
          res => {

          }, error => {
            console.log(error);
            
          }
        );
      }
      this.afterButtonClicked.emit();
    } else {
      if (addingStatus) {
        this.groupService.addUserToChannel(this.groupId, this.channel!.id, member.username).subscribe(
          res => {

          }, error => {
            console.log(error);
            
          }
        );
      } else {
        this.groupService.removeUserFromChannel(this.groupId, this.channel!.id, member.username).subscribe(
          res => {

          }, error => {
            console.log(error);
            
          }
        );
      }
      this.afterButtonClicked.emit();
    }
  }
}
