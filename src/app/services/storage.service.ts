import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}