import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation-info',
  templateUrl: './conversation-info.component.html',
  styleUrls: ['./conversation-info.component.scss']
})
export class ConversationInfoComponent implements OnInit {
  @Input() conversation: any;

  constructor() { }

  ngOnInit(): void {
  }

}
