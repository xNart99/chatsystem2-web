import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Group } from "../models/group.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupsSubject = new BehaviorSubject<Group[]>([]);
  groups$ = this.groupsSubject.asObservable();
  constructor(
    private storage: StorageService
  ) {
    this.getGroups();
  }

  createGroup(group: Group): boolean {
    const isGroupTaken = this.storage.get('groups')?.find((g: Group) => g.name === group.name);
    if (isGroupTaken) {
      return false;
    }
    if (!this.storage.get('groups')) {
      this.storage.set('groups', [group]);
      this.groupsSubject.next([group]);
    } else {
      this.storage.set('groups', [...this.storage.get('groups'), group]);
      this.groupsSubject.next(this.storage.get('groups'));
    }
    return true;
  }

  updateGroup(group: Group): boolean {
    const groups = this.storage.get('groups');
    let currentGroup = groups.find((g: Group) => g.id === group.id);
    currentGroup = group;
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  getGroups(): Group[] {
    this.groupsSubject.next(this.storage.get('groups'));
    return this.storage.get('groups') || [];
  }
}