import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { from, mergeMap, Subject, takeUntil, tap } from 'rxjs';
// import { IPeerJs } from '../../models/peerjs.model';
import { Peer } from "peerjs";
import { SocketService } from 'src/app/services/socket.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-call-video',
  templateUrl: './modal-call-video.component.html',
  styleUrls: ['./modal-call-video.component.scss']
})
export class ModalCallVideoComponent implements OnInit, OnDestroy {
  @Input() channel: any;
  end$ = new Subject();
  localStream!: MediaStream;
  remoteStreams: MediaStream[] = []; 
  name!: string;
  remoteNames: string[] = [];
  myPeer!: IPeerJs;
  a: any;
  peers: {
    [id: string]: any;
  } = {};
  constructor(private socketService: SocketService, 
              private storageService: StorageService,
              public activeModal: NgbActiveModal,
              ) { }

  ngOnInit(): void {
    console.log(this.channel);
    this.name = this.storageService.get('username');
    this.socketService.joinRoomMetting(this.name,this.channel.id, this.channel.name);
    this.initVideo();
    // const call = this.myPeer.call(this.name, this.localStream);
    // this.connectToNewUser(call);
    this.socketService.getNewUserJoinRoom().subscribe(
      res => {
        const callNew  = this.myPeer.call(res.username, this.localStream);
        this.connectToNewUser(callNew); 
      }
    )
    this.socketService.getUserEndCall().subscribe(
      res => {
        this.peers = {};
        this.remoteStreams = [];
        this.remoteNames = [];
        const tracks = this.localStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        this.activeModal.close();
      }, error => {
        console.log(error);
        
      }
    )
  }

  connectToNewUser(call: any) {
    call.on('stream', (stream: MediaStream) => {
      this.remoteStreams.push(stream);
      this.peers[call.peer] = call;
      console.log(this.remoteStreams);
      
      this.remoteNames = Object.keys(this.peers);
      // console.log(this.remoteNames);
    });
    call.on('close', () => {
      this.peers[call.peer].close();
    });

    console.log(this.peers);
  }

  initVideo() {
    // const peer = new Peer("pick-an-id");
    
    from(navigator.mediaDevices.getUserMedia({ audio: false, video: true }))
      .pipe(
        tap((stream) => (this.localStream = stream)),
        mergeMap(() =>
          // @ts-ignore
          from(import('../../../assets/peer.js'))
        )
      )
      .pipe(takeUntil(this.end$))
      .subscribe((data) => {
        this.myPeer = new data.default(this.name) as IPeerJs;
        this.myPeer.on('open', (id) => {
          console.log(id);
        });
        this.myPeer.on('call', (call) => {
          call.answer(this.localStream);
          this.connectToNewUser(call);
        });
      });

  }

  ngOnDestroy() {
    this.end$.next(1);
  }

  endCall():void {
    this.socketService.endCallVideo(this.name, this.channel.id);
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    this.activeModal.close();
  }

}
export interface IPeerJs {
  connections: any;
  destroyed: boolean;
  disconnected: boolean;
  id: string;
  open: boolean;
  options: {
    config: { iceServers: any[]; sdpSemantics: string };
    debug: number;
    host: string;
    key: string;
    path: string;
    port: number;
    secure: boolean;
    token: string;
  };
  socket: WebSocket;
  on(
    event:
      | 'signal'
      | 'stream'
      | 'connect'
      | 'open'
      | 'call'
      | 'data'
      | 'track'
      | 'close'
      | 'error',
    fn: {
      (param1?: any, param2?: any): void;
    }
  ): void;
  call(id: string, stream: MediaStream, options?: any): any;
}