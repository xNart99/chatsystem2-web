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
    // this.getGroups().subscribe(
    //   res => {
    //     this.groupsSubject.next(res);
    //   }, error => {
    //     console.log(error);
    //   }
    // );
    this.loadGroups();
  }
  loadGroups() {
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

  sendMessageToChannel(groupId: string, channelId: string, message: Message, username: string): Observable<any> {
    return this.http.post(`/groups/${groupId}/channels/${channelId}/send-message`, message);
  }

  sendMessageTypeImageToChannel(groupId: string, channelId: string, files: File[], message: Message): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    formData.append('type', message.type);
    formData.append('from', message.from);
    formData.append('createdAt', message.createdAt.toString());
    return this.http.post(`/groups/${groupId}/channels/${channelId}/send-message-file`, formData);
  }

  onUserDeleted(username: string): Observable<any> {
   return this.http.post('/groups/delete-user', {username});
  }

  deleteChannel(groupId: string, channelId: string): Observable<any> {
    return this.http.delete(`/groups/${groupId}/channels/${channelId}`);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete(`/groups/${groupId}`);
  }
}