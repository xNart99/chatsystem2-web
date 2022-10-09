import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/services/socket.service';
import { ModalCallVideoComponent } from '../modal-call-video/modal-call-video.component';

@Component({
  selector: 'app-modal-notification-call',
  templateUrl: './modal-notification-call.component.html',
  styleUrls: ['./modal-notification-call.component.scss']
})
export class ModalNotificationCallComponent implements OnInit {
  @Input() channel: any;
  constructor(private modalController: NgbModal, private socketService: SocketService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  applyVideoCall() {
    // document.getElementById('a')?.click();
    this.activeModal.dismiss();
    const modal = this.modalController.open(
      ModalCallVideoComponent,
        {
          centered: true,
          size: 'xl'
        }
      );
      modal.componentInstance.channel = this.channel;
      // modal. result.then(() => { console.log('When user closes'); }, () => {console.log('click outside');});
  }
  

}
