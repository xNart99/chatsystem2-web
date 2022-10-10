import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Socket, io } from "socket.io-client";


@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    private url = 'http://localhost:4000';
    constructor() {
      this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
    }

    joinChannel(channelId: string, channelOld?: string)  {
        this.socket.emit('join', {channelId, channelOld});
    }

    getNewMessage(): Observable<any>{
        return new Observable<any>(observer => {
          this.socket.on('send-message', (data) => {
            observer.next(data);
          });
          return () => {
            this.socket.disconnect();
          };
        });
    }

    getNotificationCallVideo(): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on('notification-call-video', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    }

    joinRoomMetting(username: string, channelId: string, channelName: string) {
      this.socket.emit('join-room-metting', {username, channelId, channelName});
    }

    getNewUserJoinRoom(): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on('new-user-join', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    }

    getUserEndCall(): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on('user-end-call', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    }

    endCallVideo(username: string, channelId: string) {
      this.socket.emit('leave', {username, channelId});
    }

    getUpdateToGroups(): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on('add-member-new-group-channel', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    }

    sendUsernameAdd(username: string) {
      this.socket.emit('add-user',username);
    }

    getUsernameAdd(): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on('add-user-to-group-channel', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    }

    sendUsernameRemove(username: string) {
      this.socket.emit('remove-user',username);
    }
    getUsernameRemove(): Observable<any> {
      return new Observable<any>(observer => {
        this.socket.on('remove-user-to-group-channel', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      });
    }
}