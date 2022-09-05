import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ConversationInfoComponent } from './conversation-info/conversation-info.component';
import { ConversationComponent } from './conversation/conversation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('conversationInfo') conversationInfo!: ConversationInfoComponent;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onGroupSelectedClick(data: any): void {
    if (data) {
      this.conversationInfo.conversation = data;
      this.conversationInfo.checkPermission();
      if (data.members) {
        this.conversationInfo.parentMembers = this.usersService.usersSubject.value;
      } else {
        this.conversationInfo.parentMembers = data.members;
      }
      this.router.navigate(['/home', 'conversation']);
    }
  }

  onChannelSelectedClick(data: any): void {
    this.conversationInfo.conversation = data.channel;
    this.conversationInfo.checkPermission();
    this.conversationInfo.parentMembers = data.parentMembers;
    this.conversationInfo.groupId = data.groupId;
    this.router.navigate(['/home', 'conversation', data.groupId, data.channel.id]);
  }
}
