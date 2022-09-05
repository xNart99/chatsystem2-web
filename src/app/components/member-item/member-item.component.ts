import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {
  @Input() memberId!: string;
  @Input() addingStatus!: boolean;
  @Output() onButtonClick = new EventEmitter<boolean>();
  member!: User;
  isSelected = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.member = this.authService.getUserByUsername(this.memberId);
  }

  onButtonClickHandler(): void {
    this.onButtonClick.emit(!this.addingStatus);
    this.addingStatus = !this.addingStatus;
  }
}
