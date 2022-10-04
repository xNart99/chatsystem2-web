import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(
    private authService: AuthService,
    private storage: StorageService
  ) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      res => {
        this.usersSubject.next(res);
      }, error => {
        console.log(error);
        this.usersSubject.next([]);
      }
    )
  }

  removeUser(username: string): boolean {
    let users = this.storage.get('users') || [];
    users = users.filter((u: User) => u.username !== username);
    try {
      this.storage.set('users', users);
      this.loadUsers();
      return true;
    } catch (error) {
      return false;
    }
  }
}