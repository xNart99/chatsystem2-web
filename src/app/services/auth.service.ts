import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { User } from "../models/user.model";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersSub = new BehaviorSubject<User[]>([]);
  constructor(
    private storage: StorageService,
    private http: HttpService
  ) {
   this.loadUsers();
  }

  loadUsers(): void {
    this.getAllUsers().subscribe(
      res => {
        this.usersSub.next(res);
      },error => {
      }
    )
  }

  addUser(user: User): void {
    const users = this.usersSub.getValue();
    users.push(user);
    this.usersSub.next(users);
  }

  register(username: string, password: string, email: string, role: string): Observable<any> {
    return this.http.post('/auth/register', {username, password, email, role});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/auth/login', {username, password}).pipe(tap(({ token, role, username }) => {
      this.storage.set('token', token);
      this.storage.set('role', role);
      this.storage.set('username', username);
    }));
  }

  autoLogin(): boolean {
    const token = this.storage.get('token');
    if (token) {
      return true;
    }
    return false;
  }

  getUser(): Observable<User> {
    return this.http.get('/users/profile');
  }

  getUserByUsername(username: string): User {
    const users = this.usersSub.getValue();
    const user = users.filter(item => item.username === username);
    return user[0];
  }

  logout(): void {
    this.storage.clear();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get('/users');
  }

  updateUser(user: User): Observable<any> {
    return this.http.put('/users/role',user);
  }
}