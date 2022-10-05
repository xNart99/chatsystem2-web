import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  sender!: User;
  @Input() message!: Message;
  @Input() isYour = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.sender =this.authService.getUserByUsername(this.message.from);
  }

}
