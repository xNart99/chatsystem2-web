import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(
    private authService: AuthService
  ) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersSubject.next(this.authService.getAllUsers() || []);
  }
}