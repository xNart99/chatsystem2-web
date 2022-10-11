import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private http: HttpService
  ) {
    this.loadUsers();
  }

  getAllUser() {
    return this.usersSubject.getValue();
  }

  addUser(user: User): void {
    const users = this.usersSubject.getValue();
    users.push(user);
    this.usersSubject.next(users);
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      res => {
        console.log(res);
        this.usersSubject.next(res);
      }, error => {
        console.log(error);
        this.usersSubject.next([]);
      }
    )
  }

  removeUser(username: string): Observable<any> {
    return this.http.delete('/users', {params: {username}});
  }

  updateProfile(email: string, file: File, username: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('email', email);
    formData.append('username', username);
    return this.http.put('/users/profile', formData);
  }
}