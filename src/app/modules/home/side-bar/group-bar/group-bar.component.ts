import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-group-bar',
  templateUrl: './group-bar.component.html',
  styleUrls: ['./group-bar.component.scss']
})
export class GroupBarComponent implements OnInit {
  @Input() isSelected = false;
  @Input() group!: Group;
  isRead = false;
  currentUser!: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.isRead = this.group.read?.includes(this.currentUser.username);
  }

}
