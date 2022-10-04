import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Channel } from 'src/app/models/channel.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {
  @Input() groupId!: string;
  currentUser!: User;
  message = '';

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private groupService: GroupService
  ) {
    this.authService.getUser().subscribe(
      res => {
        this.currentUser = res;
      },error => {
        console.log(error);
        
      }
    );
  }

  ngOnInit(): void {
  }

  createNewChannel(channelName: string): void {
    if (this.groupId) {
      const newChannel: Channel = {
        id: Math.round(Math.random() * 1000000).toString(),
        name: channelName,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        accessingUsers: [
          this.currentUser.username
        ],
        read: [],
        messages: []
      }
      if (this.groupService.createChannel(this.groupId, newChannel)) {
        this.activeModal.close(newChannel);
        this.message = '';
      } else {
        this.message = 'Group name is taken';
      }
    }
  }
}
