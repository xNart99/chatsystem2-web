import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private storage: StorageService,
  ) {
  }

  register(username: string, password: string, email: string, role: string): boolean {
    const isUsernameTaken = this.storage.get('users')?.find((user: User) => user.username === username);
    const isEmailTaken = this.storage.get('users')?.find((user: User) => user.email === email);
    const user = {
      username,
      password,
      email,
      role
    };
    if (isUsernameTaken) {
      return false;
    }
    if (isEmailTaken) {
      return false;
    }
    if (!this.storage.get('users')) {
      this.storage.set('users', [user]);
    } else {
      this.storage.set('users', [...this.storage.get('users'), user]);
    }
    return true;
  }

  login(username: string, password: string): boolean {
    console.log(username, password);
    const users = this.storage.get('users') || [];
    const user = users.find((user: User) => user.username === username && user.password === password);
    if (user) {
      this.storage.set('user', user);
      return true;
    }
    return false;
  }

  autoLogin(): boolean {
    const user = this.storage.get('user');
    if (user) {
      return true;
    }
    return false;
  }

  getUser(): User {
    const user = this.storage.get('user') || null;
    if (user) {
      delete user.password;
    }
    return user;
  }

  getUserByUsername(username: string): User {
    const user = this.storage.get('users')?.find((user: User) => user.username === username) || null; 
    if (user) {
      delete user.password;
    }
    return user;
  }

  logout(): void {
    this.storage.remove('user');
  }

  getAllUsers(): User[] {
    let users = this.storage.get('users') || [];
    if (users) {
      users = users.map((user: User) => {
        delete user.password;
        return user;
      });
    }
    return users;
  }
}