import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'src/app/models/channel.model';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-group-bar',
  templateUrl: './group-bar.component.html',
  styleUrls: ['./group-bar.component.scss']
})
export class GroupBarComponent implements OnInit {
  @Input() isSelected = false;
  @Input() group?: Group;
  @Input() channel?: Channel;
  isRead = false;
  currentUser!: User;
  username!: string;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {
        this.currentUser = res;
      },error => {
        console.log(error);
        
      }
    );
    this.username = this.storageService.get('username');
    if (this.group) {
      this.isRead = this.group.read?.includes(this.username);
    } else if (this.channel) {
      this.isRead = this.channel.read?.includes(this.username);
    }
  }

}
