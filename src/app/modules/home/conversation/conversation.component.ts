import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Channel } from 'src/app/models/channel.model';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  channel!: Channel;
  message = '';
  user!: User;
  url: string[] = [];
  constructor(
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = val.url.split('/');
        this.groupService.getChannelById(this.url[this.url.length - 2], this.url[this.url.length - 1]).subscribe(
          res => {
            this.channel = res;
          }, error => {
            console.log(error);
          }
        );
      }
    });
    this.authService.getUser().subscribe(
      res => {
        this.user = res;
      },error => {
        console.log(error);
        
      }
    );
  }

  ngOnInit(): void {
  }

  sendMessage(): void {
    const m: Message = {
      id: Math.round(Math.random() * 1000000).toString(),
      createdAt: new Date().getTime(),
      type: 'text',
      content: this.message,
      from: this.user.username
    };
    this.groupService.sendMessageToChannel(this.url[this.url.length - 2], this.url[this.url.length - 1], m, this.user.username).subscribe(
      res => {
        this.channel.messages.push(m);
        this.message = '';
      }, error => {
        console.log(error);
      }
    );
  };
}
