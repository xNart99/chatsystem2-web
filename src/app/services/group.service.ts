import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Channel } from "../models/channel.model";
import { Group } from "../models/group.model";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupsSubject = new BehaviorSubject<Group[]>([]);
  groups$ = this.groupsSubject.asObservable();
  constructor(
    private storage: StorageService,
    private http: HttpService
  ) {
    this.getGroups();
  }

  getGroupById(id: string): Group | null {
    const groups = this.storage.get('groups') || [];
    return groups?.find((g: Group) => g.id === id) || null;
  }

  createGroup(group: Group): Observable<any> {
    return this.http.post('/groups', group);
  }

  updateGroup(group: Group): boolean {
    const groups = this.storage.get('groups') || [];
    let currentGroup = groups?.find((g: Group) => g.id === group.id);
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
    const groups = this.storage.get('groups') || [];
    const group = groups?.find((g: Group) => g.id === groupId);
    if (group.members?.some((m: User) => m.username === memberUsername)) {
      return false;
    }
    group.members?.push(memberUsername);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  removeMemberFromGroup(groupId: string, memberUsername: string): boolean {
    const groups = this.storage.get('groups') || [];
    const group = groups?.find((g: Group) => g.id === groupId);
    if (group.members?.find((username: string) => username === memberUsername)) {
      console.log('member found');
      group.members = group.members?.filter((username: string) => username !== memberUsername);
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
    const groups = this.storage.get('groups') || [];
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
    const groups = this.storage.get('groups') || [];
    const group = groups.find((g: Group) => g.id === groupId);
    const channel = group.channels.find((c: Channel) => c.id === channelId);
    if (channel.accessingUsers.some((m: string) => m === username)) {
      console.log('user already in channel');
      return false;
    }
    channel.accessingUsers.push(username);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  removeUserFromChannel(groupId: string, channelId: string, username: string): boolean {
    const groups = this.storage.get('groups') || [];
    const group = groups.find((g: Group) => g.id === groupId);
    const channel = group.channels.find((c: Channel) => c.id === channelId);
    if (channel.accessingUsers.some((m: string) => m === username)) {
      channel.accessingUsers = channel.accessingUsers.filter((m: string) => m !== username);
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

  getChannelById(groupId: string, channelId: string): Channel {
    const groups = this.storage.get('groups') || [];
    const group = groups.find((g: Group) => g.id === groupId) || null;
    return group?.channels.find((c: Channel) => c.id === channelId) || null;
  }

  sendMessageToChannel(groupId: string, channelId: string, message: Message, username: string): boolean {
    const groups = this.storage.get('groups') || [];
    const group = groups.find((g: Group) => g.id === groupId);
    const channel = group.channels.find((c: Channel) => c.id === channelId);
    channel.messages.push(message);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  onUserDeleted(username: string): boolean {
    const groups = this.storage.get('groups') || [];
    groups.forEach((g: Group) => {
      g.members = g.members.filter((m: string) => m !== username);
      g.channels.forEach((c: Channel) => {
        c.accessingUsers = c.accessingUsers.filter((m: string) => m !== username);
        c.messages = c.messages.filter((m: Message) => m.from !== username);
      });
    });
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  deleteChannel(groupId: string, channelId: string): boolean {
    const groups = this.storage.get('groups') || [];
    const group = groups.find((g: Group) => g.id === groupId);
    group.channels = group.channels.filter((c: Channel) => c.id !== channelId);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }

  deleteGroup(groupId: string): boolean {
    let groups = this.storage.get('groups') || [];
    groups = groups.filter((g: Group) => g.id !== groupId);
    try {
      this.storage.set('groups', groups);
      this.groupsSubject.next(this.storage.get('groups'));
      return true;
    } catch (error) {
      return false;
    }
  }
}