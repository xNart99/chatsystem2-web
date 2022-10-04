import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { User } from "../models/user.model";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private storage: StorageService,
    private http: HttpService
  ) {
    
  }

  register(username: string, password: string, email: string, role: string): Observable<any> {
    return this.http.post('/auth/register', {username, password, email, role});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/auth/login', {username, password}).pipe(tap(({ token, role }) => {
      this.storage.set('token', token);
      this.storage.set('role', role);
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

  getUserByUsername(username: string): Observable<User> {
    return this.http.get('/users/search', {params: {username}});
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