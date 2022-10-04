import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAddMemberComponent } from 'src/app/components/create-add-member/create-add-member.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-members-manager',
  templateUrl: './members-manager.component.html',
  styleUrls: ['./members-manager.component.scss']
})
export class MembersManagerComponent implements OnInit {
  searchValue = '';
  users!: User[];
  user!: User;

  constructor(
    private modalController: NgbModal,
    private usersService: UsersService,
    private authService: AuthService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.usersService.users$.subscribe((users: User[]) => {
      this.users = users;
    });
    this.authService.getUser().subscribe(
      res => {
        this.user = res;
      },error => {
        console.log(error);
        
      }
    );
  }

  openAddMemberModal(): void {
    const modal = this.modalController.open(
      CreateAddMemberComponent,
      {
        centered: true,
      }
    );
    modal.closed.subscribe(() => {
      console.log('works');
      this.usersService.loadUsers();
    })
  }

  onUserDelete(userId: string): void {
    this.usersService.removeUser(userId);
    this.groupService.onUserDeleted(userId);
  }
}
