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
    this.getGroups().subscribe(
      res => {
        this.groupsSubject.next(res);
      }, error => {
        console.log(error);
      }
    );
  }

  getGroupById(id: string): Observable<Group> {
    return this.http.get(`/groups/${id}`);

  }

  createGroup(group: Group): Observable<any> {
    return this.http.post('/groups', group);
  }

  updateGroup(group: Group): Observable<any> {
    return this.http.put('/groups', group);
  }

  addMemberToGroup(groupId: string, memberUsername: string): Observable<any> {
    return this.http.post('/groups/add-member', {groupId, memberUsername});
  }

  removeMemberFromGroup(groupId: string, memberUsername: string): Observable<any> {
   return this.http.post('/groups/remove-member', {groupId, memberUsername});
  }


  getGroups(): Observable<Group[]> {
    return this.http.get('/groups');

  }

  createChannel(groupId: string, channel: Channel): Observable<any> {
    return this.http.post(`/groups/${groupId}/channels`, channel);
  }

  addUserToChannel(groupId: string, channelId: string, username: string): Observable<any> {
   return this.http.post(`/groups/${groupId}/channels/${channelId}/add-member`, {username});
  }

  removeUserFromChannel(groupId: string, channelId: string, username: string): Observable<any> {
    return this.http.post(`/groups/${groupId}/channels/${channelId}/remove-member`, {username});
  }

  getChannelById(groupId: string, channelId: string): Observable<Channel> {
    return this.http.get(`/groups/${groupId}/channels/${channelId}`);
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