import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Channel } from "../models/channel.model";
import { Group } from "../models/group.model";
import { User } from "../models/user.model";
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

  getGroupById(id: string): Group {
    const groups = this.storage.get('groups');
    return groups.find((g: Group) => g.id === id) || null;
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

  addMemberToGroup(groupId: string, memberUsername: string): boolean {
    const groups = this.storage.get('groups');
    const group = groups.find((g: Group) => g.id === groupId);
    if (group.members.some((m: User) => m.username === memberUsername)) {
      return false;
    }
    group.members.push(memberUsername);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  removeMemberFromGroup(groupId: string, memberUsername: string): boolean {
    const groups = this.storage.get('groups');
    const group = groups.find((g: Group) => g.id === groupId);
    if (group.members.find((username: string) => username === memberUsername)) {
      console.log('member found');
      group.members = group.members.filter((username: string) => username !== memberUsername);
      try {
        this.storage.set('groups', groups);
        this.groupsSubject.next(this.storage.get('groups'));
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }


  getGroups(): Group[] {
    this.groupsSubject.next(this.storage.get('groups'));
    return this.storage.get('groups') || [];
  }

  createChannel(groupId: string, channel: Channel): boolean {
    const groups = this.storage.get('groups');
    const group = groups.find((g: Group) => g.id === groupId);
    if (group.channels.some((c: Channel) => c.name === channel.name)) {
      console.log('channel name is taken');
      return false;
    }
    group.channels.push(channel);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups')); 
      return true;
    }
    catch (error) {
      return false;
    }
  }

  addUserToChannel(groupId: string, channelId: string, username: string): boolean {
    const groups = this.storage.get('groups');
    const group = groups.find((g: Group) => g.id === groupId);
    const channel = group.channels.find((c: Channel) => c.id === channelId);
    if (channel.members.some((m: User) => m.username === username)) {
      console.log('user already in channel');
      return false;
    }
    channel.members.push(username);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  removeUserFromChannel(groupId: string, channelId: string, username: string): boolean {
    const groups = this.storage.get('groups');
    const group = groups.find((g: Group) => g.id === groupId);
    const channel = group.channels.find((c: Channel) => c.id === channelId);
    if (channel.members.some((m: User) => m.username === username)) {
      channel.members = channel.members.filter((m: User) => m.username !== username);
      try {
        this.storage.set('groups', groups);
        this.groupsSubject.next(this.storage.get('groups'));
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}