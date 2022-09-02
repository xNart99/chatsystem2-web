import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'src/app/models/channel.model';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-conversation-info',
  templateUrl: './conversation-info.component.html',
  styleUrls: ['./conversation-info.component.scss']
})
export class ConversationInfoComponent implements OnInit {
  @Input() channel!: Channel;
  @Input() group!: Group;
  member: User = {
    username: 'testing',
    email: 'hieuduy1751',
    password: '123',
    role: 'super'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
