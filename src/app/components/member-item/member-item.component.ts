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
  @Input() mode!: string;
  @Input() isYour = false;
  @Input() havePermission = false;
  @Output() onButtonClick = new EventEmitter<boolean>();
  @Output() onUserDelete = new EventEmitter<string>();
  member!: User;
  user!: User;
  isSelected = false;
  constructor(
    private authService: AuthService
  ) {
    this.authService.getUser().subscribe(
      res => {
        this.user = res;
      },error => {
        console.log(error);
        
      }
    );
  }

  ngOnInit(): void {
    this.member = this.authService.getUserByUsername(this.memberId);
  }

  onButtonClickHandler(): void {
    this.onButtonClick.emit(!this.addingStatus);
    this.addingStatus = !this.addingStatus;
  }

  onUserDeleteHandler(): void {
    this.onUserDelete.emit(this.memberId);
  }

  changeMemberRole(role: 'super' | 'groupadmin' | 'groupassis' | 'member') {
    this.member.role = role;
    this.authService.updateUser(this.member).subscribe(
      res => {
        
      }, error => {
        console.log(error);
      }
    )
  }
}
