import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MemberItemComponent } from "./member-item/member-item.component";
import { CreateAddMemberComponent } from './create-add-member/create-add-member.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddMemberComponent } from './add-member/add-member.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { SafePipe } from "../pipe/safe.pipe";
import { ModalNotificationCallComponent } from './modal-notification-call/modal-notification-call.component';
import { ModalCallVideoComponent } from './modal-call-video/modal-call-video.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    MemberItemComponent,
    CreateAddMemberComponent,
    AddMemberComponent,
    CreateChannelComponent,
    ChatBubbleComponent,
    SafePipe,
    ModalNotificationCallComponent,
    ModalCallVideoComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MemberItemComponent,
    ChatBubbleComponent
  ]
})
export class ComponentsModule {
}