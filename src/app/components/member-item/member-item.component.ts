import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {
  @Input() member!: User;
  isSelected = false;
  constructor() { }

  ngOnInit(): void {
  }

}
