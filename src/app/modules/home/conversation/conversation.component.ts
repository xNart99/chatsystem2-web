import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCallVideoComponent } from 'src/app/components/modal-call-video/modal-call-video.component';
import { ModalNotificationCallComponent } from 'src/app/components/modal-notification-call/modal-notification-call.component';
import { Channel } from 'src/app/models/channel.model';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { SocketService } from 'src/app/services/socket.service';

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
    private authService: AuthService,
    private socketService: SocketService,
    private modalController: NgbModal,
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
    this.socketService.getNewMessage().subscribe(
      res => {
        this.channel.messages.push(res);
      }, error => {
        console.log(error);
      }
    );
    this.socketService.getNotificationCallVideo().subscribe(
      res => {
        console.log(res);
        this.openNotificationVideoCall();
      }, error => {
        console.log(error);
      }
    )

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
        // this.channel.messages.push(m);
        this.message = '';
      }, error => {
        console.log(error);
      }
    );
  };
  sendMessageFile(event: any): void {
    const m: Message = {
      createdAt: new Date().getTime(),
      type: 'image',
      from: this.user.username,
    };
    const selectedFiles = event.target.files;
    const file = selectedFiles;
    this.groupService.sendMessageTypeImageToChannel(this.url[this.url.length - 2], this.url[this.url.length - 1], file,m).subscribe(
      res => {

      }, error => {
        console.log(error);
      }
    );
  }
  openCallVideo(): void {
    const modal = this.modalController.open(
      ModalCallVideoComponent,
      {
        centered: true,
        size: 'xl'
      }
    );
    modal.componentInstance.channel = this.channel;
    modal. result.then(() => { console.log('When user closes'); }, () => {console.log('click outside');
    })
  }
  openNotificationVideoCall(): void {
    const modal = this.modalController.open(
      ModalNotificationCallComponent,
      {
        centered: true,
        size: 'md'
      }
    );
    modal.componentInstance.channel = this.channel;
    modal. result.then(() => { console.log('When user closes'); }, () => {console.log('click outside');
    })
  }
}
