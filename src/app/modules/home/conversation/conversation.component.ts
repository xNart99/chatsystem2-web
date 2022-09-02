import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'src/app/models/channel.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @Input() channel!: Channel;

  constructor() { }

  ngOnInit(): void {
  }

}
